<template>

  <div id="xiansuo" class="" style="height:100%">
        <div class="header clearfix">
          <div class="left" style="width: 97%;">
            <search ref="search" v-model="key" :autoFixed="false"  @on-submit="sub" placeholder="客户名称/联系人/联系方式/提交人"></search>
          </div>
        </div>
        <!-- <div>
          <tab active-color="#0992FF"  bar-active-color="#0992FF">
            <tab-item :selected="indexTab==1" @on-item-click="indexTab=1">我的商机</tab-item>
            <tab-item :selected="indexTab==0" @on-item-click="indexTab=0">全部商机</tab-item>

            <tab-item :selected="indexTab==2" v-if="hasXs" @on-item-click="indexTab=2">下属商机</tab-item>
          </tab>
        </div> -->
        <div class="nav cm-padding clearfix text_center" style="border-top:none">
          <!-- <div style="width:100%" @click="showCondition=true">
            <i class="iconfont icon-shaixuan"></i> 高级筛选</div> -->

          <div class="left" style="width:100%">
            <popup-radio :options="optionspx" v-model="px">
              <div slot="popup-header" class="pop-title">选择排序条件</div>
            </popup-radio>
          </div>
        </div>
        <div class="content" id="scroll-wrap">
          <template v-if="!loading2">
            <div id="scroll-box">
                <list :data="datas"  @finishFP="getData(true)"></list>
                <p class="text_center" v-if="loading" style="padding:9px 0">
                  <inline-loading></inline-loading>
                  <span style="color:#9d9d9d">数据加载中</span>
                </p>
            </div>
          </template>
          <template v-else>
            <p class="text_center" style="padding:40px 0">
              <inline-loading></inline-loading>
              <span style="color:#9d9d9d">数据加载中</span>
            </p>
          </template>
        </div>


        <!-- <div v-transfer-dom>
          <popup  v-model="showCondition" :popup-style="{background:'white'}" position="right" width="80%">
            <condition :indexTab="indexTab" @finish="conditionFinish"></condition>
          </popup>
        </div> -->
  </div>
</template>

