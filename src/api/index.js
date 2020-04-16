//输出通用axios实例
import axios from 'axios';

// const jsonInstance = axios.create({
//   timeout: 10000,
//   headers: {
//     'Content-Type': "application/json;charset=utf-8"
//   }
// });

const formInstance = axios.create({
  timeout: 10000,
  header: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'  //如果写成contentType会报错
  },
});

export default {
  userLogin ( data ) {
    return formInstance.post('/api/v1/login', data);
  },
  sendCode ( data ) {
    return formInstance.get('/api/v1/send/code', data);
  },
  regist (data){
  	return formInstance.post('/api/v1/regist',data)
  }
  // allProduct () {
  //  return instance.post('/api/product')
  // },
  // upload (data) {
  //   return instance.post('/api/upload',data)
  // },
};
