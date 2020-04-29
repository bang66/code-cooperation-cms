<template>
  <el-container class="home-container">
<!--    头部区域-->
    <el-header>
      <div>
        <img class="logo-img" src="../assets/codeing.png" alt="">
        <span class="system_title">代码接龙</span>
        <el-button @click="returnFirstPage" style="margin-left: 1050px;">首页</el-button>
      </div>
    </el-header>
<!--    页面主体区-->
    <el-container>
<!--      侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 伸缩按钮 -->
        <div class="avatar_box">
          <img src="../assets/auto.jpeg" alt="">
          <span style="color: #FFFFFF;">{{userName}}</span>
          <p style="margin-left:5px;color: #FFFFFF;">简介：{{userSignature}}</p>
          <div @click="collectProject" style="margin-left: 10px;">
            <i class="el-icon-star-off"></i>
            <span style="margin-left: 5px;color: #FFFFFF;">我收藏的项目</span>
          </div>
          <div @click="joinProject" style="margin-left: 10px;margin-top: 5px;">
            <i class="el-icon-menu"></i>
            <span style="margin-left: 5px;color: #FFFFFF;">我参与的项目</span>
          </div>
          <div style="margin-left: 10px;margin-top: 5px;">
            <el-button @click="create" style="height: 30px;width: 130px;margin-top: 10px;" type="primary">创建项目</el-button>
            <el-dialog title="创建项目" :visible.sync="dialogFormVisible" width="40%">
              <el-form :model="createProjectModel">
                <el-form-item label="项目名称(类名):" label-width="120px">
                  <el-input style="width: 280px;" v-model="createProjectModel.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目简介:" label-width="80px">
                  &emsp;&emsp;&emsp;<el-input style="width: 280px;" v-model="createProjectModel.description" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="createProject">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
<!--        侧边栏菜单区域-->
        <el-menu background-color="#333744"
        text-color="#fff"
        active-text-color="#409eff"
        :collapse="isCollapse"
        :collapse-transition="false"
        :router="true"
        :default-active="activePath">
        </el-menu>
      </el-aside>
<!--      右侧内容主体-->
      <el-main>
        <span style="color: #42B983">我收藏的项目</span>
        <div class="border" v-for="(project,index) in collectInformation" :value="project" :key="index">
          <div class="name">
            <img src="../assets/auto.jpeg" alt="">
            <p style="margin-top: -6%;margin-left: 5%;">{{project.creator}}</p>
            <p style="margin-top: -1%;margin-left: 5%;color: #A1A1A1;">{{project.createTime}}</p>
          </div>
          <div @click="sclick(project.projectId)" style="white-space: pre-line;margin-top: -30px;">
            {{project.code}}
          </div>
        </div>
<!--        路由占位符-->
        <!-- <keep-alive>
          <router-view></router-view>
        </keep-alive> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "CollectList",
    data() {
      return {
        collectInformation:[],
        userName:'',
        userSignature:'',
        createTime:'',
        name:'',
        code:'',
        createProjectModel:{
          name:'',
          description:''
        },
        dialogFormVisible:false,
        //是否折叠
        isCollapse: false,
        //被激活的链接地址
        activePath: ''
      }
    },
    created() {
      this.activePath = window.sessionStorage.getItem('activePath');
    },
    mounted(){
      this.userName = window.localStorage.getItem('userName');//取出存在本地的token
      this.userSignature = window.localStorage.getItem('userSignature');//取出存在本地的token
      this.init()
    },
    methods: {
      init(){
        this.tokenInstance.getColl().then(res=>{
          let data = res.data
          if(data.code == 0){
            this.collectInformation = data.data
            console.log('iiii',this.collectInformation)
          }
        }).catch(error=> {
          console.log(error);
          this.$message.error("因网络波动,操作失败!");
        });
      },
      returnFirstPage(){
        this.$router.replace("/firstPage")
      },
      create(){
        this.dialogFormVisible = true
      },
      createProject(){
        let name = this.createProjectModel.name;
        let desc = this.createProjectModel.description;
        let formData = qs.stringify({
          projectName:name,
          projectDesc:desc,
        });
        if(this.createProjectModel.name != ''&&this.createProjectModel.description != ''){
          this.tokenInstance.createProjectApi(formData).then(res =>{
            this.dialogFormVisible = false
            let id = res.data.data
            window.localStorage.setItem('id',id);//把token存在本地
            // this.newToken = window.localStorage.getItem('id');//取出存在本地的token
            this.$router.replace("/textEdite")
            // this.$router.push({
            //   path:'/textEdite',
            //   query:id,
            // });
          })
        }
      },
      collectProject(){
        this.$router.replace("/collectList")
      },
      joinProject(){
        this.$router.replace("/joinList")
      },
      sclick(idNew) {
        // this.tokenInstance.projectDetail({params:{"projectId":newId}}).then(res=>{
        //   console.log("qq",res)
          // let newId= idNew
        //   if(data.code == 0){
        //     let detail = data.data
            this.$router.push({
              path:'/detailPage',
              query:{'id':idNew},
            });
        //     // this.$router.replace("/detailPage")
        //   }
        // }).catch(error=> {
        //   console.log(error);
        //   this.$message.error("因网络波动,操作失败!");
        // });
      },
      //点击按钮切换菜单的折叠
      toggleCollapse() {
        this.isCollapse = !this.isCollapse;
      },
      //保存链接的激活状态
      saveNavState(activePath) {
        console.log(activePath);
        window.sessionStorage.setItem('activePath', activePath);
        this.activePath = activePath;
      }
    }
  }
</script>

<style scoped>
  /*让home-container充满全屏*/
  .home-container {
    height: 100%;
  }
  .el-header {
    background-color: #475669;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
  }
  .el-header div {
    display: flex;
    align-items: center;
  }
  .el-header div span {
    margin-left: 15px;
  }
  .el-aside {
    background-color: #475669;
  }
  .el-aside .el-menu {
    border-right: none;
  }
  .avatar_box img {
    width: 40%;
    height: 40%;
    border-radius: 50%;
    background-color: #eeeeee;
  }
  .name img{
    width: 6%;
    height: 6%;
    border-radius: 50%;
    background-color: #eeeeee;
    margin-left: -25px;
  }
  .el-main {
    background-color: #EAEDF1;
  }
  .el-carousel__item h3 {
    /* background-image: url(../assets/code.png); */
    /* color: #475669; */
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-image: url(../assets/pageTitle2.jpg);
    /* background-color: #99a9bf; */
  }
  .el-carousel__item:nth-child(2n+1) {
    background-image: url(../assets/pageTitle1.jpg);
    /* background-color: #d3dce6; */
  }
  .border {
    /* text-align:center; */
    border:1px solid #a1a1a1;
    padding:10px 40px;
    /* background:#dddddd; */
    width:90%;
    height: 200px;
    margin-top: 5px;
    border-radius:10px;
    -moz-border-radius:10px; /* 老的 Firefox */
  }
  .logo-img {
    width: 50px;
    height: 50px;
  }
  .toggle-button{
    background-color: #4a5060;
    font-size: 15px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>
