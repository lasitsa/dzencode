import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
	state: {
	orders: [
		{
			id: 1,
			title: 'Длинное предлинное длиннючее название прихода',
			date: '2018-09-10 18:55:36',
			description: 'desc'
		},
		{
			id: 2,
			title: 'Длинное название прихода',
			date: '2015-08-15 15:03:12',
			description: 'desc'
		},
		{
			id: 3,
			title: 'Длинное предлинное длиннючее название прихода',
			date: '2016-01-10 13:09:33',
			description: 'desc'
		},
		{
			id: 4,
			title: 'Длинное предлинное название прихода',
			date: '2017-05-1 12:25:43',
			description: 'desc'
		}
	],
	products: [
		{
		id: 1,
		serialNumber: 1234,
		isNew: 1,
		photo: 'computer-image.png',
		title: 'Product Computer 1',
		type: 'Computers',
		specification: 'Specification 1',
		guarantee: {
			start: '2017-06-29 12:09:33',
			end: '2018-06-29 12:09:33'
		},
		price: [
			{value: 100, symbol: 'USD', isDefault: 0},
			{value: 2600, symbol: 'UAH', isDefault: 1}
		],
		order: 1,
		date: '2017-06-29 12:09:33'
		},
		{
		id: 2,
		serialNumber: 1234,
		isNew: 1,
		photo: 'monitor-image.png',
		title: 'Product Monitor 1',
		type: 'Monitors',
		specification: 'Specification 1',
		guarantee: {
			start: '2017-06-29 12:09:33',
			end: '2018-06-29 12:09:33'
		},
		price: [
			{value: 100, symbol: 'USD', isDefault: 0},
			{value: 2600, symbol: 'UAH', isDefault: 1}
		],
		order: 2,
		date: '2017-06-29 12:09:33'
		},
		{
		id: 3,
		serialNumber: 1234,
		isNew: 2,
		photo: 'monitor-image.png',
		title: 'Product Monitor 2',
		type: 'Monitors',
		specification: 'Specification 1',
		guarantee: {
			start: '2017-06-29 12:09:33',
			end: '2018-06-29 12:09:33'
		},
		price: [
			{value: 100, symbol: 'USD', isDefault: 0},
			{value: 2600, symbol: 'UAH', isDefault: 1}
		],
		order: 2,
		date: '2017-06-29 12:09:33'
		},
		{
		id: 4,
		serialNumber: 1234,
		isNew: 2,
		photo: 'computer-image.png',
		title: 'Product Computer 2',
		type: 'Computers',
		specification: 'Specification 1',
		guarantee: {
			start: '2017-06-29 12:09:33',
			end: '2018-06-29 12:09:33'
		},
		price: [
			{value: 100, symbol: 'USD', isDefault: 0},
			{value: 2600, symbol: 'UAH', isDefault: 1}
		],
		order: 1,
		date: '2017-06-29 12:09:33'
		},
		{
		id: 5,
		serialNumber: 1234,
		isNew: 1,
		photo: 'monitor-image.png',
		title: 'Product Monitor 3',
		type: 'Monitors',
		specification: 'Specification 1',
		guarantee: {
			start: '2017-06-29 12:09:33',
			end: '2018-06-29 12:09:33'
		},
		price: [
			{value: 100, symbol: 'USD', isDefault: 0},
			{value: 2600, symbol: 'UAH', isDefault: 1}
		],
		order: 2,
		date: '2017-06-29 12:09:33'
		},
		{
		id: 6,
		serialNumber: 1234,
		isNew: 1,
		photo: 'monitor-image.png',
		title: 'Product Monitor 4',
		type: 'Monitors',
		specification: 'Specification 1',
		guarantee: {
			start: '2017-06-29 12:09:33',
			end: '2018-06-29 12:09:33'
		},
		price: [
			{value: 100, symbol: 'USD', isDefault: 0},
			{value: 2600, symbol: 'UAH', isDefault: 1}
		],
		order: 2,
		date: '2017-06-29 12:09:33'
		},
		{
		id: 7,
		serialNumber: 1234,
		isNew: 1,
		photo: 'monitor-image.png',
		title: 'Product Monitor 5',
		type: 'Monitors',
		specification: 'Specification 1',
		guarantee: {
			start: '2017-06-29 12:09:33',
			end: '2018-06-29 12:09:33'
		},
		price: [
			{value: 100, symbol: 'USD', isDefault: 0},
			{value: 2600, symbol: 'UAH', isDefault: 1}
		],
		order: 4,
		date: '2017-06-29 12:09:33'
		}
	],
	showDeletePopUp: false,
	productsInOrder: false
	},
	mutations: {
		toggleDeletePopUp (state) {
			state.showDeletePopUp = !state.showDeletePopUp
		},
		toggleProductsInOrder (state) {
			state.productsInOrder = !state.productsInOrder
		},
		deleteOrders (state, id) {
			let ordersQuantity = state.orders.length;
			let currentId = id;
			let forState = state;
			for (let i = 0; i < ordersQuantity; i++) {
				if (forState.orders[i].id == currentId) {
					forState.orders.splice(i, 1);
					break;
				}
			}
			let productsQuantity = state.products.length;
			for (let y = 0; y < productsQuantity; y++) {
				if (forState.products[y].order == currentId) {
					forState.products.splice(y, 1);
				}
			}
		}
	},
	actions: {
	toggleDeletePopUp(context) {
		context.commit('toggleDeletePopUp')
	},
	toggleProductsInOrder(context) {
		context.commit('toggleProductsInOrder')
	}
	}
})
