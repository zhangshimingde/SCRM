<template>
    <form action="" id="shangjiadd">
      <group>
        <cell-box style="margin-top:0">
          <div class="form-item clearfix" style="" >
            <x-input :title='`<span style="${nameTip}">商机名称</span>`'  novalidate :icon-type="nameIcon"  v-model="name" placeholder="必填" :show-clear="true" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box is-link v-if="!disabled">
          <div class="form-item clearfix" @click="chosekehu=true">
            <span class="left banner" v-bind:style="{'color':sjkehu?'red!important':'#000'}">客户名称</span>
            <span class="right content">{{kehu.name}} <icon type="warn" v-if="sjkehu"></icon></span>
          </div>
        </cell-box>
        <cell-box style="margin-top:0" v-else>
          <div class="form-item clearfix" style="" >
            <x-input title='客户名称' v-model="kehu.name" placeholder="必填" readonly text-align="right"></x-input>
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
          <div class="form-item clearfix" @click="chosesjtype=true">
            <span class="left banner" v-bind:style="{'color':sjnametype?'red!important':'#000'}">商机类型</span>
            <span class="right content">{{sjtype.name}} <icon type="warn" v-if="sjnametype"></icon></span>
          </div>
        </cell-box>
        <cell-box is-link>
          <div class="form-item clearfix" @click="choseP">
            <span class="left banner" v-bind:style="{'color':sjxuqiu?'red!important':'#000'}">需求产品</span>
            <div class="right content">
              <span v-for="(item,index) in products" :key="index">
                {{item.name}} <icon type="warn" v-if="sjxuqiu"></icon>
              </span>
            </div>
          </div>
        </cell-box>
        <cell-box v-if="choseqy">
          <div class="form-item clearfix qy" style="padding-right:0">
            <popup-radio title="签约类型" :options="optionsQy" v-model="qy" placeholder="placeholder"></popup-radio>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix">
            <x-input  :title='`<span style="${moneyTip}">预计成交金额(万元)</span>`'  novalidate :icon-type="moneyIcon"  type="number" id="fi_money" v-model="money" placeholder="必填" :show-clear="true" text-align="right" @on-blur="onBlur"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix" id="date"  style="padding-right:0" >
            <calendar title="预计成交日期" class="datecalendar"  placeholder="必填" v-model="date"></calendar>
            <icon type="warn" v-if="sjdate" id="dateIcon"></icon>
          </div>
        </cell-box>
      </group>

      <group>

        <cell-box is-link>
          <div class="form-item clearfix" @click="chosesways=true">
            <span class="left banner" v-bind:style="{'color':sjgetways?'red!important':'#000'}">来源渠道</span>
            <span class="right content">{{ways.name}} <icon type="warn" v-if="sjgetways"></icon></span>
          </div>
        </cell-box>
        <!-- <cell-box v-show="!IsManager">
          <div class="form-item clearfix sh" style="padding-right:0" >
            <x-switch title="发起确认审核" v-model="isShenhe"></x-switch>
          </div>
        </cell-box> -->

        <!--商机挂起 -->
        <cell-box>
          <div class="form-item clearfix sh" style="padding-right:0" >
            <x-switch title="是否挂起" v-model="isHangUp"></x-switch>
          </div>
        </cell-box>
        <cell-box  v-show="isHangUp">
          <div class="form-item clearfix restartDate" style="padding-right:0" >
            <calendar title="预计重启日期" class="datecalendar" disable-past :start-date="startDate" placeholder="必填" v-model="reStartDate"></calendar>
          </div>
        </cell-box>
        <cell-box  v-show="isHangUp">
          <div class="form-item clearfix reado resartReason" style="" >
            <x-textarea title="挂起原因" v-model="hangUpReason" placeholder="必填"  text-align="right"></x-textarea>
          </div>
        </cell-box>
<!-- // end -->
        <cell-box v-show="isShenhe">
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
    </form>
</template>

