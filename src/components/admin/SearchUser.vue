<template>
  <div
    id="searchuser"
    v-loading.fullscreen.lock="loading"
    element-loading-text="加载数据中"
    class="main_card"
  >
    <div class="search_box">
      <el-input placeholder="请输入内容" v-model="key">
        <el-select v-model="searchWay" slot="prepend" placeholder="请选择">
          <el-option label="按名字搜索" value="name"></el-option>
          <el-option label="按学号/职工号搜索" value="account"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="getSearch">搜索</el-button>
      </el-input>
      <div class="radio_box">
        <el-radio v-model="searchIdentity" label="student">搜索学生</el-radio>
        <el-radio v-model="searchIdentity" label="teacher">搜索教师</el-radio>
      </div>
    </div>

    <div class="user_card" v-for="item in data" :key="item.uid">
      <div class="identity">
        <span>{{item.identity | identity}}</span>
      </div>

      <el-row>
        <el-col :span="12">
          <div class="info">
            <span>姓名</span>
            {{item.name}}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info">
            <span>学号/职工号</span>
            {{item.account}}
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <div class="info">
            <span>邮箱</span>
            {{item.email}}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info">
            <span>电话</span>
            {{item.phone}}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-button
          type="danger"
          style="float: right; margin-top: 20px;"
          @click="deleteUser(item.uid)"
        >删除该用户</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      searchWay: "name",
      searchIdentity: "student",
      key: "",
      data: []
    };
  },
  methods: {
    getSearch() {
      if (this.key == "") {
        this.$message("搜索内容不能为空");
        return;
      }
      this.loading = true;
      this.axios
        .post("/searchUser", {
          searchIdentity: this.searchIdentity,
          searchWay: this.searchWay,
          key: this.key
        })
        .then(res => {
          if (res.data.code == 1) {
            this.data = res.data.data;
            this.loading = false;
            if (res.data.data.length == 0) {
              this.$message("查无此人");
              this.loading = false;
            }
          } else {
            this.$message("搜索失败，查无此人");
            this.loading = false;
          }
        })
        .catch(() => {
          this.$message("与服务器连接失败，请稍候重试");
          this.loading = false;
        });
    },
    deleteUser(id) {
      this.$confirm("您确定要删除该用户吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("/deleteUser?id=" + id)
            .then(res => {
              if (res.data.code == 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.data = [];
              }
            })
            .catch(err => {
              console.log(err);
              this.$message("服务器无法连接");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作已取消"
          });
        });
    }
  },
  filters: {
    identity(value) {
      switch (value) {
        case "teacher":
          return "教师";
        case "student":
          return "学生";
        case "admin":
          return "管理员";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#searchuser {
  margin-bottom: 40px;
  margin-top: 0;
  .search_box {
    .el-select {
      width: 170px;
    }
    .radio_box {
      margin: 0 auto;
      margin-top: 20px;
      width: 190px;
    }
  }
  .user_card {
    color: rgba(0, 0, 0, 0.8);
    margin-top: 30px;
    padding: 0 10px;
    .identity {
      height: 2rem;
      span {
        background-color: #f56c6c;
        padding: 5px 10px;
        color: white;
        border-radius: 5px;
      }
    }
    .info {
      line-height: 2.5rem;
      color: rgba(0, 0, 0, 0.7);
      span {
        background-color: #ebeef5;
        padding: 5px 10px;
        border-radius: 5px;
      }
    }
    .subtitle {
      margin: 1rem 0;
      span {
        background-color: #e6a23c;
        padding: 5px 10px;
        color: white;
        border-radius: 5px;
      }
    }
    .feedback {
      border-radius: 5px;
      padding: 10px 15px;
      line-height: 1.7;
      margin-bottom: 10px;
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
}
</style>
