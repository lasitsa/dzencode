<template>
	<div class="productInOrder">
		<div class="close-pop-up" v-on:click="closePopUp"><i class="fas fa-times"></i></div>
		<h2 class="order-name">{{ getOrderName }}</h2>
		<div class="add-product">
			<span>+</span>
			<p>Добавить продукт</p>
		</div>
		<div class="product" v-for="item in sortByOrder" v-bind:key="item.id">
			<div class="product-status">
				<span class="new" v-if="item.isNew == 1"></span>
				<span class="repair" v-if="item.isNew == 2"></span>
			</div>
			<div class="product-img">
				<img src="../assets/computer-image.png" alt="product">
			</div>
			<div class="product-name">
				<p class="first-line"> {{ item.title }}</p>
				<p class="second-line">{{ item.serialNumber }}</p>
			</div>
			<div class="newOrRepair">
				<p class="newOrRepair__free" v-if="item.isNew == 1">свободен</p>
				<p v-if="item.isNew == 2">В ремонте</p>
			</div>
			<div class="delete-product">
				<span><i class="fas fa-trash-alt"></i></span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "ProductsInOrder",
		props: ['data_id', 'transDelay'],
		data: function() {
			return {
				dataId: this.data_id
			}
		},
		methods: {
			closePopUp: function() {
				this.$store.dispatch('toggleProductsInOrder');
			}
		},
		computed: {
			sortByOrder: function() {
				let dataid = this.dataId;
				let products = []
				this.$store.state.products.forEach(function(item) {
					if( item.order == dataid) {
						products.push(item)
					}
				})
				return products;		
			},
			getOrderName: function() {
				let dataid = this.dataId;
				let name;
				this.$store.state.orders.forEach(function(item) {
					if (item.id == dataid) {
						name = item.title
					}
				})
				return name;
			}
		}
	}
</script>

<style scoped>
	p {
		margin: 0;
	}
	.productInOrder {
		display: inline-block;
		width: 40%;
		margin-left: 20px;
		vertical-align: top;
		border: 1px solid #cfd8dc;
		border-radius: 8px;
		position: relative;
		transition: all .5s ease;
	}
	.close-pop-up {
		position: absolute;
		top: -18px;
		right: -23px;
		color: grey;
		background: #fff;
		padding: 10px 14px;
		border-radius: 50em;
		box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.13);
		cursor: pointer;
	}
	.order-name {
		margin-left: 35px;
	}
	.product {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #cfd8dc;
		padding: 10px;
	}
	.product:last-of-type {
		border: 0;
	}
	.add-product {
		border-bottom: 1px solid #cfd8dc;
		padding-bottom: 20px;
	}
	.add-product span{
		width: 20px;
		height: 20px;
		line-height: 20px;
		text-align: center;
		color: #fff;
		background: #8bc34a;
		display: inline-block;
		border-radius: 50%;
		margin-left: 35px;
	}
	.add-product p {
		color: #8bc34a;
		display: inline-block;
		margin-left: 10px;
	}
	.product-status {
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 10%;
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
	.product-name {
		width: 45%;
	}
	.newOrRepair {
		width: 20%;
		text-align: center;
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
	.newOrRepair__free {
		color: #cddc39;
	}
	.product-img {
		width: 15%;
		display: flex;
		align-items: center;
	}
	.delete-product {
		width: 10%;
		text-align: right;
	}
</style>