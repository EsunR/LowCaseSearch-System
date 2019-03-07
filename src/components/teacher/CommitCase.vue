<template>
  <div id="commit_law" v-loading.fullscreen.lock="loading" element-loading-text="加载数据中">
    <el-form
      :model="ruleForm"
      :rules="rule"
      ref="ruleForm"
      label-width="120px"
      label-position="right"
      v-show="identity == 'teacher'"
    >
      <el-form-item label="所属板块" prop="section">
        <el-select v-model="ruleForm.section" placeholder="请选择">
          <el-option label v-for="item in option.section" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="案例标题" prop="title">
        <el-input v-model="ruleForm.title" style="width: 977px"></el-input>
      </el-form-item>

      <el-row>
        <el-col :span="8">
          <el-form-item label="案由" prop="brief">
            <el-select v-model="ruleForm.brief" placeholder="请选择">
              <el-option label v-for="item in option.brief" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案例级别" prop="caseLevel">
            <el-select v-model="ruleForm.caseLevel" placeholder="请选择">
              <el-option label v-for="item in option.caseLevel" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案例审理法院" prop="court">
            <el-select v-model="ruleForm.court" placeholder="请选择">
              <el-option label v-for="item in option.court" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 以下为动态判断项 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="审理程序" prop="procedure">
            <el-select
              v-model="ruleForm.procedure"
              placeholder="请选择"
              :disabled="disabled.procedure"
            >
              <el-option label v-for="item in option.procedure" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法院级别" prop="courtLevel">
            <el-select
              v-model="ruleForm.courtLevel"
              placeholder="请选择"
              :disabled="disabled.courtLevel"
            >
              <el-option label v-for="item in option.courtLevel" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="文书类型" prop="instrument">
            <el-select
              v-model="ruleForm.instrument"
              placeholder="请选择"
              :disabled="disabled.instrument"
            >
              <el-option label v-for="item in option.instrument" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="审结时间" prop="closingTime">
            <el-date-picker
              v-model="ruleForm.closingTime"
              type="date"
              value-format="timestamp"
              placeholder="选择日期"
              :disabled="disabled.closingTime"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案例专题" prop="topic">
            <el-select v-model="ruleForm.topic" placeholder="请选择" :disabled="disabled.topic">
              <el-option label v-for="item in option.topic" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="editor_title">
        <span>*</span>文本内容
      </div>
      <div id="editor2" ref="editor2"></div>

      <div class="btn_box">
        <el-button type="primary" @click="commitCase">上传司法案例</el-button>
        <router-link to="/" style="margin-left: 10px">
          <el-button>返回首页</el-button>
        </router-link>
      </div>
    </el-form>
    <h5 v-show="identity != 'teacher'">您的身份不符</h5>
  </div>
</template>

<script>
import E from "wangeditor";
// 创建编辑器
var editor = new E("#editor2");

