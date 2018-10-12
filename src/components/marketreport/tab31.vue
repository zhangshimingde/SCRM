<template>
  <div>

      <div class="pro-wrap">
          <p class="clearfix cms-title">
            <span class="left">
              线索商机转化分析
            </span>
            <span class="right">单位：个</span>
          </p>
          <template v-if="!loading">
            <ul class="clearfix panel-home-box" id="market-panel" style="margin-bottom:0">
              <li class='left panel-item'>
                <div class="panel-inner clearfix">
                  <div class="relative circle-wrap">
                    <x-circle :percent="dataTable.ClueCount!=0?Number((dataTable.ClueTurnCount/dataTable.ClueCount*100).toFixed(0)):0" :stroke-width="10" style="position:absolute;top:0;left:0" stroke-color="#00A5E6 " :trail-width="10" trail-color="#eeeeee">
                      <span >{{dataTable.ClueCount!=0?(dataTable.ClueTurnCount/dataTable.ClueCount*100).toFixed(0):0}}%</span>
                    </x-circle>
                  </div>

                  <div class="panel-text">
                    <p class="clearfix">
                      <span class="title">线索总数</span>
                      <span class="digtal">{{dataTable.ClueCount}}</span>
                    </p>
                    <p class="clearfix">
                      <span class="title">转商机数</span>
                      <span class="digtal">{{dataTable.ClueTurnCount}}</span>

                    </p>
                  </div>
                </div>
              </li>

              <li class='left panel-item'>
                <div class="panel-inner clearfix">
                  <div class="relative circle-wrap">
                    <x-circle :percent="dataTable.OppCount!=0?Number((dataTable.OppSucceedCount/dataTable.OppCount*100).toFixed(0)):0" :stroke-width="10" style="position:absolute;top:0;left:0" stroke-color="#00A5E6" :trail-width="10" trail-color="#eeeeee">
                      <span >{{dataTable.OppCount!=0?(dataTable.OppSucceedCount/dataTable.OppCount*100).toFixed(0):0}}%</span>
                    </x-circle>
                  </div>

                  <div class="panel-text">
                    <p class="clearfix">
                      <span class="title">商机总数</span>
                      <span class="digtal">{{dataTable.OppCount}}</span>
                    </p>
                    <p class="clearfix">
                      <span class="title">成交数量</span>
                      <span class="digtal">{{dataTable.OppSucceedCount}}</span>

                    </p>
                  </div>
                </div>
              </li>
            <!--   <li class=' panel-item'>
                <div class="panel-inner clearfix">
                  <div class="left relative circle-wrap">
                    <x-circle :percent="dataTable.OppCount!=0?Number((dataTable.OppSucceedCount/dataTable.OppCount*100).toFixed(0)):0" :stroke-width="10" style="position:absolute;top:0;left:0" stroke-color="#3079D5" :trail-width="10" trail-color="#eeeeee">
                      <span >{{dataTable.OppCount!=0?(dataTable.OppSucceedCount/dataTable.OppCount*100).toFixed(0):0}}%</span>
                    </x-circle>
                  </div>

                  <div class="left hope-wrap cm-wrap">
                    <span class="digtal">{{dataTable.OppCount}}</span> <br>
                    <span class="title">商机总数</span>
                  </div>
                  <div class="left infact-wrap  cm-wrap">
                    <div class="line absolute"></div>
                    <span class="digtal">{{dataTable.OppSucceedCount}}</span> <br>
                    <span class="title">成交数量</span>
                  </div>
                </div>
              </li> -->
            </ul>
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
export default {
  name: '',
  created(){
    this.getData();
  },
  components:{
    XTable,InlineLoading,numberComma,XCircle
  },
  props:['year','area'],
  data(){
    return{
      loading:true,
      dataTable:{}
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
      this.$http.post("/api/EnergizeSaleBulletin/CluebToOpportunitiesAnalyies",{
          AreaName:this.area,
          Year:dateTemp[0],
          Month:month
      })
      .then((res)=>{
        this.loading=false;
        this.dataTable={};
        this.dataTable=res.Data;
        // console.log(this.dataTable);

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
// .pro-wrap{
//   // padding: 10px;
// }
#market-panel{
  background-color: white;
  // margin-bottom: @cmmg;
  .panel-item{
    .line1px(@gray);
    padding: 1rem 0.8rem;
    width: 50%;
    box-sizing: border-box;
    .panel-inner{
      .circle-wrap{
        width:50% !important;
        padding-top:50% !important;
        margin: auto;
      }
      .panel-text{
        padding: 5% 5%;
        p{
          padding: 3% 0;
        }
        .title{
          float: left;
        }
        .digtal{
          float: right;
        }
      }
    }
  }

}
</style>
