<template>
  <el-container>
    <el-aside width="260px">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        :default-openeds="['效力级别','发布部门', '时效性', '法规类别']"
      >
        <el-menu-item index="1" @click="all()">
          <i class="el-icon-tickets"></i>
          <span slot="title">全部</span>
        </el-menu-item>

        <el-submenu index="效力级别" v-show="level.length != 0">
          <template slot="title">
            <i class="el-icon-info"></i>
            <span>效力级别</span>
          </template>
          <el-menu-item-group>
            <!-- 插入 -->
            <el-menu-item
              v-for="item in level"
              :key="item.title"
              :index="item.title"
              @click="itemClick('level', item.title)"
            >{{item.title}}({{item.count}})</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="发布部门">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>发布部门</span>
          </template>
          <el-menu-item-group>
            <!-- 插入 -->
            <el-menu-item
              v-for="item in department"
              :key="item.title"
              :index="item.title"
              @click="itemClick('department', item.title)"
            >{{item.title}}({{item.count}})</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="时效性">
          <template slot="title">
            <i class="el-icon-time"></i>
            <span>时效性</span>
          </template>
          <el-menu-item-group>
            <!-- 插入 -->
            <el-menu-item
              v-for="item in time"
              :key="item.title"
              :index="item.title"
              @click="itemClick('time', item.title)"
            >{{item.title}}({{item.count}})</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="法规类别">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>法规类别</span>
          </template>
          <el-menu-item-group>
            <!-- 插入 -->
            <el-menu-item
              v-for="item in lowSort"
              :key="item.title"
              :index="item.title"
              @click="itemClick('lowSort', item.title)"
            >{{item.title}}({{item.count}})</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      <div class="nav_tag">
        <el-tag
          :key="tag"
          v-for="tag in nav_tag"
          closable
          :disable-transitions="false"
          @close="tagClose(tag)"
        >{{tag}}</el-tag>
      </div>

      <div class="card" v-for="(item, i) in list" :key="item.id">
        <div class="title">
          <i class="el-icon-document"></i>
          {{item.title}}
        </div>

        <div class="summary">
          <strong>摘要：</strong>
          {{item.content | getSummary()}}
        </div>

        <div class="info_box">
          <div class="info">
            <i class="el-icon-edit"></i> 发文字号:
            <span>{{item.number}}</span>
          </div>
          <div class="info">
            <i class="el-icon-time"></i> 时效性:
            <span>
              {{
              judgeTime(item.isInvalid, item.isInvalidPart, item.isAlter, item.carryTime)
              }}
            </span>
          </div>
          <div class="info">
            <i class="el-icon-date"></i> 发布时间:
            <span>{{ item.carryTime|dateFormat('YYYY-MM-DD') }}</span>
          </div>
        </div>

        <el-collapse>
          <el-collapse-item title="查看全文" :name="i">
            <el-card shadow="hover">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="info">
                    <i class="el-icon-caret-right"></i> 效力级别:
                    <span>{{item.level}}</span>
                  </div>
                  <div class="info">
                    <i class="el-icon-caret-right"></i> 发布部门:
                    <span>{{item.department}}</span>
                  </div>
                  <div class="info">
                    <i class="el-icon-caret-right"></i> 法规类别:
                    <span>{{item.lowSort}}</span>
                  </div>
                </el-col>

                <el-col :span="12">
                  <div class="info">
                    <i class="el-icon-caret-right"></i> 归属类别:
                    <span>{{item.filter}}</span>
                  </div>
                  <div class="info">
                    <i class="el-icon-caret-right"></i> 实施时间:
                    <span>{{item.carryTime|dateFormat('YYYY-MM-DD')}}</span>
                  </div>
                </el-col>
              </el-row>
            </el-card>
            <div class="content" v-html="item.content"></div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      level: [],
      department: [],
      time: [],
      lowSort: [],
      list: [],
      nav_tag: ["标签一", "标签二", "标签三"]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    itemClick(part, sort) {
      let obj = {};
      obj[part] = sort;
      this.$store.commit("addLawSearch", obj);
    },
    all() {
      this.$store.commit("clearLawSearchSort");
    },
    judgeTime(isInvalid, isInvalidPart, isAlter, carryTime) {
      if (isInvalid) return "失效";
      if (isInvalidPart) return "部分失效";
      if (isAlter) return "被修改";
      let time;
      Date.parse(new Date()) < carryTime
        ? (time = "尚未生效")
        : (time = "现行有效");
      return time;
    },
    getData() {
      this.axios
        .post("/searchLaw", this.$store.state.lawSearch)
        .then(res => {
          if (res.data.code == 1) {
            this.list = res.data.data.list;
            this.level = res.data.data.bar.level;
            this.department = res.data.data.bar.department;
            this.time = res.data.data.bar.time;
            this.lowSort = res.data.data.bar.lowSort;
          } else {
            this.$message(res.data.msg);
          }
        })
        .catch(() => {
          this.$message("未知错误，无法获取内容，请重试！");
        });
    },
    tagClose(tag) {
      this.nav_tag.splice(this.nav_tag.indexOf(tag), 1);
      console.log(tag);
    }
  }
};
</script> 

<style lang="scss" scoped>
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
    .el-tag{
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
    }
    .summary {
      text-indent: 2em;
      margin-top: 1rem;
      line-height: 1.7;
    }
    .info_box {
      color: rgba(0, 0, 0, 0.5);
      display: flex;
      line-height: 1.5;
      margin: 1rem 0;
      .info {
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
}
</style>

<style lang="scss">
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
</style>

