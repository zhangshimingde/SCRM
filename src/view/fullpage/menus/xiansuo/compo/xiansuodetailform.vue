<template>
    <form action="" id="shangjiadd">
      <group>
        <cell-box style="margin-top:0">
          <div class="form-item clearfix form-title" style="" >
            <p class="title">基本信息</p>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix readw">
              <x-input title="联系人" :min="1"  v-model="contactPeople" @on-change="updateFieldBase" placeholder="必填" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix readw">
              <x-input title="联系方式"  v-model="contactPhone" @on-change="updateFieldBase" placeholder="必填" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box :is-link="canEdit">
          <div class="form-item clearfix" :class="canEdit?'readw':'reado'" @click="openSelect('xstype')">
            <span class="left banner">线索类型</span>
            <div class="right content">
              <span v-for="(item,index) in xstype" :key="index">
                {{item.name}}
              </span>
            </div>
          </div>
        </cell-box>
        <cell-box :is-link="canEdit">
          <div class="form-item clearfix" :class="canEdit?'readw':'reado'" @click="openSelect('way')">
            <span class="left banner">来源渠道</span>
            <span class="right content">{{way.name}}</span>
          </div>
        </cell-box>
        <cell-box :is-link="canEdit">
          <div class="form-item clearfix" :class="canEdit?'readw':'reado'" @click="openSelect('area')">
            <span class="left banner">所属区域</span>
            <span class="right content">{{area.name}}</span>
          </div>
        </cell-box>
        <cell-box :is-link="canEdit">
          <div class="form-item clearfix " :class="canEdit?'readw':'reado'" @click="openSelect('products')">
            <span class="left banner">需求产品</span>
            <div class="right content">
              <span v-for="(item,index) in products" :key="index">
                {{item.name}}
              </span>
            </div>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix sh" :class="canEdit?'readw':'reado'">
              <x-textarea title="需求描述" :readonly="!canEdit" v-model="productsinfo" @on-change="updateFieldBase" placeholder="用文字对客户需求简单描述(必填)"></x-textarea>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix sh" :class="canEdit?'readw':'reado'">
              <x-textarea title="需求分析" :readonly="!canEdit" v-model="fxinfo" @on-change="updateFieldBase('线索需求分析')" placeholder="需求产生的原因(管理驱动、1W意识、个人需求)和采购计划安排"></x-textarea>
          </div>
        </cell-box>
      </group>

      <group style="margin:10px 0">
        <cell-box style="margin-top:0">
          <div class="form-item clearfix form-title" style="" >
            <p class="title">客户信息</p>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix reado"  v-if="kehu.id!='00000000-0000-0000-0000-000000000000'">
            <span class="left banner">客户名称</span>
            <router-link :to="{name:'kehudetail',params:{id:kehu.id}}" class="right content" style="color:#3079D5">{{kehu.name}}</router-link>
          </div>

          <template v-else>
              <div class="form-item clearfix" style="width:90%" >
                <x-input  title='客户名称' v-model="kehu.name" placeholder="必填" :show-clear="true" text-align="right"></x-input>
              </div>
              <i class="iconfont icon-xinzenglianxiren" @click="chosekehu=true" style="color:#3079D5;font-size:1.2rem"></i>
          </template>

        </cell-box>
        <cell-box>
          <div class="form-item clearfix qy readw" style="padding-right:0">
            <popup-radio title="客户类型" :options="khTypeOption" v-model="customertypeid" placeholder="请填写"></popup-radio>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix readw">
              <x-input title="总机"  v-model="tel" @on-change="updateFieldKh" placeholder="请填写" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix readw">
              <x-input title="所在城市"  v-model="city" @on-change="updateFieldKh" placeholder="请填写" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix readw">
              <x-input title="详细地址"  v-model="address" @on-change="updateFieldKh" placeholder="请填写" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix sh readw">
              <x-textarea title="信息化现状" v-model="digtalInfo" @on-change="updateFieldKh" placeholder="是否使用其他ERP产品，如果有，使用现状如何？"></x-textarea>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix sh readw">
              <x-textarea title="项目信息" v-model="projectInfo" @on-change="updateFieldKh" placeholder="有什么项目，在哪里，大多面积，项目目前进度"></x-textarea>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix sh readw">
              <x-textarea title="其他信息" v-model="otherInfo" @on-change="updateFieldKh" placeholder="公司概述、架构、购买权，发展城市等"></x-textarea>
          </div>
        </cell-box>

      </group>

      <group style="margin:10px 0 10px" class="ha">
        <cell-box >
          <div class="form-item clearfix" style="" >
            <p class="title">其他信息</p>
          </div>
        </cell-box>
        <cell-box>
            <div class="form-item clearfix">
              <x-input title="提交人" readonly v-model="extraInfo.createPeople" placeholder="无" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
            <div class="form-item clearfix">
              <x-input title="创建时间" readonly v-model="extraInfo.createTime" placeholder="必填" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
      </group>

      <!-- 选择客户 -->
      <kehulist v-if="chosekehu" @choseFinish="choseKehuFinish"></kehulist>



      <div v-transfer-dom>
        <popup v-model="cmParamChose" :popup-style="{background:'white'}" position="right" width="80%">
          <danxs :prama="cmParamList" :beChose="beChose" :canEmpty="canEmpty" :count="count"  @choseFinish="cmChoseFinish"></danxs>
        </popup>
      </div>
    </form>
