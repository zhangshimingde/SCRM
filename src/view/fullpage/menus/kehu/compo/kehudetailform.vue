<template>
    <form action="" id="shangjiadd">
      <group style="margin:0px 0">
        <cell-box>
          <div class="form-item clearfix form-title">
              基本信息
          </div>
        </cell-box>
      </group>
      <group style="margin:0px 0 10px;">
        <cell-box >
          <div class="form-item clearfix readw" style="padding-right:0">
              <x-input title="客户简称"  v-model="khName" @on-change="updateField('SortName,'+khName)" placeholder="必填" :show-clear="false" text-align="right" ></x-input>
          </div>
        </cell-box>
        <cell-box is-link >
          <div class="form-item clearfix readw" @click="openSelect('khLevel')">
            <span class="left banner">公司层级</span>
            <span class="right content">
                {{khLevel.name}}
            </span>
          </div>
        </cell-box>
        <cell-box is-link >
          <div class="form-item clearfix readw" @click="openSelect('kehuType')">
            <span class="left banner">客户分类</span>
            <span class="right content">
                {{kehuType.name}}
            </span>
          </div>
        </cell-box>
        <cell-box is-link v-if="kehuType.name=='存量地产'">
          <div class="form-item clearfix readw" @click="openSelect('kehuStatus')">
            <span class="left banner">客户存量业态</span>
            <span class="right content">
                {{kehuStatus.name}}
            </span>
          </div>
        </cell-box>
        <cell-box is-link v-if="khLevel.name!='集团公司'">
          <div class="form-item clearfix readw" @click="chosekehu=true" >
            <span class="left banner">上级公司</span>
            <span class="right content">
                {{parentKehu.name}}
            </span>
          </div>
        </cell-box>
        <cell-box is-link>
          <div class="form-item clearfix readw" @click="openSelect('area')">
            <span class="left banner">所属区域</span>
            <span class="right content">
                {{area.name}}
            </span>
          </div>
        </cell-box>
        <cell-box is-link>
          <div class="form-item clearfix readw" @click="openSelect('levelOne')">
            <span class="left banner">一级细分</span>
            <span class="right content">
                {{levelOne.name}}
            </span>
          </div>
        </cell-box>
        <cell-box is-link>
          <div class="form-item clearfix readw" @click="openSelect('levelTwo')">
            <span class="left banner">二级细分</span>
            <span class="right content">
                {{levelTwo.name}}
            </span>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix sh" style="padding-right:0">
               <x-switch title="是否为头部客户" v-model="isTou"></x-switch>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix qy readw" style="padding-right:0">
            <popup-radio title="是否为存在合作" :options="operations" v-model="op" placeholder="必填"></popup-radio>
          </div>
        </cell-box>
      </group>

      <group>
        <cell-box>
          <div class="form-item clearfix form-title">
              签约信息
          </div>
        </cell-box>
      </group>
      <group style="margin:0px 0 10px">
        <cell-box>
          <div class="form-item clearfix reado">
              <x-input title="累计签约金额" readonly v-model="partSecond.ljqy" placeholder="必填" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix reado">
              <x-input title="累计回款金额" readonly v-model="partSecond.ljhk" placeholder="必填" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix reado">
              <x-input title="当前应收款" readonly v-model="partSecond.dqys" placeholder="必填" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix reado">
              <x-input title="年度签约金额" readonly v-model="partSecond.ndqy" placeholder="必填" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix reado">
              <x-input title="年度回款金额" readonly v-model="partSecond.ndhk" placeholder="必填" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix reado">
              <x-input title="当前在跟进商机预计成交金额" readonly v-model="partSecond.yjcj" placeholder="必填" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>

      </group>



      <group>
        <cell-box>
          <div class="form-item clearfix form-title">
              联系信息
          </div>
        </cell-box>
      </group>
      <group style="margin:0px 0 10px">
        <cell-box is-link>
          <div class="form-item clearfix readw" @click="openSelect('province')">
            <span class="left banner">省份</span>
            <span class="right content">
                {{province.name}}
            </span>
          </div>
        </cell-box>
        <cell-box is-link>
          <div class="form-item clearfix readw" @click="openSelect('city')">
            <span class="left banner">城市</span>
            <span class="right content">
                {{city.name}}
            </span>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix readw">
              <x-input title="总机" @on-change="updateField('Phone,'+zj)" v-model="zj" placeholder="选填" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix readw">
              <x-input title="传真" @on-change="updateField('Fax,'+cz)" v-model="cz" placeholder="选填" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix readw">
              <x-input title="邮编" @on-change="updateField('ZipCode,'+yb)" v-model="yb" placeholder="选填" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix readw">
              <x-input title="地址" @on-change="updateField('Address,'+address)" v-model="address" placeholder="选填" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix readw">
              <x-input title="网址" @on-change="updateField('WebSite,'+wz)" v-model="wz" placeholder="选填" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix sh readw">
              <x-textarea title="备注" @on-change="updateField('Remark,'+remark)" v-model="remark" placeholder="选填备注"></x-textarea>
          </div>
        </cell-box>
      </group>



      <group>
        <cell-box>
          <div class="form-item clearfix form-title">
              其他信息
          </div>
        </cell-box>
      </group>
      <group style="margin:0px 0 10px">
        <cell-box>
            <div class="form-item clearfix">
              <x-input title="创建人" readonly v-model="partFour.createPeople" placeholder="无" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
            <div class="form-item clearfix">
              <x-input title="创建时间" readonly v-model="partFour.createTime" placeholder="无" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
      </group>



      <div v-transfer-dom>
        <popup v-model="cmParamChose" :popup-style="{background:'white'}" position="right" width="80%">
          <danxs :prama="cmParamList"  @choseFinish="cmChoseFinish"></danxs>
        </popup>
      </div>


      <!-- 选择客户 -->
      <kehulist v-if="chosekehu" @choseFinish="choseKehuFinish"></kehulist>
    </form>
