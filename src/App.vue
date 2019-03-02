<template>
  <div id="app">
    <el-container>
      <el-header class="topbar" style="padding: 0px;">
        <topbar></topbar>
      </el-header>

      <el-container class="center">
        <el-header class="search">
          <el-tabs v-model="activeTab" @tab-click="handleClick">
            <el-tab-pane label="法律法规" name="law">
              <law-searchbar></law-searchbar>
            </el-tab-pane>
            <el-tab-pane label="司法案例" name="case">
              <case-searchbar></case-searchbar>
            </el-tab-pane>
          </el-tabs>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <asidebar></asidebar>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import topbar from "./components/subComponents/topbar.vue";
import lawSearchbar from "./components/subComponents/law-searchbar.vue";
import caseSearchbar from "./components/subComponents/case-searchbar.vue";
import asidebar from "./components/subComponents/asidebar.vue";

export default {
  data() {
    return {
      activeTab: "law"
    };
  },
  components: {
    topbar,
    "law-searchbar": lawSearchbar,
    "case-searchbar": caseSearchbar,
    asidebar
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
#app {
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


