<template>
    <el-container>
<el-table :data="commentitems"
    border 
    style="width:100%">
  <el-table-column label="题目"  prop="issue_id" width="180"></el-table-column>
  <el-table-column label="作者" prop="user_id" width="180"></el-table-column>
  <el-table-column label="评论内容" prop="comment_content" width="180" >
    <template slot-scope="scope">
      <p v-html="scope.row.comment_content"></p>
    </template>
  </el-table-column>
  <el-table-column label="创建时间" prop="created"></el-table-column>
  <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <!-- <el-button @click="handleReadClick(scope.row)" type="text" size="small">查看</el-button> -->
        <!-- <el-button type="text" @click="handleEditClick(scope.row)" size="small">编辑</el-button> -->
        <el-button type="text" @click="handleDelClick(scope.row)" size="small">删除</el-button>
      </template>
    </el-table-column>
</el-table>
    </el-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data(){
    return {
      input23:'',
    }
  },
  computed: {
    ...mapGetters({
      // items: "getItems",
      commentitems: "getcommentItems",
      issuestatus: "getcommentstatus",
    })
  },
  methods: {
    ...mapActions({
      logout: "logout"
    }),
    // handleReadClick(row) {
    //   console.log(row.issue_id);
    //   // this.$router.push("/issuedetail/" + row.issue_id);
    // },
    handleEditClick(row) {
      console.log(row.issue_id)
      // this.$router.push("/issueupdate/"+row.issue_id)
    },
    handleDelClick(row) {
       var item = { comment_id: row.comment_id };
      this.$store.dispatch("deletecomment",item)
       setTimeout(() => {
        if (this.issuestatus) {
          location.reload()
          return;
        }
      }, 1000);
    }
  },
  created() {
    this.$store.dispatch("queryallcomments")
  }
};
</script>
<style>
</style>


