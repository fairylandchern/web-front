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
        <el-menu-item index="2-2">浏览帖子</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">
      <el-input
      placeholder="请输入内容" v-model="input23">
       <i slot="prefix" class="el-input__icon el-icon-search"></i>
       </el-input>
      </el-menu-item>
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
   
<div class="line"></div>
  <el-container>
    <el-aside >
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
     >
      <el-menu-item >分类</el-menu-item>
     <el-menu-item v-for="item in items" :key="item.id" :index="item.id">
       {{item.main_title_type_name}}
     </el-menu-item>
    </el-menu>
    </el-aside>
    <el-main>
      <el-menu default-active="1" router="true">
        <el-menu-item   v-for="(item,index) in issueitems" :key="index"  :index="index" :route="'/issuedetail/'+item.issue_id"  >
        <!-- <router-link  to="'/issuedetail'+index" ></router-link> -->
            {{item.issue_title}}{{index}}
        </el-menu-item>
      </el-menu>
  <el-pagination
  :page-size="20"
  :pager-count="11"
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
</el-main>
</el-container>
<el-footer>copyright by chen</el-footer>
</el-container>
</template>
<script>
import { mapGetters,mapActions } from "vuex";
export default {
  data() {
    const item = {
     url:"帖子",
    };
    return {
      urls: Array(20).fill(item),
    };
  },
  computed:{...mapGetters({
    items:'getItems',
    loginStatus:"getUserLoginStatus",
    issueitems:"getissues"
  })
  },
  methods:{
    ...mapActions({
      logout:"logout"
    })
  },
  created(){
    if(localStorage.getItem("uinfo")){
      this.$store.commit("setUserLoginStatus",true)
    }
    this.$store.dispatch('getAllItems')
    this.$store.dispatch('getIssues')
  }
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
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>