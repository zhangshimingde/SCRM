<template>
    <form action="" id="shangjiadd">
      <!-- 附加联系人信息 -->
      <group style="margin:0px 0 10px">
        <cell-box >
          <div class="form-item clearfix" style="" >
            <x-input title="姓名" :required="true"  v-model="baseInfo.name" placeholder="必填"  text-align="right" >{{baseInfo.name}}</x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix " style="" >
            <x-input title="手机" :required="true" :max="11" v-model="baseInfo.phone" placeholder="必填"  text-align="right" @on-blur="onBlur">{{baseInfo.phone}}</x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix sh readw" style="padding-right:0" >
            <popup-radio title="性别" :options="sexList" v-model="baseInfo.sex" placeholder="请填写"></popup-radio>
          </div>
        </cell-box>

        <cell-box is-link class="notrig">
          <div class="form-item clearfix sp" style="" @click="business=true">
            <x-input title="负责业务" :required="true" v-model="baseInfo.business" placeholder="必填" readonly  text-align="right"></x-input>
          </div>
         <!--  <div class="form-item clearfix readw" @click="business=true">
            <span class="left banner">负责业务</span>
            <span class="right content">{{baseInfo.business}}</span>
          </div> -->
        </cell-box>
        <cell-box >
          <div class="form-item clearfix readw" >
            <x-input title="职务" :required="true" v-model="baseInfo.jobs" placeholder="必填"  text-align="right"></x-input>
          </div>
        </cell-box>
      </group>
      <!-- end -->
      <group>
        <cell-box style="margin-top:0">
          <div class="form-item clearfix" style="" >
            <x-input title="商机名称" :required="true" v-model="name" placeholder="必填" :show-clear="true" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box is-link>
          <div class="form-item clearfix readw" @click="chosekehu=true">
            <span class="left banner">客户名称</span>
            <span class="right content">{{kehu.name}}</span>
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
          <div class="form-item clearfix readw" @click="chosesjtype=true">
            <span class="left banner">商机类型</span>
            <span class="right content" style="color:#757575">{{sjtype.name}}</span>
          </div>
        </cell-box>
        <cell-box is-link>
          <div class="form-item clearfix readw" @click="choseP">
            <span class="left banner">需求产品</span>
            <div class="right content">
              <span v-for="(item,index) in products" :key="index" style="color:#757575!important" ref="names">
                {{item.name}}
              </span>
            </div>
          </div>
        </cell-box>
        <cell-box v-if="choseqy">
          <div class="form-item clearfix qy readw" style="padding-right:0">
            <popup-radio title="签约类型" :options="optionsQy" v-model="qy" placeholder="placeholder"></popup-radio>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix readw">
            <x-input title="预计成交金额(万元)" :required="true" type="number" v-model="money" placeholder="必填" :show-clear="true" text-align="right" @on-blur="moneyBlur"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix readw" id="date"  style="padding-right:0">
            <calendar title="预计成交日期" v-model="date" placeholder="必填"></calendar>
          </div>
        </cell-box>
      </group>

      <group>

        <cell-box is-link>
          <div class="form-item clearfix readw" @click="chosesways=true">
            <span class="left banner">来源渠道</span>
            <span class="right content">{{ways.name}}</span>
          </div>
        </cell-box>
        <cell-box v-show="!IsManager">
          <div class="form-item clearfix sh readw" style="padding-right:0" >
            <x-switch title="发起确认审核" v-model="isShenhe"></x-switch>
          </div>
        </cell-box>
        <cell-box v-if="isShenhe">
          <div class="form-item clearfix" style="padding-right:0">
            <p>上级确认人 <span style="font-size:0.9rem;color:#b2b2b2">(点击头像切换)</span></p>
            <ul class="clearfix user-pic">
              <li class="left"  @click="choseSinglePeople('qrr')">
                <div class="cm-bac avater" v-if="qrr.avater" :style="{backgroundImage:'url('+qrr.avater+')'}"></div>
                <div class="avater" v-else style="background-image:url(static/img/add.png);background-size:50%;background-repeat:no-repeat;border:1px solid #eaeaea"></div>
                <p class="name">{{qrr.name}}</p>
              </li>
            </ul>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix" style="padding-right:0">
            <p>经营团队 <span style="font-size:0.9rem;color:#b2b2b2">(点击头像可删除)</span></p>
            <ul class="clearfix user-pic">
              <li class="left" >
                <div class="avater" @click="choseMultiplePeople" style="background-image:url(static/img/add.png);background-size:50%;background-repeat:no-repeat;border:1px solid #eaeaea"></div>
              </li>

              <li class="left" v-for="(item,index) in team" v-if="team.length>0" @click="removePeople(item,index)" :key="index">
                <div class="cm-bac avater" :style="{backgroundImage:'url('+item.avater+')'}"></div>
                <p class="name">{{item.name}}</p>
              </li>
            </ul>
          </div>
        </cell-box>
      </group>

      <div class="sub-wrap cm-padding">
        <div class="sub text_center" @click="goSubmit">提交</div>
      </div>


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
      <div v-transfer-dom>
      <popup v-model="business" :popup-style="{background:'white'}" position="right" width="80%">
        <business :prama="businesslist" @choseFinish="choseBusinesslistFinish"></business>
      </popup>
    </div>
    </form>
