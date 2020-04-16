//输出通用axios实例
import axios from 'axios';
const tokenInstance = axios.create({
  timeout: 10000,
  header: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'  //如果写成contentType会报错
  },
  headers: {
    't': window.localStorage.getItem('token')
  }
});

export default {
  homePage (){
  	return tokenInstance.get('/api/v1/homePage/get')
  },
  checkColl (){
  	return tokenInstance.get('/api/v1/project/favourite')
  },
};
