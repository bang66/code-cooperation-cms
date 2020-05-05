//输出通用axios实例
import axios from 'axios';
const jsonInstance = axios.create({
  timeout: 10000,
  header: {
    'Content-Type': 'application/json;charset=UTF-8'  //如果写成contentType会报错
  },
  headers: {
    't': window.localStorage.getItem('token')
  }
});

export default {
  submitProject (data){
    return jsonInstance.post('/api/v1/project/submit',data)
  },
};
