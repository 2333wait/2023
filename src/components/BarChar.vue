<template>
  <!-- <div id="pie1">
  <b style="color: aquamarine;font-size: x-small;">抑郁与焦虑情况</b>-->
  <div ref="barchar" class="map">
  </div>
</template>
      
<script>
import * as echarts from "echarts";
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import * as d3 from "d3";
import { feature } from 'topojson-client';
import { geoMercator, geoPath } from 'd3-geo';
import { json } from 'd3-fetch';
import geoJSONData from '../assets/boundaryroad.geojson'
export default {
  name: "BarChar",
  props: {
    msg: String
  },
  data() {
    return {

      title: "心理健康情况概览",
      color: "#2C7BFE"
    };
  },
  mounted: function () {
    this.initStreetMap(); //数据初始化
  },
  methods: {
    initDate() {
      let that = this;
      axios.get("http://127.0.0.1:5000/scl2022").then(res => {
        console.log(res)
        that.initEcharts2022(res.data.results.fliterDa);
        
      });
    },
    //chushi初始化街道
    initStreetMap() {
      const chart = echarts.init(this.$refs.map);
      // 注册 geoJSON 组件
      echarts.registerMap('myMap', geoJSONData);
      // 配置地图
    const option = {
      series: [
        {
          type: 'map',
          map: 'myMap',
        },
      ],
    };

    chart.setOption(option);
      let div = this.$refs.map;
      var width = div.offsetWidth;
      var height = div.offsetHeight;
    /*  console.log("hao" + height)
      var svg = d3.select(this.$refs.map)
        .append("svg")
        .attr("width", width)
        .attr("height", 280);
      //定义地图投影方式
      var projection = d3.geoMercator()
        .center([0, 0])
        .scale(180)
        .translate([width / 2, height / 2]);
      //chuangjian创建路径生成器
      var path = d3.geoPath()
        .projection(projection);*/
      /*
      axios.get('/boundaryroad.goejson').then(data =>{
        console.log(data)
        const geojson = feature(data, data.objects.name);
        const projection = geoMercator()
          .fitSize([this.width, this.height], geojson);
        const path = geoPath().projection(projection);

        svg.append("path")
          .attr("d", path(geojson))
          .attr("stroke", "black")
          .attr("fill", "none");
        
      })*/
      /*axios.get('/boundaryroad.goejson').then(res =>{
        console.log(res.name)
        // 添加数据到svg
        svg.append("g")
          .selectAll("path")
          .data(res.features)
          .enter().append("path")
          .attr("d", path)
          .style("fill", "steelblue");
      })*/
      



      //随着屏幕大小调节图表
      // window.addEventListener("resize", () => {
      //   this.myChart.resize();
      // });
    },




  }
};
</script>
<style  scoped>
.top {
  border-bottom: 2px solid #2ec03550;
}
.map{
  width: 100%;
  height: 11.5rem;
}
</style>      
      






      