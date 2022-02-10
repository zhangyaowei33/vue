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
          <div style="display: flex">
            <el-input prefix-icon="el-icon-key" v-model="form.validCode" style="width: 50%;" placeholder="请输入验证码"></el-input>
            <ValidCode @input="createValidCode" />
          </div>
        </el-form-item>
        <div style="text-align: center " >
          <el-radio v-model="form.role" label=1 >管理员</el-radio>
          <el-radio v-model="form.role" label=2 >普通用户</el-radio>
        </div>
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
import ValidCode from "@/components/ValidCode";
import {reactive} from "vue";

const rules = reactive({
  username: [{required: true, message: '请输入用户名', trigger: 'blur',}],
  password: [{required: true, message: '请输入密码', trigger: 'blur',}]
})

export default {
  name: "Login.vue",
  components: {
    ValidCode,
  },
  data(){
    return{
      form:{},
      rules,
      validCode: ''
      // 加背景图片
      // bg: {
      //   backgroundImage: "url(" + require("@/assets/bg.jpg") + ")",
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "100% 100%"
      // }
    }
  },
  created() {
    sessionStorage.removeItem("user") //登录时清除sess缓存
  },
  methods:{
    createValidCode(data) {
      this.validCode = data
    },
    login(){
      this.$refs['form'].validate((valid) =>{
        if(valid){
          if (!this.form.validCode) {
            ElMessage({
              type: "error",
              message: "请填写验证码"
            })
            return
          }
          if(this.form.validCode.toLowerCase() !== this.validCode.toLowerCase()) {
            ElMessage({
              type: "error",
              message: "验证码错误"
            })
            return
          }
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