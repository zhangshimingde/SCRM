<template>

  <div id="xiansuo" class="" style="height:100%">
        <div class="header clearfix">
          <div class="left" style="width: 85%;">
            <search ref="search" v-model="key" :autoFixed="false"  @on-submit="sub" placeholder="客户名称/联系人/联系方式/提交人"></search>
          </div>
          <router-link :to="{name:'xiansuoadd',params:{lxrId:$route.params.id}}" class="left text_center addsj" style="width:15%">
            <i class="iconfont icon-tianjia" style="font-size:1.5rem;color:#999"></i>
          </router-link>
        </div>
        <div>
          <tab active-color="#0992FF"  bar-active-color="#0992FF">
            <tab-item :selected="indexTab==1" @on-item-click="indexTab=1">跟进中</tab-item>
            <tab-item :selected="indexTab==0" @on-item-click="indexTab=0">未指派</tab-item>
            <tab-item :selected="indexTab==3" @on-item-click="indexTab=3">关闭</tab-item>
            <tab-item :selected="indexTab==2" @on-item-click="indexTab=2">商机</tab-item>
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
                <list :data="datas" :showZP="showZP" @finishZP="freshList"></list>
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
            <condition :indexTab="indexTab" @finish="conditionFinish"></condition>
          </popup>
        </div>
  </div>
</template>

<script>
import {TransferDom, Tab, TabItem,Search,PopupRadio ,Popup, Group,InlineLoading  } from 'vux'
import list from './xiansuolistmore';
import condition from './cluecondition';
export default {
  name: '',
  directives: {
    TransferDom
  },
  components:{
    Search ,PopupRadio , Group,list,InlineLoading,Popup,Tab, TabItem,condition
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
    if(this.$route.params.type=='lianxiren'){
      this.lxrphone=this.$route.params.phone;
    }else if(this.$route.params.type=='kehu'){
      this.khid=this.$route.params.id;
    }
    this.$cmBus.$on("refreshXsList",()=>{

      this.getData(true);
    })
    this.getData(true);
    if(this.indexTab==2||this.indexTab==3){this.showZP=false}else{this.showZP=true}
  },
  data () {
    return {
      showZP:true,
      khid:"",
      lxrphone:"",
      indexTab:1,
      oppName:"",
      loading:false,
      loading2:true,
      showCondition:false,
      page:0,
      totalPage:0,
      PageSize:15,
      key:"",

      condition:{
          peopleId:"",
          clueTypeId:"",
          productId:"",
          areaId:"",
          warnType:"",
        },
      px:"1",
      optionspx: [{
        key: '0',
        value: '最近跟进时间'
      }, {
        key: '1',
        value: '创建时间'
      }],
      datas:[  //列表数据
      ]
    }
  },
  methods:{
    freshList(){
      // alert(2)
      this.getData(true);
    },
    getData(isEmpty){
      this.oppName=this.key;
      if(isEmpty){
        this.page=0;
        this.loading2=true;
      }
      this.loading = true;
      var order;
      switch(this.px){
        case "0":order="LastFollowTime";break;
        case "1":order="CreateTime";break;
      }
      this.$http.post("/api/EnergizaSaleClueController/GetClueListMobile",{
        PageIndex:this.page,
        PageSize:this.PageSize,
        OpportunityStatus:this.indexTab,
        FollowerGUID:"",
        FollowerGUIDs:this.condition.peopleId,
        AreaIDs:this.condition.areaId,
        OpportunityTypeIDs:this.condition.clueTypeId,
        ProductCodes:this.condition.productId,
        Telephone:this.lxrphone,
        KHGUID:this.khid,
        WarningType:this.condition.warnType,
        MobileAllName:this.key,
        orderField:order,
        orderByType:"DESC",
      })
      .then((res)=>{
        // console.log(res);
        // return;
        this.totalPage=Math.ceil(res.Data.TotalCount/this.PageSize);
        this.loading = false;
        this.loading2=false;
        // this.loading2 = false;
        if(isEmpty){
          this.datas=[];
          if(document.getElementById('scroll-wrap')){
            document.getElementById('scroll-wrap').scrollTop=0;
          }
        }

        res.Data.View.map((el)=>{
           this.datas.push(el);
        })

      })
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
      this.getData(true);
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
      if(val==2||val==3){this.showZP=false}else{this.showZP=true}
      this.condition.warnType="";
      this.getData(true);
    }
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
