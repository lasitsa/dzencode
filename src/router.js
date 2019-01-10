import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'orders',
      component: () => import('./components/Orders.vue')
    },
    {
      path: '/Products',
      name: 'products',
      component: () => import('./components/Products.vue')
    }
  ]
})
