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
      <el-button @click="submit" type="success">提交</el-button>
      <el-button @click="returnFirst" type="primary">返回</el-button>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  import {
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  export default {
    name: 'TextEdite',
    components: {
      quillEditor
    },
    data() {
      return {
        id:'',
        content: '',
        editorOption: {}
      }
    },
    mounted(){
      this.id = window.localStorage.getItem('id');
      // this.information.id = this.$route.query;
      // this.init()
      console.log('id',this.id)
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
      submit(){
        let newId = this.id;
        let newContent = this.content;
        let formData = qs.stringify({
          projectId:newId,
          code:newContent,
        });
        if(this.content != ''){
          this.tokenInstance.submitProject(formData).then(res =>{
            console.log('res',res)
            // let id = res.data.data
            // window.localStorage.setItem('id',id);//把token存在本地
            // this.newToken = window.localStorage.getItem('id');//取出存在本地的token
            // this.$router.replace("/textEdite")
          })
        }
      },
      returnFirst(){
        this.$router.replace("/firstPage")
      }
    }
  }

</script>

<style scoped>
</style>
