<template>
<el-container width="300px">
  <el-header> 
    <el-menu default-active="activeIndex" mode="horizontal">
      <el-menu-item index="1">首页</el-menu-item>
      <el-submenu index="2">
       <template slot="title">帖子管理</template>
        <el-menu-item index="2-1">
          <router-link to="/issue">发布帖子</router-link>
        </el-menu-item>
        <el-menu-item index="2-2">任务二</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">
      <el-input
      placeholder="请输入内容"
     v-model="input23">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </el-input>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/login">登陆</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link to="/register">注册</router-link>
      </el-menu-item>
    </el-menu>
</el-header>
   
<div class="line"></div>
  <el-container>
    <el-aside >
      <template slot="title">侧边导航区域</template>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
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
      <el-table :data="urls">
         <el-table-column
        prop="url"
       >
      </el-table-column>
      </el-table>
  <el-pagination
  :page-size="20"
  :pager-count="11"
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
</el-main>
</el-container>
<el-footer>@copyright by chen</el-footer>
</el-container>
</template>
<script>
export default {
  data() {
    const item = {
     url:"帖子"
    };
    return {
      urls: Array(20).fill(item)
    };
  }
};
</script>
<style>
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

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
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>