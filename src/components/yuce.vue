<template>
    <div id="box" style="height: 300px;">

    </div>
</template>
<script>
import * as echarts from "echarts";
export default{
    data(){
        return {
            xData:[],
            YData:[],
            option:{},
            myChart:{}
        }
    },
    mounted(){
        this.initDate();
        this.initEcharts();
    },
    methods:{
        initDate(){
            this.xData=['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            this.YData=[820, 932, 901, 934, 1290, 1330, 1320];
        },//数据初始化
        initEcharts(){
            this.option={
                xAxis: {
                type: 'category',
                data:this.xData
            },
            yAxis: {
                type: 'value',
                
            },
            series: [
                {
                    data: this.YData,
                // color:"#cccccc",
                type: 'line',
                smooth: true
                }
            ],

            };
            this.myChart=echarts.init(document.getElementById("box"));
            this.myChart.setOption(this.option);
        },
       
    }
}
</script>