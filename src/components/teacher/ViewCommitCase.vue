<template>
  <div
    class="main_card"
    id="viewcommitcase"
    v-loading.fullscreen.lock="loading"
    element-loading-text="加载数据中"
  >
    <el-button-group>
      <el-button type="primary" @click="section = '案例与裁判文书'">案例与裁判文书</el-button>
      <el-button type="primary" @click="section = '公报案例'">公报案例</el-button>
      <el-button type="primary" @click="section = '案例要旨'">案例要旨</el-button>
      <el-button type="primary" @click="section = '案例报道'">案例报道</el-button>
    </el-button-group>
    <div class="main_title">
      关于
      <strong>{{this.section}}</strong>
      的查看结果，共{{this.data.total}}条：
    </div>
    <div class="main">
      <el-card class="card" shadow="hover" v-for="item in data.article" :key="item.id">
        <div class="left">
          <div class="title">
            <i class="el-icon-document"></i>
            <router-link :to="{ name: 'casedetail', params: { caseid: item.id }}">{{item.title}}</router-link>
          </div>
          <div class="info_box">
            <div class="info">
              <i class="el-icon-info"></i> 案由:
              <span>{{item.brief}}</span>
            </div>

            <div class="info">
              <i class="el-icon-d-caret"></i> 案例等级:
              <span>{{item.caseLevel}}</span>
            </div>

            <div class="info">
              <i class="el-icon-location"></i> 案例审理法院:
              <span>{{item.court}}</span>
            </div>

            <div class="info">
              <i class="el-icon-date"></i> 发布时间:
              <span>{{ item.commitTime|dateFormat('YYYY-MM-DD') }}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <el-button-group>
            <el-button type="warning" @click="alterCase(item.id)" icon="el-icon-edit">修改</el-button>
            <el-button type="danger" @click="deleteCase(item.id)" icon="el-icon-delete">删除</el-button>
          </el-button-group>
        </div>
      </el-card>
      <div class="page_box">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="data.total"
          :page-size="size"
          @current-change="pageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      page: 1,
      section: "案例与裁判文书",
      data: {},
      size: 15 // 每页展示多少条数据
    };
  },
  methods: {
    alterCase(id) {
      this.$router.push("/altercase/" + id);
    },
    deleteCase(id) {
      this.$confirm("您确定要删除该司法案例吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.axios
          .get("/deleteCase?id=" + id)
          .then(res => {
            if (res.data.code == 1) {
              this.$message("删除成功");
              this.getData();
            } else {
              this.$message("删除失败");
            }
          })
          .catch(() => {
            this.$message("与服务器连接失败，请稍候重试");
          });
      });
    },
    getData(keep_page) {
      this.loading = true;
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      if (!keep_page) {
        this.page = 1;
      }
      this.axios
        .post("/getCommitCase", {
          page: this.page,
          section: this.section
        })
        .then(res => {
          if (res.data.code == 1) {
            this.data = res.data.data;
            this.loading = false;
          } else {
            this.$message("数据获取失败");
          }
        })
        .catch(() => {
          this.$message("从服务器获取数据失败，请稍候重试");
        });
    },
    pageChange(page) {
      this.page = page;
      this.getData("keep_page");
    }
  },
  mounted() {
    this.axios
      .get("/getUserInfo")
      .then(res => {
        if (res.data.code == 1) {
          if (res.data.data.identity != "teacher") {
            this.$router.push("/");
            this.$message("身份验证失败，您不能进入该页面");
          }
        } else {
          this.$router.push("/");
          this.$message("身份验证失败，您不能进入该页面");
        }
      })
      .catch(() => {
        this.$router.push("/");
        this.$message("身份验证失败，您不能进入该页面");
      });
    this.getData();
  },
  watch: {
    section: function() {
      this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
#viewcommitcase {
  margin-top: 0px;
  .main_title {
    margin-top: 20px;
    color: rgba(0, 0, 0, 0.8);
    padding-left: 10px;
  }
  .main {
    margin-top: 20px;
    .card {
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.02);
      color: rgba(0, 0, 0, 0.8);
      border-radius: 5px;
      margin-bottom: 20px;
      .left {
        flex-basis: 920px;
        .title {
          i {
            color: #409eff;
            font-weight: bold;
            margin-right: 10px;
          }
          line-height: 1.7;
          margin-bottom: 5px;
          font-size: 20px;
          font-weight: 600;
          a {
            text-decoration: none;
            color: rgba(0, 0, 0, 0.8);
            &:hover {
              color: #409eff;
            }
          }
        }
        .summary {
          margin-top: 1rem;
          line-height: 1.7;
          color: rgba(0, 0, 0, 0.5);
          font-size: 14px;
        }
        .info_box {
          color: rgba(0, 0, 0, 0.5);
          display: flex;
          line-height: 1.5;
          margin: 1rem 0;
          margin-bottom: 0;
          .info {
            font-size: 14px;
            margin-right: 2rem !important;
          }
        }
      }
    }
    .page_box {
      display: flex;
      .el-pagination {
        margin: 0 auto;
        margin-top: 20px;
      }
    }
  }
}
</style>

<style lang="scss">
#viewcommitcase {
  .el-card__body {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
}
</style>