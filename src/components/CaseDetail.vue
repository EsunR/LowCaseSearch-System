<template>
  <div class="main_card" v-loading.fullscreen.lock="loading" element-loading-text="加载数据中" id="casedetail">
    <div class="head">
      <el-button type="primary" icon="el-icon-caret-left" @click="$router.go(-1)">返回</el-button>
      <div class="title">{{data.title}}</div>
    </div>
    <hr>
    <div class="body">
      <el-card shadow="hover">
        <div class="info">
          <i class="el-icon-caret-right"></i> 发布时间:
          <span>{{data.commitTime | dateFormat('YYYY-MM-DD')}}</span>
        </div>

        <div class="info">
          <i class="el-icon-caret-right"></i> 归属板块:
          <span>{{data.section}}</span>
        </div>

        <div class="info">
          <i class="el-icon-caret-right"></i> 案由:
          <span>{{data.brief}}</span>
        </div>

        <div class="info">
          <i class="el-icon-caret-right"></i> 案例审理法院:
          <span>{{data.court}}</span>
        </div>

        <div class="info" v-if="data.courtLevel != ''">
          <i class="el-icon-caret-right"></i> 法院级别:
          <span>{{data.courtLevel}}</span>
        </div>

        <div class="info" v-if="data.procedure != ''">
          <i class="el-icon-caret-right"></i> 审理程序:
          <span>{{data.procedure}}</span>
        </div>

        <div class="info" v-if="data.instrument != ''">
          <i class="el-icon-caret-right"></i> 文书类型:
          <span>{{data.instrument}}</span>
        </div>

        <div class="info" v-if="data.topic != ''">
          <i class="el-icon-caret-right"></i> 案例专题:
          <span>{{data.topic}}</span>
        </div>

        <div class="info" v-if="parseInt(data.closingTime) > 1000000000000">
          <i class="el-icon-caret-right"></i> 审结时间:
          <span>{{data.closingTime | dateFormat('YYYY-MM-DD')}}</span>
        </div>
      </el-card>
      <div class="content" v-html="data.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      id: this.$route.params.caseid,
      data: {}
    };
  },
  mounted() {
    this.axios.get('/getCaseDetail?id=' + this.id).then(res=>{
      if(res.data.code == 1){
        this.data = res.data.data;
        this.loading = false;
      }else{
        this.$message("该案例不存在！")
        this.loading = false;
      }
    }).catch(()=>{
      this.$message("暂无法从服务器返回数据，请稍候重试")
      this.loading = false;
    })
  }
};
</script>

<style lang="scss" scoped>
#casedetail {
  margin-bottom: 40px;
  .head {
    display: flex;
    .el-button {
      height: 40px;
    }
    .title {
      font-size: 1.8rem;
      line-height: 40px;
      margin-left: 20px;
      color: rgba(0, 0, 0, 0.8);
    }
  }
  hr {
    margin: 30px -30px;
    opacity: 0.2;
  }
  .body {
    .el-card {
      background-color: rgba(0, 0, 0, 0.02);
      margin-bottom: 20px;
      .el-card__body {
        .info {
          color: rgba(0, 0, 0, 0.5);
          margin: 5px 0;
          font-size: 14px;
          flex-basis: 50%;
          padding-left: 10%;
          box-sizing: border-box;
        }
      }
    }
    .content {
      font-size: 16px;
      line-height: 1.7;
      text-indent: 2em;
      padding: 0 20px;
      text-align: justify;
      color: rgba(0, 0, 0, 0.8);
    }
  }
}
</style>

<style lang="scss">
#casedetail {
  .el-card__body {
    width: 1098px;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>


