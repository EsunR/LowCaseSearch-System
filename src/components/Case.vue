<template>
  <el-container v-loading.fullscreen.lock="loading" element-loading-text="加载数据中" id="case">
    <el-header>
      <div class="search_box">
        <el-input placeholder="请输入内容" v-model="key">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="由标题搜索" value="title"></el-option>
            <el-option label="由标题及内容搜索" value="article"></el-option>
          </el-select>
          <el-button @click="search" slot="append" icon="el-icon-search">搜索</el-button>
        </el-input>
        <el-tabs v-model="selectSection" @tab-click="changeSection">
          <el-tab-pane label="案例与裁判文书" name="案例与裁判文书">
            <el-form :model="form1" label-width="80px" label-position="left">
              <el-form-item label="审理程序">
                <el-radio-group v-model="form1.procedure">
                  <el-radio label="全部"></el-radio>
                  <el-radio v-for="item in option.procedure" :key="item" :label="item"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="法院级别">
                <el-radio-group v-model="form1.courtLevel">
                  <el-radio label="全部"></el-radio>
                  <el-radio v-for="item in option.courtLevel" :key="item" :label="item"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="文书">
                <el-radio-group v-model="form1.instrument">
                  <el-radio label="全部"></el-radio>
                  <el-radio v-for="item in option.instrument" :key="item" :label="item"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-button type="primary" @click="submitForm('form1')">筛选</el-button>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="公报案例" name="公报案例">
            <el-form :model="form2" label-width="80px" label-position="left">
              <el-form-item label="审理程序">
                <el-radio-group v-model="form2.procedure">
                  <el-radio label="全部"></el-radio>
                  <el-radio v-for="item in option.procedure" :key="item" :label="item"></el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="法院级别">
                <el-radio-group v-model="form2.courtLevel">
                  <el-radio label="全部"></el-radio>
                  <el-radio v-for="item in option.courtLevel" :key="item" :label="item"></el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="审结日期">
                <el-radio-group v-model="form2.closingTime" style="margin-right: 30px;">
                  <el-radio label="全部"></el-radio>
                  <el-radio label="一月内"></el-radio>
                  <el-radio label="三月内"></el-radio>
                  <el-radio label="半年内"></el-radio>
                  <el-radio label="一年内"></el-radio>
                  <el-radio label="其他"></el-radio>
                </el-radio-group>
                <el-date-picker
                  value-format="timestamp"
                  v-model="closingTime_status.value"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :disabled="closingTime_status.disabled"
                ></el-date-picker>
              </el-form-item>
              <el-button type="primary" @click="submitForm('form2')">筛选</el-button>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="案例要旨" name="案例要旨">
            <el-form :model="form3" label-width="80px" label-position="left">
              <el-form-item label="审理程序">
                <el-radio-group v-model="form3.procedure">
                  <el-radio label="全部"></el-radio>
                  <el-radio v-for="item in option.procedure" :key="item" :label="item"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="法院级别">
                <el-radio-group v-model="form3.courtLevel">
                  <el-radio label="全部"></el-radio>
                  <el-radio v-for="item in option.courtLevel" :key="item" :label="item"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="文书">
                <el-radio-group v-model="form3.instrument">
                  <el-radio label="全部"></el-radio>
                  <el-radio v-for="item in option.instrument" :key="item" :label="item"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-button type="primary" @click="submitForm('form3')">筛选</el-button>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="案例报道" name="案例报道">
            <el-form :model="form4" label-width="80px" label-position="left">
              <el-form-item label="案例专题">
                <el-radio-group v-model="form4.topic">
                  <el-radio label="全部"></el-radio>
                  <el-radio v-for="item in option.topic" :key="item" :label="item"></el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="发布日期">
                <el-radio-group v-model="form4.commitTime" style="margin-right: 30px;">
                  <el-radio label="全部"></el-radio>
                  <el-radio label="一月内"></el-radio>
                  <el-radio label="三月内"></el-radio>
                  <el-radio label="半年内"></el-radio>
                  <el-radio label="一年内"></el-radio>
                  <el-radio label="其他"></el-radio>
                </el-radio-group>
                <el-date-picker
                  value-format="timestamp"
                  v-model="commitTime_status.value"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :disabled="commitTime_status.disabled"
                ></el-date-picker>
              </el-form-item>
              <el-button type="primary" @click="submitForm('form4')">筛选</el-button>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-header>
    <el-container>
      <el-aside width="260px">
        <el-menu
          default-active="1"
          :default-openeds="['案由','案例级别', '案例审理法院']"
          active-text-color="#000000"
        >
          <el-menu-item index="1" @click="all()">
            <i class="el-icon-tickets"></i>
            <span slot="title">全部</span>
          </el-menu-item>

          <el-submenu index="案由">
            <template slot="title">
              <i class="el-icon-info"></i>
              <span>案由</span>
            </template>
            <el-menu-item-group>
              <!-- 插入 -->
              <el-menu-item
                v-for="item in data.side.brief"
                :key="item.title"
                :index="item.title"
                @click="itemClick('brief', item.title)"
              >{{item.title}}({{item.count}})</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="案例级别">
            <template slot="title">
              <i class="el-icon-d-caret"></i>
              <span>案例级别</span>
            </template>
            <el-menu-item-group>
              <!-- 插入 -->
              <el-menu-item
                v-for="item in data.side.caseLevel"
                :key="item.title"
                :index="item.title"
                @click="itemClick('caseLevel', item.title)"
              >{{item.title}}({{item.count}})</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="案例审理法院">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>案例审理法院</span>
            </template>
            <el-menu-item-group>
              <!-- 插入 -->
              <el-menu-item
                v-for="item in data.side.court"
                :key="item.title"
                :index="item.title"
                @click="itemClick('court', item.title)"
              >{{item.title}}({{item.count}})</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="nav_tag">
          <el-tag type="info" v-if="this.nav_tag.length == 0">全部结果</el-tag>
          <el-tag
            :key="i"
            v-for="(tag,i) in nav_tag"
            closable
            :disable-transitions="false"
            @close="tagClose(tag)"
          >{{tag}}</el-tag>
          <el-button
            type="danger"
            size="small"
            plain
            icon="el-icon-delete"
            @click="clearTag"
            v-if="this.nav_tag.length != 0"
          >清空</el-button>
        </div>

        <div class="card" v-for="item in data.article" :key="item.id">
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

        <div class="page_box">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-count="total_page"
            @current-change="pageChange"
            :current-page="parseInt($store.state.caseSearch.page)"
          ></el-pagination>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      key: "",
      select: "title",
      selectSection: this.$store.state.caseSearch.section,
      form1: {
        // 案例与裁判文书
        procedure: "全部",
        courtLevel: "全部",
        instrument: "全部"
      },
      form2: {
        // 公报案例
        procedure: "全部",
        courtLevel: "全部",
        closingTime: "全部"
      },
      form3: {
        // 案例要旨
        procedure: "全部",
        courtLevel: "全部",
        instrument: "全部"
      },
      form4: {
        // 案例报道
        topic: "全部",
        commitTime: "全部"
      },
      option: {
        procedure: [],
        courtLevel: [],
        instrument: [],
        closingTime: [],
        topic: []
      },
      closingTime_status: {
        disabled: true,
        value: []
      },
      commitTime_status: {
        disabled: true,
        value: []
      },
      nav_tag: [],
      loading: false,
      total_page: 1,
      page_list: 15, // 每页展示的数据条数
      data: {
        side: {
          brief: [],
          caseLevel: [],
          court: []
        },
        article: []
      }
    };
  },
  mounted() {
    this.getOption();
    this.getData();
  },
  methods: {
    getData(retention) {
      this.loading = true;
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      if (!retention) {
        this.$store.commit("addCaseSearch", { page: "1" });
      }
      this.axios
        .post("/searchCase", this.$store.state.caseSearch)
        .then(res => {
          if (res.data.code == 1) {
            this.data = res.data.data;
            let total = this.data.total;
            let list = this.page_list;
            if (total < list) {
              this.total_page = 1;
            } else {
              total % list == 0
                ? (this.total_page = total / list)
                : (this.total_page = parseInt(total / list) + 1);
            }
            // 渲染导航标签
            this.nav_tag = [];
            let caseSearch = this.$store.state.caseSearch.sort;
            for (let key in caseSearch) {
              this.nav_tag.push(caseSearch[key]);
            }
            if (this.key != "") {
              this.nav_tag.push("关键词：" + this.key);
            }
            this.loading = false;
          } else {
            this.loading = false;
            this.$message(res.data.msg);
          }
        })
        .catch(() => {
          this.loading = false;
          this.$message("未知错误，无法获取内容，请重试！");
        });
    },
    search() {
      if (this.key == "") {
        this.$message("请输入内容");
        return;
      } else {
        let obj = {
          key: this.key,
          search: this.select
        };
        this.$store.commit("addCaseSearch", obj);
        this.getData();
      }
    },
    itemClick(part, sort) {
      this.$store.commit("addCaseSearchSort", { [part]: sort });
      this.getData();
    },
    changeSection(tab) {
      for (let key in this.form1) {
        this.form1[key] = "全部";
      }
      for (let key in this.form2) {
        this.form2[key] = "全部";
      }
      for (let key in this.form3) {
        this.form3[key] = "全部";
      }
      for (let key in this.form4) {
        this.form4[key] = "全部";
      }
      this.$store.commit("changeSection", tab.name);
      this.getData();
    },
    all() {
      this.$store.commit("clearCaseSearchSort");
      this.getData();
    },
    getOption() {
      for (let key in this.option) {
        this.axios
          .get("/getCaseSort?sort=" + key)
          .then(res => {
            if (res.data.code == 1) {
              this.option[key] = res.data.data.value;
            } else {
              this.$message("选项获取失败，请稍候重试");
            }
          })
          .catch(() => {
            this.$message("选项获取失败，请稍候重试");
          });
      }
    },
    submitForm(form) {
      this.$store.commit("clearCaseSearchTag");
      let form_data = this[form];
      for (let key in form_data) {
        if (form_data[key] != "全部") {
          switch (key) {
            case "closingTime":
              if (form_data[key] == "其他") {
                if (this.closingTime_status.value.length != 0) {
                  this.$store.commit("addCaseSearchTag", {
                    closingTime: this.getRange("closingTime_status")
                  });
                } else {
                  this.$message("请选择审结日期！");
                  return;
                }
              } else {
                this.$store.commit("addCaseSearchTag", {
                  [key]: form_data[key]
                });
              }
              break;
            case "commitTime":
              if (form_data[key] == "其他") {
                if (this.commitTime_status.value.length != 0) {
                  this.$store.commit("addCaseSearchTag", {
                    commitTime: this.getRange("commitTime_status")
                  });
                } else {
                  this.$message("请选择发布日期！");
                  return;
                }
              } else {
                this.$store.commit("addCaseSearchTag", {
                  [key]: form_data[key]
                });
              }
              break;
            default:
              this.$store.commit("addCaseSearchTag", { [key]: form_data[key] });
              break;
          }
        }
      }
      this.getData();
    },
    getRange(timmer) {
      let start = this[timmer].value[0].toString();
      let end = this[timmer].value[1].toString();
      let range = start + "-" + end;
      return range;
    },
    tagClose(tag) {
      // 从数据层删除
      this.nav_tag.splice(this.nav_tag.indexOf(tag), 1);
      let caseSearch = this.$store.state.caseSearch.sort;
      for (let key in caseSearch) {
        if (caseSearch[key] == tag) {
          this.$store.commit("deleteCaseSearch", key);
        }
      }
      if (tag.slice(0, 3) == "关键词") {
        this.$store.commit("deleteCaseSearch", "key");
        this.$store.commit("deleteCaseSearch", "search");
      }
      this.getData();
    },
    clearTag() {
      this.nav_tag = [];
      this.$store.commit("clearCaseSearchSort");
      this.$store.commit("deleteCaseSearch", "key");
      this.$store.commit("deleteCaseSearch", "search");
      this.key = "";
      this.getData();
    },
    pageChange(page) {
      this.$store.commit("addCaseSearch", { page: page.toString() });
      this.getData('retention');
    }
  },
  watch: {
    "form2.closingTime": function(val) {
      if (val == "其他") {
        this.closingTime_status.disabled = false;
      } else {
        this.closingTime_status.disabled = true;
        this.closingTime_status.value = "";
      }
    },
    "form4.commitTime": function(val) {
      if (val == "其他") {
        this.commitTime_status.disabled = false;
      } else {
        this.commitTime_status.disabled = true;
        this.commitTime_status.value = "";
      }
    }
  }
};
</script> 

