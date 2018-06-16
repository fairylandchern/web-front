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
    <el-form ref="form"  :model="form" status-icon  :rules="rules1" label-width="80px" class="register_form">
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
 <el-footer>&copy;chen</el-footer>
</el-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    var checkname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("昵称不能为空"));
      }else{
        callback();
      }
    };
    var validatepass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("密码不可以为空"));
      }else{
        callback();
      }
    };
    var validatecheckpass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("确认密码不能为空"));
      } else if(!this.form.password){
        callback(new Error("密码不能为空"))
      }
      else if (value != this.form.password) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    var validatephone = (rule, value, callback) => {
      var re_ph= /^[1][3,4,5,7,8][0-9]{9}$/; 
      if (!value) {
        callback(new Error("手机号不能为空"));
      } else if (!re_ph.test(value)) {
        callback(new Error("手机号格式不正确"));
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
          return ;
        }
      });
      this.$store.dispatch("register", form);
      var flag = this.$store.getters.getUserStatus;
      if (flag) {
        alert("register successs");
        this.$router.push({ path: "/login" });
      } else {
        alert("registered failed");
        return ;
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
