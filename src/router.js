import Vue from 'vue'
import Router from 'vue-router'
import Law from './components/Law.vue'
import Case from './components/Case.vue'

Vue.use(Router)

var router = new Router({
  routes: [
    // path name component
    { path: '/', redirect: '/law' },
    {
      path: '/law',
      name: 'law',
      component: Law
    },
    { path: '/case', name: 'case', component: Case },
  ]
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) {
    next();
  } else {
    window.location.href = '/login.html'
    next();
  }
})

export default router
