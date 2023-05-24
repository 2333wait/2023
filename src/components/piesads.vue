<template>
    <!-- <div id="pie1">
        <b style="color: aquamarine;font-size: x-small;">抑郁与焦虑情况</b> -->
        <div ref="sads" style="height:230px"></div>
    <!-- </div> --> 
   </template>
      
      <script>
      import * as echarts from "echarts";
      
      export default {
        data() {
          return {
            myChart: {},
            title: "焦虑与抑郁情况概览",
            color: '#2C7BFE',
            pieData: [
              {
                value: 300,
                name: "健康",
                itemStyle: {
                                color: '#1493FE'
                            }
              },
              {
                value: 47,
                name: "轻度以上抑郁",
                itemStyle: {
                                color: '#142AFE'
                            }
              },
              {
                value: 17,
                name: "轻度以上焦虑",
                itemStyle: {
                                color: '#1456FE'
                            }
              },
              {
                value: 5,
                name: "抑郁伴随焦虑",
                itemStyle: {
                                color: '#00CCFF'
                            }
              }
            ],
            pieName: [],
           
          };
        },
        mounted() {
          this.initDate(); //数据初始化
          this.initEcharts();
        },
        methods: {
          initDate() {
            for (let i = 0; i < this.pieData.length; i++) {
    
              this.pieName[i] = this.pieData[i].name;
            }
          },
          initEcharts() {
            // 饼图
            const option = {
              
              tooltip: {
                        trigger: 'item',
                        backgroundColor: '#11367a',
                        textStyle: {
                            color: '#6dd0e3',
                            fontSize: 10
                        },
                        formatter: "{b}:{d}%"
                    },
              title: {
                // 设置饼图标题，位置设为顶部居中
                text: "焦虑与抑郁情况概览",
                textStyle:{
                    color: '#2C7BFE',
                    fontSize : 12
                },
                
                top: "1%",
                left: "center",
                
              },
              series: [
                {
                  type: "pie",
                  label: {
                    show: true,
                    color: '#99FFFF',
                    fontSize: 12,
                    formatter: "{b}" // b代表名称，c代表对应值，d代表百分比
                    
                  },
                  radius: "60%", //饼图半径
                  data: this.pieData
                }
              ]
            };
            console.log(this.seriesData);
         
            this.myChart = echarts.init(this.$refs.sads);
            this.myChart.setOption(option);
            //随着屏幕大小调节图表
             window.addEventListener("resize", () => {
               this.myChart.resize();
             });
          }
        }
      };
      </script>
      
      






      



      