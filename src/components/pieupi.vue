<template>
  <!-- <div id="pie1">
  <b style="color: aquamarine;font-size: x-small;">抑郁与焦虑情况</b>-->
  <div id="mychart" style="height:230px"></div>
  <!-- </div> -->
</template>
      
      <script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      myChart: {},
     
      color: "#2C7BFE",
      pieData: [
        {
          value: 272,
          name: "2",
          itemStyle: {
            color: "#1493FE"
          }
        },
        {
          value: 52,
          name: "1",
          itemStyle: {
            color: "#142AFE"
          }
        },
        {
          value: 22,
          name: "3",
          itemStyle: {
            color: "#1456FE"
          }
        }
      ],
      pieName: []
    };
  },
  mounted() {
    this.initDate(); //数据初始化
    this.initEcharts2();
  },
  methods: {
    initDate() {
      for (let i = 0; i < this.pieData.length; i++) {
        this.pieName[i] = this.pieData[i].name;
      }
    },
    initEcharts2() {
      // 饼图
      const option = {
        tooltip: {
          trigger: "item",
          backgroundColor: "#11367a",
          textStyle: {
            color: "#000",
            fontSize: 10
          },
          formatter: "{b}:{d}%"
        },
       
        series: [
          {
            type: "pie",
            label: {
              show: true,
              color: "#000",
              fontSize: 12,
              formatter: "{b}" // b代表名称，c代表对应值，d代表百分比
            },
            radius: "60%", //饼图半径
            data: this.pieData
          }
        ]
      };
      console.log(this.seriesData);
      const optionFree = {
        xAxis: {},
        yAxis: {},
        series: [
          {
            data: this.seriesData,
            type: "line",
            smooth: true
          }
        ]
      };
      this.myChart = echarts.init(document.getElementById("mychart"));
      this.myChart.setOption(option);
      //随着屏幕大小调节图表
      // window.addEventListener("resize", () => {
      //   this.myChart.resize();
      // });
    }
  }
};
</script>
      
      






      