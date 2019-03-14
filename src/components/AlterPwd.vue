<template>
  <div id="alter_pwd">
    <h1>修改密码</h1>
    <el-form
      :model="ruleForm2"
      status-icon
      :rules="rules2"
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="原始密码" prop="oldpwd">
        <el-input v-model.number="ruleForm2.oldpwd" ref="oldpwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" ref="newpwd"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
        <el-button @click="$router.push('/')">返回首页</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("原始密码不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (this.$refs.oldpwd.value == this.$refs.newpwd.value) {
        callback(new Error("新密码不能与原始密码相同！"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: "",
        checkPass: "",
        oldpwd: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        oldpwd: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let oldPwd = this.ruleForm2.oldpwd.toString();
          let newPwd = this.ruleForm2.pass;
          this.axios
            .post("/commitAlterPwd", { oldPwd, newPwd })
            .then(res => {
              if (res.data.code == 1) {
                this.$message("修改成功，正在注销");
                setTimeout(() => {
                  window.location.href = this.COMMON.login_location;
                }, 2000);
              } else {
                this.$message(res.data.msg);
                this.resetForm("ruleForm2");
              }
            })
            .catch(err => {
              console.log(err);
              this.$message("未知错误，请稍候重试");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
#alter_pwd {
  margin-top: 40px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  padding: 40px 150px;
}
</style>
