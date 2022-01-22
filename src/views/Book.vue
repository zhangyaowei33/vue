<template>
  <div style="padding: 10px">
    <!--    功能区域-->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add">新增</el-button>
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
      <el-table-column prop="bookName" label="书名" />
      <el-table-column prop="price" label="价格" />
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="createTime" label="出版日期" />
      <el-table-column  label="封面">
        <template #default="scope">
          <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.cover"
              :preview-src-list="[scope.row.cover]"
          ></el-image>
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
          <el-form-item label="书名">
            <el-input v-model="form.bookName"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="form.author"></el-input>
          </el-form-item>

          <el-form-item label="出版日期">
            <el-date-picker format="YYYY/MM/DD" type="date" v-model="form.createTime"></el-date-picker>
<!--            <el-input type="textarea" v-model="form.createTime"></el-input>-->
          </el-form-item>
          <el-form-item  label="封面">
            <el-upload  ref="upload" action="http://localhost:8081/files/upload" :on-success="filesUploadSuccess">
              <el-button type="primary">点击上传</el-button>
            </el-upload>
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
import { reactive, ref } from 'vue'
import request from "@/utils/request";
import {ElMessage} from 'element-plus'

const form = reactive({
  id: '',
  bookName: '',
  price: '',
  author: '',
  createTime: '',
  cover:''

})
export default {
  name: 'Book',
  components: {

  },
  data(){
    return{
      form,
      dialogTableVisible:false,
      search:'',
      currentPage:1,
      pageSize: 10,
      total:0,
      tableData :[],

    }
  },
  created() {
    this.load()
  },
  methods:{
    //上传图片成功后返回连接
    filesUploadSuccess(res){
      console.log(res)
      this.form.cover = res.data
    },
    add(){
      this.dialogTableVisible = true
      //每次打开新增弹窗，清空数据
      this.form = {}
      this.$refs['upload'].clearFiles() //清空上一次上传的图片
    },
    save(){
      if(this.form.id){//更新
        request.put("/book/update",this.form).then((res => {
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
        request.post("/book/save",this.form).then((res => {
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
      request.get("/book", {
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
      this.$nextTick( () =>{
        this.$refs['upload'].clearFiles() //清空上一次上传的图片
      })

    },
    handleDelete(id){
      console.log(id)
      request.delete("/book/delete/" + id).then(res => {

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
