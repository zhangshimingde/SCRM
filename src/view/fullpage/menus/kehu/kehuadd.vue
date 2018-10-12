<template>
    <form action="" id="shangjiadd">
      <group>
        <cell-box style="margin-top:0">
          <div class="form-item clearfix" style="" >
            <x-input  :title='`<span style="${fullNameTip}">客户名称</span>`'  novalidate :icon-type="fullNameIcon" @on-focus="gslistShow=true" v-model="fullName"  placeholder="必填" :show-clear="true" text-align="right" > {{fullName}}</x-input>
            <!-- <div class="searchGongshang" @click="searchGongshang" ><i class="iconfont icon-gongshangxinxi " style="font-size:1.2rem"></i></div> -->
            <div class="searchGongshang"><i class="iconfont icon-gongshangxinxi " style="font-size:1.2rem"></i></div>
          </div>
        </cell-box>
        <cell-box style="margin-top:0">
          <div class="form-item clearfix" style="" >
            <x-input  :title='`<span style="${nameTip}">客户简称</span>`'  novalidate :icon-type="nameIcon"  v-model="name" placeholder="必填" :show-clear="true" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix" style="padding-right:0">
            <p>主责人 <span style="font-size:0.9rem;color:#b2b2b2">(点击头像切换)</span></p>
            <ul class="clearfix user-pic">
              <li class="left" @click="choseSinglePeople('zzr')">
                <div class="cm-bac avater" v-if="zzr.avater" :style="{backgroundImage:'url('+zzr.avater+')'}"></div>
                <div class="avater" v-else style="background-image:url(static/img/add.png);background-size:50%;background-repeat:no-repeat;border:1px solid #eaeaea"></div>
                <p class="name">{{zzr.name}}</p>
              </li>
            </ul>
          </div>
        </cell-box>
      </group>

      <group style="margin:10px 0">
        <cell-box is-link>
          <div class="form-item clearfix readw" @click="chosescompany=true">
            <span class="left banner" v-bind:style="{'color':companyIconshow?'red!important':'#000'}">公司层级</span>
            <span class="right content">{{company.name}}  <icon  type="warn" v-if="companyIconshow"></icon> </span>
          </div>
        </cell-box>
        <cell-box is-link v-if="prevKh">
          <div class="form-item clearfix readw" @click="chosekehu=true" >
            <span class="left banner" v-bind:style="{'color':topIconshow?'red!important':'#000'}"> 上级公司</span>
            <span class="right content">{{kehu.name}} <icon  type="warn" v-if="topTipshow"></icon></span>
          </div>
        </cell-box>
        <cell-box is-link>
          <div class="form-item clearfix readw" @click="choseskehutype=true" >
            <span class="left banner" v-bind:style="{'color':kehuTypeIconshow?'red!important':'#000'}"> 客户分类</span>
            <span class="right content">{{kehuType.name}} <icon  type="warn" v-if="kehuTypeTipshow"></icon></span>
          </div>
        </cell-box>
        <cell-box is-link v-if="showKehuStatus">
          <div class="form-item clearfix readw" @click="choseskehustatus=true" >
            <span class="left banner" v-bind:style="{'color':kehuStatusIconshow?'red!important':'#000'}">客户存量业态</span>
            <span class="right content">{{kehuStatus.name}} <icon  type="warn" v-if="kehuStatusTipshow"></icon></span>
          </div>
        </cell-box>
        <cell-box is-link>
          <div class="form-item clearfix readw" @click="chosesarea=true">
            <span class="left banner" v-bind:style="{'color':areaIcon?'red!important':'#000'}">所属区域</span>
            <span class="right content">{{area.name}} <icon type="warn" v-if="areaIcon"></icon> </span>
          </div>
        </cell-box>
      </group>

      <div class="sub-wrap cm-padding">
        <div class="sub text_center" @click="goSubmit">提交</div>
      </div>


      <!-- 单选人 -->
      <div v-transfer-dom>
        <popup v-model="chosepeople" :popup-style="{background:'white'}" position="right" width="80%">
          <checkpeople  @choseFinish="choseSinglePeopleFinish"></checkpeople>
        </popup>
      </div>


      <!-- 公司层级 -->
      <div v-transfer-dom>
        <popup v-model="chosescompany" :popup-style="{background:'white'}" position="right" width="80%">
          <danx :prama="companyList"  @choseFinish="choseCompanyFinish"></danx>
        </popup>
      </div>

      <!-- 客户分类 -->
      <div v-transfer-dom>
        <popup v-model="choseskehutype" :popup-style="{background:'white'}" position="right" width="80%">
          <danx :prama="kehuTypeList"  @choseFinish="choseKuhuTypeFinish"></danx>
        </popup>
      </div>

      <!-- 客户存量业态 -->
      <div v-transfer-dom>
        <popup v-model="choseskehustatus" :popup-style="{background:'white'}" position="right" width="80%">
          <danx :prama="kehuStatusList"  @choseFinish="choseKuhuStatusFinish"></danx>
        </popup>
      </div>

      <!-- 所属区域 -->
      <div v-transfer-dom>
        <popup v-model="chosesarea" :popup-style="{background:'white'}" position="right" width="80%">
          <danxs :prama="areaList"  @choseFinish="choseAreaFinish"></danxs>
        </popup>
      </div>

      <!-- 选择客户 -->
      <kehulist v-if="chosekehu" @choseFinish="choseKehuFinish"></kehulist>

      <!-- 工商查询 -->
      <gslist :fullName="fullName" @checkfinish="checkfinish" v-if="gslistShow"></gslist>
    </form>
