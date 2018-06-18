<template>
<el-container >
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
   
<div class="line"></div>
  <el-container>
    <el-aside >
     <Calendar
     ref="Calendar"
     v-on:changeMonth="changeDate"
     :markDate="arr"
     ></Calendar>
        <el-radio-group v-model="type_id"  @change="filterissues(type_id)">
          
          <ul>
            <el-radio-button disabled="true"><li>分类：</li><br></el-radio-button>
            <el-radio-button :label=0 ><li>全部</li><br></el-radio-button>
          <el-radio-button  v-for="item in items" :label="item.main_title_type_id" :key="item.main_title_type_id">
           <li> {{item.main_title_type_name}}</li><br>
          </el-radio-button>
          </ul>
        </el-radio-group>
    </el-aside>
    <el-main>
      <el-menu default-active="1" router="true">
        <el-menu-item   v-for="(item,index) in issueitems" :key="index"  :index="index" :route="'/issuedetail/'+item.issue_id" class="issue-main" >
        <!-- <router-link  to="'/issuedetail'+index" ></router-link> -->
            <span style="float:right">{{item.created.split('T')[0]}}</span>
            {{item.issue_title}}
        </el-menu-item>
      </el-menu>
</el-main>
</el-container>
<el-footer>&copy;chen</el-footer>
</el-container>
</template>
<script>
import { mapGetters,mapActions,mapMutations } from "vuex";
import Calendar from "vue-calendar-component";
export default {
  components:{
    Calendar
  },
  data() {
    
    return {
      type_id:null,
      
    };
  },
  computed:{...mapGetters({
    items:'getItems',
    loginStatus:"getUserLoginStatus",
    issueitems:"getissues"
  })
  },
  methods:{
    ...mapActions({
      logout:"logout",
    }),
    ...mapMutations(
     {
      filterissues:"filterissues",
     }
    ),
    changeDate(){

    }
    // filterissues(type_id){
    //   console.log("the type id is:",type_id)
    //   var tempitems=this.issueitems.filter(issueitem=>{
    //     return issueitem.type_id===type_id
    //   })
    //   console.log("the filter item is:",tempitems)
    //   this.$store.commit("filterissues",this.type_id)
    // }
  },
  created(){
    if(localStorage.getItem("uinfo")){
      this.$store.commit("setUserLoginStatus",true)
    }
    this.$store.dispatch('getAllItems')
    this.$store.dispatch('getIssues')
  }
};
</script>
<style>
.issue-main{
  border-bottom: 1px solid #ebeef5;
  background-color:#dcdfe6;
}
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
  line-height: 20px;
}
.el-header{
  text-align: center;
  margin: 0;
  padding:0;
  box-shadow: 0 0 10px;
}
.userinfo{
  float:right;
}

body >.el-container{
  margin:0;
  padding: 0;
}
span.e-radio-button_inner{
  display: inherit;
}
.el-radio-group{
  display: block;
}
.el-radio-button, .el-radio-button__inner{
  display: inherit;
}
.el-menu-item, .el-submenu__title{
  margin-bottom: 10px;
}
 .wh_content_item .wh_isToday{
   background:#0f6;
 }
 li.el-menu-item.userinfo{
   float: right;
 }
 li.userinfo.el-submenu{
   float: right;
 }
/* body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
} */
</style>