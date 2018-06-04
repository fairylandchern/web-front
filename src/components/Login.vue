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
  <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
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
      if (this.$store.getters.getUserLoginStatus) {
      }
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

