import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);
axios.defaults.baseURL = 'http://47.95.196.58:8080/api/law/';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.config.productionTip = false
