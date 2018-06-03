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
        <el-menu-item index="2-2">浏览帖子</el-menu-item>
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
    <el-aside >
      <template slot="title">侧边导航区域</template>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>分类</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
    <el-main>
    <el-form :model="form" :ref="form">
      <el-form-item label="标题">
        <el-input v-model="form.issue_title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item >
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
<el-footer>@copyright by chen</el-footer>
</el-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  // type Issue struct {
  // 	IssueId int `json:"issue_id" orm:"column(issue_id);pk;auto;uinque" `
  // 	UserId  int `json:"user_id"  orm:"column(user_id)"`
  // 	IssueContent string `json:"issue_content" orm:"column(issue_content);type(text);size(1073741824)"`
  // 	IssueTitle string `json:"issue_title" orm:"column(issue_title);size(100)"`
  // 	Created time.Time `json:"created,omitempty" orm:"column(created);auto_now_add;type(datetime)"`
  // 	Updated time.Time `json:"updated,omitempty" orm:"column(updated);auto_now_add;type(datetime)"`
  // 	TypeId int `json:"type_id,omitempty" orm:"column(type_id)" `
  // }

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
      loginStatus: "getUserLoginStatus",
      issuestatus: "getissuestatus"
    })
  },
  mounted() {},
  created() {
    if (localStorage.getItem("uinfo")) {
      this.$store.commit("setUserLoginStatus", true);
    }
  }
};
</script>
