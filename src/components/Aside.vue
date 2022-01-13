<template>
  <div>
    <el-menu
        style="width: 200px; min-height: calc(100vh - 50px)"
        default-active="2"
        class="el-menu-vertical-demo">
<!--        @open="handleOpen"-->
<!--        @close="handleClose"-->

      <el-sub-menu>
        <template #title>选项1</template>
        <el-menu-item index="1-4-1">选项1-1</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span>导航一</span>
      </el-menu-item>
      <el-menu-item index="3" >
        <el-icon><document /></el-icon>
        <span>Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <span>Navigator Four</span>
      </el-menu-item>
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
// const handleOpen = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
// const handleClose = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
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