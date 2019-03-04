<template>
  <div class="app">
    <h1>404 NO FOUND</h1>
    <h2>这里什么都没有</h2>
    <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
  </div>
</template>

<style lang="scss" scoped>
.app {
  background-color: #fff;
  width: 100%;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
}
</style>
