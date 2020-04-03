<template>
    <div class="login_container">
      <div class="login_box">
        <el-form ref="loginFormRef" :rules="loginFormRules" :model="loginForm" label-width="0px" class="login_form">
          <el-form-item prop="username">
            <el-input placeholder="电子邮箱" v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 313px;" placeholder="验证码" prefix-icon="el-icon-message-solid"></el-input>
            <el-button type="primary">发送验证码</el-button>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="密码" type="password" v-model="loginForm.password" prefix-icon="el-icon-s-comment"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="确认密码" type="password" prefix-icon="el-icon-s-comment"></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button style="width: 410px;" type="info" @click="resetLoginForm">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'Register',
    data () {
      return {
        //这是登录的数据绑定对象
        loginForm: {
          username: '',
          password: ''
        },
        loginFormRules: {
          //登录框验证
          // username: [
          //   { required: true, message: '请输用户名', trigger: 'blur' },
          //   { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          // ],
          //密码框验证
          // password: [
          //   {required: true, message: '请输入密码', trigger: 'blur'},
          //   { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          // ]
        }
      }
    },
    methods: {
      resetLoginForm() {
        this.$router.replace("/firstPage")//登录成功进入管理系统界面
      }
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
  /* .btns{
    display: flex;
    justify-content: flex-end;
  } */

</style>
