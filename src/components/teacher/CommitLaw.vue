<template>
  <div id="commit_law">
    <el-form>
      <div class="editor_title">文本内容</div>
      <div id="editor" ref="editor"></div>
    </el-form>
  </div>
</template>

<script>
import E from "wangeditor";
// 创建编辑器
var editor = new E("#editor");

export default {
  data() {
    return {
      text: ""
    };
  },
  mounted() {
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
    if (this.$refs.editor.innerHTML == "") {
      editor.create();
    }
  },
  methods: {
    getEditor() {
      console.log(editor.txt.html());
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
      margin: 20px 0;
    }
  }
}
</style>
