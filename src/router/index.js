import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import Register from '@/components/Register'
import Login    from '@/components/Login'
import IssuePost from '@/components/IssuePost'
import { Main } from 'element-ui';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path:'/register',
      name:'Register',
      component: Register
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:"/issue",
      name:"IssuePost",
      component:IssuePost
    }
  ]
})
