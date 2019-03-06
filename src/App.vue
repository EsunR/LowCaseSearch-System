<template>
  <div id="app">
    <el-container>
      <el-header class="topbar" style="padding: 0px;   z-index: 999;">
        <topbar></topbar>
      </el-header>

      <el-container class="center">
        <el-header class="search" v-show="flag">
          <el-tabs v-model="activeTab" @tab-click="handleClick">
            <el-tab-pane label="法律法规" name="law"></el-tab-pane>
            <el-tab-pane label="司法案例" name="case"></el-tab-pane>
            <el-tab-pane v-if="identity == 'teacher'" label="司法案例上传" name="commitcase"></el-tab-pane>
          </el-tabs>
        </el-header>
        <el-container>
          <transition>
            <router-view></router-view>
          </transition>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import topbar from "./components/subComponents/topbar.vue";

export default {
  data() {
    return {
      activeTab: "law",
      flag: true,
      identity: ""
    };
  },
  components: {
    topbar
  },
  mounted() {
    this.chagePaht();
    this.checkIdentity()
  },
  methods: {
    handleClick(tab) {
      switch (tab.name) {
        case "law":
          this.$router.push("/law");
          break;
        case "case":
          this.$router.push("/case");
          break;
        case "commitlaw":
          this.$router.push("/commitlaw");
          break;
        case "commitcase":
          this.$router.push("/commitcase");
          break;
      }
    },
    chagePaht() {
      let path = this.$route.path;
      switch (path) {
        case "/law":
          this.flag = true;
          this.activeTab = "law";
          break;
        case "/case":
          this.flag = true;
          this.activeTab = "case";
          break;
        case "/commitcase":
          this.flag = true;
          this.activeTab = "commitcase";
          break;
        default:
          this.flag = false;
          break;
      }
    },
    checkIdentity() {
      this.axios.get("/getUserInfo").then(res=>{
        if(res.data.code == 1){
          this.identity = res.data.data.identity;
        }
      }).catch((err)=>{
        console.log(err);
        this.$message("读取服务器信息失败，请重新刷新页面")
      })
    }
  },
  watch: {
    $route() {
      this.chagePaht();
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  .v-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }
  .v-enter-active,
  .v-leave-active {
    transition: all 1s ease;
  }
  .topbar {
    position: fixed;
    width: 100%;
  }
  .center {
    width: 1200px;
    margin: 0 auto;
    margin-top: 60px;
  }
  .search {
    height: auto !important;
    background-color: #fff;
    margin: 20px 0;
    padding: 20px 30px;
    padding-bottom: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    border-radius: 5px;
  }
}
</style>

<style>
html {
  height: 100%;
  background-color: #f4f5f5;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>


