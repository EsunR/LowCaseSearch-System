import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'

Vue.use(VueAxios, axios);
axios.defaults.baseURL = 'http://47.95.196.58:8080/api/law/';
// axios.defaults.baseURL = 'http://47.103.2.177:8080/api/law';


axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern);
})
Vue.filter('getSummary', function (text) {
  if (text.slice(0, 3) == "<p>") {
    return text.slice(3, 83) + "... ...";
  } else {
    return text.slice(0, 80) + "... ...";
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.config.productionTip = false
