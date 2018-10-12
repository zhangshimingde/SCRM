<template>
  <div class="jiaofudetail cm-padding">
    <p class="title">{{title}}</p>
    <ul class="jiaofu-list-item">
      <li class="relative" v-for="(item,index) in dataList" :key="index">
        <p class="name">{{item.name}}</p>
        <div class="inner-content relative">
          <p class="clearfix" v-for="(item2,index2) in item.list" :key="index2">
            <span class="left banner">{{item2.key}}：</span>
            <span class="left content">{{item2.value}}</span>
          </p>

          <div class="absolute cir">
            <x-circle :percent="item.percent>100?100:item.percent" :stroke-width="5" :stroke-color="item.color" :trail-width="5" trail-color="#eeeeee">
              <span >{{item.percent}}%</span>
            </x-circle>
          </div>
        </div>
        
      </li>
    </ul>
  </div>
      
</template>

<script>
import {Flexbox, FlexboxItem,InlineLoading,numberComma,XCircle  } from 'vux'
export default {
  name: 'jiaofudetail',
  components:{
    Flexbox, FlexboxItem,InlineLoading,numberComma  ,XCircle
  },
  destroyed () {
    document.querySelector('html').setAttribute('style', 'background:#F6F6F6')
  },
  mounted(){
    console.log(this.jfList[this.$route.params.id]);
    this.setData(this.jfList[this.$route.params.id]);
    document.querySelector('html').setAttribute('style', 'background:#fff');
    // this.
  },
  computed: {
    jfList() {
      return this.$store.state.jfList;
    }
  },
  data () {
    return {
      title:{},
      dataList:[
          {
            name:"进度信息",
            color:"#FEB53D",
            percent:0,
            list:[{
              key:"启动日期",
              value:""
            },{
              key:"计划验终",
              value:""
            },{
              key:"实际验终",
              value:""
            }]
          },
          {
            name:"成本信息",
            color:"#1EC0AF",
            percent:0,
            list:[{
              key:"总目标",
              value:""
            },{
              key:"在途成本",
              value:""
            },{
              key:"已发生",
              value:""
            },{
              key:"剩余成本",
              value:""
            }]
          },
          {
            name:"款项信息",
            color:"#F61F39",
            percent:0,
            list:[{
              key:"应收总额",
              value:""
            },{
              key:"回款金额",
              value:""
            },{
              key:"未回款金额",
              value:""
            },{
              key:"下笔应收款",
              value:""
            },{
              key:"天数",
              value:""
            }]
          },
          {
            name:"提成信息",
            color:"#1EC0AF",
            percent:0,
            list:[{
              key:"项目总提成",
              value:""
            },{
              key:"已提成金额",
              value:""
            },{
              key:"剩余提成",
              value:""
            },{
              key:"提成扣减",
              value:""
            }]
          },
      ]
    }
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
    setData(list){
      this.title=list.ProjName;
      this.dataList[0].percent=list.jdper;
      this.dataList[0].list[0].value=list.BeginDate;
      this.dataList[0].list[1].value=list.PlanFinalInsp;
      this.dataList[0].list[2].value=list.ActualFinalIn;

      this.dataList[1].percent=list.cbpre;
      this.dataList[1].list[0].value=list.TargetDevelop;
      this.dataList[1].list[1].value=list.InDevlope;
      this.dataList[1].list[2].value=list.AlreadyCost;
      this.dataList[1].list[3].value=list.RemainWorkloa;


      this.dataList[2].percent=list.hkpre;
      this.dataList[2].list[0].value=list.hkysTotal;
      this.dataList[2].list[1].value=list.hkGetTotal;
      this.dataList[2].list[2].value=list.hkWsTotal;
      


      this.dataList[3].percent=list.tcpre;
      this.dataList[3].list[0].value=list.Xmztc;
      this.dataList[3].list[1].value=list.Ytcje;
      this.dataList[3].list[2].value=list.Sytc;
      this.dataList[3].list[3].value=list.Tckj;


      this.$http.post("/api/EnergizaSaleKHInfoController/GetKHProjectNextFee",{
        ProjectGUID:list.PM_ProjectId
      })
      .then((res)=>{
        if(!res.Data) return;
        this.dataList[2].list[3].value=res.Data.FeeName;
        this.dataList[2].list[4].value=res.Data.YqDays;
      })
    }
  }
}
</script>

<style lang="less">
@import '../../../../../assets/less/exports.less';
.jiaofudetail{
  .title{
    font-size: 1.3rem;
    margin-bottom:1rem; 
  }
  .jiaofu-list-item{
    li{
      margin: 10px 0;
      line-height: 1.9rem;
      .name{
        color: #3079D5;
        font-size:1.1rem;
      }
      .inner-content{
        border-top: 1px solid #eaeaea;
        .banner{
          width: 30%;
          color: #666;
        }
        .content{
          width: 70%;
        }
      }
      .cir{
        width: 20%;
        padding-top: 20%;
        top:10%;
        right: 0%;
        .vux-circle{
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top:0;
        }
      }
    }
  }
}
</style>
