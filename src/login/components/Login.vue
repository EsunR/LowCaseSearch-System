<template>
  <div>
    <div id="right_title">用户登录</div>
    <div id="right_subtitle">USER LOGIN</div>

    <el-form
      :model="loginform"
      status-icon
      :rules="rules"
      ref="loginform"
      class="demo-ruleForm"
      hide-required-asterisk
      label-position="top"
    >
      <el-form-item label="学号/工号" prop="account">
        <div class="show_name">{{name}}</div>
        <el-input v-model.number="loginform.account" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="loginform.pass" autocomplete="off" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="选择登录身份">
        <el-select v-model="loginform.identity" style="width: 100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="btn_box">
        <el-button class="btn" type="primary" @click="submitForm('loginform')">登录</el-button>
        <el-button class="btn" @click="resetForm('loginform')">重置</el-button>
      </el-form-item>
    </el-form>

    <router-link to="/register" class="to_register">点击注册账号</router-link>
  </div>
</template>

<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      this.name = "";
      if (!value) {
        return callback(new Error("学号/工号不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          this.axios
            .get("getName?account=" + value)
            .then(res => {
              if (res.data) {
                this.name = res.data;
                callback();
              } else {
                callback(new Error("用户不存在"));
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      }, 1000);
    };
    return {
      loginform: {
        account: "",
        pass: "",
        identity: "student"
      },
      rules: {
        account: [{ validator: checkAge, trigger: "blur" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      options: [
        {
          value: "student",
          label: "学生"
        },
        {
          value: "teacher",
          label: "教师"
        },
        {
          value: "admin",
          label: "管理员"
        }
      ],
      name: ""
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("login", {
              account: this.loginform.account,
              passWord: this.loginform.pass,
              identity: this.loginform.identity
            })
            .then(res => {
              // 16031210207
              console.log(res);
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.name = "";
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 2rem;
  .btn_box {
    margin-top: 2rem;
    text-align: center;
    .btn {
      width: 48.5%;
    }
  }
}
.to_register {
  font-size: 1rem;
  display: block;
  text-align: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 3rem;
}
.show_name {
  padding: 0px 15px;
  background: #67c23a;
  position: absolute;
  z-index: 99;
  right: 0px;
  color: white;
  border-radius: 0 4px 4px 0;
}
</style>
