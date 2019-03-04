import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './lib/login.css'
import axios from 'axios'
import VueAxios from 'vue-axios'



Vue.use(VueAxios, axios);

axios.defaults.baseURL = 'http://47.95.196.58:8080/api/law/';
// axios.defaults.baseURL = 'http://47.103.2.177:8080/api/law';


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
Vue.config.productionTip = false