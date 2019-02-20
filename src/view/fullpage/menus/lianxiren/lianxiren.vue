<template>
  <div id="shangji" class="" style="height:100%">
        <div class="header clearfix">
          <div class="left" style="width: 85%;">
            <search ref="search" v-model="key" :autoFixed="false"  @on-submit="sub" placeholder="搜索联系人或手机号码"></search>
          </div>
          <!-- <router-link :to="{name:'lianxirenadd'}" class="left text_center addsj" style="width:15%">
            <i class="iconfont icon-tianjia" style="font-size:1.5rem;color:#999"></i>
          </router-link> -->
          <span  @click="menus=true" class="left text_center addsj" style="width:15%">
            <i class="iconfont icon-tianjia" style="font-size:1.5rem;color:#999"></i>
          </span>
        </div>
        <!-- <div class="nav cm-padding clearfix text_center" style="border-top:none">
          <div class="" style="width:100%" @click="showCondition=true">
            <i class="iconfont icon-shaixuan"></i> 高级筛选
          </div>
        </div> -->
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
              <span style="color:#9d9d9d">数据加载中,请稍等</span>
            </p>
          </template>
        </div>

        <div v-transfer-dom>
          <popup  v-model="showCondition" :popup-style="{background:'white'}" position="right" width="80%">
            <condition @finish="conditionFinish" :lxrName="lxrName"></condition>
          </popup>
        </div>

        <menus v-show="menus" @closeMenu="closeMenu"></menus>
  </div>
</template>

<script>
import {TransferDom, Tab, TabItem,Search,PopupRadio ,Popup, Group,InlineLoading  } from 'vux'
import list from './lianxirenlistmore';
import condition from './lianxirencondition';
import menus from './components/menu';
export default {
  name: '',
  directives: {
    TransferDom
  },
  components:{
    Search ,PopupRadio , Group,list,InlineLoading,Popup,Tab, TabItem,condition,menus
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


    if(this.$route.params.type=='shangji'){
      this.sjid=this.$route.params.id;
    }else if(this.$route.params.type=='kehu'){
      this.khid=this.$route.params.id;
    }
    this.$cmBus.$on("refreshLxrList",()=>{

      this.getData(true);
    })
    this.getData(true);


  },
  data () {
    return {
      khid:"",
      sjid:"",
      lock:false,
      menus:false,
      lxrName:"",
      loading:false,
      loading2:true,
      showCondition:false,
      page:0,
      totalPage:0,
      key:"",
      condition:{
          BusinessDecisioner:"",
          Bussiness:""
        },
      px:"0",
      optionspx: [{
        key: '0',
        value: '姓名首字母'
      }, {
        key: '1',
        value: '创建时间'
      }],
      datas:[  //列表数据
      ]
    }
  },
  methods:{
    closeMenu(params,isScan){
      this.menus=false;
      if(!params) return;
      this.$router.push({
        name:"lianxirenadd",
        params:{
          scan:isScan,
          type:this.$route.params.type,
          id:this.$route.params.id
        }
      })
    },
    getData(isEmpty){
      if(this.lock){
        this.$vux.toast.show({
          text: '请耐心等待',
          type:'text',
          time:1000
        })
        return;
      }
      this.lock=true;
      this.lxrName=this.key;
      if(isEmpty){
        this.page=0;
        this.loading2=true;
      }
      this.loading = true;

      let orderField,orderByType;
      switch(this.px){
        case "0":orderField="LxrName";orderByType="ASC";break;
        case "1":orderField="CreateDate";orderByType="DESC";break;
      }

      this.$http.post("/api/AjaxLXRinfoController/GetLxrList",{
        Searchkey:this.key,
        Bussiness:this.condition.Bussiness,
        BusinessDecisioner:this.condition.BusinessDecisioner,
        PageIndex:this.page,
        PageSize:15,
        KHGUID:this.khid,
        OPPGUID:this.sjid,
        orderField:orderField,
        orderByType:orderByType,
      })
      .then((res)=>{
        this.lock=false;
        // console.log(res.Data);
        this.totalPage=Math.ceil(res.Data.TotalRecords/res.Data.PageSize);
        this.loading = false;
        this.loading2=false;

        // this.loading2 = false;
        if(isEmpty){
          this.datas=[];
          if(document.getElementById('scroll-wrap')){
            document.getElementById('scroll-wrap').scrollTop=0;
          }
        }

        res.Data.ListData.map((el)=>{
           this.datas.push(el);
        })

      })
    },
    conditionFinish(params){ //筛选条件选择完毕
      this.showCondition=false;
      this.condition={
          Bussiness:params.businessId,
          BusinessDecisioner:params.jcrId
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
          people:"",
          khLevel:"",
          levelOne:"",
          levelTwo:"",
          isTou:0,
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
