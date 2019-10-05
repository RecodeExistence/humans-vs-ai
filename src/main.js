import Vue from 'vue'
import App from './App.vue'
<<<<<<< HEAD
=======
import store from './store'
>>>>>>> staging

Vue.config.productionTip = false

new Vue({
<<<<<<< HEAD
  render: h => h(App),
=======
  store,
  render: h => h(App)
>>>>>>> staging
}).$mount('#app')
