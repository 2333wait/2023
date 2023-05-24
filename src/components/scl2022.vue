
<template>
    <div class="scl2" style="margin: 0;height: 20%;width: 400px;text-align: center;">
    
      <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" 
      :highlight-current-row="false"
      :row-style="{height: '0',background: '#6699ff',color: '#93dcfe'}"
      :row-class-name="tableRowClassName"
      :cell-style="{padding: '1px'}"
      :header-cell-style="{ background: '#6699ff', color: '#93dcfe',padding:'0' }"
      style="height: 120px;font-size: x-small;top: 1%;">
        <el-table-column label="学号" prop="学号" />
        <!-- <el-table-column label="阳性项目数" prop="阳性项目数" />
        <el-table-column label="阴性项目数" prop="阴性项目数" /> -->
        <el-table-column label="躯体化" prop="躯体化平均分" />
        <el-table-column label="强迫症状" prop="强迫症状平均分" />
        <el-table-column label="人际关系" prop="人际关系平均分" />
        <el-table-column label="抑郁" prop="抑郁平均分" />
        <el-table-column label="焦虑" prop="焦虑平均分" />
        <el-table-column label="敌对" prop="敌对平均分" />
        <el-table-column label="恐怖" prop="恐怖平均分" />
        <el-table-column label="偏执" prop="偏执平均分" />
        <el-table-column label="精神病性" prop="精神病性平均分" />
        <el-table-column label="其他" prop="其他平均分" />
        <el-table-column label="总分" prop="总分" />
  
      </el-table>
    
  <!-- 0322 -->
    <div class="block">
    <!-- <span class="demonstration">页数较少时的效果</span> -->
    <el-pagination
                small
                layout="prev, pager, next, ->, total"
                :total="tableData.length"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                style="text-align: center">
        </el-pagination>
    </div>
  <!-- /0322 -->
  
    </div>
  </template>
  
  
  
  <!-- 0319 定义数据 -->
  <script>
  import axios from 'axios'
  import { reactive, ref, onMounted } from "vue";
  //0322-
  const add_dialog_visible = ref(false)
  //const tableData = ref()
  // const students_form = reactive({
  //   学号: "",
  //   阳性项目数: "",
  // })
  
  //0322=
  let currentPage = "currentPage"
  export default {
    setup(){
      let tableData =ref();
      onMounted(()=>{
        console.log(tableData.value)
      });
      return {tableData}
    },
    data(){
      return{
        tableData :[],
        currentPage: '1', //当前页 刷新后默认显示第一页
        pageSize: "4", //每一页显示的数据量 此处每页显示30条数据
      }
      },
    created() {
      this.showinfo()
      this.handleCurrentChange(currentPage)
  
    },
    onMounted() {
      this.showinfo()
      this.handleCurrentChange(currentPage)
    },
    /**
     * 里面的方法只有被调用才会执行
     */
    methods: {
      
      showinfo(){
        var that = this;
        axios.get('http://127.0.0.1:5000/scl90/')
                .then(response=>{
                    that.tableData = response.data.results;
                    console.log(that.tableData);
                })
                .catch(error=>{
                    console.log(error);
                });
      },
      handle(){
        var that = this;
          let config = {
            url:'http://localhost:5000/scl90',
            method: 'get',
          }
          axios(config)
              .then((response) => {
                that.tableData = response.data
              console.log(tableData)
              })
        },
        handleCurrentChange(currentPage) {
          var that = this;
          that.currentPage = currentPage; //每次点击分页按钮，当前页发生变化
          // console.log(this.currentPage);
        },
  
    }
  }
  
  //图表输入element-ui or element-plus
  </script>
  
  