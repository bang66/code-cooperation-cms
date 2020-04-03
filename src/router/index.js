import Vue from 'vue'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Router from 'vue-router'
import Login from '@/views/Login'
import Register from '@/views/Register'
import FirstPage from '@/views/FirstPage'
import DetailPage from '@/views/DetailPage'
import TextEdite from '@/views/TextEdite'
import CollectList from '@/views/CollectList'
import JoinList from '@/views/JoinList'
import DetailSec from '@/views/DetailSec'

Vue.use(Router)
Vue.use(Element, { size: 'small', zIndex: 3000 });

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/firstPage',
      name: 'FirstPage',
      component: FirstPage
    },
    {
      path: '/detailPage',
      name: 'DetailPage',
      component: DetailPage
    },
    {
      path: '/textEdite',
      name: 'TextEdite',
      component: TextEdite
    },
    {
      path: '/collectList',
      name: 'CollectList',
      component: CollectList
    },
    {
      path: '/joinList',
      name: 'JoinList',
      component: JoinList
    },
    {
      path: '/detailSec',
      name: 'DetailSec',
      component: DetailSec
    }
  ]
})
