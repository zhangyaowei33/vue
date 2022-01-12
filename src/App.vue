<template>
  <div>
    <Header>

    </Header>
  </div>
  <router-view/>
</template>

<style>

</style>
<script>
import Header from "@/components/Header";
// import  {ArrowDown}  from '@element-plus/icons-vue'

export default {
  name:"Layout",
  components:{
    Header,
    // ArrowDown
  }
}
</script>