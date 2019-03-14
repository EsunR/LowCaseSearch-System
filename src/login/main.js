import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './lib/login.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import global from '../common.vue'

Vue.prototype.COMMON = global



Vue.use(VueAxios, axios);

axios.defaults.baseURL = global.host;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
Vue.config.productionTip = false