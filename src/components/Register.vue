<template>
  <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="用户名">
    <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input type="password" v-model="form.passwd" placeholder="请输入密码"></el-input>
  </el-form-item>
  <el-form-item label="确认密码">
    <el-input  type="password" v-model="form.confirmpasswd" placeholder="再次输入密码"></el-input>
  </el-form-item>
  <el-form-item label="电话">
    <el-input v-model="form.phone" placeholder="请输入电话号码"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>

</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>