<script>
import {TransferDom, Tab, TabItem,Search,PopupRadio ,Popup, Group,InlineLoading  } from 'vux'
import list from '@/view/fullpage/menus/shangji/shangjilistmore';
// import condition from '@/view/fullpage/menus/shangji/cluecondition';
export default {
  name: '',
  directives: {
    TransferDom
  },
  components:{
    Search ,PopupRadio , Group,list,InlineLoading,Popup,Tab, TabItem
  },
  created(){

    switch(this.$route.params.type){
      case 'TowWeekQY':document.title="签约前两周新增商机";break;
      case 'Over30dayState':document.title="跟进周期超过30天以上商机";break;
      case 'More90Day':document.title="跟进周期超过3个月以上商机";break;
      case 'NoFollowDynamicBy2Week':document.title="商机超时跟进";break;
      case 'OverPredictTradeTime':document.title="商机逾期未成交";break;
      case 'StageStandTimeOut':document.title="商机单阶段停留超时";break;
    }

  },
  mounted(){
    var inner=document.getElementById('scroll-box');
    var outer=document.getElementById('scroll-wrap');
    var _this=this;
    if(outer){
      outer.onscroll=function(){
           if(_this.loading) return;
           if(this.scrollTop +outer.offsetHeight+10>=document.getElementById('scroll-box').clientHeight){
             _this.loadMore();
           }
      }
    }

    this.$cmBus.$on("refreshSjList",()=>{

      this.getData(true);
    })
    this.getData(true);
  },
  data () {
    return {
      khid:"",
      lxrid:"",
      hasXs:false,
      indexTab:0,
      oppName:"",
      loading:false,
      loading2:true,
      showCondition:false,
      page:0,
      totalPage:0,
      key:"",
      px:"0",
      condition:{
          people:"",
          status:"",
          types:"",
          products:"",
          areas:"",
          warnType:""
        },
      optionspx: [{
        key: '0',
        value: '最近跟进记录'
      }, {
        key: '1',
        value: '创建时间'
      }, {
        key: '2',
        value: '预计成交金额'
      }],
      datas:[  //列表数据
      ]
    }
  },
  methods:{
    getData(isEmpty){
      this.oppName=this.key;
      if(isEmpty){
        this.page=0;
        this.loading2=true;
      }
      this.loading = true;
      // console.log(this.page);
      var order;
      switch(this.px){
        case "0":order="FlowerLogTime";break;
        case "1":order="CreateTime";break;
        case "2":order="PredictTradeMoney";break;
      }

      var xsId,type;
      if(this.indexTab==2){
          xsId='ff0d1cd6-94d3-458c-afd2-8bc477756cb4';type=0
      }else{
        xsId='';type=this.indexTab;
      }
      this.$http.post("/api/EnergizaSalesOpportunities/GetConditionList",{
        OpportunitiesName :this.key,
        PageIndex:this.page,
        PageSize:15,
        StageGUIDMultipleChoice:this.condition.status,
        TypeGUIDMultipleChoice:this.condition.types,
        ProductCodeMultipleChoice:this.condition.products,
        CompanyGUIDMultipleChoice :this.condition.areas,
        SourceGUIDForSType3MultipleChoice :"",
        orderField:order,
        orderByType:"DESC",
        ResponsibleGUID:this.condition.people,
        IsIndex:this.indexTab,
        // IsIndex:type,
        IndexGUID:xsId,
        KHGUID:this.khid,
        LXRGUID:this.lxrid,
        WarningType:this.$route.params.type,
      })
      .then((res)=>{

        // console.log(res.Data);

        this.totalPage=Math.ceil(res.Data.PagingInfo.TotalRecords/res.Data.PagingInfo.PageSize);
        this.loading = false;
        this.loading2=false;
        // this.loading2 = false;
        if(isEmpty){
          this.datas=[];
          if(document.getElementById('scroll-wrap')){
              document.getElementById('scroll-wrap').scrollTop=0;
          }
          // return;

        }

        res.Data.SOListDataTable.map((el)=>{
           this.datas.push(el);
        })

        // console.log(this.datas)

      })
    },
    // conditionFinish(params){ //筛选条件选择完毕
    //   // console.log(params);
    //   this.showCondition=false;
    //   this.condition=params;

    //   this.getData(true);
    // },
    loadMore() {
      this.page++;
      if(this.page>this.totalPage&&this.totalPage!=0) return;
      this.getData(false);
    },
    sub(){ //搜索
      if(!this.key) return;
      this.getData(true);
    },
    GetDateTimeStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
        var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
        var h= dd.getHours()<10?"0"+dd.getHours():dd.getHours();
        var min= dd.getMinutes()<10?"0"+dd.getMinutes():dd.getMinutes();
        var s= dd.getSeconds()<10?"0"+dd.getSeconds():dd.getSeconds();
        return y+"-"+m+"-"+d+" "+h+":"+min+":"+s;
    }
  },
  watch:{
    key(val){ //搜索关键词置空
      if (!val) {
        this.getData(true);
      };
    },
    px(val){ //修改了排序条件
      this.getData(true);
    },
    // indexTab(val){
    //   this.condition.warnType="";
    //   this.getData(true);
    // }
  }
}
</script>

<style lang="less">
#xiansuo{
  width: 100%;
  height:100%;
  left: 0;
  right: 0;
  display: flex;
  flex-direction:column;
  color: #666;
  .header{
    .weui-search-bar{
      padding-right: 0;
    }
  }
  .nav{
    border-top: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
    background-color: white;
    &>div{
      width: 50%;
      box-sizing: border-box;
    };
    .weui-cell{
      padding: 0;
      padding-bottom: 0 !important;
      .weui-cell__ft{
        width: 100%;
        text-align: center;
        &:after{
          transform:rotate(135deg);
          margin-top: -6px;
          right: 10px

        }
      }

    }
  }
  .content{
    flex-grow:1;
    background-color: white;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .weui-search-bar:after,.weui-search-bar:before{
    border: none
  }

}
.pop-title{
  padding: 10px 15px;
  border-bottom: 1px solid #eaeaea;
  text-align: center;
}
.addsj{
  height: 44px;
  line-height: 44px;
}
</style>
