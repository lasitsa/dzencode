<template>
  <div id="app">
    <TopMenu/>
    <Navigation/>
    <transition name="fade">
    <router-view/>
    </transition>
  </div>
</template>

<script>
import TopMenu from './components/TopMenu.vue'
import Navigation from './components/NavigationMenu.vue'
import Orders from './components/Orders.vue'
import Products from './components/Products.vue'

export default {
  name: 'app',
  components: {
    TopMenu,
    Navigation,
    Orders,
    Products
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
