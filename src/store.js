import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户基本信息相关
    userid: "",
    account: "",
    name: "",
    identity: "",
    email: "",
    phone: "",
    loginCount: "",

    // 搜索相关
    lawSearch: {
      page: 1
    }
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
    },

    // 法律法规的搜索条件 相关
    addLawSearch(state, obj) {
      for (let key in obj) {
        if (key == "time") {
          switch (obj.time) {
            case "现行有效":
              obj.time = 1;
              break;
            case "尚未生效":
              obj.time = 2;
              break;
            case "失效":
              obj.time = 3;
              break;
            case "部分失效":
              obj.time = 4;
              break;
            case "已被修改":
              obj.time = 5;
              break;
          }
        }
        state.lawSearch[key] = obj[key]
      }
    },
    clearLawSearchSort(state) {
      delete state.lawSearch.level;
      delete state.lawSearch.department;
      delete state.lawSearch.time;
      delete state.lawSearch.lowSort;
    },
    deleteLawSearch(state, condition) {
      delete state.lawSearch[condition];
    },
    clearAllSearch(state){
      state.lawSearch = {};
    }

  },
  actions: {

  }
})
