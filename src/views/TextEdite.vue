<template>
  <div>
    <div>
      <el-card style="height: 590px;">
        <quill-editor v-model="content" ref="myQuillEditor" style="height: 500px;" :options="editorOption">
          <div v-html="content"></div>
        </quill-editor>
      </el-card>
    </div>
    <div style="float: right;margin-right: 15px;margin-top: 5px;">
      <el-button @click="run" type="warning">运行</el-button>
      <el-button @click="returnFirst" type="primary">返回</el-button>
    </div>
  </div>
</template>

<script>
  import {
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  export default {
    name: 'FuncFormsEdit',
    components: {
      quillEditor
    },
    data() {
      return {
        content: 'public class Add {<br />&emsp;private int a;<br />&emsp;private int b;<br />&emsp;public int add(int x, int y) {<br />&emsp;&emsp;this.a = x;<br />&emsp;&emsp;this.b = y;<br />&emsp;&emsp;return (a + b);<br />&emsp;}<br />&emsp;public static void main(String[] args) {<br />&emsp;&emsp;Add addObj = new Add();<br />&emsp;&emsp;int res = addObj.add(2, 3);<br />&emsp;&emsp;System.out.println(res);<br />&emsp;}<br />}',
        editorOption: {}
      }
    },
    methods:{
      run(){
        this.$alert('2', '运行结果', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
      returnFirst(){
        this.$router.replace("/firstPage")
      }
    }
  }

</script>

<style scoped>
</style>
