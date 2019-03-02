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

    <div class="checkbox_title"></div>
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="中央法规司法解释"></el-checkbox>
      <el-checkbox label="外国法律法规"></el-checkbox>
      <el-checkbox label="地方法规规章"></el-checkbox>
      <el-checkbox label="立法背景资料"></el-checkbox>
      <el-checkbox label="中外条约"></el-checkbox>
      <el-checkbox label="港澳法律法规"></el-checkbox>
      <el-checkbox label="台湾法律法规"></el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      from: "title",
      checkList: []
    };
  }
};
</script>

<style lang="scss" scoped>
#app {
  margin-top: 20px;
  .search_box {
    .el-select {
      width: 120px;
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
