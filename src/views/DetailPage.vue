<template>
  <div class="detail">
    <div class="border" v-model="codeDetail" style="white-space: pre-line;">
      {{codeDetail}}
    </div>
    <div>
      <div style="float: right;margin-top: 5px;">
        <i class="el-icon-star-off"></i>
        <span @click="collect">收藏</span>
        <i class="el-icon-edit" style="margin-left: 20px;"></i>
        <span @click="writeCom">评论</span>
        <el-button type="warning" style="margin-left: 20px;" @click="returnFirst">返回</el-button>
        <el-button @click="solitaire" type="primary" style="margin-left: 20px;">接龙</el-button>
        <el-button @click="run" type="success" style="margin-left: 20px;margin-right: 30px;">运行</el-button>
      </div>
    </div>
    <div style="margin-top: 40px;" v-show="displayCom">
      <div class="comment">
        <div>
          <span style="color: #D2691E;">小晴同学</span>
          <el-input v-model="commentCon" style="display: inline-block;width: 300px;" placeholder="请输入内容"></el-input>
          <el-button @click="publish" type="primary">发表</el-button>
        </div>
        <div style="margin-top: 10px;" v-for="(comment,index) in commentList" :value="comment" :key="index">
          <span style="color: #D2691E;">{{comment.userName}}:</span>
          <span>{{comment.message}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: "DetailPage",
    data() {
      return {
        displayCom:false,
        codeDetail:'',
        detail:{},
        commentList:[],
        commentCon:'',
        commentId:''
      }
    },
    mounted(){
      this.detail = {}
      this.detail = this.$route.query;
      // console.log('detail',this.detail)
      let detailId = this.detail.id
      this.detailCode(detailId)
    },
    methods: {
      detailCode(newId) {
        this.tokenInstance.projectDetail({params:{"projectId":newId}}).then(res=>{
          console.log("qq",res)
          let data = res.data
          if(data.code == 0){
            this.codeDetail = data.data.code
            this.commentList = data.data.messageDTOList
            this.commentId = data.data.projectId
          }
        }).catch(error=> {
          console.log(error);
          this.$message.error("因网络波动,操作失败!");
        });
      },
      publish(){
        let id = this.commentId;
        let content = this.commentCon;
        let formData = qs.stringify({
          projectId:id,
          comment	:content,
        });
        this.tokenInstance.commentSubmit(formData).then(res=>{
          console.log("666",res)
          let data = res.data
          if(data.code == 0){
            this.detailCode(id)
            this.commentCon = ''
          }
        }).catch(error=> {
          console.log(error);
          this.$message.error("因网络波动,操作失败!");
        });
      },
      collect(){
        let id = this.commentId;
        let formData = qs.stringify({
          projectId:id
        });
        this.tokenInstance.collectProject(formData).then(res=>{
          let data = res.data
          if(data.code == 0){
            this.$message('收藏成功！');
            // this.detailCode(id)
            // this.commentCon = ''
          }
        }).catch(error=> {
          console.log(error);
          this.$message.error("因网络波动,操作失败!");
        })
      },
      solitaire(){
        // let id = this.commentId
        let idObj = {}
        idObj.id = this.commentId
        idObj.content = this.codeDetail
        console.log('idObj', idObj)
        this.$router.push({
          path:'/textEdite',
          query:idObj,
        });
        // this.$router.replace("/textEdite")
      },
      writeCom(){
        this.displayCom = true
      },
      returnFirst(){
        this.$router.replace("/firstPage")
      },
      run(){
        this.$alert('hello world', '运行结果', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
    }
  }
</script>

<style>
  .border {
    border:1px solid #a1a1a1;
    padding:10px 40px;
    width:90%;
    height: 550px;
    margin-top: 5px;
    margin-left: 2%;
    border-radius:10px;
    -moz-border-radius:10px; /* 老的 Firefox */
  }
  .comment{
    border:1px solid #a1a1a1;
    padding:10px 40px;
    width:90%;
    height: 150px;
    margin-top: 5px;
    margin-left: 2%;
    border-radius:10px;
    -moz-border-radius:10px; /* 老的 Firefox */
  }
</style>
