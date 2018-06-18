<template>
<el-container >
  <el-container class="admin-page">
    <el-aside >
    <el-row>
      <el-col>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router="true">
     <el-menu-item index="1" route="/admin/main/commentsmanage">评论管理</el-menu-item>
     <el-menu-item index="2" route="/admin/main/issuemanage">帖子管理</el-menu-item>
     <!-- <el-menu-item route="/admin/main/typemanage">类型管理</el-menu-item> -->
     <el-menu-item index="3" route="/admin/main/usermanage">用户管理</el-menu-item>
     <el-menu-item index="4" route="/admin/main/admininfo">个人信息管理</el-menu-item>
    </el-menu>
  </el-col>
</el-row>
    </el-aside>
  <el-container>
       <!-- <el-header class="nav-admin"> 
           <el-menu default-active="activeIndex" mode="horizontal" router="true">
        <el-submenu index="6" class="userinfo">
          <template slot="title">用户信息</template>
          <el-menu-item index="6-1" route="/userinfo">
            个人主页
          </el-menu-item>
          <el-menu-item index="6-2" @click="logout" route="/">
            登出
          </el-menu-item>
        </el-submenu>
    </el-menu>
    
       </el-header> -->
       <el-main>
           <router-view></router-view>
       </el-main>
  </el-container>
   
</el-container>
<el-footer>&copy;chen</el-footer>
</el-container>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {

};
</script>
<style>
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 20px;
  padding: 0;
}
.userinfo {
  float: right;
}
li.el-menu-item.userinfo {
  float: right;
}
li.userinfo.el-submenu {
  float: right;
}
.nav-admin{
    padding: 0;
}
.admin-page{
    min-height: 500px;
}
</style>