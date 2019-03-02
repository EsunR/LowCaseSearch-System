<template>
  <div id="app">
    <div class="search_box">
      <el-input placeholder="请输入内容" v-model="content">
        <el-select v-model="from" slot="prepend" placeholder="请选择">
          <el-option label="由标题搜索" value="title"></el-option>
          <el-option label="由标题及内容搜索" value="article"></el-option>
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
  margin-top: 20px;
  .search_box {
    .el-select {
      width: 160px;
    }
  }
  .checkbox_title {
    margin-top: 15px;
    font-size: 20px;
    padding-left:15px;
    color: rgba(0, 0, 0, 0.6);
    padding-bottom: 10px;
    border-bottom: 2px dashed #eee;
  }
  .el-checkbox-group {
    margin: 20px 0;
    margin-bottom: 0;
  }
}
</style>
