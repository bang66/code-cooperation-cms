<template>
  <div>
    <div>
      <el-card style="height: 590px;">
        <!-- <quill-editor v-model="content" ref="myQuillEditor" style="height: 500px;" :options="editorOption">
          <div v-html="content"></div>
        </quill-editor> -->
        <quill-editor v-model="content" ref="myQuillEditor" style="height: 500px;" :options="editorOption"
         @change="onImgsTxtEditorChange($event)">
          <!-- <div v-html="content"></div> -->
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
  // import qs from 'qs'
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
        id: '',
        content: '',
        editorOption: {}
      }
    },
    mounted(){
      // this.id = window.localStorage.getItem('id');
      this.id= this.$route.query.id;
      this.content = this.$route.query.content;
      // this.init()
      console.log('content',this.content)
    },
    methods:{
		onImgsTxtEditorChange({quill, html, text}) {
		  this.content = html;
		},
		run(){
			let newId = this.id;
			let newContent = this.content;
			let formData = {
			  projectId:newId,
			  code:newContent,
			};
			if(this.content != ''){
			  this.jsonInstance.submitProject(formData).then(res =>{
				console.log('res',res)
				if(res.data.code == 0){
					this.runSuccess()
				}
			  })
			}
		},
		runSuccess(){
			let newId = this.id;
			this.tokenInstance.runProject({params:{"projectId":newId}}).then(res =>{
			  console.log('res',res)
			  if(res.data.code == 0){
				let result = res.data.data
				this.$message('运行成功')
				this.runResult(result)
			  }
			})
		},
		runResult(result){
			  this.$alert(result, '运行结果', {
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
			let formData = {
			  projectId:newId,
			  code:newContent,
			};
			if(this.content != ''){
			  this.jsonInstance.submitProject(formData).then(res =>{
				console.log('res',res)
				if(res.data.code == 0){
					this.$message('提交成功')
				}
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
