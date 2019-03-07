<template>
  <div
    id="altercase"
    class="main_card"
    v-loading.fullscreen.lock="loading"
    element-loading-text="加载数据中"
  >
    <el-form :model="data" :rules="rule" ref="data" label-width="120px" label-position="right">
      <el-form-item label="案例标题" prop="title">
        <el-input v-model="data.title" style="width: 977px"></el-input>
      </el-form-item>

      <el-row>
        <el-col :span="8">
          <el-form-item label="案由" prop="brief">
            <el-select v-model="data.brief" placeholder="请选择">
              <el-option label v-for="item in option.brief" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="案例级别" prop="caseLevel">
            <el-select v-model="data.caseLevel" placeholder="请选择">
              <el-option label v-for="item in option.caseLevel" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="案例审理法院" prop="court">
            <el-select v-model="data.court" placeholder="请选择">
              <el-option label v-for="item in option.court" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 以下为动态判断项 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="审理程序" prop="procedure">
            <el-select v-model="data.procedure" placeholder="请选择" :disabled="disabled.procedure">
              <el-option label v-for="item in option.procedure" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="法院级别" prop="courtLevel">
            <el-select v-model="data.courtLevel" placeholder="请选择" :disabled="disabled.courtLevel">
              <el-option label v-for="item in option.courtLevel" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="文书类型" prop="instrument">
            <el-select v-model="data.instrument" placeholder="请选择" :disabled="disabled.instrument">
              <el-option label v-for="item in option.instrument" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="审结时间" prop="closingTime">
            <el-date-picker
              v-model="data.closingTime"
              type="date"
              value-format="timestamp"
              placeholder="选择日期"
              :disabled="disabled.closingTime"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案例专题" prop="topic">
            <el-select v-model="data.topic" placeholder="请选择" :disabled="disabled.topic">
              <el-option label v-for="item in option.topic" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="editor_title">
        <span>*</span>文本内容
      </div>
      <div id="editor3" ref="editor3"></div>

      <div class="btn_box">
        <el-button type="danger" @click="commitCase">提交修改</el-button>
        <el-button style="margin-left: 10px" @click="$router.go(-1)">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import E from "wangeditor";
// 创建编辑器
var editor = new E("#editor3");
export default {
  data() {
    return {
      loading: true,
      id: this.$route.params.caseid,
      data: {},
      option: {
        section: [],
        brief: [],
        caseLevel: [],
        court: [],
        procedure: [],
        courtLevel: [],
        instrument: [],
        topic: []
      },
      rule: {
        section: [
          { required: true, message: "请选择相应选项", trigger: "change" }
        ],
        title: [{ required: true, message: "请填写标题", trigger: "change" }],
        brief: [],
        caseLevel: [],
        court: [],
        procedure: [],
        courtLevel: [],
        instrument: [],
        closingTime: [],
        topic: []
      },
      disabled: {
        procedure: false, //审理程序筛选
        courtLevel: false, //法院级别筛选
        instrument: false, //文书类型
        closingTime: false,
        topic: false
      }
    };
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
    this.getOption();
    // 生成富文本编辑器
    editor.customConfig.menus = [
      "head",
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "foreColor",
      "backColor",
      "link",
      "list",
      "justify"
    ];
    editor.create();
  },
  methods: {
    getData() {
      this.axios
        .get("/getCaseDetail?id=" + this.id)
        .then(res => {
          if (res.data.code == 1) {
            this.data = res.data.data;
            if (parseInt(this.data.closingTime) < 1000000000000) {
              this.data.closingTime = "";
            }
            this.loading = false;
            this.disabledOption();
            editor.txt.html(this.data.content);
          } else {
            this.$message("获取信息失败");
            this.loading = false;
          }
        })
        .catch(() => {
          this.$message("与服务器连接失败，请稍候重试");
          this.loading = false;
        });
    },
    getOption() {
      for (let key in this.option) {
        this.axios
          .get("/getCaseSort?sort=" + key)
          .then(res => {
            this.loading = false;
            if (res.data.code == 1) {
              this.option[key] = res.data.data.value;
            } else {
              this.$message("获取动态列表失败，请重新刷新页面");
            }
          })
          .catch(err => {
            console.log(err);
            this.$message("获取动态列表失败，请重新刷新页面");
          });
      }
    },
    disabledOption() {
      for (let key in this.data) {
        if (this.data[key] == "") {
          this.disabled[key] = true;
        }
      }
    },
    commitCase() {
      this.data.content = editor.txt.html();
      console.log();
      if (this.data.title == "") {
        this.$message("标题不能为空");
        return;
      } else if (this.data.content == "<p><br></p>") {
        this.$message("请输入文本内容！");
        return;
      }
      this.$confirm("您确定要删除该司法案例吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let obj = {
          caseid: this.id.toString(),
          uid: this.$store.state.userid,
          account: this.$store.state.account,
          name: this.$store.state.name,
          title: this.data.title,
          section: this.data.section,
          sort: {
            brief: this.data.brief,
            caseLevel: this.data.caseLevel,
            court: this.data.court
          },
          tag: {
            procedure: this.data.procedure,
            courtLevel: this.data.courtLevel,
            instrument: this.data.instrument,
            closingTime: this.data.closingTime,
            topic: this.data.topic
          },
          content: this.data.content,
          commitTime: this.data.closingTime
        };
        this.axios
          .post("/alterCase", obj)
          .then(res => {
            if (res.data.code == 1) {
              this.$message("更改成功！");
              this.$router.go(-1);
            } else {
              this.$message("更改失败");
            }
          })
          .catch(() => {
            this.$message("与服务器连接失败，请稍候重试");
          });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.back_btn {
  margin-bottom: 20px;
  margin-left: 0px;
}
.el-form {
  .editor_title {
    font-size: 14px;
    margin: 20px 0;
    color: #606266;
    margin-left: 41px;
    span {
      color: red;
      margin-right: 5px;
    }
  }
  #editor3 {
    width: 977px;
    position: relative;
    top: -40px;
    left: 120px;
    z-index: 10;
  }
  .btn_box {
    margin-left: 120px;
  }
}
</style>
