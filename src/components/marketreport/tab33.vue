<template>
  <div>
      <div class="pro-wrap">
          <p class="clearfix cms-title">
            <span class="left">
              商机成交比例统计
            </span>
            <span class="right">单位：个</span>
          </p>
          <template v-if="!loading">
            <div class="charts-rwap relative" style="">
                <charts id="tab33-charts" styles="width:100%;height:19rem;margin:0 auto" :option="echartsOptions"></charts>
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
var _this;
import { XTable,InlineLoading,numberComma,XCircle } from 'vux'
import charts from "../charts/charts"
export default {
  name: '',
  created(){
    _this=this;
    this.getData();
  },
  components:{
    XTable,InlineLoading,numberComma,XCircle,charts
  },
  props:['year','area'],
  data(){
    return{
      loading:true,
      chartData:[],
      dataName:[],
      dataAll:[],
    }
  },
  computed:{
    echartsOptions(){
      return {
              tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'shadow'
                  },
                  confine:true,
                  position: ['20%', '0%'],
                  formatter: function(a,b,c) {
                    var index=a[0].dataIndex;
                    // console.log(_this.dataAll[index].Numerator+","+_this.dataAll[index].Num)
                    return "商机个数："+_this.dataAll[index].Numerator+"</br>成交比例："+a[0].data+"%</br>预计成交金额："+_this.dataAll[index].PredictTradeMoney+"万"
                  }
              },
              color:['#51C6EF','#F9C268'],
              grid: {
                    top: 35,
                    right:10,
                    left:40,
                    bottom:30
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
                  // min:100,
                  max:100,
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

                    },
                    formatter: '{value}%'
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
                    textStyle: {
                        color: '#666',//坐标值得具体的颜色
                    }
                  }
              },
              series: [
                  {
                      // name: "商机成交比例",
                      type: 'bar',
                      data: this.chartData,
                      barWidth:'20%',
                      label: {
                          normal: {
                              show: true,
                              position: 'top',
                              formatter:"{c}%"
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
      this.loading=true;
      this.$http.post("/api/EnergizeSaleBulletin/BargainOppArea",{
          AreaName:this.area,
          Year:dateTemp[0],
          Month:month
      })
      .then((res)=>{
        this.loading=false;
        this.chartData=[];
        this.dataName=[];
        // console.log(res.Data);

        this.dataAll=res.Data;
        res.Data.map((el)=>{
          this.dataName.push(el.TypeName.substring(0,2))
          var temp=0;
          el.Num==0?temp=0:temp=(el.Numerator/el.Num*100).toFixed(0);
          this.chartData.push(temp)
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
@import '../../assets/less/exports.less';

.panel-home-box{
  background-color: white;
  margin-bottom: @cmmg;
  .panel-item{
    .line1px(@gray);
    padding: 1rem 0.8rem;
    .panel-inner{
      .circle-wrap{
        width:20%;
        padding-top:20%;
      }
    }
    .hope-wrap{
      .border-box;
      width: 43%;
    }
    .infact-wrap{
      .border-box;
      width:37%
    }
    .cm-wrap{
      padding: 1.7% 0;
      .digtal{
        color: #F4333C;
        font-size: 1.3rem;
      }
      .title{
        color: #999;
        font-size: 0.9rem;
      }
      &.hope-wrap{
        padding-left: 10%;
      }
      &.infact-wrap{
        padding-left: 5%;
        position: relative;
        .line{
          left: 0;
          top:20%;
          height: 60%;
          background-color: #d9d9d9;
          width: 1px;
        }

      }
    }
  }

}
</style>
