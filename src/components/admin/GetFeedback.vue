<template>
  <div id="getFeedback">
    <div class="feedback_card" v-for="item in data" :key="item.id">
      <div class="feedbackMsg">反馈信息：{{item.feedbackMsg}}</div>
      <hr>
      <div class="account">来自账号：{{item.account}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          feedbackMsg: "反馈信息",
          account: "16031210105"
        },
        {
          id: 2,
          feedbackMsg: "反馈信息",
          account: "16031210105"
        }
      ]
    };
  },
  methods: {
    // TODO: 获取反馈
    getData() {
      this.axios
        .get("/getFeedback")
        .then(res => {
          if (res.data.code == 1) {
            this.data = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("获取反馈失败，服务器无法连接");
        });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang='scss' scoped>
#getFeedback {
  color: rgba($color: #000000, $alpha: 0.8);
  width: 100%;
  .feedback_card {
    background-color: #fff;
    width: 100%;
    margin-bottom: 20px;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    .feedbackMsg {
      font-size: 18px;
      line-height: 1.7;
    }
    hr {
      margin: 15px 0;
      opacity: 0.3;
    }
    .account {
      font-size: 14px;
    }
  }
}
</style>