<script>
import {XInput,Calendar ,XSwitch ,XTextarea ,TransferDom,Popup ,PopupRadio , CellBox ,Group ,InlineLoading,Icon  } from 'vux'
import checkpeople from '../../../../components/common/checkpeople';
import checkpeoplemultiple from '../../../../components/common/checkpeoplemultiple';
import sjtype from './compo/sjtype'
import products from './compo/products'
import ways from './compo/ways'
import kehulist from './kehulist'
import moment from 'moment'
export default {
  name: '',
  components:{
   XInput ,Group,Popup,kehulist ,XSwitch,XTextarea  ,InlineLoading,CellBox ,checkpeople,sjtype,ways,products,Calendar,checkpeoplemultiple,PopupRadio,Icon
  },
  created(){
    if(this.$route.params.type=="lianxiren"){
      this.DataSource="移动端联系人新增";
      // 获取此联系人绑定的客户信息
      this.$http.post("/api/AjaxLXRinfoController/GetKHInfoByLxrGUID?LxrGUID="+this.$route.params.id)
      .then((res)=>{
          if(res.Success){
            if(!res.Data[0]) return;
              this.kehu={
                name:res.Data[0].FullName,
                id:res.Data[0].KHGUID
              }
              this.disabled=true;
          }else{
            this.$vux.alert.show({
                title: '客户信息记载失败！',
                content: res.Message
              })
          }
      })
      this.lxrId=this.$route.params.id;

    }else if(this.$route.params.type=="kehu"){
      this.DataSource="移动端客户新增"
      this.$http.post("/api/EnergizaSaleKHInfoController/GetKhDetail",{
        KHGUID:this.$route.params.id
      })
      .then((res)=>{
        this.kehu={
          name:res.Data.entity.FullName,
          id:this.$route.params.id
        }
        this.disabled=true;
      })

    }
    this.getdefaultzzr();
    this.getInfoData();
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
      startDate:moment().add(1, 'days').format("YYYY-MM-DD"),
      disabled:false,
      lxrId:"",
      DataSource:"移动端手工新增",
      chosekehu:false,
      chosepeople:false,
      checkpeoplemultiple:false,
      chosesjtype:false,
      chosesproducts:false,
      chosesways:false,
      choseqy:false,
      IsManager:false,
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
      isShenhe:false,
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
      pdall:[], //保存所有的需求产品,
      sjkehu:false,
      sjnametype:false,
      sjxuqiu:false,
      sjgetways:false,
      sjdate:false,
      nameTip:"",
      nameIcon:"",
      moneyTip:"",
      moneyIcon:"",

      isHangUp:false,
      reStartDate:"",
      hangUpReason:""
    }
  },
  methods:{
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
            if(el.OpportunitiesType==initId){
              this.productslist.push(el)
            }
        })
        // end


        this.wayslist=res.Data.ListSource; //渠道来源列表初始化

      })
    },
    choseSjtypeFinish(params){//选择商机类型
      this.chosesjtype=false;
      // console.log(params)
      this.sjtype={
        name:params.name,
        id:params.id
      }
      // 选择商机类型后，重新筛选需求产品列表
        this.productslist=[];
        this.products=[{
          name:"必填",
          id:""
        }];
        this.pdall.map((el)=>{
          // console.log(el)
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
          //  console.log(data);
           this.IsManager=data.IsManager;
           this.IsManager?this.isShenhe=false:this.isShenhe=true;
           if(!this.IsManager){
              this.getdefaultqrr(params.id);
           }else{
             this.qrr={
                name:"",
                avater:"",
                id:""
              };
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

        this.IsManager=res.Data.IsManager;
        this.IsManager?this.isShenhe=false:this.isShenhe=true;
        if(!this.IsManager){
          this.getdefaultqrr(res.Data.UserGUID);
        }else{
          this.qrr={
            name:"",
            avater:"",
            id:""
          };
        }


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
    //对填入的金额进行正则验证

    onBlur(){
      var moneyData=Number(this.money)
      // console.log(moneyData)
      if(!moneyData){
        var _this=this
        this.$vux.alert.show({
          title: '友情提示',
          content: '您输入的金额无效，请重新输入',
          onHide(){
            _this.money=""
          }
        })
      }else{
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
      }

    },
    goSubmit(){
      // alert(this.qy)
      // console.log(this.name,this.kehu.name,this.zzr.name,this.sjtype.name,this.money,this.date,JSON.stringify(this.products),this.ways.name,this.qrr.name,
      //   JSON.stringify(this.team),this.isShenhe,this.qy)
      //判断商机的客户名称为空提示
      this.sjkehu=this.kehu.id?false:true;
      this.sjnametype=this.sjtype.id?false:true;
      this.sjxuqiu=this.products[0].id?false:true;
      this.sjgetways=this.ways.id?false:true;
      this.sjdate=this.date?false:true;
      if(!this.date){
        this.sjdate=true;
        let zsm=document.getElementsByClassName("vux-cell-primary")[0];
        zsm.style.paddingRight="52px";
        document.getElementsByClassName("vux-label")[0].style.color="red"
      }else{
        this.sjdate=false
        let zsm=document.getElementsByClassName("vux-cell-primary")[0]
        zsm.style.paddingRight="15px"
        document.getElementsByClassName("vux-label")[0].style.color="#000"
      }
      let colorStyle='color:red;';
      let IconStyle='error';
      if(!this.name){
        this.nameTip=colorStyle
        this.nameIcon=IconStyle
      }else{
        this.nameTip=""
        this.nameIcon=""
      }

      if(!this.money){
        this.moneyTip=colorStyle
        this.moneyIcon=IconStyle
      }else{
        this.moneyTip=""
        this.moneyIcon=""
      }

      if(this.name&&this.kehu.id&&this.zzr.id&&this.sjtype.id&&this.money&&this.date&&this.products[0].id&&this.ways.id){//必填项
          if(this.isShenhe&&!this.qrr.id){
            this.$vux.alert.show({
              title: '友情提示',
              content: '请选择上级确认人！'
            })
            return ;
          }

          if(this.isHangUp&&!(this.reStartDate&&this.hangUpReason)){
            this.$vux.alert.show({
              title: '友情提示',
              content: '必填项请填写完整！'
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
            this.$http.post("/api/EnergizaSalesOpportunities/AddSalesOpportunities",{
              TypeGUID:this.sjtype.id,
              SourceGUID:"6ce57741-342b-4070-a121-a02be403cc97",
              SourceGUIDForSType3:this.ways.id,
              OpportunitiesName:this.name,
              PredictTradeTime:this.date,
              PredictTradeMoney:this.money,
              KHGUID:this.kehu.id,
              Remark:"",
              ResponsibleGUID:this.zzr.id,
              IsRebuy:rebuy,
              IsSponsorAffirm:this.isShenhe,
              FZRGUID:this.qrr.id,
              FollowType:1,
              ProductCode:pdid.join(','),
              UserGUID:teamid.join(','),
              LxrGUID:this.lxrId,
              DataSourceDetails:this.DataSource, //用于系统排查，不做展示
              DataSource:"手工新增",

              IsHangUp:this.isHangUp,
              HangUpReason:this.hangUpReason,
              PredictReStartTime:this.reStartDate
            })
            .then((res)=>{
                // console.log(res)
                this.$vux.loading.hide();
                if(res.Success){
                    this.$vux.alert.show({
                      title: '友情提示',
                      content: '添加商机成功！'
                    })
                    // this.$cmBus.$emit("refreshSjList");
                    this.$router.go(-1);
                }else{
                  this.$vux.alert.show({
                      title: '添加失败！',
                      content: res.Message
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
        this.qrr={
          name:"",
          avater:"",
          id:""
        };
      }
    }
  }
}
</script>

<style lang="less">
#shangjiadd{
  .restartDate,.resartReason{
    .weui-cell{
        padding: 0 !important;
    }
  }
  background-color: #F6F6F6;
  .form-item{
    width: 100%;
    padding-right: 5%;
    box-sizing: border-box;

    .vux-calendar:before{
      border-top:0px !important;
    }
    .content{
       color: #757575;
       max-width: 65%;
       text-align: right;
       overflow: hidden;
       text-overflow:ellipsis;
       white-space: nowrap;
    }
    .weui-label{
      width:100%;
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
      .vux-cell-placeholder{
        color:#757575 !important
      }
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
#date{
  position: relative;
}
#date #dateIcon{
  position: absolute;
  top:0;
  right:17px;
}
</style>