</template>

<script>
import {XInput,Calendar ,XTextarea,XSwitch ,TransferDom,Popup ,PopupRadio , CellBox ,Group ,InlineLoading  } from 'vux'
import kehulist from '../kehulist'
import danxs from '../../../../../components/common/choseDanXS'
export default {
  name: '',
  components:{
   XInput ,Group,Popup,kehulist ,XSwitch ,InlineLoading,CellBox ,Calendar,PopupRadio ,XTextarea,danxs
  },
  created(){
    this.getInfoData();
    this.$cmBus.$on('freshAreaClue',()=>{
      this.getBaseClueInfo();
    })
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
  props:["detailInfo"],
  data () {
    return {
      canEmpty:false,
      isFirstTime:true,
      chosekehu:false,
      cmParamList:[],
      cmParamType:"",
      cmParamChose:false,
      khTypeOption:[],
      count:"",
      xstypelist:[],//线索类型列表
      productlist:[],//需求产品列表
      productlistAll:[],
      waylist:[],//来源渠道列表
      arealist:[],//所属区域
      contactPeople:"",
      contactPhone:"",
      productsinfo:"",
      fxinfo:"",
      xstype:[{
        name:"必填",
        id:""
      }],
      area:{
        name:"必填",
        id:""
      },
      products:[{
        name:"必填",
        id:""
      }],
      way:{
        name:"必填",
        id:""
      },

      kehu:{
        name:"必填",
        id:""
      },
      kehuTemp:{
        name:"必填",
        id:""
      },
      khType:"",
      customertypeid:"",
      tel:"",
      city:"",
      address:"",
      digtalInfo:"",
      projectInfo:"",
      otherInfo:"",
      extraInfo:{
        createPeople:"",
        createTime:""
      },
      beChose:[],
      canEdit:false,
    }
  },
  methods:{
    getBaseClueInfo(){
      // 获取基本信息填充
      this.$http.post("/api/EnergizaSaleClueController/GetOpportunitiesDetail",{
        OpportunityGUID:this.$route.params.id,
        Follow:false
      }).then((res)=>{
        var data=res.Data;
        // console.log(data);
        this.contactPeople=data.ContactName;
        this.contactPhone=data.Telephone;
        this.productsinfo=data.RequirementDesc;
        this.fxinfo=data.RequirementOtherInfo;
        this.way={name:data.ChannelName,id:data.ChannelID};
        this.area={name:data.AreaName,id:data.AreaID};

        let typeNameArr=data.OpportunityTypeName?data.OpportunityTypeName.split(','):[];
        let typeIdArr=data.OpportunityTypeID?data.OpportunityTypeID.split(','):[];
        this.xstype=typeNameArr.map((el,index)=>{
          return {
            name:el,
            id:typeIdArr[index]
          }
        });
        this.productlistAll.map(el=>{
          this.xstype.map(el2=>{
              if(el.type==el2.id){
                this.productlist.push(el);
              }
          })
        })
        let productsNameArr=data.ProductName?data.ProductName.split(','):[];
        let productsIdArr=data.ProductID?data.ProductID.split(','):[];
        this.products=productsNameArr.map((el,index)=>{
          return {
            name:el,
            id:productsIdArr[index]
          }
        });

        this.extraInfo={
          createPeople:data.CreatorName,
          createTime:data.CreateTime?data.CreateTime.substring(0,10):""
        }
        // console.log(this.way)
        setTimeout(()=>{
          this.isFirstTime=false;
        }, 500)
      })
    },
    setData(){
      // 客户信息填充
      var khData=this.detailInfo;
      this.kehu={
        name:khData.CustomerName,
        id:khData.KHGUID
      }
      this.kehuTemp={
        name:khData.CustomerName,
        id:khData.KHGUID
      }
      this.khType=khData.CustomerTypeName;
      this.tel=khData.Switchboard;
      this.city=khData.CustomerCity;
      this.address=khData.CustomerAddr;
      this.digtalInfo=khData.InfoStatus;
      this.projectInfo=khData.ProjectInfo;
      this.otherInfo=khData.CustomerOtherInfo;
      this.customertypeid=khData.ZbSortItemGUID;
      (khData.OpportunityStatusDesc=="商机"||khData.OpportunityStatusDesc=="关闭")?this.canEdit=false:this.canEdit=true
      this.getBaseClueInfo();

      // 获取客户类型
      // this.$http.get("/api/EnergizaSaleClueController/GetCustomerType")
      // .then((res)=>{

      //   res.Data.map((el)=>{
      //     this.khTypeOption.push({
      //         key:el.CustomerTypeID,
      //         value:el.CustomerTypeName
      //     })
      //   })
      // })
    },
    getInfoData(){
      this.$http.get("/api/EnergizaSaleClueController/GetCluebCondition")
      .then((res)=>{
        // console.log(res)
        // 获取客户类型
        res.Data.ListCustomerType.map((el)=>{
          this.khTypeOption.push({
              key:el.ItemGUID,
              value:el.ItemName
          })
        })

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

        res.Data.ListOrg.map((el)=>{
          if(el.IsValid){
            this.arealist.push({
              name:el.AreaName,
              id:el.AreaID,
              chose:false
            })
          }
        })

        res.Data.ListDataSource.map((el)=>{
          this.waylist.push({
            name:el.SourceName,
            id:el.SourceGUID,
            chose:false
          })
        })

        res.Data.ListType.map((el)=>{
          if(el.IsValid){
            this.xstypelist.push({
              name:el.OpportunityTypeName,
              id:el.OpportunityTypeID,
              chose:false
            })
          }
        })
        this.setData();

      })
    },

    openSelect(type){
      if(!this.canEdit)return;
      this.cmParamChose=true;
      this.cmParamType=type;

      switch(type){
        case 'products':this.cmParamList=this.productlist;this.count="multiple";this.canEmpty=true;break;
        case 'area':this.cmParamList=this.arealist;this.count="";this.canEmpty=false;break;
        case 'way':this.cmParamList=this.waylist;this.count="";this.canEmpty=false;break;
        case 'xstype':this.cmParamList=this.xstypelist;this.count="multiple";this.canEmpty=false;break;
      }

      (type=='xstype'||type=='products')?this.beChose=this[type]:this.beChose=[this[type]];

      // console.log(this.cmParamList);
      // this.updateFieldBase();
    },
    cmChoseFinish(params){
      this.cmParamChose=false;
      // console.log(params);
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
                      this.products=[{name:this.productlist[0].name,id:this.productlist[0].id}]
                      ;break;

      }

      this.updateFieldBase("selectItem");
    },
    choseKehuFinish(params){ //选择客户完成
      this.chosekehu=false;
      if(!params) return;
      this.kehu={
        name:params.name,
        id:params.id
      }
    },
    updateFieldKh(){   //修改客户信息
      if (this.isFirstTime) return;
      if(!this.kehu.name){
        this.$vux.alert.show({
                title: '友情提示',
                content: "客户名不能为空！"
              })
        return;
      }
      this.$http.post("/api/EnergizaSaleClueController/EditOpportunitiesKH",{
            OpportunityGUID:this.$route.params.id,
            CustomerName:this.kehu.name,
            KHGUID:this.kehu.id,
            Switchboard: this.tel,
            CustomerAddr: this.address,
            CustomerCity:this.city,
            // CustomerTypeID:this.customertypeid,
            ZbSortItemGUID:this.customertypeid,
            InfoStatus: this.digtalInfo,
            ProjectInfo:this.projectInfo,
            CustomerOtherInfo:this.otherInfo
      })
      .then((res)=>{
          if(res.Success){
            this.$vux.toast.text('修改成功！', 'top');
            this.kehuTemp={
              name:this.kehu.name,
              id:this.kehu.id
            }

            this.$cmBus.$emit("refreshXsList");
            this.$cmBus.$emit("changeFieldXS",{
                field:"name",
                value:this.kehu.name
            })

          }else{
            this.$vux.alert.show({
                title: '友情提示',
                content: res.Message
              })
            setTimeout(()=>{
                window.location.reload();
            }, 1000)
          }
      })
    },
    updateFieldBase(val){ //修改基本信息

      if (this.isFirstTime) return;
      if(val!='线索需求分析'){
        if(val.length<1){

             this.$vux.toast.text('必填信息不能为空！', 'top');
            return;
        }
      }

      var typeId=[],typeName=[],productId=[],productName=[];
      this.xstype.map((el)=>{
        typeId.push(el.id);
        typeName.push(el.name);
      });
      this.products.map((el)=>{
        productId.push(el.id);
        productName.push(el.name);
      })
      this.$http.post("/api/EnergizaSaleClueController/EditOpportunities",{
              OpportunityGUID: this.$route.params.id,
              ContactName:this.contactPeople,
              Telephone:this.contactPhone,
              RequirementDesc: this.productsinfo,
              OpportunityTypeID:typeId.join(','),
              OpportunityTypeName: typeName.join(','),
              ChannelID:this.way.id,
              ChannelName: this.way.name,
              AreaGuid:this.area.id,
              AreaID:this.area.id,
              AreaName: this.area.name,
              ProductID: productId.join(','),
              ProductName: productName.join(','),
              RequirementOtherInfo:this.fxinfo
      })
      .then((res)=>{
          if(res.Success){
            this.$vux.toast.text('修改成功！', 'top');
            this.$cmBus.$emit("refreshXsList");
            this.$emit("freshGJR");

            this.$cmBus.$emit("changeFieldXS",{
                field:"people",
                value:this.contactPeople,
            })
            this.$cmBus.$emit("changeFieldXS",{
                field:"phone",
                value:this.contactPhone
            })
          }else{
            this.$vux.alert.show({
                title: '友情提示',
                content: res.Message
              })
            setTimeout(()=>{
                window.location.reload();
            }, 1000)
          }
      })
    }
  },
  watch:{
    kehu:{
      handler(val){
        if(val.id==this.kehuTemp.id&&val.name!=this.kehuTemp.name){
          this.kehuTemp.id=this.kehu.id="00000000-0000-0000-0000-000000000000";
        }

        this.updateFieldKh();
      },
      deep:true
    },
    customertypeid:{
      handler(val){
        this.updateFieldKh();
      },
      deep:true
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
