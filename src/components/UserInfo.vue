<template>
  <div id="user_info">
    <h1>用户信息</h1>
    <el-row type="flex">
      <el-col :span="8" class="left">
        <div class="title">用 户 身 份</div>
        <div class="identity_zh">{{identity}}</div>
        <div class="identity_en" v-if="identity == '学生'">Student</div>
        <div class="identity_en" v-if="identity == '教师'">Teacher</div>
        <div class="identity_en" v-if="identity == '管理员'">Admin</div>
      </el-col>
      <el-col :span="16" class="right">
        <div class="info">
          <div class="title">学号/职工号</div>
          <div class="value">{{account}}</div>
        </div>
        <div class="info">
          <div class="title">姓 名</div>
          <div class="value">{{name}}</div>
        </div>
        <div class="info">
          <div class="title">E-mail</div>
          <div class="value">{{email}}</div>
        </div>
        <div class="info">
          <div class="title">电 话</div>
          <div class="value">{{phone}}</div>
        </div>
        <div class="info">
          <div class="title">登录次数</div>
          <div class="value">{{login_count}}</div>
        </div>
        <div class="info">
          <div class="title">UID</div>
          <div class="value">{{userid}}</div>
        </div>
      </el-col>
    </el-row>
    <div class="btn_box">
      <router-link class="link" to="/alterpwd">
        <el-button type="danger">修改密码</el-button>
      </router-link>
      <router-link class="link" to="/">
        <el-button>返回主页</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: this.$store.state.account,
      email: this.$store.state.email,
      identity: this.$store.state.identity,
      login_count: this.$store.state.loginCount,
      name: this.$store.state.name,
      phone: this.$store.state.phone,
      userid: this.$store.state.userid
    };
  }
};
</script>

<style lang="scss" scoped>
#user_info {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  padding: 40px 150px;
  margin-top: 40px;
  .left {
    margin-right: 40px;
    background-color: #545c64;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    height: 300px;
    overflow: hidden;
    .title {
      background-color: rgb(67, 74, 80);
      color: white;
      font-size: 1.3rem;
      line-height: 3;
      text-align: center;
    }
    .identity_zh {
      text-align: center;
      font-size: 3rem;
      margin-top: 50px;
      color: #ffd04b;
      font-weight: bold;
    }
    .identity_en {
      font-size: 1.7rem;
      text-align: center;
      margin-top: 10px;
      // color: #ffd04b;
      color: #ffd04b;
    }
  }
  .right {
    background-color: #545c64;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    overflow: hidden;
    background-color: #545c64;
    color: white;
    line-height: 50px;
    .info {
      display: flex;
      font-size: 1rem;
      .title {
        background-color: #434a50;
        width: 30%;
        text-align: center;
        box-sizing: border-box;
        letter-spacing: 2px;
      }
      .value {
        padding-left: 20px;
        color: #ffd04b;
        // font-weight: bold;
        letter-spacing: 2px;
      }
    }
  }
  .btn_box {
    display: flex;
    justify-content: center;
    .link {
      display: block;
      margin: 40px 10px;
      margin-bottom: 0;
      width: 98px;
    }
  }
}
</style>