<template>
  <div class="main">
    <el-row :gutter="20" class="topbar" style="padding-left: 0px">
      <el-col :span="12">
        <div class="grid-content title_box">
          <div class="title">法学案例检索系统</div>
          <span class="identity">{{identity}}</span>
        </div>
      </el-col>
      <el-col :span="1" :xl="6">
        <div class="grid-content null"></div>
      </el-col>
      <el-col :span="4" :xl="2">
        <div class="grid-content topbar_part">
          <div class="item_key">用户</div>
          <span>{{name}}</span>
        </div>
      </el-col>
      <el-col :span="4" :xl="2">
        <div class="grid-content topbar_part">
          <div class="item_key">登录</div>
          <span>{{loginCount}}次</span>
        </div>
      </el-col>
      <el-col :span="3" :md="2">
        <div class="grid-content">
          <el-dropdown @command="selectDropdwon">
            <el-button type="primary">
              更多
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="查看信息">查看信息</el-dropdown-item>
              <el-dropdown-item command="修改密码">修改密码</el-dropdown-item>
              <el-dropdown-item command="用户反馈">用户反馈</el-dropdown-item>
              <el-dropdown-item command="用户注销" style="text-align: center; color: #F56C6C" divided>
                <i class="el-icon-error" style="margin-right: 5px;"></i>退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      identity: "",
      name: "",
      loginCount: ""
    };
  },
  mounted() {
    this.axios
      .get("/getUserInfo")
      .then(res => {
        if (res.data.code == 1) {
          let userInfo = res.data.data;
          delete userInfo[("aud", "exp", "iss", "nbf")];
          this.$store.commit("userInfoInit", userInfo);
          this.identity = this.$store.state.identity + "登录";
          this.name = this.$store.state.name;
          this.loginCount = this.$store.state.loginCount;
        } else {
          window.location.href = this.COMMON.login_location;
        }
      })
      .catch(() => {
        window.location.href = this.COMMON.login_location;
      });
  },
  methods: {
    selectDropdwon(command) {
      switch (command) {
        case "用户注销":
          window.location.href = this.COMMON.login_location;
          break;
        case "查看信息":
          this.$router.push("/userinfo");
          break;
        case "修改密码":
          this.$router.push("/alterpwd");
          break;
        case "用户反馈":
          this.$router.push("/feedback");
          break;
        default:
          console.log("unkonw command: ", command);
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.topbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  padding: 0 20px;
  background-color: #fff;
  .title_box {
    display: flex;
    .title {
      font-size: 1.9rem;
      line-height: 60px;
      color: white;
      background-color: #409eff;
      padding: 0 40px;
      font-weight: lighter;
    }
    .identity {
      background-color: #53a8ff;
      color: white;
      padding: 0 20px;
      line-height: 60px;
    }
  }
  .null {
    height: 1rem;
  }
  .topbar_part {
    height: 60px;
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center;
    .item_key {
      margin-right: 10px;
      color: rgba(0, 0, 0, 0.5);
      font-weight: bold;
    }
    span {
      display: block;
      color: white;
      background-color: #409eff;
      font-weight: 400;
      font-size: 16px;
      padding: 0 15px;
      line-height: 40px;
      border-radius: 3px;
    }
  }
  .grid-content {
    height: 60px;
    display: flex;
    align-items: center;
  }
}
</style>
