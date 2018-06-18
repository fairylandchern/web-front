<template>
        <el-container>
        <el-container>
            <el-main>
                <div class="userinfo">
                  <a class="person_add_focus">
                    <i class="el-icon-plus">关注</i>
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
      uinfo: "getuserdetail",
      loginStatus: "getUserLoginStatus"
    })
  },
  methods: {
    ...mapActions({
      logout: "logout"
    }),
    getdata() {
      let issue_id = this.$route.params.id;
      console.log("id is", issue_id);
      return issue_id;
    },
  },
  created() {
    var issue_id = this.getdata();
    console.log(issue_id)
    issue_id = parseInt(issue_id);
    var item = { id: issue_id };
    this.$store.dispatch("getuser",item)
  }
};
</script>
<style>
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
