import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
import global from './common.vue'

Vue.prototype.COMMON = global

Vue.use(VueAxios, axios);
axios.defaults.baseURL = global.host;


axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(parseInt(dataStr)).format(pattern);
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
