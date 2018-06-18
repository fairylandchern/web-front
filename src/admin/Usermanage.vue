<template>
    <el-container>
<el-table :data="issueitems"
    border 
    style="width:100%">
  <el-table-column label="用户id"  prop="id" width="180"></el-table-column>
  <el-table-column label="用户名" prop="nickname" width="180"></el-table-column>
  <el-table-column label="用户电话" prop="phone" width="180"></el-table-column>
  <el-table-column label="创建时间" prop="created" ></el-table-column>
  <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="handleReadClick(scope.row)" type="text" size="small">查看</el-button>
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
  computed: {
    ...mapGetters({
      status:"getUserStatus",
      issueitems: "getAllusers",
    })
  },
  methods: {
    handleReadClick(row) {
      console.log(row.issue_id);
      this.$router.push("/admin/main/userinfo/" + row.id);
    },
    // handleEditClick(row) {
    //   console.log(row.issue_id)
    //   this.$router.push("/issueupdate/"+row.issue_id)
    // },
    handleDelClick(row) {
      console.log(row.id)
       var item = { id: row.id };
      this.$store.dispatch("deleteuser",item)
       setTimeout(() => {
        if (this.status) {
          location.reload()
          return;
        }
      }, 1000);
    }
  },
  created() {
    // this.$store.dispatch("getAllItems");
    this.$store.dispatch("getallusers");
  }
};
</script>
<style>
</style>


