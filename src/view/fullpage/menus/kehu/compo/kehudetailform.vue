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
          <div class="form-item clearfix" :class="canEdit?'readw':'reado'" style="padding-right:0">
              <x-input title="客户简称" :readonly="!canEdit"  v-model="khName" @on-change="updateField('SortName,'+khName)" placeholder="必填" :show-clear="false" text-align="right" ></x-input>
          </div>
        </cell-box>

        <cell-box >
          <div class="form-item clearfix reado" style="padding-right:0">
              <x-input title="所属部门" readonly  v-model="DepartmentName" placeholder="--" text-align="right" ></x-input>
          </div>
        </cell-box>

        <cell-box >
          <div class="form-item clearfix reado" style="padding-right:0">
              <x-input title="最近跟进时间" readonly  v-model="LastFollowTime" placeholder="--" text-align="right" ></x-input>
          </div>
        </cell-box>

        <cell-box >
          <div class="form-item clearfix reado" style="padding-right:0">
              <x-input title="是否有工商信息" readonly  v-model="IsAIC" placeholder="--" text-align="right" ></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix reado" style="padding-right:0">
              <x-input title="企业状态" readonly  v-model="Status" placeholder="--" text-align="right" ></x-input>
          </div>
        </cell-box>

        <cell-box >
          <div class="form-item clearfix" :class="rankEdit?'readw':'reado'" style="padding-right:0">
              <x-input title="房企排名" :readonly="!rankEdit"  v-model="KH_RealEstateRanking" @on-change="updateField('KH_RealEstateRanking,'+KH_RealEstateRanking)" placeholder="选填" :show-clear="false" text-align="right" ></x-input>
          </div>
        </cell-box>

        <cell-box :is-link="canEdit" >
          <div class="form-item clearfix" :class="canEdit?'readw':'reado'" @click="openSelect('khLevel')">
            <span class="left banner">公司层级</span>
            <span class="right content">
                {{khLevel.name}}
            </span>
          </div>
        </cell-box>
        <cell-box :is-link="canEdit" v-if="khLevel.name!='集团公司'">
          <div class="form-item clearfix" :class="canEdit?'readw':'reado'" @click="chosekehu=true" >
            <span class="left banner">上级公司</span>
            <span class="right content">
                {{parentKehu.name}}
            </span>
          </div>
        </cell-box>
        <cell-box :is-link="canEdit" >
          <div class="form-item clearfix" :class="canEdit?'readw':'reado'" @click="openSelect('kehuType')">
            <span class="left banner">客户分类</span>
            <span class="right content">
                <span v-for="(item,index) in kehuType" :key="index">
                  {{item.name}}
                </span>
            </span>
          </div>
        </cell-box>
        <cell-box :is-link="canEdit" v-if="showKehuStatus">
          <div class="form-item clearfix" :class="canEdit?'readw':'reado'" @click="openSelect('kehuStatus')">
            <span class="left banner">客户存量业态</span>
            <span class="right content">
                <span v-for="(item,index) in kehuStatus" :key="index">
                  {{item.name}}
                </span>
            </span>
          </div>
        </cell-box>

        <cell-box :is-link="canEdit">
          <div class="form-item clearfix" :class="canEdit?'readw':'reado'" @click="openSelect('area')">
            <span class="left banner">所属区域</span>
            <span class="right content">
                {{area.name}}
            </span>
          </div>
        </cell-box>
        <cell-box :is-link="canEdit">
          <div class="form-item clearfix" :class="canEdit?'readw':'reado'" @click="openSelect('levelOne')">
            <span class="left banner">一级细分</span>
            <span class="right content">
                {{levelOne.name}}
            </span>
          </div>
        </cell-box>
        <cell-box :is-link="canEdit">
          <div class="form-item clearfix" :class="canEdit?'readw':'reado'" @click="openSelect('levelTwo')">
            <span class="left banner">二级细分</span>
            <span class="right content">
                {{levelTwo.name}}
            </span>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix sh" style="padding-right:0">
               <x-switch title="是否为头部客户" :disabled="!canEdit" v-model="isTou"></x-switch>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix qy reado" style="padding-right:0">
            <popup-radio title="是否为存在合作" readonly :options="operations" v-model="op" placeholder="--"></popup-radio>
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
          <div class="form-item clearfix" :class="canEdit?'readw':'reado'" @click="openSelect('province')">
            <span class="left banner">省份</span>
            <span class="right content">
                {{province.name}}
            </span>
          </div>
        </cell-box>
        <cell-box is-link>
          <div class="form-item clearfix" :class="canEdit?'readw':'reado'" @click="openSelect('city')">
            <span class="left banner">城市</span>
            <span class="right content">
                {{city.name}}
            </span>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix" :class="canEdit?'readw':'reado'">
              <x-input title="总机" :readonly="!canEdit" @on-change="updateField('Phone,'+zj)" v-model="zj" placeholder="选填" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix" :class="canEdit?'readw':'reado'">
              <x-input title="传真" :readonly="!canEdit" @on-change="updateField('Fax,'+cz)" v-model="cz" placeholder="选填" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix" :class="canEdit?'readw':'reado'">
              <x-input title="邮编" :readonly="!canEdit" @on-change="updateField('ZipCode,'+yb)" v-model="yb" placeholder="选填" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix" :class="canEdit?'readw':'reado'">
              <x-input title="地址" :readonly="!canEdit" @on-change="updateField('Address,'+address)" v-model="address" placeholder="选填" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix" :class="canEdit?'readw':'reado'">
              <x-input title="网址" :readonly="!canEdit" @on-change="updateField('WebSite,'+wz)" v-model="wz" placeholder="选填" :show-clear="false" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix sh" :class="canEdit?'readw':'reado'">
              <x-textarea title="备注" :readonly="!canEdit" @on-change="updateField('Remark,'+remark)" v-model="remark" placeholder="选填备注"></x-textarea>
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
          <danxs :prama="cmParamList" :count="multiple" :beChose="beChose"   @choseFinish="cmChoseFinish"></danxs>
        </popup>
      </div>


      <!-- 选择客户 -->
      <kehulist v-if="chosekehu" :id="$route.params.id" @choseFinish="choseKehuFinish"></kehulist>
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
  props:["detailInfo","canEdit"],
  data () {
    return {
      rankEdit:false,
      KH_RealEstateRanking:null,
      beChose:[],
      kehuType:[{
        name:"必填",
        id:""
      }],
      kehuStatus:[{
        name:"必填",
        id:""
      }],
      showKehuStatus:false,
      kehuTypeList:[],
      kehuStatusList:[],
      multiple:"",
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
      },


      DepartmentName:"",
      Status:"",
      IsAIC:"",
      LastFollowTime:""

    }
  },
  methods:{
    setData(){

      var data=this.detailInfo.entity;
      this.rankEdit=this.detailInfo.RankingEdit;
      this.KH_RealEstateRanking=data.KH_RealEstateRanking;
      // console.log(data);
      this.khName=data.SortName;
      this.khLevel={
        name:data.LevelCodeName,
        id:data.KHCompanyLevelCode
      };
      this.parentKehu={
        name:data.ParentKhName,
        id:data.ParentKHGUID
      };

      this.kehuType=data.CustomerType.split(',').map(el=>{
        return {
                  name:el,
                  id:el
                }
      });
      this.kehuStatus=data.CustomerFormats.split(',').map(el=>{
        return {
                  name:el,
                  id:el
                }
      });

      let tempkehuType=this.kehuType.map(el=>el.id);
      tempkehuType.indexOf("存量地产")>-1?this.showKehuStatus=true:this.showKehuStatus=false;
      // this.kehuType=[{
      //   name:data.CustomerType,
      //   id:data.CustomerType
      // }];
      // this.kehuStatus=[{
      //   name:data.CustomerFormats,
      //   id:data.CustomerFormats
      // }];

      this.area={
        name:data.BuName,
        id:data.BuGUID
      };
      this.levelOne={
        name:data.ZbSortItemName,
        id:data.ZbSortItemGUID
      };
      this.levelTwo={
        name:data.QySortItemName,
        id:data.QySortItemGUID
      };

      if(data.IsTopCustomer=="1"){
        this.isTou=true
      }else{
        this.isTou=false
      }

      this.op=data.IsBuy;

      this.city.name=data.CityName;
      this.city.id=data.City;
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


      this.DepartmentName=data.DepartmentName;
      this.Status=data.Status;
      this.IsAIC=data.IsAIC?'是':'否';
      this.LastFollowTime=data.LastFollowTime?data.LastFollowTime.substring(0,10):data.LastFollowTime;



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
        //   this.kehuTypeList=[{name:"开发商",id:"开发商"},{name:"供应商",id:"供应商"},{name:"内部客户",id:"内部客户"},{name:"存量地产",id:"存量地产"}];
        //   this.kehuStatusList=[{name:"公寓",id:"公寓"},{name:"商业地产",id:"商业地产"},{name:"物业",id:"物业"},{name:"写字楼",id:"写字楼"},{name:"园区",id:"园区"}
        // ,{name:"购物中心",id:"购物中心"},{name:"住宅社区",id:"住宅社区"},{name:"专业市场",id:"专业市场"},{name:"底商",id:"底商"},{name:"孵化器",id:"孵化器"},{name:"共享办公",id:"共享办公"}];

          this.kehuTypeList=res.Data.ListCustomerType.map(el=>{
            return {name:el.label,id:el.value}
          });
          this.kehuStatusList=res.Data.ListCustomerFormats.map(el=>{
            return {name:el.label,id:el.value}
          });
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
      if(!this.canEdit)return;
      this.cmParamChose=true;
      this.cmParamType=type;
      // alert(type)
      // console.log(this.levelOneList);
      this.multiple="";
      switch(type){
        case 'khLevel':this.cmParamList=this.khLevelList;break;
        case 'area':this.cmParamList=this.areaList;break;
        case 'levelOne':this.cmParamList=this.levelOneList;break;
        case 'levelTwo':this.cmParamList=this.levelTwoList;break;
        case 'province':this.cmParamList=this.provinceList;break;
        case 'city':this.cmParamList=this.cityList;break;
        case 'kehuType':this.cmParamList=this.kehuTypeList;this.multiple="multiple";break;
        case 'kehuStatus':this.cmParamList=this.kehuStatusList;this.multiple="multiple";break;
      }

      if(type=='kehuType'||type=='kehuStatus'){
        this.beChose=this[type];
      }else{
        this.beChose=[this[type]];
      }


      // console.log(this.beChose);
    },
    cmChoseFinish(params){
      this.cmParamChose=false;

      var field,val;
      switch(this.cmParamType){
        case 'kehuType':this.kehuType=params;
                      let tempkehuType=params.map(el=>el.id);
                      if(tempkehuType.indexOf("存量地产")>-1){
                        this.showKehuStatus=true;
                      }else{
                        //客户分类去掉存量地产之后，清空存量客户业态
                        this.kehuStatus=[{
                          name:"",
                          id:""
                        }];
                        this.showKehuStatus=false;
                      }
                      field="CustomerType";val=tempkehuType.join(',');break;
        case 'kehuStatus':this.kehuStatus=params;
                      let tempkehuStatus=params.map(el=>el.id);
                      field="CustomerFormats";val=tempkehuStatus.join(',');break;
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
      let tempdata=this.kehuType.map(el=>el.id);
      let tempsta=this.kehuStatus.map(el=>el.id);
      if(this.cmParamType=="kehuType"&&tempdata.indexOf("存量地产")==-1){
        this.kehuStatus=[{
                        name:"必填",
                        id:""
                      }];
        this.changeInfo("CustomerFormats","");
      }else if(this.cmParamType=="kehuType"&&tempdata.indexOf("存量地产")>-1){
        if(this.kehuStatus[0].id==""){
            this.kehuStatus=[{
              name:"商业地产",
              id:"商业地产"
            }];
        }

        let ids=this.kehuStatus.map(el=>el.id);
        this.changeInfo("CustomerFormats",ids.join(','));
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
      if(field=='KH_RealEstateRanking'){
        if(isNaN(parseInt(val))){
            this.$vux.alert.show({
              title: '友情提示',
              content: "房企排名只能是整数！"
            })
            return ;
        }else{
          val=parseInt(val);
        }

      }
      // this.$http.post("/api/EnergizaSaleKHInfoController/UpdateKhInfo",{
      //   FieldName:field,
      //   Value:val,
      //   KHGUID:this.detailInfo.entity.KHGUID
      // })
      let params=[{FieldName:field,Value:val}];
      this.$http.post("/api/EnergizaSaleKHInfoController/UpdateKhInfoMult",{
        Param:params,
        KHGUID:this.detailInfo.entity.KHGUID
      })
      .then((res)=>{
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
