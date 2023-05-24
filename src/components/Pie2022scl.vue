<template>
  <!-- <div id="pie1">
  <b style="color: aquamarine;font-size: x-small;">抑郁与焦虑情况</b>-->
  <div>
  <el-row :gutter="15">
    <el-col :md="12"> <div ref="scl22" style="height:230px" class="top"></div></el-col>
    <el-col :md="12"> <div ref="sclFrom" style="height:230px" class="top"></div></el-col>
  </el-row>
  <el-row>
    <el-col :md="8"><div ref="scl22WeiJi" style="height:230px" class="top"></div></el-col>
    <el-col :md="8"><div ref="scl22Sprit" style="height:230px" class="top"></div></el-col>
    <el-col :md="8"><div ref="scl22Emotion" style="height:230px" class="top"></div></el-col>
  </el-row>
  </div> 
</template>
      
<script>
import * as echarts from "echarts";
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import * as d3 from "d3";
export default {
  name: "Pie2022scl",
  props: {
    msg: String
  },
  data() {
    return {
      
      title: "心理健康情况概览",
      color: "#2C7BFE"
    };
  },
  mounted:function() { 
    this.initDate(); //数据初始化
  },
  methods: {
       initDate() {
      let that = this;
      axios.get("http://127.0.0.1:5000/scl2022").then(res => {
        console.log(res)
        that.initEcharts2022(res.data.results.fliterDa);
        that.init2022Department(res.data.results.severeApartment);
        that.init2022Sprit(res.data.results)//精神
        that.init2022Emotion(res.data.results)//情绪
      });
    },
    //分类饼图
     initEcharts2022(datascl) { 
      let scl22Chart = echarts.init(this.$refs.scl22);
      // 饼图
      let  optioncal22 = {
        color:[ '#ee6666', '#5470c6', '#91cc75', '#fac858','#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
       // color:['#11659a','#2486b9','#66a9c9','#5cb3cc','#63bbd0'],
        tooltip: {
          trigger: "item",
          backgroundColor: "#f0f5e5",
          textStyle: {
            color: "#000",
            fontSize: 15
          },
          formatter: "{b}:{d}%:{c}人"
        },
        title: {
          // 设置饼图标题，位置设为顶部居中
          text: "等级分布",
          textStyle: {
            color: "#2474b5",
            fontSize: 12
          },

          top: "1%",
          left: "center"
        },
        series: [
          {
            type: "pie",
            label: {
              show: true,
              color: "#141e1b",
              fontSize: 12,
              formatter: "{b}" // b代表名称，c代表对应值，d代表百分比
            },
            radius: "60%", //饼图半径
            data: [
              {
                value: datascl[0],
                name: "重度",
                itemStyle: {
                  //color: "#1493FE"
                }
              },
              {
                value: datascl[1],
                name: "中度",
                itemStyle: {
                  //color: "#142AFE"
                }
              },
              {
                value: datascl[2],
                name: "轻度",
                itemStyle: {
                  //color: "#1456FE"
                }
              },
              {
                value: datascl[3],
                name: "正常",
                itemStyle: {
                 // color: "#1456FE"
                }
              }
            ]
          }
        ]
      };
      console.log(this.seriesData);
      
      scl22Chart.clear();
      
      scl22Chart.setOption(optioncal22);
      //随着屏幕大小调节图表
      // window.addEventListener("resize", () => {
      //   this.myChart.resize();
      // });
    },

    //部门饼图
    init2022Department(datascl) { 
      let scl22Chart = echarts.init(this.$refs.sclFrom);
      let  optioncal22 = {
        color:[ '#ee6666', '#5470c6', '#91cc75', '#fac858','#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
       // color:['#11659a','#2486b9','#66a9c9','#5cb3cc','#63bbd0'],
        tooltip: {
          trigger: "item",
          backgroundColor: "#f0f5e5",
          textStyle: {
            color: "#000",
            fontSize: 15
          },
          formatter: "{b}:{d}%:{c}人"
        },
        title: {
          // 设置饼图标题，位置设为顶部居中
          text: "来源部门",
          textStyle: {
            color: "#2474b5",
            fontSize: 12
          },

          top: "1%",
          left: "center"
        },
        series: [
          {
            type: "pie",
            label: {
              show: true,
              color: "#141e1b",
              fontSize: 12,
              formatter: "{b}" // b代表名称，c代表对应值，d代表百分比
            },
            radius: "60%", //饼图半径
            data: datascl
          }
        ]
      };
      console.log(this.seriesData);
      scl22Chart.clear();
      scl22Chart.setOption(optioncal22);
      //随着屏幕大小调节图表
      // window.addEventListener("resize", () => {
      //   this.myChart.resize();
      // });
    },
  
   //精神状况
    init2022Sprit(datascl) { 
      let scl22Chart = echarts.init(this.$refs.scl22Sprit);
      let  optioncal22 = {
        color:[ '#ee6666', '#5470c6', '#91cc75', '#fac858','#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
       // color:['#11659a','#2486b9','#66a9c9','#5cb3cc','#63bbd0'],
        tooltip: {
          trigger: "item",
          backgroundColor: "#f0f5e5",
          textStyle: {
            color: "#000",
            fontSize: 15
          },
          formatter: "{b}:{d}%:{c}人"
        },
        title: {
          // 设置饼图标题，位置设为顶部居中
          text: "精神状况",
          textStyle: {
            color: "#2474b5",
            fontSize: 12
          },

          top: "1%",
          left: "center"
        },
        series: [
          {
            type: "pie",
          /*  label: {
              show: true,
              color: "#141e1b",
              fontSize: 12,
              formatter: "{b}" // b代表名称，c代表对应值，d代表百分比
            },*/
            radius: "60%", //饼图半径
            data: [
              {
                value: datascl.severeSprit2,
                name: "异常",
                itemStyle: {
                  //color: "#1493FE"
                }
              },
              {
                value: datascl.severeSprit1,
                name: "正常",
                itemStyle: {
                  //color: "#142AFE"
                }
              }]
          }
        ]
      };
      console.log(this.seriesData);
      scl22Chart.clear();
      scl22Chart.setOption(optioncal22);
      //随着屏幕大小调节图表
      // window.addEventListener("resize", () => {
      //   this.myChart.resize();
      // });
    },


    //情绪状况
    init2022Emotion(datascl) { 
      let scl22Chart = echarts.init(this.$refs.scl22Emotion);
      let  optioncal22 = {
        color:[ '#ee6666', '#5470c6', '#91cc75', '#fac858','#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
       // color:['#11659a','#2486b9','#66a9c9','#5cb3cc','#63bbd0'],
        tooltip: {
          trigger: "item",
          backgroundColor: "#f0f5e5",
          textStyle: {
            color: "#000",
            fontSize: 15
          },
          formatter: "{b}:{d}%:{c}人"
        },
        title: {
          // 设置饼图标题，位置设为顶部居中
          text: "情绪状况",
          textStyle: {
            color: "#2474b5",
            fontSize: 12
          },

          top: "1%",
          left: "center"
        },
        series: [
          {
            type: "pie",
          /*  label: {
              show: true,
              color: "#141e1b",
              fontSize: 12,
              formatter: "{b}" // b代表名称，c代表对应值，d代表百分比
            },*/
            radius: "60%", //饼图半径
            data: [
              {
                value: datascl.severeYin2,
                name: "异常",
                itemStyle: {
                  //color: "#1493FE"
                }
              },
              {
                value: datascl.severeYin1,
                name: "正常",
                itemStyle: {
                  //color: "#142AFE"
                }
              }]
          }
        ]
      };
      console.log(this.seriesData);
      scl22Chart.clear();
      scl22Chart.setOption(optioncal22);
      //随着屏幕大小调节图表
      // window.addEventListener("resize", () => {
      //   this.myChart.resize();
      // });
    }

   
  }
};
</script>
<style  scoped>
.top{
  border-bottom: 2px solid #2ec03550;
}
</style>      
      






      