<template>
  <el-container class="page3" direction="vertical">

    <!-- 时间范围选择
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
    </el-row>-->
    <!-- shujushaixuan数据筛选、地图、车流量-->
    <el-row>
      <!-- <el-col :span="0">
        <el-row>
          <el-col :span="12">
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
          <el-col :span="12">
            <div class="itme1">
              <span class="title">车辆占比</span>
              <div class="tim2">
                <pieupi />
              </div>
            </div>
          </el-col>
        </el-row>

      </el-col> -->
      <el-col :span="12">
        <div class="">
          <span class="title">道路面板</span>
          <mapChar :carData = "sourceData" :carRangeData="sourceRangeData" />
        </div>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col :span="12">
            <div class="top grid-content">
              <span class="title">数据筛选</span>
              <div class="">

                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="类型选择">
                    <el-checkbox-group v-model="form.type">
                      <el-checkbox label="行人" name="type"></el-checkbox>
                      <el-checkbox label="车量" name="type"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="车辆速度">
                    <div class="block">

                      <el-slider v-model="form.valueSpeed" :show-tooltip="false" :min="minSpeedValue" :max="maxSpeedValue"
                        :step="stepValue"></el-slider>
                    </div>
                  </el-form-item>
                  <el-form-item label="时间跨度">
                    <el-slider v-model="form.valueTime" :show-tooltip="false" :min="minTimeValue" :max="maxTimeValue"
                      :step="stepValue" class="block"></el-slider>
                  </el-form-item>

                  <el-form-item label="时间粒度">
                    <el-select v-model="form.step" placeholder="请选择时间分析粒度" class="block">
                      <el-option label="60min" value="1"></el-option>
                      <el-option label="30min" value="0.5"></el-option>
                    </el-select>
                  </el-form-item> <el-button type="primary" @click="onSubmit" style="width: 200;">立即创建</el-button>
                  <el-form-item>

                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="itme1">
              <span class="title">车辆占比</span>
              <div class="tim2">
                <pieupi />
              </div>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="item1">
              <span class="title">断面车流量</span>
              <div class="tim2">
                <piesads/>
              </div>
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

    </el-row>
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
import axios from "axios";
import pieupi from "./pieupi";
import piesads from "./piesads";
// import mapChar from './mapchar.vue'
//import bus from "../assets/eventBus";
const cityOptions = ['小型车辆', '行人', '非机动车', '卡车', '货车', '客车'];
export default {
  name: "PGage",
  components: {
    pieupi,
     piesads//,
    // mapChar

  },
  data() {
    return {
      form: {
        step: '',
        valueTime: 0,
        valueSpeed: 0,
        type: []
      },
      minTimeValue: 1681340400099530, // 最小值
      maxTimeValue: 1681372799599885, // 最大值
     /* import datetime
      dt = datetime.datetime.fromtimestamp((1681340400099530+3600000000/2)/1000000)
                    1681354800099530*/
      minSpeedValue: 1681340400099530, // 最小值
      maxSpeedValue: 1681372799599885, // 最大值
      stepValue: 3600000000, // 步长
      checkAll: false,
      checkedCities: ['小型车辆', '卡车'],
      cities: cityOptions,
      isIndeterminate: true,
      dialogVisible: false, //对话框
      resizeFn: null, //zi自适应
      sonTo: "ini",
      sourceData: [],//从后端筛选回来的时刻原数据
      sourceRangeData: [],//从后端筛选回来的时间段原数据
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
    },
    //表单提交
    onSubmit() {
      console.log('submit!');
      var that = this;
      const params = {
        speed: this.form.valueSpeed,
        timeRange: this.form.valueTime,
        timeStap: this.form.step,
        type: this.form.type//行人还是车
      };

      const timestamp = 1681340400099530;
      const date = new Date(timestamp);
      console.log("转换解惑"+date);
      axios.post("http://127.0.0.1:5000/SelectData/", params).then(res => {
        if (res) {
          // console.log(res.data.index);
          //that.initDRScatter(res.data.index);//原本用echart实现

         // var svg1 = d3.select("svg");
          //jaingwei将为散点图
          //that.initDRScatterByD3(res.data.results.DRresult, svg1);
          console.log(res.data.results.tickCar[0][0]['x_coord'], + "相关性++++++++++");
          that.sourceData = res.data.results.tickCar;
          that.sourceRangeData = res.data.results.areaCar;
          //TODO:相关性试图

        } else {
          this.$message.error("降维失败");
        }
      });
    }
  }
};
</script>

<style scoped>
/* *{
  color: antiquewhite
} */
.top {
  height: auto;
  /*border-left:2px solid #8a7b7b82;*/
  background-color: #fff;
}

.itme1 {
  color: #fff;
  font-size: 18px;
  height: 14rem;
}

.tim2 {
  height: 11.5rem;
  background-color: #fff
    /* #6eddf169;*/
}

.page3 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  width: 100%;
  padding: 14px 20px 20px;
  background: #e3d8d860;
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

