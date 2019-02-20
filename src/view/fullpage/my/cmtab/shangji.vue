<template>

  <div id="shangji" class="" style="height:100vh;padding-top:44px;box-sizing:border-box">
        <div class="header clearfix">
          <div class="left" style="width: 85%;">
            <search ref="search" v-model="key" :autoFixed="false"  @on-submit="sub" placeholder="搜索商机、客户名称或者商机主责人"></search>
          </div>
          <router-link :to="{name:'shangjiadd'}" class="left text_center addsj" style="width:15%;background:#F6F6F6">
            <i class="iconfont icon-tianjia" style="font-size:1.5rem;color:#999"></i>
          </router-link>
        </div>
        <div  v-if="$route.params.type!='我的关注'">
          <tab active-color="#0992FF"  bar-active-color="#0992FF">
            <tab-item :selected="indexTab==1" @on-item-click="indexTab=1">跟进商机</tab-item>
            <tab-item :selected="indexTab==0" @on-item-click="indexTab=0">全部商机</tab-item>

            <tab-item :selected="indexTab==2" v-if="hasXs" @on-item-click="indexTab=2">下属商机</tab-item>
          </tab>
        </div>
        <div class="nav cm-padding clearfix text_center" style="border-top:none">
          <div class="left" style="border-right:1px solid #eaeaea" @click="showCondition=true">
            <i class="iconfont icon-shaixuan"></i> 高级筛选</div>
          <div class="left">
            <popup-radio :options="optionspx" v-model="px">
              <div slot="popup-header" class="pop-title">选择排序条件</div>
            </popup-radio>
          </div>
        </div>
        <div class="content" id="scroll-wrap">
          <template v-if="!loading2">
            <div id="scroll-box">
                <list :data="datas"></list>
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

        <div v-transfer-dom>
          <popup  v-model="showCondition" :popup-style="{background:'white'}" position="right" width="80%">
            <condition @finish="conditionFinish" :oppName="oppName" :sjType="indexTab"></condition>
          </popup>
        </div>
  </div>
</template>

