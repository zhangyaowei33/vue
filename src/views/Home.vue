<template>
  <div style="padding: 10px">
<!--    功能区域-->
    <div style="margin: 10px 0">
      <el-button type="primary">新增</el-button>
      <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button>
    </div>

<!--    搜索区域-->
    <div>
      <el-input v-model="search" placeholder="请输入关键字" style="width: 20% ;margin: 10px 0"></el-input>
      <el-button type="primary" style="margin: 5px">查询</el-button>
    </div>

<!--    数据展示区域-->
    <el-table :data="tableData" border stripe style="width: calc(100% - 30px)">
      <el-table-column prop="date" label="日期" sortable />
      <el-table-column prop="name" label="名字" />
      <el-table-column prop="address" label="地址" />
      <el-table-column label="操作" >
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-popconfirm title="确认删除该数据吗?">
            <template #reference>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

<!--    分页-->
    <div style="margin: 10px 0">
      <el-pagination v-model:currentPage="currentPage"
                     :page-sizes="[5, 10, 20]"
                     :page-size="10"
                     layout="total , sizes,prev, pager, next,jumper "
                     :total="100"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     background >
      </el-pagination>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Home',
  components: {

  },
  data(){
    return{
      search:'',
      currentPage:1,
      total:10,
      tableData :[
        {
          date: '2016-05-03',
          name: '张三',
          address: '内蒙古',
        },
        {
          date: '2016-05-02',
          name: '李四',
          address: '黑龙江',
        },
        {
          date: '2016-05-04',
          name: '王五',
          address: '吉林',
        },
        {
          date: '2016-05-01',
          name: '赵柳',
          address: '辽宁',
        },
      ]
    }
  },
  methods:{
    handleEdit(){

    },
    handleDelete(){

    },
    handleSizeChange(){

    },
    handleCurrentChange(){

    }
  }
}

</script>
