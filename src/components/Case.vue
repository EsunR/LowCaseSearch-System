<template>
  <div>
    <el-container>
      <el-aside width="250px">
        <h1>this is case-aside</h1>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  }
};
</script> 

<style lang="scss" scoped>
</style>
