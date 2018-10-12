<template>
    <form action="" id="shangjiadd">
      <group>
        <cell-box style="margin-top:0">
          <div class="form-item clearfix form-title" style="" >
            <p class="title">客户信息</p>
          </div>
        </cell-box>
        <cell-box is-link  v-if="!disabled">
          <div class="form-item clearfix" @click="chosekehu=true">
            <span class="left banner" v-bind:style="{'color':kehuName?'red!important':'#000'}">客户名称</span>
            <span class="right content">{{kehu.name?kehu.name:"请选择"}} <icon type="warn" v-if="kehuName"></icon></span>
          </div>
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
          <div class="form-item clearfix" @click="openSelect('product')">
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



      <div v-transfer-dom>
        <popup v-model="cmParamChose" :popup-style="{background:'white'}" position="right" width="80%">
          <danxs :prama="cmParamList" :canEmpty="canEmpty" :count="count"  @choseFinish="cmChoseFinish"></danxs>
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
export default {
  name: '',
  components:{
   XInput ,Group,Popup,kehulist ,XSwitch ,InlineLoading,CellBox ,Calendar,PopupRadio ,XTextarea,danxs,Loading,Icon
  },
  created(){
    this.getInfoData();
    this.kehu.name=store.state.flName
    this.kehu.id=store.state.KHGUIDs
    //利用中央走线的方式进行父子组件之间的通讯传值，这里进行监听
    // const _this = this
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
    },
    openSelect(type){
      this.cmParamChose=true;
      this.cmParamType=type;
      console.log(this.productlist)
      switch(type){
        case 'product':this.cmParamList=this.productlist;this.count="multiple";this.canEmpty=true;break;
        case 'area':this.cmParamList=this.arealist;this.count="";this.canEmpty=false;break;
        case 'way':this.cmParamList=this.waylist;this.count="";this.canEmpty=false;break;
        case 'xstype':this.cmParamList=this.xstypelist;this.count="multiple";this.canEmpty=false;break;
      }

      // console.log(this.cmParamList);
    },
    cmChoseFinish(params){
      this.cmParamChose=false;

      switch(this.cmParamType){
        case 'product':this.products=params;break;
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


    goSubmit(){
      //判断客户名称为空提示
      if(!this.kehu.id){
        this.kehuName=true
      }else{
        this.kehuName=false
      }
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

    //  console.log(this.products)
      // if(this.name&&this.kehu.id&&this.productsinfo&&this.phone&&(this.products[0].id)&&this.area.id&&this.way.id&&this.xstype[0].id){//必填项
      if(this.name&&this.kehu.id&&this.productsinfo&&this.phone&&this.area.id&&this.way.id&&this.xstype[0].id){//必填项

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
                // CustomerName:this.kehu.name,
                // ProductName:pdname.join(' '),
                ProductID:pdid.join(','),
                Telephone:this.phone,
                // AreaName:this.area.name,
                AreaID:this.area.id,
                // ChannelName:this.way.name,
                ChannelID:this.way.id,
                // OpportunityTypeName:xsname.join(' '),
                OpportunityTypeID:xsid.join(','),
                RequirementDesc:this.productsinfo
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
      var  reg=/^[1]{1}[34578]{1}[0-9]{9}$/;
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