</template>

<script>
import {XInput,Calendar ,XSwitch ,TransferDom,Popup ,PopupRadio , CellBox ,Group ,InlineLoading,XTextarea   } from 'vux'
import danx from '../../../../../components/common/choseDanX'
import danxs from '../../../../../components/common/choseDanXS'
import kehulist from '../kehulist'
export default {
  name: '',
  components:{
   XInput,Calendar ,XSwitch ,TransferDom,Popup ,PopupRadio , CellBox ,Group ,InlineLoading,XTextarea ,danx,danxs,kehulist
  },
  directives: {
    TransferDom
  },
  created(){
    // this.getInfoData();
    // setTimeout(()=>{
        this.setData();
    // }, 2000)
  },
  directives: {
    TransferDom
  },
  filters:{
    subst(value){
      if(value){
        return value.substring(0,1)
      }else{
        return value;
      }

    },
    formate(value){
      if(value){
        return value.substring(0,10)
      }else{
        return value;
      }
    }
  },
  props:["detailInfo"],
  data () {
    return {
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
      kehuStatusList:[],

      isFirstTime:true,
      cmParamList:[],
      cmParamType:"",
      cmParamChose:false,
      chosekehu:false,
      khName:"",
      parentKehu:{
        name:"请选择",
        id:""
      },
      khLevel:{
          name:"必填",
          id:""
      },
      area:{
        name:"必填",
        id:""
      },
      levelOne:{
          name:"必填",
          id:""
      },
      levelTwo:{
          name:"必填",
          id:""
      },
      isTou:false,
      op:"",
      khLevelList:[],
      areaList:[],
      levelOneList:[],
      levelTwoList:[],
      operations:["1维护期内","2维护期外","3未签约"],

      partSecond:{
        ljqy:0,
        ljhk:0,
        dqys:0,
        ndqy:0,
        ndhk:0,
        yjcj:0
      },

      province:{
        name:"",
        id:""
      },
      city:{
        name:"",
        id:""
      },
      zj:"",
      cz:"",
      yb:"",
      address:"",
      wz:"",
      remark:"",
      provinceList:[],
      cityList:[],

      partFour:{
        createPeople:"",
        createTime:""
      }

    }
  },
  methods:{
    setData(){

      var data=this.detailInfo.entity;
      // console.log(data);
      this.khName=data.SortName;
      this.khLevel={
        name:data.LevelCodeName,
        id:""
      };
      this.parentKehu={
        name:data.ParentKhName,
        id:data.ParentKHGUID
      };
      this.kehuType={
        name:data.CustomerType,
        id:data.CustomerType
      };
      this.kehuStatus={
        name:data.CustomerFormats,
        id:data.CustomerFormats
      };

      this.area={
        name:data.BuName,
        id:data.BuGUID
      };
      this.levelOne={
        name:data.ZbSortItemName,
        id:""
      };
      this.levelTwo={
        name:data.QySortItemName,
        id:""
      };

      if(data.IsTopCustomer=="1"){
        this.isTou=true
      }else{
        this.isTou=false
      }

      this.op=data.IsBuy;

      this.city.name=data.CityName;
      this.province.name=data.ProvinceName;
      this.province.id=data.Province;

      this.zj=data.Phone;
      this.cz=data.Fax;
      this.yb=data.ZipCode;
      this.address=data.Address;
      this.wz=data.WebSite;
      this.remark=data.Remark;


      this.partFour.createPeople=data.CreateName;
      this.partFour.createTime=data.CreateDate?data.CreateDate.substring(0,10):data.CreateDate;



      // 获取签约信息
      this.$http.post("/api/EnergizaSaleKHInfoController/GetKHPerformance",{
        KHGUID:this.$route.params.id
      }).then((res)=>{
        // console.log(111+res)
        this.partSecond.ljqy=(res.Data.QYTotal/10000).toFixed(2)+"万";
        this.partSecond.ljhk=(res.Data.HKTotal/10000).toFixed(2)+"万";
        this.partSecond.dqys=(res.Data.YSTotal/10000).toFixed(2)+"万";
        this.partSecond.ndqy=(res.Data.QYYear/10000).toFixed(2)+"万";
        this.partSecond.ndhk=(res.Data.HKYear/10000).toFixed(2)+"万";
        this.partSecond.yjcj=(res.Data.PredictMoney/10000).toFixed(2)+"万";
      })

      // 获取选择条件
      this.getInfoData(this.area.id);

      // 获取省份城市列表
      this.getProvince();
      this.getCity(this.province.id);

      setTimeout(()=>{
          this.isFirstTime=false;
        }, 500)

    },
    getProvince(){
      this.$http.get("/api/EnergizeSaleCommon/GetProvince").
      then((res)=>{
        // console.log(res)
        res.Data.map((el)=>{
            this.provinceList.push({
              id:el.ProvinceID,
              name:el.Province,
              chose:false
            })
        })

      })
    },

    getCity(province,fn){
      if(!province) return;
      this.$http.get("/api/EnergizeSaleCommon/GetCity",{
        params:{
          Province:province
        }
      }).
      then((res)=>{
        // console.log(res)
        this.cityList=[];
        res.Data.map((el)=>{
            this.cityList.push({
              id:el.CityID,
              name:el.City,
              chose:false
            })
        });

        if(fn) fn();

      })
    },
    getInfoData(areaId){  //获取选择条件
        this.loading=true;
        this.$http.get("/api/EnergizaSaleKHInfoController/GetKHConditionFilter",{
          params:{
            CustomerAreaGUID:areaId
          }
        })
        .then((res)=>{
          // console.log(res);
          // return;
          this.kehuTypeList=[{name:"开发商",id:"开发商"},{name:"供应商",id:"供应商"},{name:"存量地产",id:"存量地产"}];
          this.kehuStatusList=[{name:"公寓",id:"公寓"},{name:"商业地产",id:"商业地产"},{name:"物业",id:"物业"}];
          this.loading=false;
          res.Data.CompanyLevel.map((el)=>{
            this.khLevelList.push({
              name:el.Text,
              id:el.Value,
              chose:false
            })
          })
          res.Data.ListZbMartSortItem.map((el)=>{
            this.levelOneList.push({
              name:el.KindSort+el.ItemName,
              id:el.ItemGUID,
              chose:false
            })
          })

          // console.log(this.levelOneList)
          res.Data.ListQyMartSortItem.map((el)=>{
            this.levelTwoList.push({
              name:el.KindSort+el.ItemName,
              id:el.ItemGUID,
              chose:false
            })
          })


          res.Data.ListOrganization.map((el)=>{
            this.areaList.push({
              name:el.Codeitemdesc,
              id:el.BUGuid,
              chose:false
            })
          })

        })
    },
    openSelect(type){
      this.cmParamChose=true;
      this.cmParamType=type;
      // alert(type)
      // console.log(this.levelOneList);
      switch(type){
        case 'khLevel':this.cmParamList=this.khLevelList;break;
        case 'area':this.cmParamList=this.areaList;break;
        case 'levelOne':this.cmParamList=this.levelOneList;break;
        case 'levelTwo':this.cmParamList=this.levelTwoList;break;
        case 'province':this.cmParamList=this.provinceList;break;
        case 'city':this.cmParamList=this.cityList;break;
        case 'kehuType':this.cmParamList=this.kehuTypeList;break;
        case 'kehuStatus':this.cmParamList=this.kehuStatusList;break;
      }

      // console.log(this.cmParamList);
    },
    cmChoseFinish(params){
      this.cmParamChose=false;

      var field,val;
      switch(this.cmParamType){
        case 'kehuType':this.kehuType={
                        name:params.name,
                        id:params.id
                      };
                      params.id=='存量地产'?this.showKehuStatus=true:this.showKehuStatus=false;
                      field="CustomerType";val=params.id;break;
        case 'kehuStatus':this.kehuStatus={
                        name:params.name,
                        id:params.id
                      };field="CustomerFormats";val=params.id;break;
        case 'khLevel':this.khLevel={
                        name:params.name,
                        id:params.id
                      };this.parentKehu={
                        name:"请选择",
                        id:""
                      };field="KHCompanyLevelCode";val=params.id;break;
        case 'area':this.area={
                        name:params.name,
                        id:params.id
                      };field="BuGUID";val=params.id;break;
        case 'levelOne':this.levelOne={
                        name:params.name,
                        id:params.id
                      };field="ZbSortItemGUID";val=params.id;break;
        case 'levelTwo':this.levelTwo={
                        name:params.name,
                        id:params.id
                      };field="QySortItemGUID";val=params.id;break;
        case 'province':this.province={
                        name:params.name,
                        id:params.id
                      };field="Province";val=params.id;
                      this.getCity(params.id,()=>{
                        this.city={
                          name:this.cityList[0].name,
                          id:this.cityList[0].id
                        }

                        field="City";val=this.cityList[0].id;
                        this.changeInfo(field,val);
                        return;
                      });
                      break;
        case 'city':this.city={
                        name:params.name,
                        id:params.id
                      };field="City";val=params.id;break;
      }
      // console.log(field+","+val)
      if(this.cmParamType=="khLevel"&&params.name!="集团公司"){
        this.$vux.alert.show({
          title: '友情提示',
          content: "公司层级已修改，请选择上级公司！"
        })
        return;
      }

      this.changeInfo(field,val);
      if(this.cmParamType=="kehuType"&&params.name!="存量地产"){
        this.kehuStatus={
                        name:"",
                        id:""
                      }
        this.changeInfo("CustomerFormats",this.kehuStatus.id);
      }else if(this.cmParamType=="kehuType"&&params.name=="存量地产"){
        this.kehuStatus={
          name:"商业地产",
          id:"商业地产"
        }
        this.changeInfo("CustomerFormats",this.kehuStatus.id);
      }
    },
    choseKehuFinish(params){ //选择上级公司完成
      this.chosekehu=false;
      if(!params) return;
      this.parentKehu={
        name:params.name,
        id:params.id
      }
      this.changeInfo("KHCompanyLevelCode",this.khLevel.id);
      this.changeInfo("ParentKHGUID",this.parentKehu.id);
    },
    changeInfo(field,val,fn){
      if(!val&&field=="SortName"){
        this.$vux.alert.show({
          title: '友情提示',
          content: "必填信息不能为空！"
        })
        return;
      }
      if(this.isFirstTime){ return;} ;
      if(field=="IsTopCustomer"&&val=="yes"){
        val=1;
      }else if(field=="IsTopCustomer"&&val=="no"){
        val=0;
      }
      this.$http.post("/api/EnergizaSaleKHInfoController/UpdateKhInfo",{
        FieldName:field,
        Value:val,
        KHGUID:this.detailInfo.entity.KHGUID
      }).then((res)=>{
          if(res.Success){
            // this.$vux.toast.text('修改成功！', 'top')
              if(fn)fn();
              this.$cmBus.$emit("refreshKhList");
              this.$vux.alert.show({
                title: '友情提示',
                content: res.Message
              })


          }else{
            var _this=this
            this.$vux.alert.show({
                title: '友情提示',
                content: res.Message,
                onHide(){
                  setTimeout(()=>{
                      window.location.reload();
                  }, 1000)
                }
              })

          }
      })
    },
    updateField(val){
      this.changeInfo(val.split(",")[0],val.split(",")[1]);
    }
  },
  watch:{
    op(val){
      this.changeInfo("IsBuy",val);
    },
    isTou(val){
      val?this.changeInfo("IsTopCustomer","yes"):this.changeInfo("IsTopCustomer","no");
    },


    // khName(val,val2){
    //   console.log(val+","+val2)
    //   if(!val) {
    //     var temp=val2;
    //     this.khName=temp;
    //   }
    // },
    // zj(val){
    //   this.changeInfo("Phone",val);
    // },
    // cz(val){
    //   this.changeInfo("Fax",val);
    // },
    // yb(val){
    //   this.changeInfo("ZipCode",val);
    // },
    // address(val){
    //   this.changeInfo("Address",val);
    // },
    // wz(val){
    //   this.changeInfo("WebSite",val);
    // },
    // remark(val){
    //   this.changeInfo("Remark",val);
    // },

  }
}

</script>

<style lang="less">
.qy{
  padding-right: 4px !important;
}
.form-title{
  font-weight: bold;
  padding-left: 10px;
  border-left:5px solid #3079D5;
}
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
