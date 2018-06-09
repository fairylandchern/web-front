import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import Register from '@/components/Register'
import Login    from '@/components/Login'
import IssuePost from '@/components/IssuePost'
import UserInfo from '@/components/UserInfo'
import IssueDetail from '@/components/IssueDetail'
import  Allissues   from '@/components/Allissues'
import Comments from '@/components/Comments'
import { Main } from 'element-ui';
import { Store } from 'vuex';
Vue.use(Router)


 const router=new Router({
  mode:'history',
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
      component:IssuePost,
      beforeEnter:requireAuth
    },
    {
      path:"/userinfo",
      name:"UserInfo",
      component:UserInfo,
      beforeEnter:requireAuth
    },
    {
      path:"/allissues",
      name:"Allissues",
      component:Allissues,
      beforeEnter:requireAuth
    },
    {
      path:"/comments",
      name:"Comments",
      component:Comments,
      beforeEnter:requireAuth
    },
    {
      path:"/issuedetail/:id",
      name:"issuedetail",
      component:IssueDetail
    }
  ]
})

// router.beforeEach((to,from,next)=>{
//   next('/login')
// })
function requireAuth(to,from,next) {
  if(localStorage.getItem("uinfo")){
    next()
  }else{
    next('/login')
  }
 
}
// router.beforeResolve((to,from)=>{
//   if(localStorage.getItem("uinfo")){
//     Store.loginstatus=true
//   }
// })

export default router
