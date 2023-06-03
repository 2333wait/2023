<template>
  <div>
    <div ref="map" class="map">
    </div>
    {{ carNum }}
    <div ref="map2" class="map">
    </div>
  </div>
  <!-- <div id="pie1">
  <b style="color: aquamarine;font-size: x-small;">抑郁与焦虑情况</b>-->
</template>
      
<script>
import * as echarts from "echarts";
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import { geoMercator, geoPath } from 'd3-geo';
import { json } from 'd3-fetch';
import geoJSONData from '../assets/crosswalkroad.json'
import * as turf from '@turf/turf';
//import geoJSONData2 from '../assets/laneroad_with9road.geojson'
export default {
  name: "mapchar",
  props: {
    carData: Array,
    carRangeData:Array
  },
  data() {
    return {

      title: "心理健康情况概览",
      color: "#2C7BFE",
      carList: this.carData,
      carRangeList:this.carRangeData,
      carMapOption: {},
      car2Map: [],//che车二维轨迹数组
      carRange2Map: [],//che车二维轨迹数组
      carNum: 0,
      newGeoJSON:{}//去除z后的地图
    };
  },
  mounted: function () {
     this.initStreetMap(); //数据初始化

  },
  watch: {
    carData: function (newValue) {
      this.carList = newValue;
      this.initStreetMap();
      
      //this.addCar2Map( this.carList[0].map(item =>({x:item.x_coord,y:item.y_coord})))
    },
    carRangeData:function (newValue) {
      console.log(newValue)
      this.carRangeList = newValue;
      this.carNum = this.carRangeList[0];
      
      //this.addCar2Map( this.carList[0].map(item =>({x:item.x_coord,y:item.y_coord})))
    },
  },
  methods: {
    initDate() {
      let that = this;
      axios.get("http://127.0.0.1:5000/scl2022").then(res => {
        console.log(res)
        that.initEcharts2022(res.data.results.fliterDa);

      });
    },
    //sting->int    这两个方法暂时没用，后端处理了
    strArrayToIntArray(strArray) {
      return strArray.map(row => row.map(num => parseFloat(num)));
    },
    strArray3ToIntArray(strArray) {
      return strArray.map(row => row.map(ler=>ler.map(num => parseFloat(num))));
    },


    //chushi初始化街道
    initStreetMap() {
      // dataCarPoint\car2Map\carGeo  都是时刻轨迹数据    带range的是时间段轨迹数据
      console.log(this.carRangeData);
      console.log(this.carRangeList);
      let dataCarRangPoint = this.carRangeList.map((item) => item.map(item => ({ x: item['x_coord'], y: item['y_coord'] })))
      //轨迹点转json  
      let carGeo = this.carList[0].map(item => ([item['x_coord'], item['y_coord']]))
      //数据库存的是字符串，转成float才能用
      //this.car2Map = this.strArrayToIntArray(carGeo);
      //this.carRangeList[0].map(item => ([item['x_coord'], item['y_coord']]))
      let carRangeGeo = this.carRangeData.map((item) => item.map(item => ([ item['x_coord'],item['y_coord'] ])))
      this.carRange2Map = carRangeGeo;
      console.log(carGeo)
       const chart = echarts.init(this.$refs.map);
       console.log("放置轨迹点")
       console.log(carRangeGeo)
      
    
      // 每一时刻点的车辆轨迹可视化
      this.carMapOption = {
        tooltip:{
          trigger: 'item',
          formatter: '{b}',
        },
        series: [
          {
            type: 'map',
            map: 'myMap',
            geoIndex: 0,
            // roam: true,
            itemStyle: {
              areaColor: '#261500',
              borderColor: '#9999'
            }
          },
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolSize: 12, // 标记的大小
            data: this.car2Map[1],
            itemStyle: {
              color: '#0e5bd7ac'
            }
          }
        ],
        geo: {
          map: 'myMap',
          roam: true,
          label: {
            show: false
          },
          geoIndex: 0,
          showLegendSymbol: false,
          itemStyle: {
            areaColor: '#2ec03550',
            borderColor: '#999999'
          },
          zoom: 1.2
        }
      };
      // 注册 geoJSON 组件
      echarts.registerMap('myMap', geoJSONData);
      // 设置地图数据\
      chart.clear()
      chart.setOption(this.carMapOption)/*
      //d3实现
      let div = this.$refs.map;
      var width = div.offsetWidth;
      var height = div.offsetHeight;
      console.log("hao" + height)
      var svg = d3.select(this.$refs.map)
        .append("svg")
        .attr("width", width - 20)
        .attr("height", height - 20);
      const dac = './laneroad_with9road.geojson'
      console.log(dac)*/
      //定义地图投影方式
      /*  var projection = d3.geoMercator()
          .center([0, 0])
          .scale(10)
          .translate([10, 0]);
        //chuangjian创建路径生成器
        var path = d3.geoPath()
          .projection(projection);
        svg.append("g")
          .selectAll("path")
          .data(geoJSONData.features)
          .enter().append("path")
          .attr("d", path)
          .style("fill", "steelblue");

/*
      var projection = d3.geoMercator()
        .center([0, 0])
        .scale(20)
      var path = d3.geoPath()
        .projection(projection);

      // Create the choropleth map
      var map = d3.select("svg")
        .selectAll("path")
        .data(geoJSONData.features)
        .enter()
        .append("path")

      // Overlay the trajectory points on the map
      var points = d3.select("svg")
        .selectAll("circle")
        .data(dataCarPoint)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          // Convert the longitude and latitude of the trajectory point to SVG coordinates
          //console.log(d.x+"xxx"+d.y)
          return d.x
        })
        .attr("cy", function (d) {
          return d.y
        })
        .attr("r", 5)
        .attr("fill", "blue");

*/
      
    },

    //前端计算轨迹点是否在指定区域内，由于数据量大太，暂时转为后端计算前端呈现，，，方法是可行的，先停用
    countCarRoad() {
      // 三维转二维，和下面的函数一样
      this.newGeoJSON = {
        type: "FeatureCollection",
        features: geoJSONData.features.map(feature => {
          return {
            type: "Feature",
            properties: feature.properties,
            geometry: {
              type: "LineString",
              coordinates: feature.geometry.coordinates.map(coord => [coord[0], coord[1]])
            }
          }
        })
      };
      
      let goeArea2turf = this.newGeoJSON["features"][2]
      var area = turf.feature(goeArea2turf.geometry, goeArea2turf.properties);
      // Convert the trajectory array to a Turf.js feature collection of points
      // let points = turf.featureCollection(this.car2Map.map(coord => turf.point(coord)));
      console.log(this.car2Map + "dsffsdfgertr5et")
      //轨迹点转为turf能识别的格式
      //数组解构，把各个时间范围内的点合并成一个数组，判断当前时间范围内经过指定区域的车辆数量
      let currArr = [...this.carRange2Map]
      var points = [];
      for (var i = 0; i < currArr.length; i++) {
        var point = turf.point(currArr[i]);
        points.push(point);
      }
    
     // let type = turf.getType(area);
      

      console.log(area); // Output: "Unknown"
      // Call pointsWithinPolygon with valid polygon
      // Use Turf.js to count the number of points within the GeoJSON area

      
      let changeCuurGoe = this.change3to2(cuurGoe);
      let pointsWithinArea = turf.pointsWithinPolygon(points, area);

      let count = pointsWithinArea.features.length;


      console.log(count + "计算好的数据点"); // Output the number of points within the areaF
      this.carNum = count
      console.log(pointsWithinArea);



    },
    //三维转二维 GEO z维度没用
    change3to2(geoData) {
      let newGeoJSON = {
        type: "FeatureCollection",
        features: geoData.features.map(feature => {
          return {
            type: "Feature",
            properties: feature.properties,
            geometry: {
              type: "LineString",
              coordinates: feature.geometry.coordinates.map(coord => [coord[0], coord[1]])
            }
          }
        })
      };
    }

  }
};
</script>
<style  scoped>
.top {
  border-bottom: 2px solid #2ec03550;
}

.map {
  width: 100%;
  height: 23rem;
}
</style>      
      






      