<template>
        <el-container width="300px">
   <el-header > 
    <el-menu default-active="activeIndex" mode="horizontal" router="true">
      <el-menu-item index="1" route="/" class="el-icon-home" >
        首页
      </el-menu-item>
      <el-submenu index="2" >
       <template class="el-icon-menu" slot="title">
         <i class="el-icon-menu"></i>
         帖子管理
         </template>
        <el-menu-item index="2-1" route="/issue" class="el-icon-edit">
          发布帖子
        </el-menu-item>
        <el-menu-item index="2-2" route="/allissues">已发帖子</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">
      <el-input
      placeholder="请输入内容" v-model="input23">
       <i slot="prefix" class="el-input__icon el-icon-search"></i>
       </el-input>
      </el-menu-item>
      <el-menu-item index="7" route="/comments">评论管理</el-menu-item>
        <el-submenu index="6" v-if="loginStatus" class="userinfo">
          <template slot="title">用户信息</template>
          <el-menu-item index="6-1" route="/userinfo">
            个人主页
          </el-menu-item>
          <el-menu-item index="6-2" @click="logout" route="/">
            登出
          </el-menu-item>
        </el-submenu>
      <template  v-else >
        <el-menu-item index="4" route="/login" class="userinfo" >
        登陆
        </el-menu-item>
        <el-menu-item index="5" route="/register" class="userinfo">
        注册
        </el-menu-item>
      </template>
    </el-menu>
</el-header>
        <el-container>
            <el-main>
                <!-- <el-card class="box-card">
                    <div slot="header">
                        <span>用户个人信息</span>
                    </div>
                    <div class="userinfo">
                    <p>用户名:{{uinfo.nickname}}</p>
                    <p>密码：{{uinfo.password}}</p>
                    <p>电话:{{uinfo.phone}}</p>
                    </div>
                    
                </el-card> -->
                <div class="userinfo">
                    <p>用户名:{{uinfo.nickname}}</p>
                    <p>密码：{{uinfo.password}}</p>
                    <p>电话:{{uinfo.phone}}</p>
                </div>
            </el-main>
        </el-container>
        <el-footer>&copy; by chen</el-footer>
</el-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      uinfo: "getUserInfo",
      loginStatus: "getUserLoginStatus"
    })
  },
  methods: {
    ...mapActions({
      logout: "logout"
    })
  },
  created() {
    if (localStorage.getItem("uinfo")) {
      this.$store.commit("setUserLoginStatus", true);
    }
  }
};
</script>
<style>
 li.el-menu-item.userinfo{
   float: right;
 }
 li.userinfo.el-submenu{
   float: right;
 }
</style>
