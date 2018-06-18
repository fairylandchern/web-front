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
      <el-menu-item index="">
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
   
<el-table :data="issueitems"
    border 
    style="width:100%">
  <el-table-column label="题目"  prop="issue_title" width="180"></el-table-column>
  <el-table-column label="作者" prop="user_id" width="180"></el-table-column>
  <el-table-column label="创建时间" prop="created" ></el-table-column>
  <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="handleReadClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" @click="handleEditClick(scope.row)" size="small">编辑</el-button>
        <el-button type="text" @click="handleDelClick(scope.row)" size="small">删除</el-button>
      </template>
    </el-table-column>
</el-table>
    </el-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      // items: "getItems",
      loginStatus: "getUserLoginStatus",
      issueitems: "getUserIssues",
      issuestatus: "getissuestatus",
    })
  },
  methods: {
    ...mapActions({
      logout: "logout"
    }),
    handleReadClick(row) {
      console.log(row.issue_id);
      this.$router.push("/issuedetail/" + row.issue_id);
    },
    handleEditClick(row) {
      console.log(row.issue_id)
      this.$router.push("/issueupdate/"+row.issue_id)
    },
    handleDelClick(row) {
      console.log(row.issue_id)
       var item = { issue_id: row.issue_id };
      this.$store.dispatch("deleteIssueById",item)
       setTimeout(() => {
        if (this.issuestatus) {
          location.reload()
          return;
        }
      }, 1000);
    }
  },
  created() {
    if (localStorage.getItem("uinfo")) {
      this.$store.commit("setUserLoginStatus", true);
    }
    // this.$store.dispatch("getAllItems");
    this.$store.dispatch("getIssues");
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


