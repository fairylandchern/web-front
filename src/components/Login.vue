<template>
  <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="name">
        <el-input v-model="loginForm.name" placeholder="请输入姓名" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="loginForm.pass" auto-complete="false"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkpass">
        <el-input v-model="loginForm.checkpass" auto-complete="false">
        </el-input>
    </el-form-item>
    <el-form-item >
        <el-button type="primary" @click="submitForm(loginForm)">提交</el-button>
        <el-button type="primary" @click="resetForm(loginForm)">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
      var validatePass=(rule,value,callback)=>{
          if(value===''){
              callback(new Error("请输入密码"))
          }else{
              if(this.loginForm.checkPass!==''){
                  this.$refs.loginForm.validateField("checkpass");
              }
              callback();
          }
      };
      var validatePass2=(rule,value,callback)=>{
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.loginForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return{
          loginForm:{
              name:'',
              pass:'',
              checkpass:''
          },
          rules:{
               pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
         name:[
              { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
         ]
          }
      };
  },
     methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

