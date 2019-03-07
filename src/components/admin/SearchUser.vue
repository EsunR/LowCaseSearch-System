<template>
  <div id="searchuser" class="main_card">
    <div class="search_box">
      <el-input placeholder="请输入内容" v-model="key">
        <el-select v-model="searchWay" slot="prepend" placeholder="请选择">
          <el-option label="搜索学生" value="student"></el-option>
          <el-option label="搜索教师" value="teacher"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="getSearch">搜索</el-button>
      </el-input>
    </div>
    <div class="user_card" v-for="item in data" :key="item.uid">
      <div class="identity">
        <span>{{item.identity}}</span>
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
      <div class="subtitle">
        <span>反馈记录</span>
      </div>
      <div class="feedback" v-for="sub in item.feedback" :key="sub.msg">{{sub.msg}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchWay: "student",
      key: "",
      data: [
        {
          uid: "1",
          name: "王大锤",
          identity: "teacher",
          account: "16031210105",
          email: "641411169@qq.com",
          phone: "15670023772",
          loginCount: "12", // 登录次数
          feedback: [
            {
              msg: "这个项目太棒了吧!"
            },
            {
              msg: "this project is so cooooooool!"
            }
          ]
        }
      ]
    };
  },
  methods: {
    getSearch() {
      console.log(1);
    }
  }
};
</script>

<style lang="scss" scoped>
#searchuser {
  margin-top: 0;
  .search_box {
    .el-select {
      width: 110px;
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
      background-color: #ebeef5;
      padding: 10px 15px;
      line-height: 1.7;
      margin-bottom: 10px;
    }
  }
}
</style>
