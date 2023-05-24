<template>
  <el-container class="page3" direction="vertical">

    <!-- 时间范围选择-->
    <el-row>
      <el-col :span="24">
        <div class="top grid-content">
          <span class="title">数据筛选</span>
              <div class="">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
                  @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
                </el-checkbox-group>
              </div>
        </div>
      </el-col>
    </el-row>
    <!-- shujushaixuan数据筛选、地图、车流量-->
    <el-row>
      <el-col :span="0">
        <el-row>
          <el-col :span="24">
            <div class="item1">
              <span class="title">数据筛选</span>
              <div class="tim2">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
                  @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="itme1">
              <span class="title">车辆占比</span>
              <div class="tim2">
                <pieupi />
              </div>
            </div>
          </el-col>
        </el-row>

      </el-col>
      <el-col :span="12">
        <div class="">
          <span class="title">道路面板</span>
          <mapChar />
        </div>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col :span="24">
            <div class="item1">
              <span class="title">断面车流量</span>
              <div class="tim2"></div>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="itme1">
              <span class="title">拥堵分析</span>
              <div class="tim2"></div>
            </div>
          </el-col>
        </el-row>

      </el-col>
      <!---比例、健康指数
      <el-col :md="6">
        <div class="itme1">
          <span class="title">车辆占比</span>
          <div class="tim2">
            <pieupi />
          </div>
        </div>
      </el-col>
      <el-col :md="6" :offset="12">
        <div class="itme1">
          <span class="title">交通健康指数</span>
          <div class="tim2"></div>
        </div>
      </el-col>-->
    </el-row>
    <!-- 比例、
    <el-row >
      <el-col :md="6">
        <div class="itme1">
          <span class="title">车辆占比</span>
          <div class="tim2"></div>
        </div>
      </el-col>
      <el-col :md="6" :offset="12">
        <div class="itme1">
          <span class="title">交通健康指数</span>
          <div class="tim2"></div>
        </div>
      </el-col>
    </el-row >健康指数-->
    <!-- 拥堵分析、预测-->
    <el-row :gutter="10">
      <el-col :md="12">
        <div class="item1">
          <span class="title">拥堵预测</span>
          <div class="tim2"></div>
        </div>
      </el-col>
      <el-col :md="12">
        <div class="item1">
          <span class="title">交通健康指数</span>
          <div class="tim2"></div>
        </div>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>

import pieupi from "./pieupi";
import piesads from "./piesads";
import mapChar from './mapchar.vue'
//import bus from "../assets/eventBus";
const cityOptions = ['小型车辆', '行人', '非机动车', '卡车', '货车', '客车'];
export default {
  name: "PGage",
  components: {
    pieupi,
    piesads,
    mapChar

  },
  data() {
    return {
      checkAll: false,
      checkedCities: ['小型车辆', '卡车'],
      cities: cityOptions,
      isIndeterminate: true,
      dialogVisible: false, //对话框
      resizeFn: null, //zi自适应
      sonTo: "ini",
      //wenjia文件上传下载
      // 下载模板的URL
      downloadUrl: "/api/download-template",
      // 上传数据的URL
      uploadUrl: "/api/upload-data"
    };
  },
  mounted() {
    window.addEventListener("resize", this.resizeFn)


    /** 
     * bus.$on("index", mes => {
        this.sonTo = mes;
      });
     * 
    */
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeFn);
  },
  methods: {
    //duox多选框
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
};
</script>

<style scoped>
/* *{
  color: antiquewhite
} */
.top {
  height: 100px;
  background-color: #6eb8f157;
}

.itme1 {
  color: #1ee1d8;
  font-size: 18px;
  height: 14rem;
}

.tim2 {
  height: 11.5rem;
  background-color: #6eddf169;
}

.page3 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  width: 100%;
  padding: 14px 20px 20px;
  /** background: #03044a;*/
  /*background: url("../assets/bg参考.png");
  background-size: 1920px 1080px;
  overflow: hidden;*/
  color: #000;
  font-weight: bold;
}


.title {

  color: #0e5bd7ac;
  border-width: 2px;
  border-style: dashed;
  font-size: 15px;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;


}

.subtitle {
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  height: 25px;
  padding: 10px 0;
  text-align: center;
}
</style>

