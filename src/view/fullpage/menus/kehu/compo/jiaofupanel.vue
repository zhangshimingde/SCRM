<template>
  <div>
    <div class="overviewpanel">
        <div class="title clear">
          <div class="header clearfix cm-padding">
            <img src="static/img/paper.png" alt="" style="position:relative;top:-0.15rem;">
            <span id="title" style="font-size:1.07rem">交付简报</span>
          </div>
          <div class="content text_center">
            <template v-if="!loading">
              <div class="inner relative"  v-if="panelDataList.length>0">
                <flexbox :gutter="0" wrap="wrap" style="background:white">
                  <flexbox-item :span="panelDataList.length>1?1/3:0" v-for="(item,index) in panelDataList" :key="index">
                      <div class="text_center links">
                        <span style="color:#999">{{item.name}} </span><br>
                        <span style="font-size:16px;position:relative;top:2px">{{item.val | fix}}{{item.dw}}</span>
                      </div>
                  </flexbox-item>
                </flexbox>
              </div>
              <p  v-else class="text_center" style="width: 100%;padding:20px 0;">暂无数据..</p>
            </template>
            <div v-else class="text_center" style="height:132px;line-height:132px">
              <inline-loading></inline-loading>
              <span style="color:#9d9d9d">数据加载中</span>
            </div>
          </div>
        </div>
    </div>

    <!-- <div class="process-wrap cm-padding">
      <div class="clearfix header">
        <span class="left title">系统整体健康评估为</span>
        <div class="left start-wrap">
          <i class="iconfont icon-star-man" v-for="(item,index1) in man" :key="index1"></i>
          <i class="iconfont icon-star-ban" v-for="(item,index2) in ban" :key="index2"></i>
          <i class="iconfont icon-star-kong" v-for="(item,index3) in kong" :key="index3"></i>
        </div>
        <span class="right">{{score}}分</span>
      </div>
    </div> -->
    <template v-if="!loading">
      <ul class="jiaofu-list">
        <template v-if="jfList.length>0">
          <li v-for="(item,index) in jfList" :key="index">
            <router-link :to="{name:'jiaofudetail',params:{id:index}}">
              <div class="header">
                <p class="title text-over" style="padding-bottom:10px">{{item.ProjName}}</p>
                <!-- <div class="clearfix panel-box">
                  <div class="left panel-box-item text_center">
                    <div class="relative circle-box">
                      <x-circle :percent="item.jdper>100?100:item.jdper" :stroke-width="5" stroke-color="#FEB53D" :trail-width="5" trail-color="#eeeeee">
                        <span >{{item.jdper}}%</span>
                      </x-circle>
                    </div>
                    <p class="name">进度</p>
                  </div>
                  <div class="left panel-box-item text_center">
                    <div class="relative circle-box">
                      <x-circle :percent="item.cbpre>100?100:item.cbpre" :stroke-width="5" stroke-color="#1EC0AF" :trail-width="5" trail-color="#eeeeee">
                        <span >{{item.cbpre}}%</span>
                      </x-circle>
                    </div>
                    <p class="name">成本</p>
                  </div>
                  <div class="left panel-box-item text_center">
                    <div class="relative circle-box">
                      <x-circle :percent="item.hkpre>100?100:item.hkpre" :stroke-width="5" stroke-color="#F61F39" :trail-width="5" trail-color="#eeeeee">
                        <span >{{item.hkpre}}%</span>
                      </x-circle>
                    </div>
                    <p class="name">款项</p>
                  </div>
                  <div class="left panel-box-item text_center">
                    <div class="relative circle-box">
                      <x-circle :percent="item.tcpre>100?100:item.tcpre" :stroke-width="5" stroke-color="#1EC0AF" :trail-width="5" trail-color="#eeeeee">
                        <span >{{item.tcpre}}%</span>
                      </x-circle>
                    </div>
                    <p class="name">提成</p>
                  </div>
                </div> -->
              </div>

              <div class="footer clearfix">
                <div class="left"><i class="iconfont icon-repire" style="font-size:1.4rem;vertical-align:middle;margin-right:2px;color:#2EA0FC"></i>{{item.ProjStatus}}</div>
                <div class="left text_center text-over">PM:{{item.PMUserName}}</div>
                <div class="left text_right">【{{item.ProjLevelName}}】</div>
              </div>
            </router-link>
          </li>

        </template>
        <template v-else>
          <div class="text_center" style="padding:20px 0;color:#ccc;background:white">暂无数据...</div>
        </template>
      </ul>
    </template>
    <div v-else class="text_center" style="height:132px;line-height:132px">
      <inline-loading></inline-loading>
      <span style="color:#9d9d9d">数据加载中</span>
    </div>
  </div>

