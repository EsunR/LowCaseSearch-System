<template>
  <div id="feedback" class="main_card">
    <h1>用户反馈</h1>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      label-position="top"
    >
      <el-form-item label="反馈内容" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" rows="7"></el-input>
      </el-form-item>
      <el-form-item style="margin-top: 40px;">
        <el-button type="primary" @click="submitForm('ruleForm')">提交反馈</el-button>
        <router-link to="/" style="margin-left: 10px">
          <el-button>返回首页</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        desc: ""
      },
      rules: {
        desc: [{ required: true, message: "请填写反馈内容", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/commit", {
              feedbackMsg: this.ruleForm.desc
            })
            .then(res => {
              if (res.data.code == 1) {
                this.ruleForm.desc = "";
                this.$message("提交成功，正在返回主页");
                setTimeout(() => {
                  this.$router.push("/");
                }, 1000);
              } else {
                this.$message("提交失败，请稍候重试");
              }
            })
            .catch(err => {
              console.log(err);
              this.$message("服务器错误，请稍候重试");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>


<style>
.main_card {
  margin-top: 40px;
  background-color: #fff;
  padding: 30px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
}
</style>
