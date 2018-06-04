<template>
<el-container width="300px">
   <el-header> 
    <el-menu default-active="activeIndex" mode="horizontal" router=true>
      <el-menu-item index="1" route="/">
        首页
      </el-menu-item>
      <el-submenu index="2">
       <template slot="title">帖子管理</template>
        <el-menu-item index="2-1" route="/issue">
          发布帖子
        </el-menu-item>
        <!-- <el-menu-item index="2-2">浏览帖子</el-menu-item> -->
      </el-submenu>
      <el-menu-item index="3">
      <el-input
      placeholder="请输入内容" v-model="searchtext">
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
    <!-- <el-aside >
        <span>分类</span>
        <el-checkbox-group aria-orientation="vertical">
          <el-checkbox  v-for="(item,index) in items"  :key="index">
             {{item.main_title_type_name}}
          </el-checkbox>
        </el-checkbox-group>
    </el-aside> -->
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
<div v-html="form.content"></div>
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
      searchtext: "",
      form: {
        issue_title: "",
        type_id: 1,
        issue_content: "",
        user_id: 1
      }
    };
  },
  methods: {
    handleImageAdded() {
      console.log("image added");
    },
    ...mapActions({
      logout: "logout"
    }),
    submit(form) {
      this.$store.dispatch("pushIssue", form);
      console.log("this issue status is:", this.issuestatus);
      setTimeout(() => {
        if (this.issuestatus) {
          alert("添加文本成功");
          this.$router.push('/')
          return;
        }
      }, 1000);
    }
  },
  computed: {
    ...mapGetters({
      items:'getItems',
      loginStatus: "getUserLoginStatus",
      issuestatus: "getissuestatus"
    })
  },
  mounted() {},
  created() {
    if (localStorage.getItem("uinfo")) {
      this.$store.commit("setUserLoginStatus", true);
    }
    this.$store.dispatch('getAllItems')
  }
};
</script>