</template>

<script>
import {Flexbox, FlexboxItem,InlineLoading,numberComma,XCircle  } from 'vux'
export default {
  name: 'overviewpanel',
  components:{
    Flexbox, FlexboxItem,InlineLoading,numberComma  ,XCircle
  },
  data () {
    return {
      loading:false,
      loading2:false,
      score:0,
      panelDataList:[{
        name:"当前在交付项目",
        val:"",
        dw:"个"
      },{
        name:"年度新增项目",
        val:"",
        dw:"个"
      },{
        name:"当前应收款",
        val:"",
        dw:"万元"
      },{
        name:"年度二开人天",
        val:"",
        dw:"个"
      },{
        name:"年度验收项目",
        val:"",
        dw:"个"
      },{
        name:"年度实际回款",
        val:"",
        dw:"万元"
      }],
      jfList:[]
    }
  },
  computed:{
    man(){
      var temp=parseInt(this.score/20);
      return temp;
    },
    ban(){
      var temp=this.score%20==0?0:1;
      return temp;
    },
    kong(){
      var num1=parseInt(this.score/20);
      var num2=this.score%20==0?0:1;
      var temp=5-num1-num2;
      return temp;
    }
  },
  created(){
    this.getData();
  },
  filters:{
    fix(val){
        return numberComma(Number(val).toFixed(0))
    },
    subst(val){
        if(val){
        return val.substring(0,10)
      }else{
        return val;
      }
    }
  },
  methods:{
    getData(){
      this.loading=true;
      this.$http.post("/api/EnergizeContract/GetKhContractProjectPageList",{
        KHGuid:this.$route.params.id,
        pageIndex:0,
        PageSize:500
      })
      .then((res)=>{
        this.loading=false;
        console.log(res);

        this.panelDataList[0].val=res.Data.CountData[0].JfProjCount;
        this.panelDataList[1].val=res.Data.CountData[0].XzProjCount;
        this.panelDataList[2].val=res.Data.CountData[0].YsAmount;
        this.panelDataList[3].val=res.Data.CountData[0].DevelopWorkLoad;
        this.panelDataList[4].val=res.Data.CountData[0].YsProjCount;
        this.panelDataList[5].val=res.Data.CountData[0].YearHkAmount;
        // this.score=res.Data.ScoreAverage.toFixed(0);
        if(res.Data.List.length==0)return;
        this.jfList=res.Data.List;

       this.$store.commit("setJfList",this.jfList);


      })
    }
  }
}
</script>

<style lang="less">
@import '../../../../../assets/less/exports.less';
.overviewpanel{
  margin:0 0 @cmmg;
  background: white;
  .line1px;
  .line1pxt;
  .header{
    img{
      vertical-align: middle;
      height:1rem;
      // margin-right: 10px
    }
    .line1px;
  }
  .content{
    padding: 0 15px;
    .inner{
      &:after{
        content: " ";
        position: absolute;
        left: 0;
        bottom: 50%;
        right: 0;
        height: 1px;
        border-bottom: 1px solid @gray;
        color: @gray;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
      .links{
        padding: 13px 0;
        font-size:0.9rem !important;
      }

    }

  }
}
.jiaofu-list{
  li{
    background-color: white;
    margin-bottom: 10px;
    a{
      display: block;
      color: #000;
      .header{
        .title{
          padding: 10px 10px 0;
          font-size: 1.1rem;
        }
        .panel-box{
          padding: 10px 0;
          color: #888;
          .panel-box-item{
            width: 25%;
            font-size: 0.9rem;
            .circle-box{
              width: 70%;
              margin: 5px auto;
              padding-top: 70%;

              .vux-circle{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }

      .footer{
        height: 2.5rem;
        line-height: 2.5rem;
        padding: 0 10px;
        border-top: 1px solid #eaeaea;
        &>div{
          width: 33.3%;
        }
      }
    }
  }
}

.process-wrap{
  background-color: white;
  margin-bottom: 15px;
  .start-wrap{
    color: #FFB02E;
    margin-left: 10px;
    font-size: 0;
    i{
      font-size: 1.2rem;
      margin: 0 2px;
    }
  }
}
</style>