export default {
  data() {
    return {
      ruleForm: {
        section: "",
        title: "",
        brief: "", // 案由
        caseLevel: "", // 案例级别
        court: "", // 案件审理法院
        procedure: "", //审理程序筛选
        courtLevel: "", //法院级别筛选
        instrument: "", //文书类型
        closingTime: "",
        topic: "",
        content: ""
      },
      rule: {
        section: [
          { required: true, message: "请选择相应选项", trigger: "change" }
        ],
        title: [{ required: true, message: "请填写标题", trigger: "change" }],
        brief: [
          { required: true, message: "请选择相应选项", trigger: "change" }
        ],
        caseLevel: [
          { required: true, message: "请选择相应选项", trigger: "change" }
        ],
        court: [
          { required: true, message: "请选择相应选项", trigger: "change" }
        ],
        procedure: [],
        courtLevel: [],
        instrument: [],
        closingTime: [],
        topic: []
      },
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
      disabled: {
        procedure: true, //审理程序筛选
        courtLevel: true, //法院级别筛选
        instrument: true, //文书类型
        closingTime: true,
        topic: true
      },
      identity: "",
      loading: true
    };
  },
  mounted() {
    // 动态生成下拉菜单
    this.getOption();
    this.checkIdentity();
  },
  methods: {
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
    commitCase() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.content = editor.txt.html();
          if (this.content == "<p><br></p>") {
            this.$message("请输入文本内容！");
            return;
          } else {
            let data = this.ruleForm;
            let obj = {
              uid: this.$store.state.userid,
              account: this.$store.state.account,
              name: this.$store.state.name,
              title: data.title,
              section: data.section,
              sort: {
                brief: data.brief,
                caseLevel: data.caseLevel,
                court: data.court
              },
              tag: {
                procedure: data.procedure,
                courtLevel: data.courtLevel,
                instrument: data.instrument,
                closingTime: parseInt(data.closingTime).toString(),
                topic: data.topic
              },
              content: this.content,
              commitTime: (Date.parse(new Date())).toString()
            };
            if (obj.tag.closingTime == "NaN"){
              obj.tag.closingTime = ""
            } 
            this.$confirm("您确定要上传该司法案例吗?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })

              .then(() => {
                this.axios
                  .post("/commitCase", obj)
                  .then(res => {
                    if (res.data.code == 1) {
                      this.$message("提交成功，已返回主页");
                      this.$router.push("/");
                    } else {
                      this.$message("提交失败，请稍候重试");
                    }
                  })
                  .catch(err => {
                    console.log(err);
                    this.$message("与服务器连接失败，请稍候重试");
                  });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消上传"
                });
              });
          }
        } else {
          this.$message("请验证信息是否完善");
          return;
        }
      });
    },
    inintOptions() {
      // 重置验证规则
      this.rule.procedure = [];
      this.rule.courtLevel = [];
      this.rule.instrument = [];
      this.rule.closingTime = [];
      this.rule.topic = [];

      // 重置数据
      this.ruleForm.procedure = ""; //审理程序筛选
      this.ruleForm.courtLevel = ""; //法院级别筛选
      this.ruleForm.instrument = ""; //文书类型
      this.ruleForm.closingTime = "";
      this.ruleForm.topic = "";

      // 重置禁用项
      this.disabled = {
        procedure: true, //审理程序筛选
        courtLevel: true, //法院级别筛选
        instrument: true, //文书类型
        closingTime: true,
        topic: true
      };
    },
    checkIdentity() {
      this.axios
        .get("/getUserInfo")
        .then(res => {
          if (res.data.code == 1) {
            this.identity = res.data.data.identity;
            if (this.identity == "teacher") {
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
            }
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("读取服务器信息失败，请重新刷新页面");
        });
    }
  },
  watch: {
    "ruleForm.section": function(val) {
      switch (val) {
        case "案例与裁判文书":
          this.inintOptions();
          this.disabled.procedure = false;
          this.disabled.courtLevel = false;
          this.disabled.instrument = false;
          this.rule.procedure = [
            { required: true, message: "请选择相应选项", trigger: "change" }
          ];
          this.rule.courtLevel = [
            { required: true, message: "请选择相应选项", trigger: "change" }
          ];
          this.rule.instrument = [
            { required: true, message: "请选择相应选项", trigger: "change" }
          ];
          break;
        case "公报案例":
          this.inintOptions();
          this.disabled.procedure = false;
          this.disabled.courtLevel = false;
          this.disabled.closingTime = false;
          this.rule.procedure = [
            { required: true, message: "请选择相应选项", trigger: "change" }
          ];
          this.rule.courtLevel = [
            { required: true, message: "请选择相应选项", trigger: "change" }
          ];
          this.rule.closingTime = [
            {
              type: "date",
              required: true,
              message: "请选择日期",
              trigger: "change"
            }
          ];
          break;
        case "案例要旨":
          this.inintOptions();
          this.disabled.procedure = false;
          this.disabled.courtLevel = false;
          this.disabled.instrument = false;
          this.rule.procedure = [
            { required: true, message: "请选择相应选项", trigger: "blur" }
          ];
          this.rule.courtLevel = [
            { required: true, message: "请选择相应选项", trigger: "blur" }
          ];
          this.rule.instrument = [
            { required: true, message: "请选择相应选项", trigger: "blur" }
          ];
          break;
        case "案例报道":
          this.inintOptions();
          this.disabled.topic = false;
          this.rule.topic = [
            { required: true, message: "请选择相应选项", trigger: "blur" }
          ];
          break;
        default:
          console.log("default");
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#commit_law {
  background-color: #fff;
  width: 100%;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  margin-bottom: 40px;
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
    #editor2 {
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
}
</style>

<style>
#commit_law .el-select-dropdown__item {
  z-index: 99;
}
</style>
