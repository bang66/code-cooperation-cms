<template>
  <el-container class="home-container">
<!--    头部区域-->
    <el-header>
      <div>
        <img class="logo-img" src="../assets/codeing.png" alt="">
        <span class="system_title">代码接龙</span>
      </div>
      <el-input v-model="dimContent" placeholder="搜索..." style="width: 250px;"></el-input>
      <el-button @click="searchMethod" style="margin-left:-30%;" type="primary" icon="el-icon-search"></el-button>
      <el-button type="info" @click="logOut">退出</el-button>
    </el-header>
<!--    页面主体区-->
    <el-container>
<!--      侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 伸缩按钮 -->
        <!-- <div class="toggle-button" @click="toggleCollapse">|||</div> -->
        <div class="avatar_box">
          <img src="../assets/auto.jpeg" alt="">
          <span style="color: #FFFFFF;">{{userName}}</span>
          <p style="margin-left:5px;color: #FFFFFF;">个性签名：{{userSignature}}</p>
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
            <el-button @click="modifyInformation" style="height: 30px;width: 130px;margin-top: 10px;" type="success">修改信息</el-button>
            <el-dialog title="修改信息" :visible.sync="dialogInformation" width="40%">
              <el-form :model="modifyInformationModel">
                <el-form-item label="用户昵称:" label-width="100px">
                  <el-input style="width: 280px;" v-model="modifyInformationModel.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="个性签名:" label-width="100px">
                  <el-input style="width: 280px;" v-model="modifyInformationModel.userSignature" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogInformation = false">取 消</el-button>
                <el-button type="primary" @click="modifyMethod">确 定</el-button>
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
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in 3" :key="item">
            <h3 class="medium">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
        <div class="border" v-for="(project,index) in projectList" :value="project" :key="index">
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
  import qs from 'qs'
  export default {
    name: "FirstPage",
    data() {
      return {
        information:{},
        userName:'',
        userSignature:'',
        projectList:[],
        code:'',
        createProjectModel:{
          name:'',
          description:''
        },
        modifyInformationModel:{
          userName:'',
          userSignature:''
        },
        dialogFormVisible:false,
        dialogInformation:false,
        dimContent: '',
        //是否折叠
        isCollapse: false,
        baseUrl: '/home',
        //被激活的链接地址
        activePath: ''
      }
    },
    created() {
      this.activePath = window.sessionStorage.getItem('activePath');
    },
    mounted(){
      this.getHome()
      this.modifyInformationModel.userName = this.userName;
      this.modifyInformationModel.userSignature = this.userSignature;
    },
    methods: {
      init() {
        this.userName = this.information.userName
        this.userSignature = this.information.userSignature
        window.localStorage.setItem('userName',this.userName);//把token存在本地
        window.localStorage.setItem('userSignature',this.userSignature);//把token存在本地
        this.projectList = this.information.projectList
      },
      getHome() {
        this.tokenInstance.homePage().then(res=>{
          console.log('qqqq',res)
          let data = res.data
          if(data.code == 0){
            this.information = data.data
            this.userName = this.information.userName
            this.userSignature = this.information.userSignature
            window.localStorage.setItem('userName',this.userName);//把token存在本地
            window.localStorage.setItem('userSignature',this.userSignature);//把token存在本地
            this.projectList = this.information.projectList
          }
        }).catch(error=> {
          console.log(error);
          this.$message.error("因网络波动,操作失败!");
        });
      },
      handleCode() {
        for (var i = 0, len = this.projectList.length; i < len; i++) {
          let code = this.projectList[i].code
        	let newCode = this.projectList[i].code.replace(/\n/g,"<br/>")
          this.projectList[i].code = newCode
        }
      },
      logOut() {
        this.$router.replace("/")
        window.sessionStorage.clear()
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
            this.$router.replace("/textEdite")
            // this.$router.push({
            //   path:'/textEdite',
            //   query:id,
            // });
          })
        }
      },
      modifyInformation(){
        this.dialogInformation = true
      },
      modifyMethod(){
        let newName = this.modifyInformationModel.userName;
        let sign = this.modifyInformationModel.userSignature;
        let formData = qs.stringify({
          userName:newName,
          signature:sign,
        });
        if(this.modifyInformationModel.userName != ''&&this.modifyInformationModel.userSignature != ''){
          this.tokenInstance.modifyUser(formData).then(res =>{
            if(res.data.code == 0){
              console.log('uu')
              this.dialogInformation = false
              this.getHome()
            }
          })
        }else{
          this.$message('用户昵称和个性签名不能为空');
        }
      },
      //模糊搜索
      searchMethod(){
        let newWord = this.dimContent
        this.tokenInstance.dimSearch({params:{"keyWord":newWord}}).then(res=>{
          let data = res.data
          if(res.data.code == 0){
            this.projectList = data.data
          }

        }).catch(error=> {
          console.log(error);
          this.$message.error("因网络波动,操作失败!");
        });
      },
      collectProject(){
        this.$router.replace("/collectList")
      },
      joinProject(){
        this.$router.replace("/joinList")
      },
      sclick(newId) {
        this.$router.push({
          path:'/detailPage',
          query:{'id':newId},
        });
      },
      clickSec(){
        this.$router.replace("/detailSec")
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
    background-image: url(../assets/code.png);
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
