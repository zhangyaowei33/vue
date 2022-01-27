<template>
  <div style="padding: 10px">
<!--    功能区域-->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add" v-if = "user.role ===1">新增</el-button>
      <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button>
    </div>

<!--    搜索区域-->
    <div>
      <el-input v-model="search" placeholder="请输入关键字" style="width: 20% ;margin: 10px 0" clearable></el-input>
      <el-button type="primary" style="margin: 5px" @click="load">查询</el-button>
    </div>

<!--    数据展示区域-->
    <el-table :data="tableData" border stripe style="width: calc(100% - 30px)">
      <el-table-column prop="id" label="ID" sortable />
      <el-table-column prop="username" label="名字" />
      <el-table-column prop="nickName" label="昵称" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="address" label="地址" />
      <el-table-column  label="角色">
        <template #default="scope">
          <span v-if="scope.row.role === 1">管理员</span>
          <span v-if="scope.row.role === 2">普通用户</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" >
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="确认删除该数据吗?" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button size="small" type="danger" >删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

<!--    分页-->
    <div style="margin: 10px 0">
      <el-pagination v-model:currentPage="currentPage"
                     :page-sizes="[1,3,5]"
                     :page-size="pageSize"
                     layout="total , sizes,prev, pager, next,jumper "
                     :total="total"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     background >
      </el-pagination>

      <el-dialog v-model="dialogTableVisible" title="新增/编辑数据" width="30%">
        <el-form :model="form" label-width="120px">
          <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="form.nickName"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="form.sex" label ="男">男</el-radio>
            <el-radio v-model="form.sex" label ="女">女</el-radio>
          </el-form-item>
          <el-form-item label="地址">
            <el-input type="textarea" v-model="form.address"></el-input>
          </el-form-item>
        </el-form>

        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { reactive} from 'vue'
import request from "@/utils/request";
import {ElMessage} from 'element-plus'

const form = reactive({
  id: '',
  username: '',
  nickName: '',
  age: '',
  sex: '',
  address: '',
  role:''
})
export default {
  name: 'Home',
  components: {

  },
  data(){
    return{
      user:{},
      form,
      dialogTableVisible:false,
      search:'',
      currentPage:1,
      pageSize: 3,
      total:0,
      tableData :[],

    }
  },
  created() {
    this.load()

    let userStr = sessionStorage.getItem("user") || "{}"
    this.user = JSON.parse(userStr)
    //请求服务端，确认当前用户的合法信息
    request.get("/user/" + this.user.id).then(res => {
      if(res.code === "0"){
        this.user = res.data
      }
    })
  },
  methods:{
    add(){
      this.dialogTableVisible = true
      //每次打开新增弹窗，清空数据
      this.form = {}
    },
    save(){
      if(this.form.id){//更新
        request.put("/user/update",this.form).then((res => {
          console.log(res)
          if(res.code === '0'){
            ElMessage({
              type: "success",
              message: "更新成功"
            })
          }else {
            ElMessage({
              type: "error",
              message: res.msg
            })
          }
          this.load()//刷新表格数据
          this.dialogTableVisible = false
        }))
      }else{//新增
        request.post("/user/save",this.form).then((res => {
          console.log(res)
          if(res.code === '0'){
            ElMessage({
              type: "success",
              message: "新增成功"
            })
          }else {
            ElMessage({
              type: "error",
              message: res.msg
            })
          }
          this.load()//刷新表格数据
          this.dialogTableVisible = false
        }))
      }

    },
    load(){
      request.get("/user", {
        params:{
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          search:this.search
        }}).then(res =>{
        console.log(res)
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    handleEdit(row){
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogTableVisible = true

    },
    handleDelete(id){
      console.log(id)
      request.delete("/user/delete/" + id).then(res => {

        if(res.code === '0'){
          ElMessage({
            type: "success",
            message: "删除成功"
          })
        }else {
          ElMessage({
            type: "error",
            message: res.msg
          })
        }
        this.load()//刷新表格数据

      })
    },
    handleSizeChange(pageSize){//改变当前每页的个数触发
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum){//改变当前页触发
      this.currentPage = pageNum
      this.load()
    }
  }
}

</script>
