<template>
  <div>

      <div class="pro-wrap">
          <p class="clearfix cms-title">
            <span class="left">
              线索商机预警
            </span>
            <span class="right">单位：个</span>
          </p>
          <template v-if="!loading">
            <div class="charts-rwap relative" style="">
                <charts id="tab32-charts" styles="width:100%;height:19rem;margin:0 auto" :option="echartsOptions"></charts>
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
      chartData:[0,0,0,0,0,0],
    }
  },
  computed:{
    echartsOptions(){
      return{
        color:['#4CC5F1'],
          // tooltip: {
          //     trigger: 'axis',
          //     axisPointer: {
          //         type: 'shadow'
          //     }
          // },

          grid: {
              left: '1%',
              right: '4%',
              bottom: '3%',
              top:'5%',
              containLabel: true
          },
          xAxis: {
              type: 'value',
              axisLine: {
                  lineStyle: {
                      type: 'solid',
                      color: '#ccc',//左边线的颜色
                      width:'1'//坐标线的宽度
                  }
              },
              axisTick:{
                show:false
              },
              axisLabel: {
                textStyle: {
                    color: '#666',//坐标值得具体的颜色

                },
                rotate:45
              },
          },
          yAxis: {
              type: 'category',
              axisLine: {
                  lineStyle: {
                      type: 'solid',
                      color: '#ccc',//左边线的颜色
                      width:'1'//坐标线的宽度
                  }
              },
              axisTick:{
                show:false
              },
              axisLabel: {
                textStyle: {
                    color: '#666',//坐标值得具体的颜色
                },

              },
              data: ['跟进超过3个月线索数量','跟进超过6个月线索数量','停留阶段超过30天商机数量','跟进超过3个月商机数量','签约前两周内新增商机']
          },
          series: [
              {
                  name: '线索商机预警',
                  type: 'bar',
                  barWidth:'50%',
                  data: this.chartData,
                  label:{
                    normal: {
                              show: true,
                              position: 'inside'
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
      this.$http.post("/api/EnergizeSaleBulletin/OpportunitiesWarningArea",{
          AreaName:this.area,
          Year:dateTemp[0],
          Month:month
      })
      .then((res)=>{
        this.loading=false;
        this.chartData=[0,0,0,0,0,0];
        this.chartData[0]=res.Data.Over90dayClue;
        this.chartData[1]=res.Data.Over180dayClue;
        this.chartData[2]=res.Data.Over30dayStateCount;
        this.chartData[3]=res.Data.More90DayCount;
        this.chartData[4]=res.Data.TowWeekQYCount;

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
