<template>
  <div>
    <div id="mychart" style="height: 230px; "></div>
  </div>
</template>
 <script>
import * as echarts from "echarts";
import axios from "axios";
import { json } from 'd3-fetch';
export default {
  data() {
    return {
      myChart: {},

      color: "#2C7BFE",
      pieData: [
        {//type=0 未识别
          value: 272,
          name: "未识别",
          itemStyle: {
            color: "gray",
          },
        },
        {
          //type=1 小型车辆
          value: 52,
          name: "小型车辆",
          itemStyle: {
            color: "#91cc75",
          },
        },
        {//type=3 非机动车
          value: 22,
          name: "非机动车",
          itemStyle: {
            color: "#fac858",
          },
        },
        {//type=4 卡车
          value: 22,
          name: "卡车",
          itemStyle: {
            color: "#ee6666",
          },
        },
        {//type=5 厢式货车
          value: 22,
          name: "厢式货车",
          itemStyle: {
            color: "#1456FE",
          },
        },
        {//type=6 客车
          value: 22,
          name: "客车",
          itemStyle: {
            color: "#73c0de",
          },
        }
      ]
    };
  },
  mounted() {
debugger
    this.initDate(); //数据初始化
    this.initEcharts();
  },
  methods: {
    
    initDate() {
      // 获取数据
    //  console.log("axios前")
    //    axios.get("http://127.0.0.1:5000/SelectCarsNumber").then((res) => {
    //     if (res) {
          
    //     console.log(typeof res.data);
    //     console.log(res.data);
    //     console.log(res.car);
    //     } else {
    //       console.log("error")
    //     }
    //   })
    //   .catch(error=>{
    //     console.log(error)
    //   });
    //   console.log("axios后")
      // for (let i = 0; i < this.pieData.length; i++) {
      //   this.pieName[i] = this.pieData[i].name;
      // }
    },
    initEcharts() {
      // 饼图
      let option = {
        tooltip: {
          trigger: "item",
          backgroundColor: "#11367a",
          textStyle: {
            color: "#000",
            fontSize: 10,
          },
          formatter: "{b}:{d}%",
        },
        series: [
          {
            type: "pie",
            label: {
              show: true,
              color: "#000",
              fontSize: 12,
              formatter: "{b}", // b代表名称，c代表对应值，d代表百分比
            },
            radius: "60%", //饼图半径
            data: this.pieData,
          },
        ],
        emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
      };
   
      this.myChart = echarts.init(document.getElementById("mychart"));
      this.myChart.setOption(option);
      //随着屏幕大小调节图表
      // window.addEventListener("resize", () => {
      //   this.myChart.resize();
      // });
    },
  },
};
</script>

      
      






      