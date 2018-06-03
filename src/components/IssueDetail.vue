<template>
    <!-- <div>
    <h1>this is issuedetail</h1>
    <h2>{{item.issue_id}} </h2>
    </div> -->
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
    <el-container>
        <el-main>
            <h2>{{item.issue_title}}</h2>
           <div v-html="item.issue_content"></div>
           <hr>
           <h3>评论信息</h3>
           <div v-for="(comment,index) in comments" :key="index" v-html="comment.comment_content">
             {{comment.issue_id}}
           </div>
        </el-main>
        <el-footer>
            <h4>发表评论</h4>
        <div  v-if="loginStatus">
           <vue-editor v-model="form.comment_content"></vue-editor>
           <el-button type="primary" @click="submit(form)">发布评论</el-button>
        </div>
       
        <p v-else>
          登陆后才可以发表评论
          <router-link to="/login">登陆</router-link>
        </p>
        </el-footer>
    </el-container> 
    <el-container>
        
    </el-container>
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
        comment_content: "发表言论"
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
