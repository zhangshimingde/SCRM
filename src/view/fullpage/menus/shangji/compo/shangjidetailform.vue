<template>
    <form action="" id="shangjiadd" style='padding-bottom:55px'>

      <group style="margin:0px 0">
        <cell-box style="margin-top:0">
          <div class="form-item clearfix form-title" style="" >
            <p class="title">基本信息</p>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix readw" style="padding-right:0">
              <x-input title="商机名称"  v-model="sjName" @on-change="updateField('OpportunitiesName,'+sjName)" placeholder="必填" :show-clear="false" text-align="right" ></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix readw" @click="openKh(khInfo)">
            <span class="left banner">客户全称</span>
            <span class="right content" style="color:rgb(48, 121, 213) !important">{{khInfo.name}}</span>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix readw"  v-if="canEdit" @click="chosesjtype=true">
            <span class="left banner">商机类型</span>
            <span class="right content">{{sjtype.name}}</span>
          </div>
          <div class="form-item clearfix reado"  v-else>
            <x-input title="商机类型" readonly v-model="oppTypeName"  placeholder="无" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix reado">
            <x-input title="数据来源" readonly v-model="DataSource"  placeholder="暂无相关数据" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box v-if="choseqy">
          <div class="form-item clearfix qy readw" style="padding-right:0">
            <popup-radio title="签约类型" :options="optionsQy" v-model="qy" ></popup-radio>
          </div>
        </cell-box>
        <cell-box is-link>
          <div class="form-item clearfix" @click="chosesproducts=true">
            <span class="left banner">需求产品</span>
            <div class="right content">
              <span v-for="(item,index) in products" :key="index">
                {{item.name}}
              </span>
            </div>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item    clearfix">
            <x-input title="预计成交金额(万元)" class="moneyform"  @on-change="updateField('PredictTradeMoney,'+money)" v-model="money" placeholder="必填" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix readw" id="date"  style="padding-right:0">
            <calendar title="预计成交日期" v-model="date"></calendar>
          </div>
        </cell-box>

        <cell-box>
          <div class="form-item clearfix reado" >
            <x-input title="最近跟进时间" readonly v-model="StageStayDays" placeholder="无" :show-clear="true" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix reado" >
            <x-input title="进入当前阶段" readonly v-model="EnterintoStageTime"  placeholder="无" :show-clear="true" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box v-if="showHangUpField">
          <div class="form-item clearfix reado">
            <x-input title="预计重启日期" readonly v-model="restartDate"  placeholder="无" :show-clear="true" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box v-if="showHangUpField">
          <div class="form-item clearfix reado sh">
            <x-textarea title="挂起原因" type='textarea' readonly v-model="HangUpReason"  placeholder="无" :show-clear="true" text-align="right"></x-textarea>
          </div>
        </cell-box>


        <cell-box is-link>
          <div class="form-item clearfix" @click="chosesways=true">
            <span class="left banner">来源渠道</span>
            <span class="right content">{{ways.name}}</span>
          </div>
        </cell-box>
        <cell-box is-link>
          <div class="form-item clearfix" @click="chosesarea=true">
            <span class="left banner">所属区域</span>
            <span class="right content">{{areas.name}}</span>
          </div>
        </cell-box>
       <!--  <cell-box>
          <div class="form-item clearfix sh" style="padding-right:0" >
            <x-switch title="发起确认审核" v-model="isShenhe"></x-switch>
          </div>
        </cell-box> -->
      </group>


      <!-- 单选人 -->
      <div v-transfer-dom>
        <popup v-model="chosepeople" :popup-style="{background:'white'}" position="right" width="80%">
          <checkpeople @choseFinish="choseSinglePeopleFinish"></checkpeople>
        </popup>
      </div>
      <!-- 商机类型 -->
      <div v-transfer-dom>
        <popup v-model="chosesjtype" :popup-style="{background:'white'}" position="right" width="80%">
          <sjtype :prama="sjtypelist" @choseFinish="choseSjtypeFinish"></sjtype>
        </popup>
      </div>
      <!-- 需求产品-->
      <div v-transfer-dom>
        <popup v-model="chosesproducts" :popup-style="{background:'white'}" position="right" width="80%">
          <products :prama="productslist" @choseFinish="choseProductsFinish"></products>
        </popup>
      </div>
      <!-- 来源渠道-->
      <div v-transfer-dom>
        <popup v-model="chosesways" :popup-style="{background:'white'}" position="right" width="80%">
          <ways :prama="wayslist" @choseFinish="chosesWaysFinish"></ways>
        </popup>
      </div>
      <!-- 所属区域-->
      <div v-transfer-dom>
        <popup v-model="chosesarea" :popup-style="{background:'white'}" position="right" width="80%">
          <areas :prama="areaslist" @choseFinish="chosesAreasFinish"></areas>
        </popup>
      </div>
      <!-- 经营团队 -->
      <div v-transfer-dom >
        <popup v-model="checkpeoplemultiple" :popup-style="{background:'white'}" position="right" width="80%">
          <checkpeoplemultiple :deleteId="deleteId" @choseFinish="choseMultiplePeopleFinish"></checkpeoplemultiple>
        </popup>
      </div>

      <!-- 选择客户 -->
      <kehulist v-if="chosekehu" @choseFinish="choseKehuFinish"></kehulist>
      <!-- <div v-transfer-dom >
        <popup v-model="chosekehu" :popup-style="{background:'white'}" position="right" width="100%">
          <kehulist @choseFinish="choseKehuFinish"></kehulist>
        </popup>
      </div> -->
    </form>
