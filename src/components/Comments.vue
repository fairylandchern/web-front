<template>
    <el-container width="300px">
  <el-header> 
    <el-menu default-active="activeIndex" mode="horizontal" router="true">
      <el-menu-item index="1" route="/">
        首页
      </el-menu-item>
      <el-submenu index="2">
       <template slot="title">帖子管理</template>
        <el-menu-item index="2-1" route="/issue">
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
        <el-submenu index="6" v-if="loginStatus">
          <template slot="title">用户信息</template>
          <el-menu-item index="6-1" route="/userinfo">
            个人主页
          </el-menu-item>
          <el-menu-item index="6-2" @click="logout" route="/">
            登出
          </el-menu-item>
        </el-submenu>
      <template  v-else>
        <el-menu-item index="4" route="/login" >
        登陆
        </el-menu-item>
        <el-menu-item index="5" route="/register">
        注册
        </el-menu-item>
      </template>
    </el-menu>
</el-header>
    </el-container>
</template>
<script>
import {mapGetters,mapActions}   from 'vuex';
export default {
   computed: {
    ...mapGetters({
      items: "getItems",
      loginStatus: "getUserLoginStatus",
      issueitems: "getissues"
    })
  },
  methods: {
    ...mapActions({
      logout: "logout"
    })
  }
}
</script>
<style>

</style>


