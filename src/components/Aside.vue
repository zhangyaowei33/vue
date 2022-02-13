<template>
  <div>
    <el-menu
        style="width: 200px; min-height: calc(100vh - 50px)"
        :default-active="path"

        router
        class="el-menu-vertical-demo"
        >
      <el-sub-menu index="1">
        <template #title>系统管理</template>
          <el-menu-item index="/book">图书管理</el-menu-item>
          <el-menu-item index="/user" v-if = "user.role ===1">用户管理</el-menu-item>
          <el-menu-item index="/category" v-if = "user.role ===1">分类管理</el-menu-item>

      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'
import request from "@/utils/request";

export default {
  name: "Aside",
  data(){
    return {
      user:{},
      path:this.$route.path //设置默认高亮
    }
  },
  components:{
    Location,
    Document,
    IconMenu,
    Setting,
  },
  created(){
    let userStr = sessionStorage.getItem("user") || "{}"
    this.user = JSON.parse(userStr)

    //请求服务端，确认当前用户的合法信息
    request.get("/user/" + this.user.id).then(res => {
      if(res.code === "0"){
        this.user = res.data
      }
    })
  }
}
</script>

<style scoped>

</style>