</template>

<script>
import {XInput,Calendar ,XSwitch ,TransferDom,Popup ,PopupRadio , CellBox ,Group ,InlineLoading ,XTextarea } from 'vux'
import checkpeople from '../../../../../components/common/checkpeople';
import checkpeoplemultiple from '../../../../../components/common/checkpeoplemultiple';
import sjtype from './sjtype'
import products from './products'
import ways from './ways'
import areas from './areas'
import kehulist from '../kehulist'
export default {
  name: '',
  components:{
   XInput ,Group,Popup,kehulist ,XSwitch ,InlineLoading,CellBox ,checkpeople,sjtype,ways,products,Calendar,checkpeoplemultiple,PopupRadio,XTextarea ,areas
  },
  created(){
    this.setData();
    this.getInfoData();
    // setTimeout(()=>{

    // }, 2000)
    this.oldmoney=this.money
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
  props:["detailInfo"],
  data () {
    return {
      oldmoney:"",
      oppTypeName:"",
      canEdit:false,
      isFirstTime:true,
      DataSource:"",
      chosekehu:false,
      chosepeople:false,
      checkpeoplemultiple:false,
      chosesjtype:false,
      chosesproducts:false,
      chosesways:false,
      chosesarea:false,
      choseqy:false,
      qy:"", //签约类型
      StageName:"",
      khInfo:{
        name:"",
        id:""
      },
      kehu:{
        name:"必填",
        id:""
      },
      StageStayDays:'',
      EnterintoStageTime:'',
      HangUpReason:"",
      restartDate:"",
      showHangUpField:false,
      optionsQy:[{
          key:"sq",
          value:"首签"
        },{key:'xq',
        value:"续签"
      },{key:'zg',
        value:"增购"
      }],
      name:"",
      isShenhe:true,
      zzr:{
        name:"",
        avater:"",
        id:""
      },
      qrr:{
        name:"",
        avater:"",
        id:""
      },
      defaultqrr:{
        name:"",
        avater:"",
        id:""
      },
      date:"",
      sjName:"",
      singlePeopleType:"",
      money:"",
      team:[],
      deleteId:"",
      sjtypelist:[],//商机类型列表
      productslist:[],//需求产品列表
      wayslist:[],//来源渠道列表
      areaslist:[],//来源渠道列表
      sjtype:{
        name:"必填",
        id:""
      },//商机类型
      products:[{
        name:"必填",
        id:""
      }],//需求产品
      ways:{
        name:"必填",
        id:""
      },//来源渠道
      areas:{
        name:"必填",
        id:""
      },//所属区域
      pdall:[] //保存所有的需求产品
    }
  },
  methods:{
    setData(){
       if(this.detailInfo.OppInfo.StageName=='待确认'||this.detailInfo.OppInfo.StageName=='草稿'||this.detailInfo.OppInfo.StageName=='确认中'){
              this.canEdit=true;
            }
      if(this.detailInfo.khinfo){
        this.khInfo={
          name:this.detailInfo.khinfo.FullName,
          id:this.detailInfo.khinfo.KHGUID
        }
      }

      this.oppTypeName=this.detailInfo.OppInfo.TypeName;
      this.sjtype={
        name:this.detailInfo.OppInfo.TypeName,
        id:this.detailInfo.OppInfo.TypeGUID
      };
      if(this.detailInfo.OppInfo.TypeGUID=="a314f97a-2720-4cfe-b3d2-0d8ad7df8c34"||this.detailInfo.OppInfo.TypeGUID=="fc40dbbe-94a7-44fd-936f-50f831eb6943"||this.detailInfo.OppInfo.TypeGUID=="bfbd2e01-2226-42ca-8a89-e435bccadbcb"){
          this.choseqy=true;
          var rebuy=this.detailInfo.OppInfo.IsRebuy
          switch(rebuy){
            case null:this.qy="";break;
            case 0:this.qy="sq";break;
            case 1:this.qy="xq";break;
            case 2:this.qy="zg";break;
          }
        }else{
          this.choseqy=false;
          this.qy=""
        }
      this.sjName=this.detailInfo.OppInfo.OpportunitiesName;
      this.DataSource=this.detailInfo.OppInfo.DataSource;
      this.money=this.detailInfo.OppInfo.PredictTradeMoney;
      this.date=this.detailInfo.OppInfo.PredictTradeTime?this.detailInfo.OppInfo.PredictTradeTime.substring(0,10):this.detailInfo.OppInfo.PredictTradeTime;
      this.StageName=this.detailInfo.OppInfo.StageName;
      this.EnterintoStageTime=this.detailInfo.OppInfo.EnterintoStageTime?this.detailInfo.OppInfo.EnterintoStageTime.substring(0,10):this.detailInfo.OppInfo.EnterintoStageTime;
      this.restartDate=this.detailInfo.OppInfo.PredictReStartTime?this.detailInfo.OppInfo.PredictReStartTime.substring(0,10):this.detailInfo.OppInfo.PredictReStartTime;
      this.HangUpReason=this.detailInfo.OppInfo.HangUpReason;
      this.StageStayDays=this.detailInfo.OppInfo.StageStayDays+"天";
      let stageTemp=this.detailInfo.OppInfo.StageGUID.toUpperCase();
      (stageTemp=="F3470C21-A90A-4777-8E39-7F3CF37F3DEB"||stageTemp=="754D9DF3-2D01-4F41-968E-D5DB83ED4875")?this.showHangUpField=true:this.showHangUpField=false;
      this.ways={
        name:this.detailInfo.OppInfo.SourceName,
        id:this.detailInfo.OppInfo.SourceGUID
      }
      this.products=[{name:this.detailInfo.OppInfo.NeededProduct,id:""}];
      this.areas={
        name:this.detailInfo.OppInfo.CompanyName,
        id:this.detailInfo.OppInfo.CompanyGUID
      }


      setTimeout(()=>{
          this.isFirstTime=false;
        }, 500)

    },
    openKh(data){
      if(!data.id) return;
      this.$router.push({
        name:"kehudetail",
        params:{
          id:data.id
        }
      })
    },
    getInfoData(){
      this.$http.post("api/EnergizaSalesOpportunities/GetConditionParam")
      .then((res)=>{
        // console.log(res)
         //商机类型列表初始化
        this.sjtypelist=[];
        res.Data.ListType.map((el)=>{
          if(el.IsValid){
              this.sjtypelist.push(el)
          }
        })


        // 需求产品列表初始化
        this.pdall=res.Data.ListProduct;
        var initId=this.sjtype.id;
        this.pdall.map((el)=>{
            if((el.OpportunitiesType==initId)&&(!el.IsDisable)){
              this.productslist.push(el)
            }
        })
        // end
        this.wayslist=res.Data.ListSource; //渠道来源列表初始化
        this.areaslist=res.Data.ListOrganization  //选择所属区域

      })
    },
    choseSjtypeFinish(params){//选择商机类型
      this.chosesjtype=false;

      this.sjtype={
        name:params.name,
        id:params.id
      }
      // 选择商机类型后，重新筛选需求产品列表
        this.productslist=[];

        this.pdall.map((el)=>{
            if((el.OpportunitiesType==params.id)&&(!el.IsDisable)){
              this.productslist.push(el)
            }
        })
        this.products=[{
          name:"",
          id:""
        }];

      // 商机类型修改后，需求产品设置默认值
        // this.products=[{
        //   name:this.productslist[0].ProductName,
        //   id:this.productslist[0].ProductCode
        // }];
        // this.$http.post("/api/AjaxProductController/AddProductList",{
        //   productCOdeList:this.products[0].id,
        //   oppportunitiesGUID:this.detailInfo.OppInfo.OpportunitiesGUID
        // }).then((res)=>{
        //     if(res.Success){
        //         this.$vux.toast.text('修改成功！', 'top');
        //     }else{
        //       this.$vux.alert.show({
        //           title: '友情提示',
        //           content: res.Message
        //         })
        //     }
        // })
      // end

      // 签约类型的展示
        if(params.id=="a314f97a-2720-4cfe-b3d2-0d8ad7df8c34"||params.id=="fc40dbbe-94a7-44fd-936f-50f831eb6943"||params.id=="bfbd2e01-2226-42ca-8a89-e435bccadbcb"){
          this.choseqy=true;
          this.qy="sq";
        }else{
          this.choseqy=false;
          this.qy=""
        }


        // 提交
        // this.changeInfo("TypeGUID",params.id,()=>{
          this.$vux.alert.show({
                title: '友情提示',
                content: "商机类型已修改，请重新选择需求产品！"
              })
        // });
    },
    choseProductsFinish(params){  //选择需求产品
      this.chosesproducts=false;
      this.products=[];

      var idList=[];
      params.map((el)=>{
        this.products.push({
          name:el.name,
          id:el.id
        })
        idList.push(el.id)
      })

      // console.log(idList);


      this.$http.post("/api/AjaxProductController/AddProductList",{
        TypeGuid:this.sjtype.id,
        productCOdeList:idList.join(','),
        oppportunitiesGUID:this.detailInfo.OppInfo.OpportunitiesGUID
      }).then((res)=>{
          if(res.Success){
              this.$vux.toast.text('修改成功！', 'top');
              // this.changeInfo("TypeGUID",this.sjtype.id); //提交商机类型
          }else{
            this.$vux.alert.show({
                title: '友情提示',
                content: res.Message,
                onHide () {
                  window.location.reload();
                }
              })

          }
      })
    },
    chosesWaysFinish(params){ //选择渠道来源
      this.chosesways=false;

      this.ways={
        name:params.name,
        id:params.id
      }

      this.changeInfo("SourceGUIDForSType3",params.id);
    },
    chosesAreasFinish(params){ //选择所属区域
      this.chosesarea=false;
      // console.log(params);

      this.areas={
        name:params.name,
        id:params.id
      }

      // this.changeInfo("CompanyName",params.name);
      this.changeInfo("CompanyGUID",params.id);
    },
    choseKehuFinish(params){ //选择客户完成
      this.chosekehu=false;
      this.kehu={
        name:params.name,
        id:params.id
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

      if(this.singlePeopleType=="zzr"){ //选了主责人之后自动选择默认上级确认人
        // this.getdefaultqqr(params.id);
      }
    },
    choseMultiplePeople(){  //多选人
      this.checkpeoplemultiple=true;
    },
    choseMultiplePeopleFinish(params){ //多选人完毕
      this.checkpeoplemultiple=false;
      if(!params) return; //点了取消
      // console.log(params)
      // this.team=[];
      params.map((el)=>{
        // 去重
        var flag=true;
        this.team.map((el2)=>{
          if(el2.id==el.id){
            flag=false;
          }
        });
        if(!flag) return;
        // end
        this.getUserData(el.id,(data)=>{
          this.team.push({
            name:data.UserName_Chn,
            id:data.UserGUID,
            avater:data.UserIcon
          })
        })

      })
    },
    removePeople(item,index){
      this.team.splice(index,1);
      this.deleteId=item.id;
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
    changeInfo(field,val,fn){
      if(this.isFirstTime){ return;} ;

      if(field=="OpportunitiesName") {
          if(val){
             this.$http.post("/api/EnergizaSalesOpportunities/IsHaveSameName",{
              OpportunitiesName:val,
              OppGuid:this.detailInfo.OppInfo.OpportunitiesGUID
            }).then((res)=>{
                // console.log(res)
                if(res.Data.Flag){
                  this.$http.post("/api/EnergizaSalesOpportunities/EditOpportunityInfo",{
                    as_field:field,
                    as_val:val,
                    guid:this.detailInfo.OppInfo.OpportunitiesGUID
                  }).then((res)=>{
                      if(res.Success){
                        // console.log(field,val,fn)
                        this.$vux.toast.text('修改成功！', 'top');
                        this.$cmBus.$emit("refreshSjList");
                        this.$cmBus.$emit("changeName",this.sjName);
                        if(fn)fn();
                      }else{
                        this.$vux.alert.show({
                            title: '友情提示',
                            content: res.Message
                          })
                      }
                  })
                }else{
                  this.$vux.alert.show({
                    title: '修改失败',
                    content:res.Data.Msg
                  })
                }

            })
          }else{
            this.$vux.alert.show({
              title: '友情提示',
              content: "必填信息不能为空！"
            })
          }

          return;
      }

      if(!val&&field=="PredictTradeMoney") {
        this.$vux.alert.show({
          title: '友情提示',
          content: "必填信息不能为空！"
        })
        return;
      }
      if(val&&field=="PredictTradeMoney") {
        var moneyData=Number(val)
        if(moneyData>=10000){
          var _this=this
          this.$vux.alert.show({
            title: '友情提示',
            content: "预计成交金额的单位为万元，请核对当前输入的金额!",
            onHide(){
              _this.money=_this.oldmoney
            }
          })
          return;

        }else if(moneyData==this.oldmoney){
          return;
        }
      }

      this.$http.post("/api/EnergizaSalesOpportunities/EditOpportunityInfo",{
        as_field:field,
        as_val:val,
        guid:this.detailInfo.OppInfo.OpportunitiesGUID
      }).then((res)=>{
          if(res.Success){
            // console.log(field,val,fn)
            this.$vux.toast.text('修改成功！', 'top');
            this.$cmBus.$emit("refreshSjList");
            this.oldmoney=this.money;
            if(field=="PredictTradeMoney"){
              this.$cmBus.$emit("changeMoney",this.money);
            }
            if(fn)fn();
          }else{
            this.$vux.alert.show({
                title: '友情提示',
                content: res.Message
              })
          }
      })
    },
    goSubmit(){
      // console.log(this.name,this.kehu.name,this.zzr.name,this.sjtype.name,this.money,this.date,JSON.stringify(this.products),this.ways.name,this.qrr.name,
      //   JSON.stringify(this.team),this.isShenhe,this.qy)
      if(this.name&&this.kehu.id&&this.zzr.id&&this.sjtype.id&&this.money&&this.date&&this.products[0].id&&this.ways.id){//必填项
          var rebuy;
           //首签、续签
          switch(this.qy){
            case "":rebuy=null;break;
            case "sq":rebuy=0;break;
            case "xq":rebuy=1;break;
            case "zg":rebuy=2;break;
          }
          // 产品id列表
          var pdid=[];
          this.products.map((el)=>{
            pdid.push(el.id);
          })

      }else{
        this.$vux.alert.show({
          title: '友情提示',
          content: '必填项请填写完整！'
        })
      }
    },
    updateField(val){
      this.changeInfo(val.split(",")[0],val.split(",")[1]);
    }
  },
  watch:{
    date(val){
      // console.log(val)
      if(val){
        this.changeInfo("PredictTradeTime",val,()=>{
          this.$emit("changeDate",val)
        });
      }
    },
    qy(val){
      var rebuy;
      // console.log(11111,val)
      switch(val){
        case "":rebuy=null;break;
        case "sq":rebuy=0;break;
        case "xq":rebuy=1;break;
        case "zg":rebuy=2;break;
      }
      this.changeInfo("IsRebuy",rebuy);
    }
  }
}
</script>

<style lang="less">
#shangjiadd{
  background-color: #F6F6F6;
  .form-item{
    width: 100%;
    padding-right: 5%;
    box-sizing: border-box;
    .moneyform{
      .weui-label{
        width:100%;
      }
    }
    .content{
       // color: #757575;
       max-width: 65%;
       text-align: right;
       overflow: hidden;
       text-overflow:ellipsis;
       white-space: nowrap;
    }
    .vux-calendar:before{
      border-top:0;
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
