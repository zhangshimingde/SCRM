<template>
  <div class="lianxirenadd">

      <group id="ha">
        <cell-box style="margin-top:0">
          <div class="form-item clearfix" style="" >
            <p class="title">基本信息</p>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix readw" style="" >
            <x-input title="姓名" v-model="baseInfo.LxrName" placeholder="必填" @on-change="updateField('LxrName,'+baseInfo.LxrName)"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix sp readw" @click="chosekehu=true">
            <!-- <span class="left banner">公司名称</span>
            <span class="right content">{{kehu.name}}</span> -->
            <x-input title="公司名称"  v-model="kehu.name" placeholder="必填" readonly  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix readw" style="" >
            <x-input title="手机" v-model="baseInfo.phone" placeholder="必填" @on-change="updateField('Mobile1,'+baseInfo.phone)"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix readw" style="" >
            <x-input title="手机2" v-model="baseInfo.phone2" placeholder="选填" @on-change="updateField('Mobile2,'+baseInfo.phone2)"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix readw" style="" >
            <x-input title="部门" v-model="baseInfo.DepartMent" placeholder="选填" @on-change="updateField('DepartMent,'+baseInfo.DepartMent)"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix sp readw" style="" @click="business=true">
            <x-input title="所属业务线"  v-model="baseInfo.business" placeholder="必填" readonly  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix sp readw" style="" @click="jcr=true">
            <x-input title="业务线决策人"  v-model="baseInfo.jcr" placeholder="选填" readonly  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix readw" >
            <x-input title="职务" v-model="baseInfo.jobs" placeholder="必填"  @on-change="updateField('JobTitle,'+baseInfo.jobs)"  text-align="right"></x-input>
          </div>
        </cell-box>

        <cell-box>
          <div class="form-item clearfix radio readw" style="padding-right:0">
            <popup-radio title="职位级别" :options="JobLevelList" v-model="JobLevel"></popup-radio>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix radio readw" style="padding-right:0">
            <popup-radio title="性别" :options="GenderList" v-model="Gender"></popup-radio>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix radio readw" style="padding-right:0">
            <popup-radio title="立场" :options="lc" v-model="position"></popup-radio>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix readw" style="" >
            <x-input title="立场原因"  @on-change="updateField('PositionStation,'+baseInfo.reason)" v-model="baseInfo.reason" placeholder="选填"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix readw" style="" >
            <p>备注</p>
            <x-textarea v-model="baseInfo.remark" placeholder="选填"  @on-change="updateField('Remark,'+baseInfo.remark)"  text-align="right"></x-textarea>
          </div>
        </cell-box>
      </group>

      <group style="margin-top:10px" class="ha">
        <cell-box>
          <div class="form-item clearfix" style="" >
            <p class="title">个人信息</p>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix readw" style="" >
            <x-input title="微信号" v-model="baseInfo.wechat" placeholder="选填" @on-change="updateField('MicroLetter,'+baseInfo.wechat)"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix readw" style="" >
            <x-input title="QQ" v-model="baseInfo.qq" placeholder="选填" @on-change="updateField('QQ,'+baseInfo.qq)"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix reado" style="" >
            <x-input title="个人邮箱" v-model="personInfo.grmail" @on-change="updateField('GRMail,'+personInfo.grmail)" placeholder="选填"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix readw" style="" >
            <x-input title="教育程度" v-model="personInfo.edu" placeholder="选填"  @on-change="updateField('Education,'+personInfo.edu)" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix readw" style="" >
            <x-input title="婚姻状况" v-model="personInfo.marry" placeholder="选填"  @on-change="updateField('Marital,'+personInfo.marry)" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix readw" style="" >
            <x-input title="子女情况" v-model="personInfo.children" placeholder="选填"  @on-change="updateField('ChildInfo,'+personInfo.children)" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix readw" style="" >
            <x-input title="专业背景" v-model="personInfo.professional" placeholder="选填"  @on-change="updateField('Professional,'+personInfo.professional)"  text-align="right"></x-input>
          </div>
        </cell-box>
        <!-- <cell-box >
          <div class="form-item clearfix" style="" >
            <x-input title="当前职务" v-model="baseInfo.jobs" placeholder="选填"  text-align="right"></x-input>
          </div>
        </cell-box> -->
        <cell-box>
          <div class="form-item clearfix radio readw" id="bir" style="padding-right:5%" >
             <calendar title="出生日期" v-model="personInfo.birthday" placeholder="选填"  @on-change="updateField('Birthday,'+personInfo.birthday)"></calendar>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix readw" >
            <x-input title="家庭住址" v-model="personInfo.address" placeholder="选填"  @on-change="updateField('HomeAddress,'+personInfo.address)" text-align="right"></x-input>
          </div>
        </cell-box>
      </group>

      <group style="margin:10px 0 10px" class="ha">
        <cell-box >
          <div class="form-item clearfix" style="" >
            <p class="title">单位信息</p>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix readw" style="" >
            <x-input title="企业邮箱" v-model="jobInfo.qymail" placeholder="选填" @on-change="updateField('QYMail,'+jobInfo.qymail)"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix readw" style="" >
            <x-input title="传真" v-model="jobInfo.fax" placeholder="选填"  @on-change="updateField('Fax,'+jobInfo.fax)"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix readw" style="" >
            <x-input title="工作电话" v-model="jobInfo.tel" placeholder="选填"  @on-change="updateField('CompanyLine,'+jobInfo.tel)" text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix readw" style="" >
            <x-input title="办公地址" v-model="jobInfo.work" placeholder="选填"  @on-change="updateField('OfficeAddress,'+jobInfo.work)" text-align="right"></x-input>
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
              <x-input title="创建人" readonly v-model="extraInfo.createPeople" placeholder="无" :show-clear="false" text-align="right"></x-input>
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
      <popup v-model="business" :popup-style="{background:'white'}" position="right" width="80%">
        <business :prama="businesslist" @choseFinish="choseBusinesslistFinish"></business>
      </popup>
    </div>

    <div v-transfer-dom>
      <popup v-model="jcr" :popup-style="{background:'white'}" position="right" width="80%">
        <jcr :prama="jcrlist" @choseFinish="choseJcrlistFinish"></jcr>
      </popup>
    </div>

  </div>