</template>

<script>
import {XInput,Calendar ,XSwitch ,TransferDom,Popup ,PopupRadio , CellBox ,Group ,InlineLoading  } from 'vux'
import checkpeople from '../../../../components/common/checkpeople';
import checkpeoplemultiple from '../../../../components/common/checkpeoplemultiple';
import sjtype from './compo/sjtype'
import products from './compo/products'
import ways from './compo/ways'
import kehulist from './kehulist'
import business from './compo/business'
export default {
  name: '',
  components:{
   XInput ,Group,Popup,kehulist ,XSwitch ,InlineLoading,CellBox ,checkpeople,sjtype,ways,products,Calendar,checkpeoplemultiple,PopupRadio ,business
  },
  created(){
    this.getdefaultzzr();
    this.getInfoData();
    this.baseInfo.name=this.$route.params.name;
    this.baseInfo.phone=this.$route.params.phone;
  },
  directives: {
    TransferDom
  },
  filters:{
    subst(value){
      if(!value) return value;
      return value.substring(0,1);
    },
    formate(value){
      if(!value) return value;
      return value.substring(0,10)
    }
  },
  data () {
    return {
      baseInfo:{
        name:"",
        phone:"",
        business:"",
        sex:"1",
        jobs:"",
      },
      business:false,
      businesslist:[],
      sexList:[{
        key:'1',
        value:"男"
      },{
        key:"0",
        value:"女"
      }],
      IsManager:false,
      chosekehu:false,
      chosepeople:false,
      checkpeoplemultiple:false,
      chosesjtype:false,
      chosesproducts:false,
      chosesways:false,
      choseqy:false,
      qy:"", //签约类型
      kehu:{
        name:"必填",
        id:""
      },
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
      singlePeopleType:"",
      money:"",
      team:[],
      deleteId:"",
      sjtypelist:[],//商机类型列表
      productslist:[],//需求产品列表
      wayslist:[],//来源渠道列表
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
      pdall:[] //保存所有的需求产品
    }
  },
  methods:{
    choseBusinesslistFinish(params){//选择负责业务
      this.business=false;
      var arr=[];
      params.map((el)=>{
        arr.push(el.name);
      });
      this.baseInfo.business=arr.join(",");
   },
    getInfoData(){
      this.$http.post("api/EnergizaSalesOpportunities/GetConditionParam")
      .then((res)=>{
        //商机类型列表初始化
        this.sjtypelist=[];
        res.Data.ListType.map((el)=>{
          if(el.IsValid){
              this.sjtypelist.push(el)
          }
        })

        // 需求产品列表初始化
        this.pdall=res.Data.ListProduct;
        var initId=this.sjtypelist[0].TypeGUID;
        this.pdall.map((el)=>{
            if(el.OpportunitiesType==initId&&!el.IsDisable){
              this.productslist.push(el)
            }
        })
        // end


        this.wayslist=res.Data.ListSource; //渠道来源列表初始化

      })


      // 获取负责业务列表
      this.$http.get("/api/EnergizaSalesOpportunities/GetBussinessLine")
      .then((res)=>{
        this.businesslist=res.Data;
      })
    },
    choseSjtypeFinish(params){//选择商机类型
      this.chosesjtype=false;
      // console.log(params)
      this.sjtype={
        name:params.name,
        id:params.id
      }

      this.$refs.names[0].style.color="red"
      // console.log(this.$refs.names[0].style.color)
      // 选择商机类型后，重新筛选需求产品列表
        this.productslist=[];
        this.products=[{
          name:"必填",
          id:""
        }];
        this.pdall.map((el)=>{
          if((el.OpportunitiesType==params.id)&&(!el.IsDisable)){
              this.productslist.push(el)
            }
        })
      // end

      // 签约类型的展示
        if(params.id=="a314f97a-2720-4cfe-b3d2-0d8ad7df8c34"||params.id=="fc40dbbe-94a7-44fd-936f-50f831eb6943"||params.id=="bfbd2e01-2226-42ca-8a89-e435bccadbcb"){
          this.choseqy=true;
          this.qy="sq";
        }else{
          this.choseqy=false;
          this.qy=""
        }
    },
    choseP(){
      if(!this.sjtype.id){
        this.$vux.alert.show({
              title: '友情提示',
              content: '请先选择商机类型！'
          });
          return;
      }
      this.chosesproducts=true;
    },
    choseProductsFinish(params){  //选择需求产品
      this.chosesproducts=false;
      // console.log(params);
      this.products=[];
      params.map((el)=>{
        this.products.push({
          name:el.name,
          id:el.id
        })
      })

      // console.log(this.products)
    },
    chosesWaysFinish(params){ //选择渠道来源
      this.chosesways=false;
      // console.log(params);

      this.ways={
        name:params.name,
        id:params.id
      }
    },
    choseKehuFinish(params){ //选择客户完成
      this.chosekehu=false;
      if(!params) return;
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



      if((this.singlePeopleType=="qrr")&&(params.id==this.zzr.id)){
        this.$vux.alert.show({
              title: '修改失败',
              content: '上级确认人不能与商机主责人为同一个人!'
            })
        return;
      }

      this.getUserData(params.id,(data)=>{
            this[this.singlePeopleType]={
              name:data.UserName_Chn,
              id:data.UserGUID,
              avater:data.UserIcon
            }
      })

      if(this.singlePeopleType=="zzr"){ //选了主责人之后自动选择默认上级确认人
        this.getUserData(params.id,(data)=>{
           this.IsManager=data.IsManager;
           this.IsManager?this.isShenhe=false:this.isShenhe=true;
           if(!this.IsManager){
              this.getdefaultqrr(params.id);
           }
        })

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

        this.team.push({
          name:el.name,
          id:el.id,
          avater:""
        })

      });

      this.team.map((el)=>{
        this.getUserData(el.id,(data)=>{
          el.avater=data.UserIcon;
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
        console.log(res)
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

         this.IsManager=res.Data.IsManager;
        this.IsManager?this.isShenhe=false:this.isShenhe=true;
        this.getdefaultqrr(res.Data.UserGUID);

      })
    },
    getdefaultqrr(id){  //获取默认上级确认人
      this.$http.get("/api/EnergizeSaleUser/LoginSJUserInfo",{
        params:{
          userGUID:id
        }
      })
      .then((res)=>{
         this.defaultqrr={
            name:res.Data.UserName_Chn,
            avater:res.Data.UserIcon,
            id:res.Data.UserGUID,
         }
         this.qrr=this.defaultqrr;
      })
    },

    //对输入框进行正则验证
    onBlur(){
      var _this=this;
      var  reg=/^[1]{1}[34578]{1}[0-9]{9}$/;
      if(this.baseInfo.phone){
        if(reg.test(this.baseInfo.phone)){
        }else{
            this.$vux.alert.show({
                title: '友情提示',
                content: '您输入的手机号码不正确，请重新输入',
                onHide(){
                  _this.baseInfo.phone=""
                }
              })
        }
      }else{
         this.$vux.alert.show({
                title: '友情提示',
                content: "您输入的手机号码不能为空",
              })
      }


    },
    //对填入的金额进行正则验证

    moneyBlur(){
      var moneyData=parseFloat(this.money)
      if(moneyData<10000){
      }else{
          var _this=this
          this.$vux.alert.show({
            title: '友情提示',
            content: '预计成交金额的单位为万元，请核对当前输入的金额!',
            onHide(){
              _this.money=""
            }
          })
      }
    },
    goSubmit(){
      if(this.baseInfo.name&&this.baseInfo.phone&&this.baseInfo.business&&this.baseInfo.jobs&&this.name&&this.kehu.id&&this.zzr.id&&this.sjtype.id&&this.money&&this.date&&this.products[0].id&&this.ways.id){//必填项
          if(this.isShenhe&&!this.qrr.id){
            this.$vux.alert.show({
              title: '友情提示',
              content: '请选择上级确认人！'
            })
            return ;
          }
          var rebuy;

           //首签、续签
          switch(this.qy){
            case "":rebuy=null;break;
            case "sq":rebuy=0;break;
            case "xq":rebuy=1;break;
            case "zg":rebuy=2;break;
          }

          // 产品id列表
          var pdid=[],teamid=[];
          this.products.map((el)=>{
            pdid.push(el.id);
          })
          this.team.map((el)=>{
            teamid.push(el.id);
          })
          // end
          this.$vux.loading.show({
             text: '正在提交..'
            })
          this.$http.post("/api/EnergizaSaleClueController/ClueToSalesOpportunities",{
            ByOpportunityGUID:this.$route.params.id,
            ContactName:this.baseInfo.name,
            Telephone:this.baseInfo.phone,
            Gender:this.baseInfo.sex,
            ResponsibleGUID:this.zzr.id,
            OpportunitiesName:this.name,
            TypeGUID:this.sjtype.id,
            ProductCode:pdid.join(','),
            PredictTradeMoney:this.money,
            PredictTradeTime:this.date,
            SourceGUIDForSType3:this.ways.id,
            KHGUID:this.kehu.id,
            Remark:"",
            IsSponsorAffirm:this.isShenhe,
            NextStepPersonal:this.qrr.name,
            FZRGUID:this.qrr.id,
            Business:this.baseInfo.business,
            JobTitle:this.baseInfo.jobs,
            UserGUID:teamid.join(','),
            IsRebuy:rebuy
          })
          .then((res)=>{
              this.$vux.loading.hide();
              if(res.Success){
                  let _this=this;
                  this.$vux.alert.show({
                    title: '友情提示',
                    content: '转商机成功！',
                    onHide () {
                      _this.$router.go(-1);
                    }
                  })
              }else{
                this.$vux.alert.show({
                    title: '提交失败！',
                    content: res.Message,
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
  watch:{
    isShenhe(val){
      // console.log(val)
      if(!val){
        this.qrr=this.defaultqrr;
      }
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
    .vux-calendar:before{
      border-top:0px !important;
    }
    .weui-label{
      width:100%;
    }
    .content{
       color: #757575 ;
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
