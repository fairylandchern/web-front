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
import IssueUpdate from '@/components/IssueUpdate'
import AdminLogin from "@/admin/AdminLogin"
import Admin from "@/admin/Admin"
import CommentsManage from "@/admin/CommentsManage"
import IssueManage from "@/admin/Issuemanage"
import TypeManage from "@/admin/TypeManage"
import UserManage from "@/admin/Usermanage"
import AdminInfo from "@/admin/AdminInfo"
import AdminIssueDetail from "@/admin/AdminIssueDetail"
import Admin_UserInfo from "@/admin/UserInfo"
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
      path:"/issueupdate/:id?",
      name:"IssueUpdate",
      component:IssueUpdate,
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
    },
    {
      path:"/admin/login",
      name:"AdminLogin",
      component:AdminLogin
    },
    {
      path:"/admin/main",
      name:"Admin",
      component:Admin,
      beforeEnter:requireAdminAuth,
      children:[
        {path:"commentsmanage",component:CommentsManage},
        {path:"issuemanage",component:IssueManage},
        {path:"typemanage",component:TypeManage},
        {path:"usermanage",component:UserManage},
        {path:"admininfo",component:AdminInfo},
        {path:"issuedetail/:id",component:AdminIssueDetail},
        {path:"userinfo/:id",component:Admin_UserInfo},
      ]
    },
  ]
})

// router.beforeEach((to,from,next)=>{
//   next('/login')
// })
function requireAuth(to, from, next) {
  if(localStorage.getItem("uinfo")){
    next()
  }else{
    next('/login')
  }
 
}
function requireAdminAuth(to, from, next) {
  if(localStorage.getItem("admininfo")){
    next()
  }else{
    next('/admin/login')
  }
 
}
// router.beforeResolve((to,from)=>{
//   if(localStorage.getItem("uinfo")){
//     Store.loginstatus=true
//   }
// })

export default router