<script>
import {TransferDom, Tab, TabItem,Search,PopupRadio ,Popup, Group,InlineLoading  } from 'vux'
import list from '@/view/fullpage/menus/shangji/shangjilistmore';
import condition from '@/view/fullpage/menus/shangji/shangjicondition';
export default {
  name: '',
  directives: {
    TransferDom
  },
  components:{
    Search ,PopupRadio , Group,list,InlineLoading,Popup,condition,Tab, TabItem
  },
  mounted(){
    var inner=document.getElementById('scroll-box');
    var outer=document.getElementById('scroll-wrap');
    var _this=this;
    outer.onscroll=function(){
         if(_this.loading) return;
         // console.log(this.scrollTop +outer.offsetHeight,document.getElementById('scroll-box').clientHeight)
         if(this.scrollTop +outer.offsetHeight+10>=document.getElementById('scroll-box').clientHeight){
           _this.loadMore();
         }
    }
    if(this.$route.params.type=='lianxiren'){
      this.lxrid=this.$route.params.id;
    }else if(this.$route.params.type=='kehu'){
      this.khid=this.$route.params.id;
    }
    this.getData(true);
    this._hasXs();
  },
  data () {
    return {
      khid:"",
      lxrid:"",
      hasXs:false,
      indexTab:this.$route.params.type!='我的关注'?1:0,
      oppName:"",
      loading:false,
      loading2:true,
      showCondition:false,
      page:0,
      totalPage:0,
      key:"",
      px:"1",
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
    sear(){
      this.$router.push({name:"shangjisearch"})
    },
    _hasXs(){
      if(this.$route.params.type=="我的关注"){
          // this.$http.post("/api/EnergizaSalesOpportunities/GetConditionList",{
          //   OpportunitiesName :this.key,
          //   PageIndex:this.page,
          //   PageSize:50,
          //   StageGUIDMultipleChoice:this.condition.status,
          //   TypeGUIDMultipleChoice:this.condition.types,
          //   ProductCodeMultipleChoice:this.condition.products,
          //   CompanyGUIDMultipleChoice :this.condition.areas,
          //   SourceGUIDForSType3MultipleChoice :"",
          //   orderField:"FlowerLogTime",
          //   orderByType:"DESC",
          //   ResponsibleGUID:this.condition.people,
          //   IsIndex:0,
          //   IndexGUID:'ff0d1cd6-94d3-458c-afd2-8bc477756cb4',
          //   KHGUID:this.khid,
          //   LXRGUID:this.lxrid,
          //   isConcern:true
          // })
          // .then((res)=>{
          //     res.Data.PagingInfo.TotalRecords>0?this.hasXs=true:this.hasXs=false;
          // })
      }else{
        this.$http.post("/api/EnergizaSalesOpportunities/GetConditionList",{
            OpportunitiesName :this.key,
            PageIndex:this.page,
            PageSize:15,
            StageGUIDMultipleChoice:this.condition.status,
            TypeGUIDMultipleChoice:this.condition.types,
            ProductCodeMultipleChoice:this.condition.products,
            CompanyGUIDMultipleChoice :this.condition.areas,
            SourceGUIDForSType3MultipleChoice :"",
            orderField:"FlowerLogTime",
            orderByType:"DESC",
            ResponsibleGUID:this.condition.people,
            IsIndex:0,
            IndexGUID:'ff0d1cd6-94d3-458c-afd2-8bc477756cb4',
            KHGUID:this.khid,
            LXRGUID:this.lxrid,
            isWeiwinHistoryList:true,
            WarningType:this.condition.warnType,
          })
          .then((res)=>{
              res.Data.PagingInfo.TotalRecords>0?this.hasXs=true:this.hasXs=false;
          })
      }

    },
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
      if(this.$route.params.type=="我的关注"){
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
          IsIndex:type,
          IndexGUID:xsId,
          KHGUID:this.khid,
          LXRGUID:this.lxrid,
          WarningType:this.condition.warnType,
          isConcern:true
        })
        .then((res)=>{
          this.totalPage=Math.ceil(res.Data.PagingInfo.TotalRecords/res.Data.PagingInfo.PageSize);
          this.loading = false;
          this.loading2=false;
          // this.loading2 = false;
          if(isEmpty){
            this.datas=[];
            document.getElementById('scroll-wrap').scrollTop=0;
          }

          res.Data.SOListDataTable.map((el)=>{
             this.datas.push(el);
          })
        })
      }else{
        this.$http.post("/api/EnergizaSalesOpportunities/GetConditionList",{
            OpportunitiesName :this.key,
            PageIndex:this.page,
            PageSize:50,
            StageGUIDMultipleChoice:this.condition.status,
            TypeGUIDMultipleChoice:this.condition.types,
            ProductCodeMultipleChoice:this.condition.products,
            CompanyGUIDMultipleChoice :this.condition.areas,
            SourceGUIDForSType3MultipleChoice :"",
            orderField:order,
            orderByType:"DESC",
            ResponsibleGUID:this.condition.people,
            IsIndex:type,
            IndexGUID:xsId,
            KHGUID:this.khid,
            LXRGUID:this.lxrid,
            WarningType:this.condition.warnType,
            isWeiwinHistoryList:true
          })
          .then((res)=>{
            this.totalPage=Math.ceil(res.Data.PagingInfo.TotalRecords/res.Data.PagingInfo.PageSize);
            this.loading = false;
            this.loading2=false;
            // this.loading2 = false;
            if(isEmpty){
              this.datas=[];
              document.getElementById('scroll-wrap').scrollTop=0;
            }

            res.Data.SOListDataTable.map((el)=>{
               this.datas.push(el);
            })
          })
      }

    },
    conditionFinish(params){ //筛选条件选择完毕
      // console.log(params);
      this.showCondition=false;
      this.condition=params;

      this.getData(true);
    },
    loadMore() {
      this.page++;
      if(this.page>this.totalPage&&this.totalPage!=0) return;
      this.getData(false);
    },
    sub(){ //搜索
      if(!this.key) return;

      this.resetCondition();
      this.getData(true);
    },
    resetCondition(){  //高级筛选条件重新获取后，重置所选条件
      // this.condition.status="";
      this.condition={
          people:"",
          status:"",
          types:"",
          products:"",
          areas:"",
          warnType:""
      }
    }
  },
  watch:{
    px(val){ //修改了排序条件
      this.getData(true);
    },
    key(val){ //搜索关键词置空
      if (!val) {
        this.getData(true);
      };
    },
    indexTab(val){
      this.resetCondition();
      this.getData(true);
    }
  }
}
</script>

<style lang="less">
#shangji{
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
