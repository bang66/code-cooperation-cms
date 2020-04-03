<template>
  <el-container class="home-container">
<!--    头部区域-->
    <el-header>
      <div>
        <img class="logo-img" src="../assets/codeing.png" alt="">
        <span class="system_title">代码接龙</span>
        <el-button @click="returnFirstPage" style="margin-left: 1180px;">首页</el-button>
      </div>
    </el-header>
<!--    页面主体区-->
    <el-container>
<!--      侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 伸缩按钮 -->
        <div class="avatar_box">
          <img src="../assets/auto.jpeg" alt="">
          <span style="color: #FFFFFF;">小晴同学</span>
          <p style="margin-left:5px;color: #FFFFFF;">简介：面包我有，给我牛奶</p>
          <div @click="collectProject" style="margin-left: 10px;">
            <i class="el-icon-star-off"></i>
            <span style="margin-left: 5px;color: #FFFFFF;">我收藏的项目</span>
          </div>
          <div style="margin-left: 10px;margin-top: 5px;">
            <i class="el-icon-menu"></i>
            <span style="margin-left: 5px;color: #FFFFFF;">我参与的项目</span>
          </div>
          <div style="margin-left: 10px;margin-top: 5px;">
            <el-button @click="createProject" style="height: 30px;width: 130px;margin-top: 10px;" type="primary">创建项目</el-button>
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
        <span style="color: #42B983">我参与的项目</span>
        <div class="border">
          <div class="name">
            <img src="../assets/auto.jpeg" alt="">
            <p style="margin-top: -6%;margin-left: 5%;">李现</p>
            <p style="margin-top: -1%;margin-left: 5%;color: #A1A1A1;">2020.03.03</p>
          </div>
          <div @click="sclick()">
            public class Add {<br />
              &emsp;private int a;<br />
              &emsp;private int b;<br />
              &emsp;public int add(int x, int y) {<br />
                &emsp;&emsp;this.a = x;<br />
                ......
                <!-- &emsp;&emsp;this.b = y;<br />
                &emsp;&emsp;return (a + b);<br />
              &emsp;}<br />
              &emsp;public static void main(String[] args) {<br />
                &emsp;&emsp;Add addObj = new Add();<br />
                &emsp;&emsp;int res = addObj.add(2, 3);<br />
                &emsp;&emsp;System.out.println(res);<br />
              &emsp;}<br />
            } -->
          </div>
        </div>
        <div class="border">
          <div class="name">
            <img src="../assets/auto.jpeg" alt="">
            <p style="margin-top: -6%;margin-left: 5%;">小明与小红</p>
            <p style="margin-top: -1%;margin-left: 5%;color: #A1A1A1;">2019.12.11</p>
          </div>
          <div @click="sclick()">
            public class Bubble {<br />
              &emsp;public static void bubbleSort1(int [] a, int n){<br />
                &emsp;&emsp;int i, j;<br />
                &emsp;&emsp;for(i=0; i&lt;n; i++){<br />
                 &emsp;&emsp;&emsp;for(j=1; j&lt;n-i; j++){<br />
                   ......
                    <!-- &emsp;&emsp;&emsp;&emsp;if(a[j-1] > a[j]){<br />
                      &emsp;&emsp;&emsp;&emsp;&emsp;int temp;<br />
                      &emsp;&emsp;&emsp;&emsp;&emsp;temp = a[j-1];<br />
                      &emsp;&emsp;&emsp;&emsp;&emsp;a[j-1] = a[j];<br />
                      &emsp;&emsp;&emsp;&emsp;&emsp;a[j]=temp;<br />
                    }<br />
                  }<br />
                }<br />
              }<br />
              public static void main(String[] args) {<br />
                int[] arr = {1,1,2,0,9,3,12,7,8,3,4,65,22};<br />
                BubbleSort.bubbleSort1(arr, arr.length);<br />
                for(int i:arr){<br />
                  System.out.print(i+",");<br />
                }<br />
              }<br />
            } -->
          </div>
        </div>
        <div class="border"><div class="name">
            <img src="../assets/auto.jpeg" alt="">
            <p style="margin-top: -6%;margin-left: 5%;">可乐儿</p>
            <p style="margin-top: -1%;margin-left: 5%;color: #A1A1A1;">2018.07.15</p>
          </div>
          <div @click="sclick()">
            public class Fib {<br />
              &emsp;public static int getFib(int n) {<br />
                &emsp;&emsp;if(n < 0) {<br />
                  &emsp;&emsp;&emsp;return -1;<br />
                &emsp;&emsp;} else if(n == 0) {<br />
                ......
                  <!-- &emsp;&emsp;&emsp;return 0;<br />
                &emsp;&emsp;} else if (n == 1 || n ==2) {<br />
                  &emsp;&emsp;&emsp;return 1;<br />
                &emsp;&emsp;} else {<br />
                  &emsp;&emsp;&emsp;return getFib(n - 1) + getFib(n - 2);<br />
                &emsp;&emsp;}<br />
              &emsp;}<br />
              &emsp;public static void main(String[] args) {<br />
                &emsp;&emsp;Fib.getFib(10);<br />
              &emsp;}<br />
            } -->
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
    name: "FirstPage",
    data() {
      return {
        //是否折叠
        isCollapse: false,
        baseUrl: '/home',
        menuList: [
          {
            menuName: '预约管理',
            menuPath: '/appointment',
            menuIcon: 'el-icon-s-management'
          },
          {
            menuName: '排号管理',
            menuPath: '/queue',
            menuIcon: 'el-icon-message-solid'
          },
          {
            menuName: '病例录入',
            menuPath: '/case',
            menuIcon: 'el-icon-s-order'
          },
          {
            menuName: '职工管理',
            menuPath: '/staff',
            menuIcon: 'el-icon-s-custom'
          }
        ],
        //被激活的链接地址
        activePath: ''
      }
    },
    created() {
      this.activePath = window.sessionStorage.getItem('activePath');
    },
    methods: {
      returnFirstPage(){
        this.$router.replace("/firstPage")
      },
      createProject(){
        this.$router.replace("/textEdite")
      },
      collectProject(){
        this.$router.replace("/collectList")
      },
      sclick() {
        this.$router.replace("/detailPage")
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
