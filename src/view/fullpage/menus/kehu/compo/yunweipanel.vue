<template>
  <div>
    <div class="overviewyunwei">
        <div class="title clear">
          <div class="header clearfix cm-padding">
            <img src="static/img/paper.png" alt="" style="position:relative;top:-0.15rem;">
            <span id="title" style="font-size:1.07rem">运维简报</span>
          </div>
          <div class="content text_center">
            <template v-if="!loading">
              <div class="inner relative"  v-if="panelDataList.length>0">
                <flexbox :gutter="0" wrap="wrap" style="background:white">
                  <flexbox-item :span="panelDataList.length>1?1/3:0" v-for="(item,index) in panelDataList" :key="index">
                      <div class="text_center links">
                        <span style="color:#999">{{item.name}} </span><br>
                        <span style="font-size:16px;position:relative;top:2px" v-if="item.dw=='万元'">{{item.val | fix}}{{item.dw}}</span>
                        <span style="font-size:16px;position:relative;top:2px" v-else-if="item.dw==''">{{item.val | subst}}</span>
                        <span style="font-size:16px;position:relative;top:2px" v-else>{{item.val}}{{item.dw}}</span>
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
    
    <div class="score-wrap cm-padding">
      <div class="clearfix header">
        <span class="left title">系统整体健康评估为</span>
        <span class="status" style="color:#1EC0AF" v-if="score>=80">良好</span>
        <span class="status" style="color:#FEB53D" v-else-if="score<80&&score>=60">危险</span>
        <span class="status" style="color:#F61F39" v-else-if="score<60">高危</span>
        <span class="right">{{score}}分</span>
      </div>

      <div class="clearfix content">
        <div class="left relative process-bar" style="width: 25%;">
          <div class="text absolute">0</div>
          <div class="absolute ball" :class="score<=100?'red':''"></div>
          <div class="absolute process-inner p3" :style="{'width':redWidth+'%'}"></div>
        </div>
        <div class="left relative process-bar" style="width: 35%;">
          <div class="text absolute">60</div>
          <div class="absolute ball" :class="score>=60?'yellow':''"></div>
          <div class="absolute process-inner p2" :style="{'width':yellowWidth+'%'}"></div>
        </div>
        <div class="left relative process-bar" style="width: 40%;">
          <div class="text absolute">80</div>
          <div class="absolute ball" :class="score>=80?'green':''"></div>
          <div class="absolute process-inner p1" :style="{'width':greenWidth+'%'}"></div>
        </div>

        <div class="left relative process-bar" style="width: 0%;">
          <div class="text absolute" style="right:-45px">100</div>
          <div class="absolute ball" :class="score==100?'green':''"></div>
        </div>
        
        
      </div>
    </div>


    <ul class="yunwei-list">
      <template v-if="!loading">
        <template v-if="ywList.length>0">
          <group  v-for="(item,index) in ywList" :key="index">
            <cell-box>
              <li style="display:block;width: 100%;">
                <p class="yw-p black">{{item.sortName}}</p>
                <p class="clearfix yw-cl yw-p">
                  <span class="left banner">客户经理：</span>
                  <span class="left content"><span class='black'>{{item.clientManage}}</span> | {{item.status}}</span>
                </p>
                <p class="clearfix yw-cl yw-p">
                  <span class="left banner">运维到期日：</span>
                  <span class="left content black">{{item.dueDate | subst}}</span>
                </p>
                
              </li>
            </cell-box>

            <cell-box>

              <li style="display:block;width: 100%;">
                <p class="yw-p black">事件单</p>
                <div class="text_center yw-circle">
                  <div class="relative circle-box-wrap text_center">
                    <div class="circle-box relative">
                      <x-circle :percent="Number(item.eventWaitClose)" :stroke-width="5" stroke-color="#FEB53D" :trail-width="5" trail-color="#eeeeee">
                        <span >{{item.eventWaitClose}}%</span>
                      </x-circle>
                    </div>
                    <p>待关闭</p>
                  </div>
                  <div class="relative circle-box-wrap text_center">
                    <div class="circle-box relative">
                      <x-circle :percent="Number(item.eventTimeOut)" :stroke-width="5" stroke-color="#F61F39 " :trail-width="5" trail-color="#eeeeee">
                        <span >{{item.eventTimeOut}}%</span>
                      </x-circle>
                    </div>
                    <p>超时</p>
                  </div>
                  <div class="relative circle-box-wrap text_center">
                    <div class="circle-box relative">
                      <x-circle :percent="Number(item.eventSLARate)" :stroke-width="5" stroke-color="#1EC0AF" :trail-width="5" trail-color="#eeeeee">
                        <span >{{item.eventSLARate}}</span>
                      </x-circle>
                    </div>
                    <p>SLA达成率</p>
                  </div>
                </div>
                <p class="clearfix yw-cl yw-p">
                  <span class="left banner">总量：</span>
                  <span class="left content black">{{item.eventTotal}}</span>
                </p> 
                <p class="clearfix yw-cl yw-p">
                  <span class="left banner">日均咨询量：</span>
                  <span class="left content black">{{item.eventDaily}}</span>
                </p>
              </li>
            </cell-box>
            <cell-box>

              <li style="display:block;width: 100%;">
                <p class="yw-p black">签约金额</p>
                <p class="clearfix yw-cl yw-p">
                  <span class="left banner">建议签约：</span>
                  <span class="left content black">￥{{item.signSuggest | fix}}万</span>
                </p>
                <p class="clearfix yw-cl yw-p">
                  <span class="left banner">实际签约：</span>
                  <span class="left content black">￥{{item.signReality | fix}}万</span>
                </p>
                <p class="clearfix yw-cl yw-p">
                  <span class="left banner">折扣率：</span>
                  <span class="left content black">{{item.signRebate}}</span>
                </p>
                
              </li>
            </cell-box>

            <cell-box>

              <li style="display:block;width: 100%;">
                <p class="yw-p black text-over">
                  <i class="iconfont icon-jianbaowendang" style="color:#FD8831"></i>
                  明源云明源系统月度运维报告【2017-06】
                </p>
                <p class="clearfix yw-cl yw-p">
                  <span class="left banner">报告类型：</span>
                  <span class="left content black">月度</span>
                </p>
                <p class="clearfix yw-cl yw-p">
                  <span class="left banner">发送时间：</span>
                  <span class="left content black">2017-07-11</span>
                </p>
                
                <router-link :to="{name:''}" class="block checkdetail text_center">
                     查看报告
                </router-link>
              </li>
            </cell-box>
          </group>
        </template>
        <template v-else>
          <p  class="text_center" style="width: 100%;padding:40px 0;background:white;margin-top:15px">暂无数据..</p>
        </template>
      </template>
      <div v-else class="text_center" style="height:132px;line-height:132px">
        <inline-loading></inline-loading>
        <span style="color:#9d9d9d">数据加载中</span>
      </div>
    </ul>
  </div>
      
