import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'


Vue.use(Router)
var router = new Router({
  routes: [
    // path name component
    {path: '/', redirect: '/login'},
    {path: '/login', name: 'login', component: Login}
  ]
})

export default router