</template>

<script>
import {TransferDom,XInput,XTextarea  ,XSwitch ,Popup ,PopupRadio,Calendar , CellBox ,Group ,InlineLoading  } from 'vux'
import business from './business'
import kehulist from '../../xiansuo/kehulist'
import jcr from './jcr'
export default {
  name: '',
  components:{
    XInput,Calendar ,XSwitch ,Popup ,PopupRadio , CellBox ,Group ,InlineLoading,XTextarea ,business,jcr,kehulist
  },
  directives: {
    TransferDom
  },
  props:['detailInfo'],
  created(){
    this.getInitData();
    this.setData();
  },
  data () {
    return {
      isFirstTime:true,
      chosekehu:false,
      business:false,
      jcr:false,
      businesslist:[],
      jcrlist:[],
      kehu:{
        name:"必填",
        id:""
      },
      lc: [{
        key: 1,
        value: -3
      }, {
        key: 5,
        value: -2
      },{
        key: 6,
        value: -1
      }, {
        key: 3,
        value: "0"
      },{
        key: 2,
        value: 1
      },{
        key: 7,
        value: 2
      },{
        key: 8,
        value: 3
      }],
      position:"",
      Gender:"",
      GenderList:[{value:'男',key:'1'},{value:'女',key:'0'},{value:'不详',key:''}],
      JobLevel:"",
      JobLevelList:[{value:'基层',key:'基层'},{value:'中级',key:'中级'},{value:'高级',key:'高级'}],
      baseInfo:{
        LxrName:"",
        phone:"",
        phone2:"",
        DepartMent:"",
        wechat:"",
        qq:"",
        business:"",
        jobs:"",
        jcr:"",
        reason:"",
        remark:""
      },
      personInfo:{
        grmail:"",
        edu:"",
        marry:"",
        children:"",
        professional:"",
        jobs:"",
        birthday:"",
        address:"",
      },
      jobInfo:{
        qymail:"",
        fax:"",
        tel:"",
        work:"",
      },
      extraInfo:{
        createPeople:"",
        createTime:""
      }

    }
  },
  methods:{
    setData(){
      // console.log(this.detailInfo.LxrEntity);
        var data=this.detailInfo.LxrEntity;
        this.kehu={
          name:data.FullName,
          id:data.KHGUID
        }
        this.Gender=data.Gender?data.Gender:'';
        this.JobLevel=data.JobLevel;
        this.baseInfo={
          LxrName:data.LxrName,
          phone:data.Mobile1,
          phone2:data.Mobile2,
          DepartMent:data.DepartMent,
          wechat:data.MicroLetter,
          qq:data.QQ,
          business:data.Business,
          jobs:data.JobTitle,
          jcr:data.BusinessDecisioner,
          reason:data.PositionStation,
          remark:data.Remark
        };


        setTimeout(()=>{
          if(!this.baseInfo.business) return;
          // console.log(this.baseInfo.business)
            this.baseInfo.business.split(',').map((el)=>{
            this.jcrlist.push({
              Name:el
            })
          });
          // console.log(this.jcrlist)
        }, 0)

        // switch(data.Position){
        //   case 1:this.position=-3;break;
        //   case 5:this.position=-2;break;
        //   case 6:this.position=-1;break;
        //   case 3:this.position="0";break;
        //   case 2:this.position=1;break;
        //   case 7:this.position=2;break;
        //   case 8:this.position=3;break;
        // }
        this.position=data.Position;
        this.personInfo={
          grmail:data.GRMail,
          edu:data.Education,
          marry:data.Marital,
          children:data.ChildInfo,
          professional:data.Professional,
          jobs:data.JobTitle,
          birthday:data.Birthday?data.Birthday.substring(0,10):"",
          address:data.HomeAddress
        };

        this.jobInfo={
          qymail:data.QYMail,
          fax:data.Fax,
          tel:data.CompanyLine,
          work:data.OfficeAddress,
        };

        this.extraInfo={
          createPeople:data.CreaterName,
          createTime:data.CreateDate?data.CreateDate.substring(0,10):""
        }

        setTimeout(()=>{
          this.isFirstTime=false;
        }, 500)

    },
    getInitData(){
    // 获取负责业务列表

      this.$http.get("/api/EnergizaSalesOpportunities/GetBussinessLine")
      .then((res)=>{
        // console.log(res)
        this.businesslist=res.Data;


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
   choseBusinesslistFinish(params){//选择负责业务
      this.business=false;
      var arr=[];
      this.jcrlist=[];
      this.baseInfo.jcr="";
      params.map((el)=>{
        arr.push(el.name);
        this.jcrlist.push({
          Name:el.name
        })
      });
      this.baseInfo.business=arr.join(",");
      this.changeInfo("Business",this.baseInfo.business);
      this.$vux.alert.show({
        title: '友情提示',
        content: '是否决策人已重置，请重新选择！'
      })
   },
   choseJcrlistFinish(params){//选择负责业务
      this.jcr=false;
      var arr=[];
      params.map((el)=>{
        arr.push(el.name)
      });
      this.baseInfo.jcr=arr.join(",");
      this.changeInfo("BusinessDecisioner",this.baseInfo.jcr);
   },
   changeInfo(field,val,fn){
      if(!val&&(field=="Mobile1"||field=="JobTitle"||field=="LxrName")) {
        this.$vux.alert.show({
          title: '友情提示',
          content: "必填信息不能为空！"
        })
        return;
      }
      // this.$http.post("/api/AjaxLXRinfoController/EditLxr",{
      //   AS_Field:field,
      //   AS_Value:val,
      //   LxrGuid:this.detailInfo.LxrEntity.SortGUID
      // })
      let params=[{FieldName:field,Value:val}];
      this.$http.post("/api/AjaxLXRinfoController/UpdateLxrInfoMult",{
        Param:params,
        SortGUID:this.detailInfo.LxrEntity.SortGUID
      })
      .then((res)=>{
          if(res.Success){
            this.$vux.toast.text('修改成功！', 'top');
            // this.$cmBus.$emit("refreshLxrList");
            if(field=='LxrName'){
              this.$cmBus.$emit("changeFieldSJ",{
                field:field,
                value:val
              })
            }else if(field=='KHGUID'){
              this.$cmBus.$emit("changeFieldSJ",{
                field:field,
                value:this.kehu.name
              })
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
    updateField(val){
      // console.log(val);
      if (this.isFirstTime) return;
      this.changeInfo(val.split(",")[0],val.split(",")[1]);
    }
  },
  watch:{
    position(val){
      if (this.isFirstTime) return;
      // console.log(val)
      this.changeInfo("Position",val);
    },
    Gender(val){
      if (this.isFirstTime) return;
      // console.log(val)
      this.changeInfo("Gender",val);
    },
    JobLevel(val){
      if (this.isFirstTime) return;
      // console.log(val)
      this.changeInfo("JobLevel",val);
    },
    kehu:{
      handler(val){
        if (this.isFirstTime) return;
        this.changeInfo("KHGUID",val.id);
      },
      deep:true
    },
  }
}
</script>

<style lang="less">
.vux-calendar:before{
  display: none;
}
#bir .vux-cell-primary{
  padding-right: 0;
  &:after{
    display: none;
  }
}
.ha{
  .weui-cells{
    margin-top: 0;
    &:before{
      display: none
    }
  }
}
#ha{
  .weui-cells{
    margin-top: 0;
    &:before{
      display: none
    }
  }
}
.lianxirenadd{
  // padding-bottom: 4rem;
  background-color: #f6f6f6;
  .vux-x-input {
      padding: 0 !important;
  }
  .form-item{
    width: 100%;
    padding-right: 5%;
    .vux-x-textarea{
      padding-left: 0;
      &:before{
        display: none;
      }
      textarea{
        font-family: '微软雅黑';
      }

    }
    &.radio{
      .weui-cell{
        padding:0 !important;
      }
    }
    &.sp{
      &:after{
        content: " ";
        display: inline-block;
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #C8C8CD;
        border-style: solid;
        -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: relative;
        top: -2px;
        position: absolute;
        top: 50%;
        margin-top: -4px;
        right: 17px;
      }
    }
    .title{
      font-weight: bold;
      border-left:5px solid #3079D5;
      padding-left: 10px;
    }
  }
}
</style>
