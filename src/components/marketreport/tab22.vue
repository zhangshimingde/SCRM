<template>
  <div>

      <div class="pro-wrap">
          <p class="clearfix cms-title">
            <span class="left">
              市场活动效果评估情况
            </span>
            <span class="right">单位：个</span>
          </p>
        <template v-if="!loading">
          <div class="charts-rwap relative">
              <charts id="tab22-charts" styles="width:100%;height:19rem;margin:0 auto" :option="echartsOptions"></charts>
            </div>
        </template>
        <template v-else >
          <p class="text_center" style="padding:40px 0;">
            <inline-loading></inline-loading>
            <span style="color:#9d9d9d">数据加载中</span>
          </p>

        </template>
      </div>

  </div>

</template>

<script>
import { XTable,InlineLoading,numberComma,XCircle } from 'vux'
import charts from "../charts/charts"
export default {
  name: '',
  created(){
    this.getData();
  },
  components:{
    XTable,InlineLoading,numberComma,XCircle,charts
  },
  props:['year','area'],
  data(){
    return{
      loading:true,
      title:["实际到场人数","实际到场企业数"],
      chartData:[[],[]],
      dataName:[]
    }
  },
  computed:{
    echartsOptions(){
      return {
              tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'shadow',
                      label:{
                        show:true
                      }
                  },
                  confine:true,
                   // position: [10, 10],
                  textStyle:{
                    width:"40%"
                  },
                  position: ['20%', '0%'],
                  extraCssText:'max-width:98%;word-wrap:break-word;white-space:normal; '
              },
              legend: {
                  data:this.title,
                  bottom:40,
                  right:10
              },
              color:['#51C6EF','#F9C268','#FF5E76',"#F9C268"],
              grid: {
                    top: 15,
                    right:0,
                    left:-1,
                    bottom:90
                },
              yAxis: {
                  type: 'value',
                  boundaryGap: [0, 0.01],
                  splitLine:{//网格线的格式
                    lineStyle:{
                      color: '#eaeaea',//网格线颜色
                      width: 1,//网格线宽度
                      type: 'solid'//网格线样式

                      }
                  },
                  axisLine: {
                      lineStyle: {
                          type: 'solid',
                          color: '#fff',//左边线的颜色
                          width:'1'//坐标线的宽度
                      }
                  },
                  axisLabel: {
                    textStyle: {
                        color: '#666',//坐标值得具体的颜色

                    }
                  }
              },
              xAxis: {
                  type: 'category',
                  data: this.dataName,
                  axisLine: {
                      lineStyle: {
                          type: 'solid',
                          color: '#eaeaea',//左边线的颜色
                          width:'1'//坐标线的宽度
                      }
                  },
                  axisLabel: {
                    interval:0,
                    formatter: function (value, index) {
                        // 格式化成月/日，只在第一个刻度显示年份
                        if(!value) return;
                        var str = value.substring(0,6)+"..."
                        return str;
                    },
                    textStyle: {
                        color: '#666',//坐标值得具体的颜色

                    }
                  }
              },
              dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        xAxisIndex: [0],
                        filterMode:'none',
                        // start: 0,
                        // end: 60,
                        startValue:0,
                        endValue:2
                    }

                ],
              series: [
                  {
                      name: this.title[0],
                      type: 'bar',
                      data: this.chartData[0],
                      barWidth:'20px',
                      label: {
                          normal: {
                              show: true,
                              position: 'top'
                          }
                      }
                  },
                  {
                      name: this.title[1],
                      type: 'bar',
                      data: this.chartData[1],
                      barWidth:'20px',
                      label: {
                          normal: {
                              show: true,
                              position: 'top'
                          }
                      }
                  }
              ]
          }
    }
  },
  filters:{
    fix(val){
        return numberComma(val.toFixed(2))
    }
  },
  methods:{
    getData(){
      if(!this.area) return ;
      var dateTemp=this.year.split('-');
      var month;
      dateTemp[1]?month=dateTemp[1]:month="";
      // console.log(dateTemp[0]+','+month);


      this.loading=true;
      this.$http.post("/api/EnergizeSaleBulletin/GetAcitvilyInfoPan3",{
          AreaName:this.area,
          Year:dateTemp[0],
          Month:month
      })
      .then((res)=>{
        this.loading=false;
        this.dataName=[];
        this.chartData=[[],[]];
        var temp=res.Data;
        // console.log(temp)
        temp.map((el)=>{
          this.dataName.push(el.name);
          this.chartData[0].push(el.personValue);
          this.chartData[1].push(el.companyValue);
        })

      })
    }
  },
  watch:{
    year:{
      handler(val){
        this.getData();
      },
      deep:true
    },
    area:{
      handler(val){
        this.getData();
      },
      deep:true
    }
  }
}
</script>

<style lang="less">

</style>
