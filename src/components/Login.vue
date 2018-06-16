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
  <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="register_form">
    <el-form-item label="用户名" prop="nickname">
        <el-input v-model="loginForm.nickname" placeholder="请输入姓名" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="false"></el-input>
    </el-form-item>
    <el-form-item >
        <el-button type="primary" @click="submitForm(loginForm)">提交</el-button>
        <el-button type="primary" @click="resetForm(loginForm)">重置</el-button>
    </el-form-item>
  </el-form>
    </el-main>
</el-container>
</el-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatename = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入昵称"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        nickname: "",
        password: ""
      },
      rules: {
        password: [
          { validator: validatePass, trigger: "blur", required: true }
        ],
        nickname: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { validator: validatename, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(form) {
      this.$refs["loginForm"].validate(valid => {
        if (!valid) {
          alert("error in login");
          return false;
        }
      });
      this.$store.dispatch("login", form);
      setTimeout(()=>{
      var flag=this.$store.getters.getUserLoginStatus
      if (flag) {
         this.$router.push({ path: "/" });
      }else{
        alert("登陆失败")
        return 
      }
      },1000)
      
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    ...mapActions({
      logout: "logout"
    })
  },
  computed: {
    ...mapGetters({
       loginStatus:"getUserLoginStatus"
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
.register_form{
  padding: 10px;
    margin: 0 8px;
    width: 40%;
    align-self: center;
    align-content: center;
    margin-right: auto;
    margin-left: auto;
}
 li.el-menu-item.userinfo{
   float: right;
 }
 li.userinfo.el-submenu{
   float: right;
 }
</style>