<style lang="scss" scoped>
.el-header {
  height: auto !important;
  background-color: #fff;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  .search_box {
    .el-select {
      width: 160px;
    }
  }
}
.el-aside {
  .el-menu {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    background: white;
    overflow: hidden;
  }
}
.el-main {
  padding: 0;
  .nav_tag {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    background: white;
    margin-left: 20px;
    margin-bottom: 20px;
    padding: 20px;
    .el-tag {
      margin-right: 20px;
    }
  }
  .card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    background: white;
    margin-left: 20px;
    color: rgba(0, 0, 0, 0.8);
    padding: 40px;
    border-radius: 5px;
    margin-bottom: 20px;
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
      a{
        text-decoration: none;
        color: rgba(0, 0, 0, 0.8);
        &:hover{
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
  .el-collapse-item {
    .el-card {
      background-color: rgba(0, 0, 0, 0.02);
      margin-bottom: 20px;
      .info {
        padding-left: 20%;
        color: rgba(0, 0, 0, 0.5);
      }
    }
    .content {
      font-size: 16px;
      line-height: 1.7;
      text-indent: 2em;
    }
  }
  .page_box {
    display: flex;
    .el-pagination {
      margin: 3rem auto;
    }
  }
}
</style>

<style lang="scss">
#case {
  .el-collapse-item__header {
    display: flex;
    justify-content: center;
    color: #409eff !important;
    font-size: 14px !important;
    i {
      margin: 0;
      color: #409eff;
      font-weight: bold;
    }
  }
  .el-menu-item-group__title {
    display: none !important;
  }

  .el-tabs {
    margin-top: 20px;
    padding: 0 10px;
    button {
      margin-top: -20px;
      float: right;
    }
  }
}
</style>