</template>

<script>
import {Flexbox, FlexboxItem,InlineLoading,numberComma,CellBox,Group,XCircle  } from 'vux'
export default {
  name: 'overviewyunwei',
  components:{
    Flexbox, FlexboxItem,InlineLoading,numberComma  ,CellBox,Group,XCircle
  },
  data () {
    return {
      loading:false,
      loading2:false,
      score:100,
      panelDataList:[{
          name:"运维应签金额",
          val:"",
          dw:"万元"
        },{
          name:"运维实际签约",
          val:"",
          dw:"万元"
        },{
          name:"事件单总量",
          val:"0",
          dw:"个"
        },{
          name:"运维到期日",
          val:"0000/00/00",
          dw:""
        }
      ],
      ywList:[]
    }
  },
  computed:{
    greenWidth(){
      var temp=0;
      if(this.score<80){
        temp=0;
      }else{
        temp=(this.score-80)/20;
      }
      return temp*100;
    },
    yellowWidth(){
      var temp=0;
      if(this.score<60){
        temp=0;
      }else if(this.score<80&&this.score>=60){
        temp=(this.score-60)/20;
      }else{
        temp=1;
      }
      
      return temp*100
    },
    redWidth(){
      var temp=0;
      if(this.score>60){
        temp=1;
      }else{
        temp=this.score/60;
      }
      return temp*100
    }
  },
  created(){
    this.getListData();
    // this.getListData();
  },
  filters:{
    fix(val){
        return numberComma(Number(val/10000).toFixed(2))
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
    getPanelData(){
      // alert(this.$route.params.id)
      this.loading=true;
      this.$http.post("/api/EnergizaSaleKHInfoController/GetCustomerOperation",{
        SortName:this.$route.params.id
      })
      .then((res)=>{
        this.loading=false;
        console.log(res);
        return;
        this.panelDataList[0].val=res.Data.QYYear/10000;
        this.panelDataList[1].val=res.Data.ContractCountYear;
        this.panelDataList[2].val=res.Data.QYTotal/10000;
        this.panelDataList[3].val=res.Data.ContractCountTotal;
      })
    },
    getListData(){
      this.loading=true;
       this.$http.post("/api/EnergizaSaleKHInfoController/GetCustomerOperation",{
        SortName:this.$route.params.id
      })
      .then((res)=>{
        this.loading=false;
        console.log(res);
        if(res.Data.userData.items.length==0)return;
        this.ywList=res.Data.userData.items;

        this.panelDataList[0].val=this.ywList[0].signSuggest;
        this.panelDataList[1].val=this.ywList[0].signReality;
        this.panelDataList[2].val=this.ywList[0].eventTotal;
        this.panelDataList[3].val=this.ywList[0].dueDate;
      })
    },
    judgeScore(score){

    }
  }
}
</script>

<style lang="less">
@import '../../../../../assets/less/exports.less';
.overviewyunwei{
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
        font-size:14px;
      }

    }
    
  }
}
.yunwei-list{
  color: #666;
  font-size: 0.95rem;
  .black{
    color: #000;
  }
  p.yw-p{
    line-height: 2rem;
  }
  .yw-cl{
    .banner{
      width: 31%;
    }
    .content{
      width: 69%
    }
  }
  .yw-circle{
    margin: 5px 0;
    .circle-box-wrap{
      width: 30%;
      display: inline-block;
      font-size: 0.9rem;
      .circle-box{
        width: 80%;
        padding-top: 80%;
        margin:5px auto;

        .vux-circle{
          position: absolute;
          left: 0;
          top:0;
        }
      }
    }
  }
  .checkdetail{
    margin:10px auto;
    border-radius: 20px;
    width: 70%;
    height: 1.7rem;
    line-height: 1.7rem;
    border: 1px solid #D8D8D8;
    color: #666;
    font-size: 0.9rem;
  }
}
.score-wrap{
  background-color: white;
  .header{
    .status{
      margin-left: 10px;
    }
  }
  .content{
    padding: 15px 0 20px;
    .process-bar{
      height: 0.3rem;
      background-color: #DCDCDC;
      width: 30%;
      .text{
        color: #666;
        left: 0;
        transform:translateX(-40%);
        top: 100%;
        font-size: 0.9rem;
        padding-top: 5px;
      }
      .ball{
          @h:0.7rem;
          height: @h;
          width: @h;
          background-color: #DCDCDC;
          left: -@h/2;
          top:-0.2rem;

          border-radius: 100%;
          z-index: 2;
          &.green{
            background-color: #1EC0AF
          };
          &.yellow{
            background-color: #FEB53D
          };
          &.red{
            background-color: #F61F39
          }
      }
      .process-inner{
        height: 0.3rem;
        left:0;
        top:0;
        background-color: red;
        border-radius: 20px;
        &.p1{
          background-color: #1EC0AF;
        }
        &.p2{
          background-color: #FEB53D;
        }
        &.p3{
          background-color: #F61F39;
        }
      }
    }
  }
}
</style>
