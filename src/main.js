import Vue from 'vue'
import App from './App'
import router from './router'
// import store from "./store";
// import XLSX from 'xlsx'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import formInstance from './api/index';
import tokenInstance from './api/tokenIndex';
import jsonInstance from './api/jsonTokenIndex';

Vue.prototype.formInstance = formInstance  //axios实例
Vue.prototype.tokenInstance = tokenInstance
Vue.prototype.jsonInstance = jsonInstance
//导入全局样式表
import './assets/css/global.css'

Vue.config.productionTip = false
Vue.use(ElementUI);
// Vue.use(XLSX)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
