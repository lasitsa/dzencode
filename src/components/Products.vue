<template>
	<section class="products">
		<div class="products__header">
			<h1>Продукты / {{ productQuantity }}</h1>
			<label for="product_type">Тип:</label>
			<select id="product_type" v-model="choosenType">
				<option value="all">All</option>
				<template v-for="item in showType">
					<option  v-bind:value="item">{{ item }}</option>
				</template>
				
			</select>
			<label>Спецификация:</label>
			<select>
				<option value="1">1</option>
				<option value="2">2</option>
			</select>
		</div>
		<div class="products-wrapper">
			<transition-group name="fade">
			<div class="product" v-for="item in sortByType" v-bind:key="item.id">
				<div class="product-status">
					<span class="new" v-if="item.isNew == 1"></span>
					<span class="repair" v-if="item.isNew == 2"></span>
				</div>
				<div class="product-img">
					<img src="../assets/computer-image.png" alt="product">
				</div>
				<div class="product-name">
					<p class="first-line">{{ item.title }}</p>
					<p class="second-line">SN-{{ item.serialNumber }}</p>
				</div>
				<div class="newOrRepair">
					<p v-if="item.isNew == 1" class="newOrRepair__free">свободен</p>
					<p v-if="item.isNew == 2">В ремонте</p>
				</div>
				<div class="date-guarantee">
					<p><span>с</span> {{date(item.guarantee.start, "full")}} </p>
					<p><span>по</span> {{date(item.guarantee.end, "full")}} </p>
				</div>
				<div class="newOrRepair">
					<p v-if="item.isNew == 1">новый</p>
					<p v-if="item.isNew == 2">Б/У</p>
				</div>
				<div class="type">
					{{ item.type }}
				</div>
				<div class="price">
					<template v-for="price in item.price">
					<p>{{price.value}} <span>{{price.symbol}}</span></p>
					</template>
				</div>
				<div class="order">
					{{ returnOrderOfProduct(item.order) }}
				</div>
				<div class="date-added">
					<p>{{ date(item.date, "short") }}</p>
					<p>{{ date(item.date, "full") }}</p>
				</div>
				<div class="delete-product">
					<span><i class="fas fa-trash-alt"></i></span>
				</div>
			</div>
			</transition-group>
		</div>
	</section>
</template>

<script>
	export default {
		name: "Products",
		data: function() {
			return {
				productQuantity: this.$store.state.products.length,
				choosenType: "all"
			}
		},
		methods: {
			returnOrderOfProduct: function(order) {
				let orderId = order;
				let orderName;
				this.$store.state.orders.forEach(function(item) {
					if (item.id == orderId) {
						orderName = item.title
					}
				})
				return orderName;
			},
			date: function(time, type) {
				let parseTime = Date.parse(time);
				let fullDate = new Date(parseTime);
				let monthAbbr = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
				let monthFull = monthAbbr[fullDate.getMonth()];
				let monthShort = fullDate.getMonth();
				let date = fullDate.getDate();
				let year = fullDate.getFullYear();
				if (type == "full") {
					return  zeroPadding(date, 2) + " / " + monthFull + " / " + year;
				}
				else if (type == "short") {
					return  zeroPadding(date, 2) + " / " + zeroPadding(monthShort, 2);
				}
				function zeroPadding(num, digit) {
					let zero = '';
					for(let i = 0; i < digit; i++) {
						zero += '0';
					}
					return (zero + num).slice(-digit);
				}
			}
		},
		computed: {
			showType() {
				let type = [];
				this.$store.state.products.forEach(function(item) {
					if (!type.includes(item.type)) {
						type.push(item.type);
					}
				});
				return type;
			},
			sortByType () {
				let type = this.choosenType;
				let newObject = [];
				if (type == "all") {
					return this.$store.state.products
				}
				else {
					this.$store.state.products.forEach(function(item) {
						if (item.type == type) {
							newObject.push(item);
						}
					})
					return newObject;
				}
			}
		}
	}
</script>

<style scoped>
	.fade-enter-active, .fade-leave-active {
  		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to {
  		opacity: 0;
	}
	p {
		margin: 0;
	}
	.products {
		display: inline-block;
		width: calc(100% - 200px);
		vertical-align: top;
		min-height: calc(100vh - 70px);

	}
	.products__header {
		margin-top: 65px;
		margin-bottom: 60px;
	}
	.products__header h1 {
		display: inline-block;
		margin-left: 10%;
	}
	.products__header label {
		margin-left: 30px;
		color: #90a4ae;
		margin-right: 10px;
	}
	.products__header select {
		width: 300px;
		border-radius: 5px;
		padding: 5px;
		outline: none;
	}
	.products-wrapper {
		margin-left: 10%;
		width: 120%;
	}
	.product {
		display: flex;
		align-items: center;
		border: 1px solid #cfd8dc;
		border-radius: 5px;
		margin-bottom: 10px;
		padding: 10px;
	}
	.product-status {
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 5%;
	}
	.product-status span {
		width: 10px;
		height: 10px;
		display: inline-block;
		border-radius: 10px;
	}
	.product-status span.new {
		background: #8ac24a;
	}
	.product-status span.repair {
		background: #2c3c44;
	}
	.product-img {
		width: 5%;
		display: flex;
		align-items: center;
	}
	.newOrRepair__free {
		color: #cddc39;
	}
	.product-name {
		width: 15%;
	}
	.product-name .first-line {
		color: #2c3c44;
		font-size: 15px;
		text-decoration: underline;
	}
	.product-name .second-line {
		font-size: 15px;
		color: #90a4ae;
		margin-top: 5px;
	}
	.newOrRepair {
		width: 10%;
	}
	.date-guarantee {
		width: 15%;
	}
	.date-guarantee p {
		color: #546e7a;
	}
	.date-guarantee span {
		color: #90a4ae;
		width: 10%;
		display: inline-block;
	}
	.type {
		width: 10%;
	}
	.price {
		width: 10%;
	}
	.price p:first-of-type {
		color: #90a4ae;
		font-size: 14px;
	}
	.price p:last-of-type {
		color: #546e7a;
	}
	.price p:last-of-type span {
		font-size: 12px;
	}
	.order {
		width: 15%;
		text-decoration: underline;
		color: #546e7a;
	}
	.date-added {
		width: 10%;
		text-align: center;
	}
	.date-added p:first-of-type {
		color: #90a4ae;
		font-size: 14px;
	}
	.date-added p:last-of-type {
		color: #546e7a;
	}
	.delete-product {
		color: #90a4ae;
	}
</style>