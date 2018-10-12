<template>
  <div>

      <div class="pro-wrap">
          <p class="clearfix cms-title">
            <span class="left">
              CXO覆盖情况(单位：个)
            </span>
            <router-link class="right"  v-if="!loading" style="color:#3079D5" :to="{name:'tab13x',params:{type:2,year:year,area:area}}">详细数据></router-link>
          </p>
          <template v-if="!loading">
            <div class="charts-rwap relative">
              <charts id="tab13-charts" styles="width:100%;height:19rem;margin:0 auto" :option="echartsOptions"></charts>
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
      pieData:[]
    }
  },
  computed:{
      echartsOptions(){
          return {
              // color:['#F05A4A', '#3876C1', '#00A5E6','#1FAD92','#A2AD1F','#ccc'],
              tooltip: {
                  trigger: 'item',
                  confine:true,
                  formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              series: [
                  {
                      name:'CXO到位情况',
                      type:'pie',
                      radius: ['35%', '60%'],
                      avoidLabelOverlap: true,
                      label: {

                          normal: {
                              show: true,
                              formatter: function (val) {   //让series 中的文字进行换行
                                  return val.name+"\n"+val.value;
                              },
                              align:'left'
                          },
                          emphasis: {
                              show: true
                          }
                      },
                      // lableLine: {
                      //     normal: {
                      //         show: true,
                      //         // length:2,
                      //         // length2:3,
                      //         smooth:true,
                      //         lineStyle:{
                      //           width:3
                      //         }
                      //     },
                      //     emphasis: {
                      //         show: true
                      //     }
                      // },
                      data:this.pieData
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

      this.$http.post("/api/EnergizeSaleBulletin/BaseDataCXO",{
          AreaName:this.area,
          Year:this.year,
          Month:"",
          Type:2
      })
      .then((res)=>{
        // console.log(res);
        this.pieData=[];
        res.Data.map((el)=>{
          this.pieData.push({
            name:el.name,
            value:el.Num
          })
        })
        this.loading=false;

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