</template>

<script>
import {XInput,Calendar ,XSwitch ,TransferDom,Popup ,PopupRadio , CellBox ,Group ,InlineLoading,Icon,Toast } from 'vux'
import checkpeople from '../../../../components/common/checkpeople';
import gslist from './chaxunjieguo';
import bus from "../../../../assets/js/eventBus.js"
import kehulist from './kehulist'

import danx from '../../../../components/common/choseDanX'
import danxs from '../../../../components/common/choseDanXS'
import store from '../../../../vuex/store.js'
export default {
  name: '',
  components:{
   XInput ,Group,Popup ,XSwitch ,InlineLoading,CellBox ,checkpeople,Calendar,PopupRadio ,kehulist,danx,danxs,gslist,Icon,Toast
  },
  created(){
    this.getdefaultzzr();
    this.getInfoData();
    this.fullName=this.$route.params.fullName;
  },
  directives: {
    TransferDom
  },
  filters:{
    subst(value){
      if(value){
          return value.substring(0,1);
      }else{
        return value;
      }

    },
    formate(value){
      if(value){
          return value.substring(0,10);
      }else{
        return value;
      }
    }
  },
  data () {
    return {
      prevKh:false,
      gslistShow:false,
      chosepeople:false,
      chosekehu:false,
      chosescompany:false,
      chosesarea:false,
      choseskehustatus:false,
      choseskehutype:false,
      kehu:{
        name:"必填",
        id:""
      },
      fullName:"",
      name:"",
      zzr:{
        name:"",
        avater:"",
        id:""
      },
      companyList:[],//公司层级
      company:{
        name:"必填",
        id:""
      },
      areaList:[],//所属区域
      area:{
        name:"必填",
        id:""
      },
      companyIconshow:false,
      areaIcon:false,
      fullNameTip:"",
      fullNameIcon:"",
      nameTip:"",
      nameIcon:"",
      topIconshow:"",
      topTipshow:"",
      kehuTypeIconshow:"",
      kehuTypeTipshow:"",
      kehuStatusIconshow:"",
      kehuStatusTipshow:"",
      kehuType:{
        name:"必填",
        id:""
      },
      kehuStatus:{
        name:"必填",
        id:""
      },
      showKehuStatus:false,
      kehuTypeList:[],
      kehuStatusList:[]
    }
  },
  methods:{
    getInfoData(){
      this.$http.get("/api/EnergizaSaleKHInfoController/GetKHAddCondition")
      .then((res)=>{
        // console.log(res)
        this.kehuTypeList=[{name:"开发商",id:"开发商"},{name:"供应商",id:"供应商"},{name:"存量地产",id:"存量地产"}];
        this.kehuStatusList=[{name:"公寓",id:"公寓"},{name:"商业地产",id:"商业地产"},{name:"物业",id:"物业"}];
        res.Data.CompanyLevel.map((el)=>{
          this.companyList.push({
              name:el.Text,
              id:el.Value
          })
        })

        res.Data.ListOrganization.map((el)=>{
          this.areaList.push({
              name:el.Codeitemdesc,
              id:el.BUGuid
          })
        })

        this.area={
          name:res.Data.DefaultArea.AreaName,
          id:res.Data.DefaultArea.AreaGUID
        };

      })
    },

    //点击工商图标查询工商信息
    searchGongshang(){
      if(this.fullName){
        // this.$router.push({name:"chaxunjieguo",params:{fullName:this.fullName}})
        this.gslistShow=true;
      }else{
        this.$vux.alert.show({
          title: '友情提示',
          content: '输入内容不能为空！'
        })
      }
    },




    choseSinglePeople(type){ //单选人(主责人和上级确认人)
      this.chosepeople=true;
      this.singlePeopleType=type;
    },
    choseSinglePeopleFinish(params){  //单选人完毕(主责人和上级确认人)
      this.chosepeople=false;
      if(!params) return; //点了取消
      this.getUserData(params.id,(data)=>{
            this[this.singlePeopleType]={
              name:data.UserName_Chn,
              id:data.UserGUID,
              avater:data.UserIcon
            }
      })
    },
    choseCompanyFinish(params){

      this.chosescompany=false;
      this.company={
        name:params.name,
        id:params.id
      };
      params.id=="3ea9b192-a21c-4135-be7e-493a4cf892b3"?this.prevKh=false:this.prevKh=true;
    },
    choseAreaFinish(params){
      this.chosesarea=false;
      this.area={
        name:params.name,
        id:params.id
      };
    },
    choseKuhuTypeFinish(params){
      this.choseskehutype=false;
      this.kehuType={
        name:params.name,
        id:params.id
      };
      if(params.name=='存量地产'){
        this.showKehuStatus=true;
      }else{
        this.showKehuStatus=false;
      }
    },
    choseKuhuStatusFinish(params){
      this.choseskehustatus=false;
      this.kehuStatus={
        name:params.name,
        id:params.id
      };
    },
    choseKehuFinish(params){ //选择客户完成
      this.chosekehu=false;
      if(!params) return;
      this.kehu={
        name:params.name,
        id:params.id
      }
    },
    getUserData(id,fn){
      this.$http.get("/api/EnergizeSaleUser/WeiXinUserInfoByUserGUID",{
        params:{
          userGUID:id
        }
      })
      .then((res)=>{
        // console.log(res)
        if(fn) fn(res.Data);
      })
    },
    getdefaultzzr(){  //获取默认主责人
      this.$http.get("/api/EnergizeSaleUser/WeiXinUserInfo")
      .then((res)=>{
         this.zzr={
            name:res.Data.UserName_Chn,
            avater:res.Data.UserIcon,
            id:res.Data.UserGUID,
         }

      })
    },
    checkfinish(params){
      this.gslistShow=false;
      if(params){
        this.fullName=params;
      }
    },

    goSubmit(){
      let colorStyle='color:red;'
      let IconStyle='error'
      if(!this.company.id){
        this.companyIconshow=true
      }else{
        this.companyIconshow=false
      }
      if(!this.area.id){
        this.areaIcon=true
      }else{
        this.areaIcon=false
      }

       if(!this.fullName){
        this.fullNameTip=colorStyle
        this.fullNameIcon=IconStyle
      }else{
        this.fullNameTip=""
        this.fullNameIcon=""
      }

      if(!this.name){
        this.nameTip=colorStyle
        this.nameIcon=IconStyle
      }else{
        this.nameTip=""
        this.nameIcon=""
      }

      if(!this.kehuType.id){
        this.kehuTypeIconshow=colorStyle
        this.kehuTypeTipshow=IconStyle
      }else{
        this.kehuTypeIconshow=""
        this.kehuTypeTipshow=""
      }

      if(!this.kehuStatus.id&&this.showKehuStatus){
        this.kehuStatusIconshow=colorStyle
        this.kehuStatusTipshow=IconStyle
      }else{
        this.kehuStatusIconshow=""
        this.kehuStatusTipshow=""
      }

      if(!this.kehu.id){
        this.topIconshow=colorStyle
        this.topTipshow=IconStyle
      }else{
        this.topIconshow=""
        this.topTipshow=""
      }
      if(this.name&&this.fullName&&this.zzr.id&&this.company.id&&this.area.id&&this.kehuType.id){//必填项
          if(this.prevKh==true&&!this.kehu.id){
            this.$vux.alert.show({
              title: '友情提示',
              content: '必填项请填写完整！'
            })
            return;
          }

          if(this.showKehuStatus&&!this.kehuStatus.id){
            this.$vux.alert.show({
              title: '友情提示',
              content: '必填项请填写完整！'
            })
            return;
          }
          // end
          this.$vux.loading.show({
             text: '正在提交..'
            })
          this.$http.post("/api/EnergizaSaleKHInfoController/AddCustomer",{
            FullName:this.fullName,
            SortName:this.name,
            TrustPeople:this.zzr.id,
            KHCompanyLevelCode:this.company.id,
            ParentKHGUID:this.kehu.id,
            BuGUID:this.area.id,
            CustomerType:this.kehuType.id,
            CustomerFormats:this.showKehuStatus?this.kehuStatus.id:""
          })
          .then((res)=>{
              // console.log(res)
              this.$vux.loading.hide();
              var _this=this;
              if(res.Success){
                  this.$vux.alert.show({
                    title: '友情提示',
                    content: '添加客户成功！',
                    onHide(){
                      _this.$router.go(-1);

                    }
                  })
                // store.state.flName=res.Data.FullName
                // store.state.KHGUIDs=res.Data.KHGUID
                //利用中央走线实现非父子组件之间的通讯
                let kehuLists={
                  FullName:res.Data.FullName,
                  KHGUID:res.Data.KHGUID
                  }
                bus.$emit('getkehuName',kehuLists)
              }else{
                this.$vux.alert.show({
                    title: '添加失败!',
                    content: res.Message,
                    buttonText:"前往工商查询",
                     onHide () {
                       _this.gslistShow=true;
                      },
                  })


              }

          })

      }else{
        this.$vux.alert.show({
          title: '友情提示',
          content: '必填项请填写完整！'
        })
      }

    }
  },

  // watch: {
  //   // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
  //     '$route': 'getsearchparams'
  //   },

}


