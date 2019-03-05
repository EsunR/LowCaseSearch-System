<template>
  <div id="commit_law">
    <el-form
      :model="ruleForm"
      :rules="rule"
      ref="ruleForm"
      label-width="120px"
      label-position="right"
    >
      <el-form-item label="所属板块" prop="section" required>
        <el-select v-model="ruleForm.section" placeholder="请选择">
          <el-option label v-for="item in option.section" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="案例标题" prop="title" required>
        <el-input v-model="ruleForm.title" style="width: 977px"></el-input>
      </el-form-item>

      <el-row>
        <el-col :span="8">
          <el-form-item label="案由" prop="brief" required>
            <el-select v-model="ruleForm.brief" placeholder="请选择">
              <el-option label v-for="item in option.brief" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案例级别" prop="caseLevel" required>
            <el-select v-model="ruleForm.caseLevel" placeholder="请选择">
              <el-option label v-for="item in option.caseLevel" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案例审理法院" prop="court" required>
            <el-select v-model="ruleForm.court" placeholder="请选择">
              <el-option label v-for="item in option.court" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="审理程序" prop="procedure" required>
            <el-select v-model="ruleForm.procedure" placeholder="请选择">
              <el-option label v-for="item in option.procedure" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法院级别" prop="courtLevel" required>
            <el-select v-model="ruleForm.courtLevel" placeholder="请选择">
              <el-option label v-for="item in option.courtLevel" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="文书类型" prop="instrument" required>
            <el-select v-model="ruleForm.instrument" placeholder="请选择">
              <el-option label v-for="item in option.instrument" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="审结时间" prop="closingTime" required>
            <el-date-picker
              v-model="ruleForm.closingTime"
              type="date"
              value-format="timestamp"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案例专题" prop="topic" required>
            <el-select v-model="ruleForm.topic" placeholder="请选择">
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
          { required: true, message: "请选择相应选项", trigger: "blur" }
        ],
        title: [{ required: true, message: "请填写标题", trigger: "blur" }],
        brief: [{ required: true, message: "请选择相应选项", trigger: "blur" }],
        caseLevel: [
          { required: true, message: "请选择相应选项", trigger: "blur" }
        ],
        court: [{ required: true, message: "请选择相应选项", trigger: "blur" }],
        procedure: [
          { required: true, message: "请选择相应选项", trigger: "blur" }
        ],
        courtLevel: [
          { required: true, message: "请选择相应选项", trigger: "blur" }
        ],
        instrument: [
          { required: true, message: "请选择相应选项", trigger: "blur" }
        ],
        closingTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        topic: [{ required: true, message: "请选择相应选项", trigger: "blur" }]
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
      }
    };
  },
  mounted() {
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
    if (this.$refs.editor2.innerHTML == "") {
      editor.create();
    }
    // 动态生成下拉菜单
    this.getOption();
  },
  methods: {
    getOption() {
      for (let key in this.option) {
        this.axios
          .get("/getCaseSort?sort=" + key)
          .then(res => {
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
                closingTime: parseInt(data.closingTime / 1000).toString(),
                topic: data.topic
              },
              content: this.content,
              commitTime: (Date.parse(new Date()) / 1000).toString()
            };
            console.log(obj);
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
    }
  },
  watch: {
    ruleForm: {
      handler(val) {
        console.log(this.ruleForm.section);
      },
      deep: true
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
