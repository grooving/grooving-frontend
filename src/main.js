import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import GSecurity from './security/GSecurity.js'
import store from './store'
import Chat from 'vue-beautiful-chat'


Vue.config.productionTip = false
Vue.config.silent = true
Vue.config.errorHandler = function(err, vm, info) {
  //console.log(`Error: ${err.toString()}\nInfo: ${info}`);
}
Vue.use(BootstrapVue)
Vue.prototype.$gsecurity = GSecurity;
Vue.use(Chat)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

export default Vue