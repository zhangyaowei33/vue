<template>
  <div style="width: 100%; height: 100vh; background-color:mediumaquamarine ; overflow: hidden" >
    <div style="width: 400px; margin: 150px auto">
      <div style="color: coral;font-size: 40px; text-align: center ;padding: 30px 0">欢迎登录</div>
      <el-form ref="form" :model="form" size="normal" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="login">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import request from "@/utils/request";
import {ElMessage} from "element-plus";
import {reactive} from "vue";

const rules = reactive({
  username: [{required: true, message: '请输入用户名', trigger: 'blur',}],
  password: [{required: true, message: '请输入密码', trigger: 'blur',}]
})

export default {
  name: "Login.vue",
  data(){
    return{
      form:{},
      rules
    }
  },
  created() {
    sessionStorage.removeItem("user") //登录时清除sess缓存
  },
  methods:{
    login(){
      this.$refs['form'].validate((valid) =>{
        if(valid){
          request.post("/user/login", this.form).then(res => {
            if(res.code === '0'){
              ElMessage({
                type: "success",
                message: "登录成功"
              })
              sessionStorage.setItem("user",JSON.stringify(res.data)) //登录成功后缓存用户信息
              this.$router.push("/") //登录成功后页面自动跳转
            }else {
              ElMessage({
                type: "error",
                message: res.msg
              })
            }
          })
        }
      })

    }
  }
}
</script>

<style scoped>

</style>