<template>
	<section class="orders-block">
		<div class="orders-block__header">
			<span>+</span>
			<h1>Приходы / {{ $store.state.orders.length }}</h1>
		</div>
		<div class="orders-block__orders" v-bind:class="{ 'orders-block__orders-min': $store.state.productsInOrder}">
			<div class="order" v-for="item in $store.state.orders" :key="item.id" :data-id="item.id">
				<p class="order__name" v-if="!$store.state.productsInOrder">{{ item.title }}</p>
				<div class="list-icon" v-on:click="toggleProductsInOrder" v-bind:class=" [$store.state.productsInOrder ? 'list-icon-for-min' : '']">
				<span><i class="fas fa-list-ul"></i></span>
				</div>
				<div class="products-quantity" v-bind:class=" [$store.state.productsInOrder ? 'products-quantity-for-min' : '']">
					<p class="products-quantity__number">{{ productsQuantity(item.id) }}</p>
					<p>Продукта</p>
				</div>
				<div class="order-date" v-bind:class=" [$store.state.productsInOrder ? 'order-date-for-min' : '']">
					<p>{{ date(item.date, "short") }}</p>
					<p>{{ date(item.date, "full") }}</p>
				</div>
				<div class="order-price" v-if="!$store.state.productsInOrder">
					<p v-for="price in sumOfPrice(item.id)">{{price.value}} <span>{{price.symbol}}</span></p>
				</div>
				<div class="delete-order" v-on:click="togglePopUp" v-if="!$store.state.productsInOrder">
					<span><i class="fas fa-trash-alt"></i></span>
				</div>
				<div class="active-arrow" v-if="orderId == item.id && $store.state.productsInOrder">
					<p><i class="fas fa-angle-right"></i></p>
				</div>
			</div>
		</div>
		<transition name="fade" 
			v-on:before-enter="beforeEnter"
    		v-on:enter="enter"
    		v-on:leave="leave"
    		v-bind:css="false">
			<ProductsInOrders v-bind:data_id="[orderId]" v-if="$store.state.productsInOrder"></ProductsInOrders>
		</transition>
		<transition name="fade">
			<DeletePopUp v-bind:data_id="orderId" v-if="$store.state.showDeletePopUp"></DeletePopUp>
		</transition>
	</section>
</template>

<script>
	import DeletePopUp from './DeletePopUp.vue'
	import ProductsInOrders from './ProductsInOrders.vue'

	export default {
		components: {
			DeletePopUp,
			ProductsInOrders
		},
		name: "Orders",
		data: function() {
			return {
				orderId: ""
			}
		},
		methods: {
			togglePopUp: function(event) {
				this.$store.dispatch('toggleDeletePopUp');
				this.orderId = event.currentTarget.parentElement.dataset.id;
			},
			toggleProductsInOrder: function(event) {
				this.$store.dispatch('toggleProductsInOrder');
				this.orderId = event.currentTarget.parentElement.dataset.id;
			},
			productsQuantity: function(orderId) {
				let orderid = orderId;
				let productsQuantity = 0;
				this.$store.state.products.forEach(function(item) {
					if (item.order == orderid) {
						productsQuantity++
					}
				})
				return productsQuantity;
			},
			sumOfPrice: function(orderId) {
				let orderid = orderId;
				let price = [
					{value: 0, symbol: '$'},
					{value: 0, symbol: 'UAH'}
				]
				this.$store.state.products.forEach(function(item) {
					if (item.order == orderid) {
						price[0].value += item.price[0].value;
						price[1].value += item.price[1].value;
					}
				})
				return price;
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
			},
			beforeEnter: function (el) {
		      el.style.opacity = 0
		    },
		    enter: function (el, done) {
		      setTimeout(function () {
		        Velocity(
		          el,
		          { opacity: 1},
		          { complete: done }
		        )
		      }, 500)
		    },
		    leave: function (el, done) {
		      setTimeout(function () {
		        Velocity(
		          el,
		          { opacity: 0},
		          { complete: done }
		        )
		      }, 0)
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
	.orders-block__orders {
		display: inline-block;
		width: 80%;
		margin-left: 10%;
		transition: all ease .5s;
	}
	.trans-delay {
		transition-delay: .5s;
	}
	.orders-block__orders-min {
		width: 40%;
	}
	.orders-block {
		display: inline-block;
		width: calc(100% - 200px);
		position: relative;
		vertical-align: top;
		min-height: calc(100vh - 50px);
	}
	.order {
		display: flex;
		direction: column;
		align-items: center;
		border: 1px solid #cfd8dc;
		padding: 10px;
		margin-bottom: 20px;
		border-radius: 8px;
		transition: all ease .5s;
		position: relative;
		overflow: hidden;
	}
	.order:hover {
		box-shadow: 0px 7px 25px 0px rgba(0, 0, 0, 0.13);
	}
	.order__name {
		width: 40%;
		overflow: hidden;
		white-space: nowrap;
		color: #546e7a;
		text-decoration: underline;
		text-overflow: ellipsis;
	}
	.list-icon {
		width: 5%;
		text-align: center;
	}
	.list-icon-for-min {
		width: 15%;
	}
	.list-icon span{
		padding: 10px;
		border: 1px solid #d2dbde;
		border-radius: 100em;
		cursor: pointer;
	}
	.products-quantity {
		width: 10%;
		color: #90a4ae;
	}
	.products-quantity-for-min {
		width: 20%;
	}
	.products-quantity__number {
		font-size: 25px;
		color: #546e7a;
	}
	.order-date {
		width: 20%;
		text-align: center;
	}
	.order-date p:last-of-type {
		color: #546e7a;
	}
	.order-date p:first-of-type {
		font-size: 14px;
		color: #90a4ae;
	}
	.order-date-for-min {
		width: 40%;
	}
	.order-price {
		width: 20%;
		text-align: center;
	}
	.order-price p:first-of-type {
		font-size: 14px;
		color: #90a4ae;
	}
	.order-price p:last-of-type {
		color: #546e7a;
	}
	.order-price p:last-of-type span {
		font-size: 13px;
	}
	.delete-order {
		width: 5%;
		text-align: center;
		color: #90a4ae;
		cursor: pointer;
	}
	.delete-order img {
		cursor: pointer;
	}
	.orders-block__header {
		display: flex;
		margin-bottom: 60px;
		margin-top: 65px;
	}
	.orders-block__header>span {
		display: inline-block;
		margin-left: 10%;
		margin-right: 20px;
		padding: 6px 10px;
		background: #8bc34a;
		border-radius: 50em;
		border: 3px solid #719c4b;
		color: #fff;
	}
	.orders-block__header h1 {
		display: inline-block;
		margin: 0;
	}
	.active-arrow {
		background: #cfd8dc;
		height: 100%;
		position: absolute;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		color: #fff;
		font-size: 20px;
		font-weight: 800;
	}
</style>