import Vue from 'vue'
import Router from 'vue-router'
import Law from './components/Law.vue'
import Case from './components/Case.vue'
import UserInfo from './components/UserInfo.vue'
import Nofound from './components/NoFound.vue'
import AlterPwd from './components/AlterPwd.vue'
import Feedback from './components/Feedback.vue'
import CommitCase from './components/teacher/CommitCase.vue'
import CaseDetail from './components/CaseDetail.vue'
import ViewCommitCase from './components/teacher/ViewCommitCase.vue'
import AlterCase from './components/teacher/AlterCase.vue'
import SearchUser from './components/admin/SearchUser.vue'
import GetFeedback from './components/admin/GetFeedback.vue'




Vue.use(Router)

var router = new Router({
  routes: [
    // path name component
    { path: '*', name: 'nofound', component: Nofound },
    { path: '/', redirect: '/law' },
    {
      path: '/law',
      name: 'law',
      component: Law
    },
    { path: '/case', name: 'case', component: Case },
    { path: '/userinfo', name: 'userinfo', component: UserInfo },
    { path: '/alterpwd', name: 'alterpwd', component: AlterPwd },
    { path: '/commitcase', name: 'commitcase', component: CommitCase },
    { path: '/feedback', name: 'feedback', component: Feedback },
    { path: '/casedetail/:caseid', name:'casedetail', component:  CaseDetail},
    { path: '/viewcommitcase', name:'viewcommitcase', component:  ViewCommitCase},
    { path: '/altercase/:caseid', name:'altercase', component:  AlterCase},
    { path: '/searchuser', name:'searchuser', component:  SearchUser},
    { path: '/getfeedback', name:'getfeedback', component:  GetFeedback}
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
