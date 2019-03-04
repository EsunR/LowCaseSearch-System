<template>
  <div id="app">
    <div class="search_box">
      <el-input placeholder="请输入内容" v-model="key">
        <el-select v-model="search" slot="prepend" placeholder="请选择">
          <el-option label="由标题搜索" value="1"></el-option>
          <el-option label="由标题及内容搜索" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="getSearch">搜索</el-button>
      </el-input>
    </div>
    <div class="checkbox_box">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >全选</el-checkbox>
      <el-checkbox-group v-model="checkedFilter" @change="changeOption">
        <el-checkbox v-for="item in filter" :label="item" :key="item">{{item}}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
const filterOptions = [
  "中央法规司法解释",
  "外国法律法规",
  "地方法规规章",
  "立法背景资料",
  "中外条约",
  "港澳法律法规",
  "台湾法律法规"
];
export default {
  data() {
    return {
      checkAll: false,
      isIndeterminate: false,
      search: "1",
      key: "",
      filter: filterOptions,
      checkedFilter: []
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedFilter = val ? filterOptions : [];
      this.isIndeterminate = false;
    },
    changeOption(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.filter.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.filter.length;
    },
    getSearch() {
      let obj = {
        search: this.search,
        key: this.key,
        filter: this.checkedFilter
      };
      this.$store.commit("addLawSearch", obj);
      if (obj.filter == 0) {
        this.$store.commit("deleteLawSearch", "filter");
      }
      this.$emit("clickSearch");
      this.$store.commit("addLawSearch", { page: 1 });
    }
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
  .checkbox_box {
    display: flex;
    border-top: 2px dashed #eee;
    margin-top: 20px;
    .el-checkbox {
      margin: 20px 0;
      margin-bottom: 0;
      margin-right: 30px;
    }
  }
}
</style>
