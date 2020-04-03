import Vue from 'vue'
import App from './App'
import router from './router'
// import store from "./store";
// import XLSX from 'xlsx'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

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
