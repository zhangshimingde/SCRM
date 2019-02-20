<template>
  <div id="shangji" class="" style="height:100%">
        <div class="header clearfix">
          <div class="left" style="width: 85%;">
            <search ref="search" v-model="key" :autoFixed="false"  @on-submit="sub" placeholder="搜索客户或客户主责人"></search>
          </div>
          <router-link :to="{name:'kehuadd'}" class="left text_center addsj" style="width:15%">
            <i class="iconfont icon-tianjia" style="font-size:1.5rem;color:#999"></i>
          </router-link>
        </div>
        <div>
          <tab active-color="#0992FF"  bar-active-color="#0992FF">
            <tab-item :selected="indexTab==2" @on-item-click="indexTab=2">我的客户</tab-item>
            <tab-item :selected="indexTab==1" @on-item-click="indexTab=1">区域客户</tab-item>
            <tab-item :selected="indexTab==0" @on-item-click="indexTab=0">全国客户</tab-item>
          </tab>
        </div>
        <div class="nav cm-padding clearfix text_center" style="border-top:none">
          <div class="" style="width:100%" @click="showCondition=true">
            <i class="iconfont icon-shaixuan"></i> 高级筛选
          </div>
        <!--   <div class="left">
            <popup-radio :options="optionspx" v-model="px">
              <div slot="popup-header" class="pop-title">选择排序条件</div>
            </popup-radio>
          </div> -->
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
            <condition @finish="conditionFinish" :areaId="areaId"></condition>
          </popup>
        </div>
  </div>
</template>

<script>
import {TransferDom, Tab, TabItem,Search,PopupRadio ,Popup, Group,InlineLoading  } from 'vux'
import list from './kehulistmore';
import condition from './kehucondition';
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
    if(outer){
      outer.onscroll=function(){
           if(_this.loading) return;
           if(this.scrollTop +outer.offsetHeight+10>=document.getElementById('scroll-box').clientHeight){
             _this.loadMore();
           }
      }
    }
    this.$cmBus.$on("refreshKhList",()=>{
      this.getData(true);
    })
    this.getData(true);
  },
  data () {
    return {
      indexTab:2,
      khName:"",
      areaId:0,
      loading:false,
      loading2:true,
      showCondition:false,
      page:0,
      totalPage:0,
      key:"",
      condition:{
          peopleId:"",
          khLevel:"",
          levelOne:"",
          levelTwo:"",
          isTou:0,
        },
      datas:[  //列表数据
      ]
    }
  },
  methods:{
    getData(isEmpty){
      this.khName=this.key;
      if(isEmpty){
        this.page=0;
        this.loading2=true;
      }
      this.loading = true;

      this.$http.post("/api/EnergizaSaleKHInfoController/GetHKInfoConditionList",{
        FullName:this.key,
        PageIndex:this.page,
        PageSize:15,
        KHCompanyLevelCodeMultipleChoice:this.condition.khLevel,
        ZbSortItemGUIDMultipleChoice:this.condition.levelOne,
        QySortItemGUIDMultipleChoice:this.condition.levelTwo,
        IsTopCustomer:this.condition.isTou,
        TrustPeopleGUID:this.condition.peopleId,
        Type:this.indexTab
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
        }

        res.Data.SOListDataTable.map((el)=>{
           this.datas.push(el);
        })

      })
    },
    conditionFinish(params){ //筛选条件选择完毕
      this.showCondition=false;
      this.condition={
          peopleId:params.peopleId,
          khLevel:params.khLevelId,
          levelOne:params.levelOneId,
          levelTwo:params.levelTwoId,
          isTou:params.isTou,
      };
      // console.log(this.condition)
      this.getData(true);
    },
    loadMore() {
      this.page++;
      if(this.page>this.totalPage&&this.totalPage!=0) return;
      this.getData(false);
    },
    sub(){ //搜索
      if(!this.key) return;

      // this.resetCondition();
      this.getData(true);
    },
    resetCondition(){  //高级筛选条件重新获取后，重置所选条件
      // this.condition.status="";
      this.condition={
          peopleId:"",
          khLevel:"",
          levelOne:"",
          levelTwo:"",
          isTou:0,
      }
    }
  },
  watch:{
    key(val){ //搜索关键词置空
      if (!val) {
        this.getData(true);
      };
    },
    indexTab(val){
      this.areaId=val;
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
