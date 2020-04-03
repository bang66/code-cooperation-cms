<template>
  <div class="detail">
    <div class="border">
      public class Test {<br />
        &emsp;public static void main(String[] args) {<br />
          &emsp;&emsp;System.out.println("hello world");<br />
        &emsp;}<br />
      }
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
          <el-input style="display: inline-block;width: 300px;" placeholder="请输入内容"></el-input>
          <el-button type="primary">发表</el-button>
        </div>
        <div style="margin-top: 10px;">
          <span style="color: #D2691E;">程序猿爱生活</span>
          <span>：点赞！！！</span>
        </div>
        <div style="margin-top: 10px;">
          <span style="color: #D2691E;">程序猿爱美食</span>
          <span>：呀呀呀呀呀呀晕晕晕晕晕晕</span>
        </div>
        <div style="margin-top: 10px;">
          <span style="color: #D2691E;">程序猿爱代码</span>
          <span>：啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailPage",
    data() {
      return {
        displayCom:false
      }
    },
    methods: {
      collect(){
        this.$message('收藏成功！');
      },
      solitaire(){
        this.$router.replace("/textEdite")
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
