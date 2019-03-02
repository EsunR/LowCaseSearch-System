import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userid: "",
    account: "",
    name: "",
    identity: "",
    email: "",
    phone: "",
    loginCount: ""
  },
  mutations: {
    // 初始化vuex中的数据方便调用
    userInfoInit(state, data) {
      state.userid = data.userid;
      state.account = data.account;
      state.name = data.name;
      state.email = data.email;
      state.phone = data.phone;
      state.loginCount = data.loginCount;
      switch (data.identity) {
        case "student":
          state.identity = "学生";
          break;
        case "teacher":
          state.identity = "教师";
          break;
        case "admin":
          state.identity = "管理员";
          break;
        default:
          state.identity = "未知";
          window.location.href = "/login.html";
      }
    }
  },
  actions: {

  }
})
