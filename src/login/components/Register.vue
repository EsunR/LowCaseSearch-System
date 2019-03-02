<template>
  <div class="reg">
    <div id="right_title">用户注册</div>
    <div id="right_subtitle">USER REGISTER</div>

    <el-form
      :model="regform"
      status-icon
      :rules="rules"
      ref="regform"
      class="regform"
      label-position="top"
      size="mini"
    >
      <el-form-item label="学号/职工号" prop="account">
        <el-input v-model.number="regform.account"></el-input>
      </el-form-item>

      <el-row class="reg_row">
        <el-col :span="12">
          <el-form-item label="姓名" prop="name" class="reg_row_left">
            <el-input v-model.number="regform.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="选择登录身份" class="option" required>
            <el-select v-model="regform.identity" style="width: 100%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="reg_row">
        <el-col :span="12">
          <el-form-item label="手机号" prop="phone" class="reg_row_left">
            <el-input v-model.number="regform.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email" class="reg_row_right">
            <el-input v-model="regform.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="密码" prop="pass" required>
        <el-input type="password" v-model="regform.pass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPass" required>
        <el-input type="password" v-model="regform.checkPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item class="btn_box">
        <el-button class="btn" type="primary" @click="submitForm('regform')">确定注册</el-button>
        <el-button class="btn" @click="resetForm('regform')">重置</el-button>
      </el-form-item>

      <router-link to="/login" class="to_register">返回登录账号</router-link>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.regform.checkPass !== "") {
          this.$refs.regform.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.regform.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      regform: {
        account: "",
        name: "",
        identity: "student",
        phone: "",
        email: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        account: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { type: "number", message: "输入内容必须为数字", trigger: "blur" }
        ],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        phone: [
          { required: true, message: "请输入内容", trigger: "blur" },
          {
            pattern: /^[1][0-9]{10}$/,
            message: "手机号码必须为11纯数字",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "请输入内容", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入内容",
            trigger: ["blur", "change"]
          },
          {
            pattern: /^[\u4E00-\u9FA5]{2,4}$/,
            message: "请正确输入中文姓名",
            trigger: ["blur", "change"]
          }
        ]
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
      ]
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("commitReg", {
              account: this.regform.account.toString(),
              name: this.regform.name,
              identity: this.regform.identity,
              phone: this.regform.phone,
              email: this.regform.email,
              password: this.regform.pass
            })
            .then(res => {
              if (res.data.code == true) {
                this.$message({
                  message: "注册成功，请登录！",
                  type: "success",
                  center: true,
                });
                this.$router.push({ path: "/login" });
              } else {
                this.$message(res.data.msg);
              }
            })
            .catch(err => {
              console.log(err);
              this.$message("未知错误，请重试！");
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
.btn_box {
  margin-top: 2rem;
  text-align: center;
  .btn {
    width: 48.5%;
    padding: 12px 20px;
    font-size: 14px;
  }
}

.to_register {
  font-size: 1rem;
  display: block;
  text-align: center;
  // text-decoration: none;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 25px;
}
</style>

<style lang="scss">
.regform {
  .el-form-item__label {
    padding: 0 !important;
  }
  .reg_row {
    .reg_row_left {
      padding-right: 5px;
    }
    .reg_row_right {
      padding-left: 5px;
    }
    .option {
      margin-left: 5px;
    }
  }
}
</style>