</script>

<style lang="less">
#shangjiadd{
  background-color: #F6F6F6;
  .form-item{
    width: 98%;
    padding-right: 5%;
    box-sizing: border-box;
    position: relative;
    .searchGongshang{
      display: inline-block;
      width:25px;
      height:25px;
      text-align: center;
      position: absolute;
      left:98%;
      top:0px;
    }
    .content{
       color: #757575!important;
       max-width: 65%;
       text-align: right;
       overflow: hidden;
       text-overflow:ellipsis;
       white-space: nowrap;
    }
    .user-pic{
      padding-top: 10px;
      li{
        width: 18%;
        margin:1%;
        .avater{
          padding-top: 100%;
          border-radius: 5px;
          // background-color: red;
          background-size: cover;
          background-position: center;
        }
        .name{
          overflow: hidden;
           text-overflow:ellipsis;
           white-space: nowrap;
           text-align: center;
           font-size: 0.8rem;
           color: #757575;
           margin-top: 3px;
        }
      }
    }

  }
  .weui-cells:first-child{
    margin-top: 0;
    &:before{
      border: none;
    }
  }
  .vux-x-input{
    padding:0 !important;
  }
  .sub-wrap{
    padding: 20px;
    .sub{
      color: white;
      padding:10px 0;
      background: #3079D5;
      border-radius: 5px;
    }
  }
  #date{
    .weui-cell{
      padding: 0 !important;
    }
  }
  .sh{
    .weui-cell{
      padding:0 !important;
      .vux-x-switch.weui-cell_switch{
        padding: 0;
      }
    }
  }
  .qy{
    .weui-cell{
      padding:0 !important;
    }
  }
}
</style>
