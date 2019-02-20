<template>
    <form action="" id="shangjiadd">
      <group>
        <cell-box style="margin-top:0">
          <div class="form-item clearfix form-title" style="" >
            <p class="title">客户信息</p>
          </div>
        </cell-box>
        <cell-box v-if="!disabled" class="clearfix">
          <!-- <div class="form-item clearfix" @click="chosekehu=true">
            <span class="left banner" v-bind:style="{'color':kehuName?'red!important':'#000'}">客户名称</span>
            <span class="right content">{{kehu.name?kehu.name:"请选择"}} <icon type="warn" v-if="kehuName"></icon></span>
          </div> -->

          <div class="form-item clearfix" style="width:90%" >
            <x-input  title='客户名称' v-model="kehu.name" placeholder="必填" :show-clear="true" text-align="right"></x-input>
          </div>
          <i class="iconfont icon-xinzenglianxiren" @click="chosekehu=true" style="color:#3079D5;font-size:1.2rem"></i>
        </cell-box>
        <cell-box v-else>
          <div class="form-item clearfix">
            <x-input title='客户名称' v-model="kehu.name" placeholder="必填" readonly text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box style="margin-top:0">
          <div class="form-item clearfix" style="" >
            <x-input  :title='`<span style="${nameTip}">联系人</span>`' :readonly="disabled" novalidate :icon-type="nameIcon" v-model="name" placeholder="必填" :show-clear="true" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box style="margin-top:0">
          <div class="form-item clearfix" style="" >
            <x-input  :title='`<span style="${phoneTip}">联系电话</span>`' :readonly="disabled" novalidate :icon-type="phoneIcon" :max="11" v-model="phone" placeholder="必填" :show-clear="true" text-align="right" @on-blur="onBlur" ></x-input>
          </div>
        </cell-box>
        <cell-box is-link>
          <div class="form-item clearfix" @click="openSelect('xstype')">
            <span class="left banner" v-bind:style="{'color':xstypeShow?'red!important':'#000'}">线索类型</span>
            <div class="right content">
              <span v-for="(item,index) in xstype" :key="index">
                {{item.name}} <icon type="warn" v-if="xstypeShow"></icon>
              </span>
            </div>
          </div>
        </cell-box>
        <cell-box is-link>
          <div class="form-item clearfix" @click="openSelect('products')">
            <span class="left banner" v-bind:style="{'color':productIcon?'red!important':'#000'}">需求产品</span>
            <div class="right content">
              <span v-for="(item,index) in products" :key="index">
                {{item.name}}<icon type="warn" v-if="productIcon"></icon>
              </span>
            </div>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix sh readw productDiv">
              <x-textarea ref="desc" id="productsinfo"  title="需求描述"  v-model="productsinfo" placeholder="必填" ></x-textarea>
              <div id="productshow"><icon type="warn"  v-if="productshow"></icon></div>
          </div>
        </cell-box>
      </group>

      <group style="margin:10px 0">
        <cell-box style="margin-top:0">
          <div class="form-item clearfix form-title" style="" >
            <p class="title">区域推送</p>
          </div>
        </cell-box>
        <cell-box  is-link>
          <div class="form-item clearfix" @click="openSelect('area')">
            <span class="left banner">所属区域</span>
            <span class="right content"  >{{area.name}}</span>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix" style="padding-right:0">
            <p>跟进人 <span style="font-size:0.9rem;color:#b2b2b2">(点击头像可删除)</span></p>
            <ul class="clearfix user-pic">
              <li class="left" >
                <div class="avater" @click="checkpeoplemultiple=true" style="background-image:url(static/img/add.png);background-size:50%;background-repeat:no-repeat;border:1px solid #eaeaea"></div>
              </li>

              <li class="left" v-for="(item,index) in gjr" v-if="gjr.length>0" @click="removePeople(item,index)" :key="index">
                <div class="cm-bac avater" :style="{backgroundImage:'url('+item.avater+')'}"></div>
                <p class="name">{{item.label}}</p>
              </li>
            </ul>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix sh" style="padding-right:0" >
            <x-switch title="分配给自己" v-model="mySelf"></x-switch>
          </div>
        </cell-box>
        <cell-box is-link>
          <div class="form-item clearfix" @click="openSelect('way')">
            <span class="left banner" v-bind:style="{'color':wayShow?'red!important':'#000'}">来源渠道</span>
            <span class="right content">{{way.name}} <icon type="warn" v-if="wayShow"></icon></span>
          </div>
        </cell-box>

      </group>


      <div class="sub-wrap cm-padding">
        <div class="sub text_center" @click="goSubmit">提交</div>
      </div>

      <!-- 选择客户 -->
      <kehulist v-if="chosekehu" @choseFinish="choseKehuFinish"></kehulist>


      <div v-transfer-dom >
        <popup v-model="cmParamChose" :popup-style="{background:'white'}" position="right" width="80%">
          <danxs :prama="cmParamList" :beChose="beChose"  :canEmpty="canEmpty" :count="count"  @choseFinish="cmChoseFinish"></danxs>
        </popup>
      </div>


      <!-- 跟进人 -->
      <div v-transfer-dom >
        <popup v-model="checkpeoplemultiple" :popup-style="{background:'white'}" position="right" width="80%">
          <checkpeoplemultiple @choseFinish="changedGjr" @choseCancel="checkpeoplemultiple=false" :beChose="gjr" :areaId="area.id"></checkpeoplemultiple>
        </popup>
      </div>
    </form>
