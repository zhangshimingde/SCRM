<template>
  <div>

      <div class="pro-wrap">

            <p class="clearfix cms-title">
              <span class="left">
                月度数据统计
              </span>
              <span class="right">单位：个</span>
            </p>
          <template v-if="!loading">
            <div class="charts-rwap relative">
                <charts id="tab21-charts" styles="width:100%;height:19rem;margin:0 auto" :option="echartsOptions"></charts>
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
      title:["新增集团公司","新增非集团客户","新增联系人","新增注册会员","新增CXO","覆盖CXO"],
      chartData:[[],[],[],[],[],[]]
    }
  },
  computed:{
    echartsOptions(){
      return {
              tooltip: {
                  trigger: 'axis',
                  confine:true,
                  axisPointer: {
                      type: 'shadow',
                      label:{
                        show:true
                      }
                  }
              },
              legend: {
                  data:this.title,
                  bottom:40,
                  left:0
              },
              color:['#51C6EF','#F9C268','#FF5E76',"#90ee90","#FFA95E","#08FDFA"],
              grid: {
                    top: 15,
                    right:0,
                    left:-1,
                    bottom:140
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
                  data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
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
              dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        xAxisIndex: [0],
                        filterMode:'filter',
                        start: 0,
                        end: 40
                    }

                ],
              series: [
                  {
                      name: this.title[0],
                      type: 'line',
                      data: this.chartData[0],
                      label: {
                          normal: {
                              show: false,
                              position: 'top'
                          }
                      }
                  },
                  {
                      name: this.title[1],
                      type: 'line',
                      data: this.chartData[1],
                      label: {
                          normal: {
                              show: false,
                              position: 'top'
                          }
                      }
                  },
                  {
                      name: this.title[2],
                      type: 'line',
                      data: this.chartData[2],
                      label: {
                          normal: {
                              show: false,
                              position: 'top'
                          }
                      }
                  },
                  {
                      name: this.title[3],
                      type: 'line',
                      data: this.chartData[3],
                      label: {
                          normal: {
                              show: false,
                              position: 'top'
                          }
                      }
                  },
                  {
                      name: this.title[4],
                      type: 'line',
                      data: this.chartData[4],
                      label: {
                          normal: {
                              show: false,
                              position: 'top'
                          }
                      }
                  },
                  {
                      name: this.title[5],
                      type: 'line',
                      data: this.chartData[5],
                      label: {
                          normal: {
                              show: false,
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
      this.loading=true;

      this.$http.post("/api/EnergizeSaleBulletin/BaseDataStaticsAreaMonth",{
          AreaName:this.area,
          Year:this.year,
          Month:""
      })
      .then((res)=>{
        // console.log(res.Data);
        var _this=this;
        this.chartData=[[],[],[],[],[],[]];
        this.loading=false;


        res.Data.map((el,index)=>{

            for(var i=0;i<12;i++){
                this.chartData[index].push(el[i].Num);
            }

        })

        // console.log( this.chartData)

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
