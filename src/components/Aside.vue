<template>
  <div>
    <el-menu
        style="width: 200px; min-height: calc(100vh - 50px)"
        default-active="user"
        default-openeds="[1]"
        class="el-menu-vertical-demo"
        >

<!--        @open="handleOpen"-->
<!--        @close="handleClose"-->

      <el-sub-menu index="1">
        <template #title>系统管理</template>
        <el-menu-item index="user">用户管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>价格管理</template>
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

export default {
  name: "Aside",
  components:{
    Location,
    Document,
    IconMenu,
    Setting,
  }
}
</script>

<style scoped>

</style>