</template>

<script>
import {XInput,Calendar ,XTextarea,XSwitch ,TransferDom,Popup ,PopupRadio , CellBox ,Group ,InlineLoading,Loading,Icon  } from 'vux'
import kehulist from './kehulist'
import danxs from '../../../../components/common/choseDanXS'
import store from "../../../../vuex/store.js"
import bus from "../../../../assets/js/eventBus.js"
import checkpeoplemultiple from '@/components/common/checkpeoplemultipleXS';
export default {
  name: '',
  components:{
   XInput ,Group,Popup,kehulist ,XSwitch ,InlineLoading,CellBox ,Calendar,PopupRadio ,XTextarea,danxs,Loading,Icon,checkpeoplemultiple
  },
  created(){
    this.getInfoData();
    this.kehu.name=store.state.flName
    this.kehu.id=store.state.KHGUIDs
    //利用中央走线的方式进行父子组件之间的通讯传值，这里进行监听

    bus.$on('getkehuName',(val)=>{

      this.kehu={
        name:val.FullName,
        id:val.KHGUID
      };
      // console.log(this.kehu)
    })
    // this.$http.get("/api/EnergizeSaleUser/WeiXinUserInfo")
    //   .then((res)=>{
    //     // console.log(res)
    //    this.area.name=res.Data.AreaName
    //    this.area.id=res.Data.AreaGUID
    //   })
    if(this.$route.params.lxrId){
         this.getData();
    }
    this.getdefaultzzr();
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
      checkpeoplemultiple:false,
      lists:null,
      canEmpty:false,
      chosekehu:false,
      cmParamList:[],
      cmParamType:"",
      cmParamChose:false,
      count:"",
      kehu:{
        name:"必填",
        id:""
      },
      kehuTemp:{
        name:"必填",
        id:""
      },
      name:"",
      phone:"",
      productsinfo:"",
      xstypelist:[],//线索类型列表
      productlist:[],//需求产品列表
      waylist:[],//来源渠道列表
      arealist:[],//所属区域
      xstype:[{
        name:"必填",
        id:""
      }],
      area:{
        name:"必填",
        id:""
      },
      products:[{
        name:"选填",
        id:""
      }],
      way:{
        name:"必填",
        id:""
      },
      kehuName:false,
      productIcon:false,
      productshow:false,
      wayShow:false,
      xstypeShow:false,
      nameTip:"",
      nameIcon:"",
      phoneTip:"",
      phoneIcon:"",
      productlistAll:[],
      disabled:false,

      gjr:[],
      mySelf:false,
      my:null,
      beChose:[]

    }
  },
  methods:{
    getData(){
        this.$http.post("/api/AjaxLXRinfoController/GetSimpleDetail",{
          SortGUID:this.$route.params.lxrId
        })
        .then((res)=>{
            this.disabled=true;
            this.name=res.Data.LxrName;
            this.kehu={
              name:res.Data.KhName,
              id:res.Data.KHGUID
            };
            this.kehuTemp={
              name:res.Data.KhName,
              id:res.Data.KHGUID
            };
            this.phone=res.Data.Mobile1;


        })
      },
    getInfoData(){
      this.$http.get("/api/EnergizaSaleClueController/GetCluebCondition")
      .then((res)=>{
        res.Data.ListProduct.map((el)=>{
          if(!el.IsDisable){
            this.productlistAll.push({
              name:el.ProductName,
              id:el.ProductCode,
              type:el.QP_OpportunitiesType,
              chose:false
            })
          }
        })

        //所属区域
        res.Data.ListOrg.map((el)=>{

          if(el.IsValid){
            this.arealist.push({
              name:el.AreaName,
              id:el.AreaID,
              chose:false
            })
          }
        })

        //来源渠道
        res.Data.ListDataSource.map((el)=>{
          this.waylist.push({
            name:el.SourceName,
            id:el.SourceGUID,
            chose:false
          })
        })

        //线索类型
        res.Data.ListType.map((el)=>{
          if(el.IsValid){
            this.xstypelist.push({
              name:el.OpportunityTypeName,
              id:el.OpportunityTypeID,
              chose:false
            })
          }
        })


      })
    },
    choseKehuFinish(params){ //选择客户完成
      this.chosekehu=false;
      if(!params) return;
      this.kehu={
        name:params.name,
        id:params.id
      }
      this.kehuTemp={
        name:params.name,
        id:params.id
      }
    },
    // 跟进人逻辑
    removePeople(item,index){
      this.gjr.splice(index,1);
    },
      changedGjr(params){  //选择跟进人
        // console.log(params);
        this.checkpeoplemultiple=false;
        if(params.length>0){
          // 选择跟进人后，比较所选跟进人是否同一区域,不是则删除后一个人
          this.judgeGjrArea(params.join(","),res=>{
            if(!res.Data.IsSameBuGuid){
                params.pop();
                this.$vux.alert.show({
                  title: '友情提示',
                  content: '跟进人成员不属于同一个区域！',
                })
            }

            this.gjr=[];
            params.map((el)=>{
              this.getUserData(el,(data)=>{
                this.gjr.push({
                  label:data.UserName_Chn,
                  value:el,
                  avater:data.UserIcon
                })
              })
            })

            console.log(this.gjr)


          });

          // 回填第一个人的区域
          this.getUserArea(params[0],res=>{
            this.area={id:res.Data.AreaID,name:res.Data.BuName};
          })

        }else{ //选择区域以后，跟进人被清空后，重置提交字段
          this.gjr=[];
        }
      },
      judgeGjrArea(userId,fn){//比较所选跟进人是否同一区域
        this.$http.post('/api/EnergizeAction/IsSameBuGuid',{
          GuidStr:userId
        })
        .then(res=>{
          if(fn) fn(res);
        })
      },
      getUserArea(userId,fn){ //获取用户所属区域
        this.$http.post('/api/EnergizeAction/GetUserInfo',{
          UserGuid:userId
        })
        .then(res=>{
          // console.log(res);
          if(fn) fn(res);
        })
      },
      getdefaultzzr(){  //获取默认主责人
        this.$http.get("/api/EnergizeSaleUser/WeiXinUserInfo")
        .then((res)=>{
          this.my={label:res.Data.UserName_Chn,value:res.Data.UserGUID,avater:res.Data.UserIcon};
        })
      },
      // end
    openSelect(type){
      this.cmParamChose=true;
      this.cmParamType=type;
      // console.log(this.productlist)
      switch(type){
        case 'products':this.cmParamList=this.productlist;this.count="multiple";this.canEmpty=true;break;
        case 'area':this.cmParamList=this.arealist;this.count="";this.canEmpty=false;break;
        case 'way':this.cmParamList=this.waylist;this.count="";this.canEmpty=false;break;
        case 'xstype':this.cmParamList=this.xstypelist;this.count="multiple";this.canEmpty=false;break;
      }
      (type=='xstype'||type=='products')?this.beChose=this[type]:this.beChose=[this[type]];

      // console.log(this.cmParamList);
    },
    cmChoseFinish(params){
      // console.log(params)
      this.cmParamChose=false;

      switch(this.cmParamType){
        case 'products':this.products=params;break;
        case 'area':this.area={
                        name:params.name,
                        id:params.id
                      };break;
        case 'way':this.way={
                        name:params.name,
                        id:params.id
                      };break;
        case 'xstype':this.xstype=params;
                      this.productlist=[];
                      this.products=[];
                      this.productlistAll.map(el=>{
                        this.xstype.map(el2=>{
                            if(el.type==el2.id){
                              this.productlist.push(el);
                            }
                        })

                      })
                      ;break;

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

    goSubmit(){
      //  let gjrName=this.gjr.map(el=>{
      //     return el.label;
      //   })
      // console.log(gjrName);return;
      // console.log(this.kehu.name+","+this.kehu.id);
      //  return;
      //判断客户名称为空提示
      // if(!this.kehu.id){
      //   this.kehuName=true
      // }else{
      //   this.kehuName=false
      // }
      //判断联系人不为空提示
      let colorStyle='color:red;'
      let IconStyle='error'
      if(!this.name){
        this.nameTip=colorStyle
        this.nameIcon=IconStyle
      }else{
        this.nameTip=""
        this.nameIcon=""
      }
      //判断联系电话不为空
      if(!this.phone){
        this.phoneTip=colorStyle
        this.phoneIcon=IconStyle
      }else{
        this.phoneTip=""
        this.phoneIcon=""
      }
      //判断需求产品为空提示
      // if(!this.products[0].id){
      //   this.productIcon=true
      // }else{
      //   this.productIcon=false
      // }
      //判断需求描述为空提示
      if(!this.productsinfo){
        this.productshow=true
      }else{
         this.productshow=false
      }
      //判断来源渠道为空提示
      if(!this.way.id){
        this.wayShow=true
      }else{
        this.wayShow=false
      }
      //判断线索类型为空提示
      if(!this.xstype[0].id){
        this.xstypeShow=true
      }else{
        this.xstypeShow=false
      }


      // if(this.name&&this.kehu.id&&this.productsinfo&&this.phone&&(this.products[0].id)&&this.area.id&&this.way.id&&this.xstype[0].id){//必填项
      let gjrId=this.gjr.map(el=>{
          return el.value;
        })
      if(this.name&&this.kehu.name&&this.productsinfo&&this.phone&&this.area.id&&this.way.id&&this.xstype[0].id){//必填项

          // 产品id列表
          var pdid=[],xsid=[],pdname=[],xsname=[];
          this.products.map((el)=>{
            pdid.push(el.id);
            pdname.push(el.name);
          })
          this.xstype.map((el)=>{
            xsid.push(el.id);
            xsname.push(el.name);
          })
          // end
                this.$vux.loading.show({
              text: '正在提交..'
            })
            setTimeout(() => {
              this.$http.post("/api/EnergizaSaleClueController/AddClueData",{
                ContactName:this.name,
                KHGUID:this.kehu.id,
                CustomerName:this.kehu.name,
                // ProductName:pdname.join(' '),
                ProductID:pdid.join(','),
                Telephone:this.phone,
                // AreaName:this.area.name,
                AreaID:this.area.id,
                // ChannelName:this.way.name,
                ChannelID:this.way.id,
                // OpportunityTypeName:xsname.join(' '),
                OpportunityTypeID:xsid.join(','),
                RequirementDesc:this.productsinfo,
                FollowerGuid:gjrId.join(",")
              })
              .then((res)=>{
                  this.$vux.loading.hide();
                  if(res.Success){
                      this.$vux.alert.show({
                        title: '友情提示',
                        content: '添加线索成功！'
                      })

                      this.$router.go(-1);
                  }else{
                    this.$vux.alert.show({
                        title: '添加失败！',
                        content: res.Message
                      })
                  }
              })
              this.$vux.loading.hide()
            }, 1000)

      }else{
        this.$vux.alert.show({
          title: '友情提示',
          content: '必填项请填写完整！'
        })
      }
    },

    //对输入框进行正则验证
    onBlur(){
      var _this=this;
      var  reg=/^1[3456789][0-9]{9}$/;
      if(this.phone){
        if(reg.test(this.phone)){
        }else{
            this.$vux.alert.show({
                title: '友情提示',
                content: '您输入的手机号码不正确，请重新输入',
                onHide(){
                  _this.phone=""
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



  },
  watch:{
    kehu:{
      handler(val){
        // console.log(val.name+","+this.kehuTemp.name)
        if(val.id==this.kehuTemp.id&&val.name!=this.kehuTemp.name){

          this.kehuTemp.id=this.kehu.id="00000000-0000-0000-0000-000000000000";
        }
      },
      deep:true
    },
    // 跟进人逻辑
      mySelf(val){
        if(val){
          // 判断如果已经选了自己，则return
          let inde=-100;
          this.gjr.map((el,index)=>{
            if(el.value==this.my.value)inde=index
          })
          if(inde>-1){
            return;
          }
          // end

          let ids=this.gjr.map(el=>{
            return el.value
          })
          ids.push(this.my.value);
          this.judgeGjrArea(ids.join(","),res=>{
            if(!res.Data.IsSameBuGuid){
                ids.pop();
                this.mySelf=false;
                this.$vux.alert.show({
                  title: '友情提示',
                  content: '跟进人成员不属于同一个区域！',
                })
            }else{
              this.gjr.push(this.my);
            }
          });
          // 回填第一个人的区域
          this.getUserArea(ids[0],res=>{
            this.area={id:res.Data.AreaID,name:res.Data.BuName};
          })
        }else{
          // 判断有没有选自己，如果有，在删除
          let inde=-100;
          this.gjr.map((el,index)=>{
            if(el.value==this.my.value)inde=index
          })
          if(inde>-1){
            this.gjr.splice(inde,1)
          }

        }


      },
      gjr:{
        handler(val){
        // 判断如果已经选了自己，则分配自己开关打钩
            let inde=-100;
            val.map((el,index)=>{
              if(el.value==this.my.value)inde=index
            })
            inde>-1?this.mySelf=true:this.mySelf=false;
            // end
        },
        deep:true
      }
  }
}
</script>

<style lang="less">
#shangjiadd{
  background-color: #F6F6F6;
  .weui-cells{
    .vux-cell-box{
      .productDiv{
        position: relative;
        #productshow{
          position: absolute;
          left:7.5rem;
          top:0
        }
      }
    }
  }
  .form-item{
    width: 100%;
    padding-right: 5%;
    box-sizing: border-box;


    .content{
       color: #757575;
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
