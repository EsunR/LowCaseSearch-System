<template>
  <div>
    <el-container>
      <el-aside width="250px">
        <h1>this is case-aside</h1>
      </el-aside>
      <el-main>
        <case-main></case-main>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import caseMain from "./subComponents/case-main.vue";


export default {
  data() {
    return {};
  },
  components: {
    "case-main": caseMain
  }
};
</script> 

<style lang="scss" scoped>
</style>
