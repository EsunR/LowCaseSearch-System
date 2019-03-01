import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
Vue.use(Router)

export default new Router({
  routes: [
    // path name component
    {path: '/', redirect: '/home'},
    {path: '/home', name: 'home', component: Home}
  ]
})
