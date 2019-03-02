<template>
  <div id="app">
    <div class="search_box">
      <el-input placeholder="请输入内容" v-model="content">
        <el-select v-model="from" slot="prepend" placeholder="请选择">
          <el-option label="由标题搜索" value="title"></el-option>
          <el-option label="由内容搜索" value="article"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search">搜索</el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      from: "title"
    };
  }
};
</script>

<style lang="scss" scoped>
#app {
  background-color: #fff;
  margin: 20px 0;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  .search_box{
    .el-select{
      width: 120px;
    }
  }
}
</style>
