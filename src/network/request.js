import axios from 'axios'

//方式二
//最终方法
//在main.js调用
export function request(config) {
  //1. 创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.57.251.186:8888',
    // timeout: 5000,

    //跨域
    crossDomain:true

  });

  //2. 发送网络请求,instance本身就是一个Promise类型可以直接返回
  return instance(config)
}
