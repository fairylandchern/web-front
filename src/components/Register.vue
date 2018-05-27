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
      placeholder="请输入内容" v-model="input23">
       <i slot="prefix" class="el-input__icon el-icon-search"></i>
       </el-input>
      </el-menu-item>
        <el-submenu index="6" v-if="loginStatus">
          <template slot="title">用户信息</template>
          <el-menu-item index="6-1" route="/userinfo/:id">
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
    <el-form ref="form"  :model="form" status-icon  :rules="rules1" label-width="80px">
  <el-form-item label="用户名" prop="nickname">
    <el-input v-model="form.nickname" placeholder="请输入用户名"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="confirmpasswd">
    <el-input  type="password" v-model="form.confirmpasswd" placeholder="再次输入密码"></el-input>
  </el-form-item>
  <el-form-item label="电话" prop="phone">
    <el-input v-model="form.phone" placeholder="请输入电话号码"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit(form)">立即创建</el-button>
    <el-button type="primary" @click="resetform(form)">取消</el-button>
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
    var checkname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("昵称不能为空"));
      }
    };
    var validatepass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("密码不可以为空"));
      }
    };
    var validatecheckpass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("确认密码不能为空"));
      } else if (value != this.form.password) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    var validatephone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("手机号不能为空"));
      } else if (value.length != 11) {
        callback(new Error("手机号应该为12位"));
      } else {
        callback();
      }
    };
    return {
      form: {
        nickname: "",
        password: "",
        confirmpasswd: "",
        phone: ""
      },
      rules1: {
        nickname: [{ validator: checkname, required: true }],
        password: [{ validator: validatepass, required: true }],
        confirmpasswd: [{ validator: validatecheckpass, required: true }],
        phone: [{ validator: validatephone, required: true }]
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs["form"].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          alert("error submit!");
          return false;
        }
      });
      this.$store.dispatch("register", form);
      var flag = this.$store.getters.getUserStatus;
      if (flag) {
        alert("register successs");
        this.$router.push({ path: "/login" });
      } else {
        alert("registered failed");
        return false;
      }
    },
    resetform(form) {
      this.$refs[form].resetFields();
    },
    ...mapActions({
      logout: "logout"
    })
  },
  computed: {
    ...mapGetters({
      loginStatus: "getUserLoginStatus"
    })
  },
  created() {
    if (localStorage.getItem("uinfo")) {
      this.$store.commit("setUserLoginStatus", true);
    }
  }
};
</script>