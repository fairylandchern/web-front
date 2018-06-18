<template>
    <!-- <div>
    <h1>this is issuedetail</h1>
    <h2>{{item.issue_id}} </h2>
    </div> -->
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
    <el-container>
        <el-main class="wrapper">
          <div class="issue_title">
            <span>{{item.issue_title}}</span>
         </div>
                <!--  <div class="issue">
                  <p v-html="item.issue_content"></p>
                </div> -->
    <table class="comment_content" >
             <tbody>
            <tr>
               <td class="show_items_detail" >楼主：{{item.user_id}}</td>
               <td><p v-html="item.issue_content"></p></td>
             </tr>
             <tr>
               <td class="show_items_detail"></td>
               <td class="td_time">
                 <span class="time">发表于：{{item.created.split('T')[0]}} {{item.created.split('T')[1].split('Z')[0]}}</span>

               </td>
             </tr>
             </tbody>
             
           </table>
           <h3>评论信息</h3>
           <table class="comment_content" v-for="(comment,index) in comments" :key="index">
             <tbody>
            <tr>
               <td class="show_items_detail">用户：{{comment.user_id}}</td>
               <td><p v-html="comment.comment_content"></p></td>
             </tr>
            <tr>
               <td class="show_items_detail"></td>
               <td class="td_time">
                 <span class="time">发表于：{{comment.created.split('T')[0]}} {{comment.created.split('T')[1].split('Z')[0]}}</span>
               </td>
             </tr>
             </tbody>
             
           </table>
            <h3>发表评论</h3>
        <div  v-if="loginStatus">
           <vue-editor v-model="form.comment_content" aria-placeholder="请输入评论"></vue-editor>
           <el-button type="primary" @click="submit(form)">发布评论</el-button>
        </div>
       
        <p v-else>
          登陆后才可以发表评论
          <router-link to="/login">登陆</router-link>
        </p>
        </el-main>
        
    </el-container> 
    <el-container>
        
    </el-container>
    <el-footer>&copy;chen</el-footer>
</el-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      form: {
        user_id: null,
        issue_id: null,
        comment_content: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      item: "getissueitem",
      loginStatus: "getUserLoginStatus",
      uinfo: "getUserInfo",
      comment_status: "getcommentstatus",
      comments:"getcommentItems",
    })
  },
  methods: {
    getdata() {
      let issue_id = this.$route.params.id;
      console.log("id is", issue_id);
      return issue_id;
    },
    submit(form) {
      form.issue_id = this.item.issue_id;
      form.user_id = this.uinfo.id;
      console.log("the user info is", this.uinfo);
      console.log("the name is:", form.issue_id, form.user_id);
      this.$store.dispatch("createComment", form);
      setTimeout(() => {
        if (this.comment_status) {
          location.reload()
          return;
        }
      }, 1000);
    },
    ...mapActions({
      logout: "logout"
    })
  },
  created() {
    if (localStorage.getItem("uinfo")) {
      this.$store.commit("setUserLoginStatus", true);
    }
    var issue_id = this.getdata();
    issue_id = parseInt(issue_id);
    var item = { issue_id: issue_id };
    this.$store.dispatch("getIssueByIssueId", item);
    this.$store.dispatch("queryallcommentsbyid",issue_id)
  },
  mounted() {},
  watch: {
    $route(to, from) {
      this.getdata();
    }
  }
};
</script>
<style>
.issue{
  border: 1px solid royalblue;
  background-color: blanchedalmond;
}
.box-card {
    width: 80%;
    margin-left:auto;
    margin-right:auto;
}

.title{
  font: outline;
  font-size: 20px;
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif
}
.comment{
  background-clip: border-box;
  background-size: 80%;
  background-color:ghostwhite;
}
.comment-div{
  size: 80%;
  border: 1px cornflowerblue solid;
  background-color: antiquewhite;
}
.el-aside{
  /* float: left; */
  padding-left: 15px;
  border-right: 1px solid #dddddd;
}
 li.el-menu-item.userinfo{
   float: right;
 }
 li.userinfo.el-submenu{
   float: right;
 }
.wrapper{
  width:80%;
  align-self: center;
}
.issue_title{
    padding: 10px;
    background-color: #dcdfe6;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
    margin: 8px 0;
    border: 1px solid #ddd;
}
.comment_content{
  border: 1px solid #ddd;
    margin: 8px 0;
    width: 100%;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
    border-collapse: separate;
    background-color: #fff;
    min-height: 40px;
    border-spacing: 0;
}
.show_items_detail{
  border-right: 1px solid rgb(221, 221, 221);
    background: rgb(239, 244, 251);
    vertical-align: top;
    width: 110px;
    margin: 0px;
    padding: 0px;
}
.td_time{
  border-top: 1px solid #dcdfe6;
}
.time{
  float:left;
  font-style: oblique;
  font-family: monospace;
}
</style>

