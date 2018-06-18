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
            <el-main>
                <!-- <el-card class="box-card">
                    <div slot="header">
                        <span>用户个人信息</span>
                    </div>
                    <div class="userinfo">
                    <p>用户名:{{uinfo.nickname}}</p>
                    <p>密码：{{uinfo.password}}</p>
                    <p>电话:{{uinfo.phone}}</p>
                    </div>
                    
                </el-card> -->
                <div class="userinfo">
                  <a class="person_add_focus">
                    <i class="el-icon-edit">修改信息</i>
                  </a>
                  <dl class="person_photo">
                    <dt>
                      <a href="javascript:;">
                      <img src="../assets/head-icon.gif" class="header-icon">
                      </a>
                    </dt>
                    <dd class="focus_num"><b>0</b>关注</dd>
                    <dd class="fans_num"><b>0</b>粉丝</dd>
                    
                  </dl>
                  <dl class="person-info">
            <dt class="person-nick-name"><span>{{uinfo.nickname}}</span></dt>
            <dd class="person-detail"> 
            			            			            			            		{{uinfo.id}}<span>|</span>            			            			            </dd>
            <dd class="person-sign">没有内容可显示</dd>
            <dd style="margin: 10px 0px">
		          <div class="person-status clearfix">
		            <div class="status">
                        <span class="scores">
                            
                            
                            <em class="bbs bbs1" onclick="javascript:window.open('http://bbs.csdn.net/users/sinat_39256703/topics','_blank')" title="等级: 1，积分: 15"></em>
                            
                        </span>
                        <span class="medals">
	                        <div class="wraper" style="width: auto"></div>
                        </span>
                    </div>
		          </div>
            </dd>
          </dl>
                    <!-- <p>用户名:{{uinfo.nickname}}</p>
                    <p>密码：{{uinfo.password}}</p>
                    <p>电话:{{uinfo.phone}}</p> -->
                </div>
            </el-main>
        </el-container>
        <el-footer>&copy; by chen</el-footer>
</el-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      uinfo: "getUserInfo",
      loginStatus: "getUserLoginStatus"
    })
  },
  methods: {
    ...mapActions({
      logout: "logout"
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
 li.el-menu-item.userinfo{
   float: right;
 }
 li.userinfo.el-submenu{
   float: right;
 }
 div.userinfo{
   background: #fff;
    border: 1px solid #dcdcdc;
    margin: 10px auto 0;
    overflow: hidden;
    padding: 0;
    position: relative;
 }
 header.el-header{
   padding: 0;
 }
 .el-footer{
   padding:0;
   background-color: #fff;
 }
 .person_add_focus{
   display: block;
    height: 22px;
    line-height: 22px;
    background: #ececec;
    color: #666;
    font-size: 12px;
    padding: 0px 10px;
    cursor: pointer;
    position: absolute;
    right: 114px;
    top: 23px;
 }
 .person_photo{
       width: 150px;
    height: 200px;
    float: left;
    margin: 15px 30px 15px 20px;
 }
 .header-icon{
   width: 150px;
    height: 150px;
    border: none;
 }
 .fans_num {
    width: 72px;
    height: 32px;
    float: left;
    font-size: 14px;
    color: #999;
    text-align: center;
    overflow: hidden;
}
.focus_num {
    width: 72px;
    height: 32px;
    border-right: 1px solid #f0f0f0;
    float: left;
    font-size: 14px;
    color: #999;
    text-align: center;
    overflow: hidden;
}
.person-info {
    float: left;
    width: 950px;
    margin-top: 30px;
}
.person-nick-name span {
    display: block;
    float: left;
    font-size: 24px;
    color: #333;
    font-weight: normal;
}
.person-detail {
    font-size: 16px;
    color: #333;
    margin-top: 30px;
    position: absolute;
}
.person-sign {
   overflow: hidden;
    font-size: 14px;
    color: #999;
    border-top: 1px solid #f0f0f0;
    padding-top: 8px;
    margin-top: 50px;
    line-height: 22px;
    word-wrap: break-word;
    word-break: break-all;
}
</style>
