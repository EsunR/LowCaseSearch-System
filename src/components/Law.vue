<template>
  <el-container>
    <el-aside width="250px">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        :default-openeds="['效力级别','发布部门', '时效性', '法规类别']"
      >
        <el-menu-item index="1">
          <i class="el-icon-tickets"></i>
          <span slot="title">全部</span>
        </el-menu-item>

        <el-submenu index="效力级别">
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
            >{{item.title}}({{item.count}})</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      <law-main></law-main>
    </el-main>
  </el-container>
</template>

<script>
import lawMain from "./subComponents/law-main.vue";

export default {
  data() {
    return {
      level: [
        {
          title: "法律",
          count: 10
        },
        {
          title: "行政法规",
          count: 10
        },
        {
          title: "司法解释",
          count: 10
        }
      ],
      department: [
        {
          title: "各部",
          count: 10
        },
        {
          title: "各委",
          count: 10
        },
        {
          title: "各局",
          count: 10
        }
      ],
      time: [
        {
          title: "现行有效",
          count: 10
        },
        {
          title: "尚未有效",
          count: 10
        }
      ],
      lowSort: [
        {
          title: "宪法",
          count: 10
        },
        {
          title: "机关工作",
          count: 10
        }
      ]
    };
  },
  components: {
    "law-main": lawMain
  }
};
</script> 

<style lang="scss" scoped>
</style>

<style>
.el-aside {
  height: auto !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  background: white;
}
</style>

