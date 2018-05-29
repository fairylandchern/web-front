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
    <el-form :model="form">
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item >
         <vue-editor v-model="form.content"
    @imageAdded="handleImageAdded"
    >

    </vue-editor>
    <el-button type="primary" @click="submit()">发布帖子</el-button>
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

  data() {
    return {
      searchtext:'',
      form: {
        title: "",
        titletype: "",
        content: "<p>some content</p>",
        nickname: ""
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
    submit() {
      alert("the content is", this.content);
    }
  },
  // if you need to get the current editor object, you can find the editor object like this, the $ref object is a ref attribute corresponding to the dom redefined
  // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
  computed: {
    quill() {
      return this.$refs.myTextEditor.quill;
    },
    ...mapGetters({
      loginStatus: "getUserLoginStatus"
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
