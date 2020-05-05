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
  getColl (){
  	return tokenInstance.get('/api/v1/mine/favourite')
  },
  createProjectApi (data){
    return tokenInstance.post('/api/v1/project/create',data)
  },
  getJoin(){
    return tokenInstance.get('/api/v1/mine/join')
  },
  projectDetail(data){
    return tokenInstance.get('/api/v1/project/detail',data)
  },
  commentSubmit(data){
    return tokenInstance.post('/api/v1/comment/submit',data)
  },
  collectProject(data){
    return tokenInstance.post('/api/v1/project/favourite',data)
  },
  dimSearch (data){
  	return tokenInstance.get('/api/v1/project/query',data)
  },
  modifyUser(data){
    return tokenInstance.post('/api/v1/update/userInfo',data)
  },
  runProject(data){
    return tokenInstance.get('/api/v1/project/run',data)
  }
};
