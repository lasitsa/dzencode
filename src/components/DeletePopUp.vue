<template>
	<div class="delete-pop-up-wrapper">
		<div class="delete-pop-up">
			<div class="close-pop-up" v-on:click="togglePopUp"><i class="fas fa-times"></i></div>
			<div class="delete-pop-up__header">Вы уверены что хотите удалить этот приход?</div>
			<div class="product-to-delete">
				<div class="product-status">
					<span></span>
				</div>
				<div class="product-img">
					<img src="../assets/monitor-image.png" alt="product">
				</div>
				<div class="product-name">
					<p class="first-line">Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3</p>
					<p class="second-line">NS-12.3456789</p>
				</div>
			</div>
			<div class="confirm-section">
				<div class="cancel" v-on:click="togglePopUp">Отменить</div>
				<div class="delete" v-bind:data-delete_id="data_id" v-on:click="deleteOrder"><span><i class="fas fa-trash-alt"></i></span>Удалить</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "DeletePopUp",
	props: ['data_id'],
	data: function() {
		return {
			dataid: this.data_id
		}
	},
	methods: {
		togglePopUp: function() {
			this.$store.dispatch('toggleDeletePopUp');
		},
		deleteOrder: function() {
			this.togglePopUp()
			let currentId = this.dataid
			this.$store.commit('deleteOrders', currentId)
			console.log(this.$store.state.products)
			console.log(this.$store.state.orders)
		}
	}
}

</script>

<style scoped>
	p {
		margin: 0;
	}
	.delete-pop-up-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		width: 100%;
		min-height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.delete-pop-up {
		width: 790px;
		background: #fff;
		border-radius: 5px;
		position: relative;
	}
	.close-pop-up {
		position: absolute;
		top: -18px;
		right: -23px;
		color: grey;
		background: #fff;
		padding: 10px 14px;
		border-radius: 50em;
		box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.13);
		cursor: pointer;
	}
	.delete-pop-up__header {
		padding: 30px 0 40px 35px;
		border-bottom: 1px solid #000;
		font-weight: 600;
	}
	.product-to-delete {
		display: flex;
		padding: 10px 0;
	}
	.product-status {
		width: 10%;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.product-status span {
		width: 10px;
		height: 10px;
		background: #8ac24a;
		display: inline-block;
		border-radius: 10px;
	}
	.product-img {
		width: 15%;
		display: flex;
		align-items: center;
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
	.confirm-section {
		background: #87bf48;
		height: 110px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 14px;
	}
	.confirm-section .delete {
		color: #e8364f;
		font-weight: 600;
		margin-right: 35px;
		margin-left: 30px;
		background: #fff;
		width: 175px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		border-radius: 25px;
		cursor: pointer;
	}
	.confirm-section .delete span {
		margin-right: 10px;
		font-size: 13px;
	}
	.confirm-section .cancel {
		text-transform: uppercase;
		color: #fff;
		letter-spacing: 0.07em;
		font-weight: 600;
		cursor: pointer;
	}
</style>