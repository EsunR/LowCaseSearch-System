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

    // 法律法规搜索相关
    lawSearch: {
      page: 1
    },

    // 司法案例搜索相关
    caseSearch: {
      page: 1,
      section: "案例与裁判文书",
      sort: {},
      tag: {}
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
          window.location.href = this.COMMON.login_location;
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
    clearAllSearch(state) {
      state.lawSearch = {};
    },



    // 法律法规的搜索条件 相关
    addCaseSearchSort(state, obj) {
      for (let key in obj) {
        state.caseSearch.sort[key] = obj[key]
      }
    },
    addCaseSearchTag(state, obj) {
      for (let key in obj) {
        state.caseSearch.tag[key] = obj[key]
      }
    },
    addCaseSearch(state, obj) {
      for (let key in obj) {
        state.caseSearch[key] = obj[key]
      }
    },
    clearCaseSearchSort(state) {
      state.caseSearch.sort = {};
    },
    clearCaseSearchTag(state){
      state.caseSearch.tag = {};
    },
    deleteCaseSearch(state, condition){
      for(let key in state.caseSearch){
        if(key == condition){
          delete state.caseSearch[condition];
          return;
        }
      }
      for(let key in state.caseSearch.sort){
        if(key == condition){
          delete state.caseSearch.sort[condition];
          return;
        }
      }
      for(let key in state.caseSearch.tag){
        if(key == condition){
          delete state.caseSearch.tag[condition];
          return;
        }
      }
    },
    changeSection(state, section){
      state.caseSearch.section = section;
      state.caseSearch.tag = {};
    }


  },
  actions: {

  }
})
