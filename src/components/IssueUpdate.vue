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
<div class="line"></div>
  <el-container>
    <el-aside >
        <span>分类:</span>
        <el-radio-group v-model="form.type_id" aria-orientation="vertical">
          <el-radio v-for="item in items" :label="item.main_title_type_id" :key="item.main_title_type_id">
            {{item.main_title_type_name}}
          </el-radio>
        </el-radio-group>
        
    </el-aside>
    <el-main>
    <el-form :model="form" :ref="form">
      <el-form-item>
        <span>标题</span>
        <el-input v-model="form.issue_title" placeholder="请输入标题"></el-input>
      </el-form-item>
     
      <el-form-item>
        <span>帖子内容</span>
         <vue-editor v-model="form.issue_content"
    @imageAdded="handleImageAdded"
    >

    </vue-editor>
    <el-button type="primary" @click="submit(form)">发布帖子</el-button>
      </el-form-item>
    </el-form>
</el-main>
</el-container>
<el-footer>&copy; by chen</el-footer>
</el-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      searchtext: ""
      // form: {
      //   issue_title: null,
      //   type_id: null,
      //   issue_content: null,
      //   user_id:null
      // }
    };
  },
  methods: {
    getdata() {
      let issue_id = this.$route.params.id;
      console.log("id is", issue_id);
      if (issue_id == undefined) {
      return null;
      }
      return issue_id;
    },
    handleImageAdded() {
      console.log("image added");
    },
    ...mapActions({
      logout: "logout"
    }),
    submit(form) {
    //   form.user_id = this.uinfo.id;
      this.$store.dispatch("updateIssue", form);
      console.log("this issue status is:", this.issuestatus);
      setTimeout(() => {
        if (this.issuestatus) {
          alert("更新帖子成功");
          this.$router.push("/");
          return;
        }
      }, 1000);
    }
  },
  computed: {
    ...mapGetters({
      form: "getissueitem",
      items: "getItems",
      uinfo: "getUserInfo",
      loginStatus: "getUserLoginStatus",
      issuestatus: "getissuestatus"
    })
  },
  mounted() {
  },
  created() {
    if (localStorage.getItem("uinfo")) {
      this.$store.commit("setUserLoginStatus", true);
    }
    var issue_id = this.getdata();
    console.log("issue id is:",issue_id)
    if (issue_id != null) {
      issue_id = parseInt(issue_id);
      console.log("the issue_id params is:", issue_id);
      var item = { issue_id: issue_id };
      this.$store.dispatch("getIssueByIssueId", item);
    }
    this.$store.commit("clearissueItem")
    this.$store.dispatch("getAllItems");
  }
};
</script>
<style>
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
}
span.e-radio-button_inner{
  display: inherit;
}
.el-radio-group{
  display: block;
}
.el-radio-button, .el-radio-button__inner{
  display: inherit;
}
.el-menu-item, .el-submenu__title{
  margin-bottom: 10px;
}
li.el-menu-item.userinfo{
   float: right;
 }
 li.userinfo.el-submenu{
   float: right;
 }
  header.el-header{
   padding: 0;
 }
 .el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

</style>
