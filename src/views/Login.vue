<template>
  <div class="login_container">
    <div class="login_box">
<!--      头像区域-->
      <div class="avatar_box">
        <img src="../assets/codeing.png" alt="">
      </div>
      <h3 class="title">代码接龙</h3>
      <el-form ref="loginFormRef" :rules="loginFormRules" :model="loginForm" label-width="0px" class="login_form">
        <el-form-item prop="username">
          <el-input placeholder="电子邮箱" @blur="sendEmail" v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="密码" type="password" v-model="loginForm.password" prefix-icon="el-icon-s-promotion"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  // import { request } from '../network/request'
  import qs from 'qs'
  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        newToken:'',
        loginFormRules: {
          username: [
            { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      //验证电子邮件格式
      sendEmail() {
        var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (this.loginForm.username != '' && !regEmail.test(this.loginForm.username)) {
          this.$message({
              message: '邮箱格式不正确',
              type: 'error'
          })
          this.loginForm.username = ''
        }
      },
      //登录
      login() {
        this.$refs.loginFormRef.validate().then(res => {
          let formData = qs.stringify({
            "emlAddr":this.loginForm.username,
            "passwd":this.loginForm.password
          });
          this.formInstance.userLogin(formData).then(res=>{
              let data = res.data
              if(data.code == 0){
                this.$message.success("登录成功!");

                // console.log('qq', data.data.token)
                window.localStorage.setItem('token',data.data.token);//把token存在本地
                // this.newToken = window.localStorage.getItem('token');//取出存在本地的token
                this.$router.replace("/firstPage")
                // this.getHome()
              }else if(data.code == 2000){
                this.$message.success("账号错误!");
              }else if(data.code == 2001){
                this.$message.success("账号未注册!");
              }else if(data.code == 2002){
                this.$message.success("邮件验证码发送失败!");
              }else if(data.code == 2003){
                this.$message.success("未向此邮箱发送验证码!");
              }else if(data.code == 2004){
                this.$message.success("验证码有误!");
              }else if(data.code == 2005){
                this.$message.success("此账号已注册!");
              }else if(data.code == 2006){
                this.$message.success("此项目已被收藏过!");
              }
           }).catch(error=> {
            console.log(error);
            this.$message.error("因网络波动,操作失败!");
          });
        });
      },
      resetLoginForm() {
        this.$router.replace("/register")
      }
      // getHome() {
      //   this.tokenInstance.homePage().then(res=>{
      //     let data = res.data
      //     if(data.code == 0){
      //       let information = data.data
      //       this.$router.push({
      //         path:'/firstPage',
      //         query:information,
      //       });
      //     }
      //   }).catch(error=> {
      //     console.log(error);
      //     this.$message.error("因网络波动,操作失败!");
      //   });
      // }
    }
  }
</script>

<style scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;
  }
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .login_container .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
  }

  .login_container .avatar_box img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eeeeee;
  }

  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .title {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .btns{
    display: flex;
    justify-content: flex-end;
  }

</style>
