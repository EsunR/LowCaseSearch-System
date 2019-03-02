<template>
  <div id="app">
    <el-container>
      <el-header class="topbar" style="padding: 0px;">
        <topbar></topbar>
      </el-header>

      <el-container class="center">
        <el-header style="padding: 0px; height: auto; ">
          <searchbar></searchbar>
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
import searchbar from "./components/subComponents/searchbar.vue";
import asidebar from "./components/subComponents/asidebar.vue";

export default {
  components: {
    topbar,
    searchbar,
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


