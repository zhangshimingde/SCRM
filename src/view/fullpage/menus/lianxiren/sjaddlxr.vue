<template>
  <div class="addlxr">

      <group>
        <cell-box style="margin-top:0">
          <div class="form-item clearfix" style="" >
            <p class="title">基本信息<i class="iconfont icon-saomiao right" style="color:#3079D5" @click="scans"></i></p>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix" style="" >
            <x-input title="姓名" v-model="baseInfo.name" placeholder="必填"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix sp" style="" v-if="!disabled"  @click="chosekehu=true">
            <x-input title="公司名称" readonly v-model="baseInfo.company" placeholder="必填"  text-align="right"></x-input>
          </div>
          <div class="form-item clearfix" style="" v-else>
            <x-input title="公司名称" readonly v-model="baseInfo.company" placeholder="必填"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix" style="" >
            <x-input title="手机" v-model="baseInfo.phone" placeholder="必填" :max="11"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix radio readw" style="padding-right:0">
            <popup-radio title="性别" :options="GenderList" v-model="Gender"></popup-radio>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix sp" style="" @click="business=true">
            <x-input title="负责业务"  v-model="baseInfo.business" placeholder="点击选择(必填)" readonly  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix sp" style="" @click="jcr=true">
            <x-input title="是否决策人"  v-model="baseInfo.jcr" placeholder="点击选择(必填)" readonly  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix" >
            <x-input title="职务" v-model="baseInfo.jobs" placeholder="必填"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix radio" style="padding-right:0">
            <popup-radio title="立场：" :options="lc" v-model="baseInfo.position"></popup-radio>
          </div>
        </cell-box>




        <cell-box >
          <div class="form-item clearfix reado" style="" >
            <x-input title="立场原因" v-model="baseInfo.reason" placeholder="选填"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix reado" style="" >
            <p>备注</p>
            <x-textarea v-model="baseInfo.remark" placeholder="选填"  text-align="right"></x-textarea>
          </div>
        </cell-box>
      </group>

      <group style="margin-top:10px">
        <cell-box >
          <div class="form-item clearfix" style="" >
            <p class="title">个人信息</p>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix reado" style="" >
            <x-input title="微信号" v-model="baseInfo.wechat" placeholder="选填"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix reado" style="" >
            <x-input title="QQ" v-model="baseInfo.qq" placeholder="选填"  text-align="right"></x-input>
          </div>
        </cell-box>


        <cell-box >
          <div class="form-item clearfix reado" style="" >
            <x-input title="个人邮箱" v-model="personInfo.grmail" placeholder="选填"  text-align="right"></x-input>
          </div>
        </cell-box>



        <cell-box >
          <div class="form-item clearfix reado" style="" >
            <x-input title="教育程度" v-model="personInfo.edu" placeholder="选填"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix reado" style="" >
            <x-input title="婚姻状况" v-model="personInfo.marry" placeholder="选填"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix reado" style="" >
            <x-input title="子女情况" v-model="personInfo.children" placeholder="选填"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix reado" style="" >
            <x-input title="专业背景" v-model="personInfo.professional" placeholder="选填"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix reado" style="" >
            <x-input title="当前职务" v-model="personInfo.jobs" placeholder="选填"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix radio reado" style="padding-right:0" >
             <calendar title="出生日期" v-model="personInfo.birthday" placeholder="选填"></calendar>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix reado" >
            <x-input title="家庭住址" v-model="personInfo.address" placeholder="选填"  text-align="right"></x-input>
          </div>
        </cell-box>
      </group>

      <group style="margin-top:10px">
        <cell-box style="margin-top:0px">
          <div class="form-item clearfix" style="" >
            <p class="title">单位信息</p>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix reado" style="" >
            <x-input title="企业邮箱" v-model="jobInfo.qymail" placeholder="选填"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix reado" style="" >
            <x-input title="传真" v-model="jobInfo.fax" placeholder="选填"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix reado" style="" >
            <x-input title="工作电话" v-model="jobInfo.tel" placeholder="选填"  text-align="right"></x-input>
          </div>
        </cell-box>
        <cell-box >
          <div class="form-item clearfix reado" style="" >
            <x-input title="办公地址" v-model="jobInfo.work" placeholder="选填"  text-align="right"></x-input>
          </div>
        </cell-box>
      </group>
      <div class="text_center" style="color:white;border-radius:5px;width:80%;margin:1rem auto;background-color:#3079D5;padding:10px 0" @click="confirms">提交</div>

    <img :src="img" alt="">
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


    <!-- 选择客户 -->
      <kehulist v-if="chosekehu" @choseFinish="choseKehuFinish"></kehulist>
  </div>

</template>

<script>
import {TransferDom,XInput,XTextarea  ,XSwitch ,Popup ,PopupRadio,Calendar , CellBox ,Group ,InlineLoading  } from 'vux'
import business from './components/business'
import kehulist from '../shangji/kehulist'
import jcr from './components/jcr'
export default {
  name: '',
  components:{
    XInput,Calendar ,XSwitch ,Popup ,PopupRadio , CellBox ,Group ,InlineLoading,XTextarea ,business,kehulist,jcr
  },
  directives: {
    TransferDom
  },
  created(){
    // alert(this.$route.params.roleType)
    this.getInitData();

    document.title="添加联系人";
    var _this=this;
    if(this.$route.params.scan){
      this.$wx.ready(()=>{
          this.$wx.chooseImage({
              count: 1, // 默认9
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              success:(res)=> {
                     var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

                      this.$wx.uploadImage({
                          localId:localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                          isShowProgressTips: 1,// 默认为1，显示进度提示
                          success:  (res)=> {
                              // var serverId = res.serverId; // 返回图片的服务器端ID
                              // alert(res.serverId)
                              this.getScanData(res.serverId)
                          }
                      });
              }
          });
      });

    }

  },
  destroyed(){
    document.title="选择联系人"
  },
  data () {
    return {
      img:"",
      disabled:false,
      business:false,
      chosekehu:false,
      jcr:false,
      businesslist:[],
      jcrlist:[],
      guid:this.$route.params.id,
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
      Gender:"1",
      GenderList:[{value:'男',key:'1'},{value:'女',key:'0'},{value:'不详',key:''}],
      baseInfo:{
        name:"",
        company:"",
        KHGUID:"",
        phone:"",
        wechat:"",
        qq:"",
        business:"",
        jcr:"",
        jobs:"",
        position:3,
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
      }

    }
  },
  methods:{
    scans(){
      this.$wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success:(res)=> {
                 var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

                  this.$wx.uploadImage({
                      localId:localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                      isShowProgressTips: 1,// 默认为1，显示进度提示
                      success:  (res)=> {
                          // var serverId = res.serverId; // 返回图片的服务器端ID
                          // alert(res.serverId)
                          this.getScanData(res.serverId)
                      }
                  });
          }
      });
    },
   getInitData(){
    // 获取负责业务列表
      this.$http.get("/api/EnergizaSalesOpportunities/GetBussinessLine")
      .then((res)=>{
        this.businesslist=res.Data;
      })
    // 获取客户信息
        this.$vux.loading.show({
             text: '加载中..'
          })
      this.$http.get("/api/EnergizaSaleKHInfoController/GetHKInfoByOpp?oppGuid="+this.guid)
      .then((res)=>{
          console.log(res)
          this.$vux.loading.hide();
          if(res.Success){
            this.disabled=true;
              this.baseInfo.company=res.Data.FullName;
              this.baseInfo.KHGUID=res.Data.KHGUID;
          }else{
            this.$vux.alert.show({
                title: '客户信息记载失败！',
                content: res.Message
              })
          }

      })

   },
   cancel(){
      this.$emit("cancel")
   },
   confirms(){
      if(this.baseInfo.name&&this.baseInfo.KHGUID&&this.baseInfo.company&&this.baseInfo.phone&&this.baseInfo.business&&this.baseInfo.jcr&&this.baseInfo.jobs&&this.baseInfo.position){
          this.$vux.loading.show({
             text: '正在提交..'
          })

          var lic;
          // if(this.baseInfo.position=="0") {
          //   lic=0;
          // }else{
            lic=this.baseInfo.position;
          // }
          var role="";
          if(this.$route.params.roleType=='onew'){
            role="1w"
          }else if(this.$route.params.roleType=='c'){
            role="c"
          }
          this.$http.post("/api/AjaxLXRinfoController/AddSjLxrByOpp",{
             LxrName:this.baseInfo.name,
             Mobile1:this.baseInfo.phone,
             Mobile2:"",
             FullName:this.baseInfo.company,
             KHGUID:this.baseInfo.KHGUID,
             // DepartMent:"",
             JobTitle:this.baseInfo.jobs,
             Business:this.baseInfo.business,
             Gender:this.Gender,
             Position:lic,
             QQ:this.baseInfo.qq,
             PositionStation:this.baseInfo.reason,
             MicroLetter:this.baseInfo.wechat,
             // CompanyLine:"",
             Remark:this.baseInfo.remark,
             opt_guid:this.guid,
             Education:this.personInfo.edu,
             Marital:this.personInfo.marry,
             Professional:this.personInfo.professional,
             Birthday:this.personInfo.birthday,
             HomeAddress:this.personInfo.address,
             ChildInfo:this.personInfo.children,

             GRMail:this.personInfo.grmail,
             QYMail:this.jobInfo.qymail,
             Fax:this.jobInfo.fax,
             CompanyLine:this.jobInfo.tel,
             OfficeAddress:this.jobInfo.work,
             BusinessDecisioner:this.baseInfo.jcr,
             ProjRole:role
          })
          .then((res)=>{
              this.$vux.loading.hide();
              if(res.Success){
                  this.$vux.alert.show({
                    title: '友情提示',
                    content: '添加联系人成功！'
                  })

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
        });
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

      // this.$vux.alert.show({
      //   title: '友情提示',
      //   content: '是否决策人已重置，请重新选择！'
      // })
   },
   choseJcrlistFinish(params){//选择负责业务
      this.jcr=false;
      var arr=[];
      params.map((el)=>{
        arr.push(el.name)
      });
      this.baseInfo.jcr=arr.join(",")
   },
   choseKehuFinish(params){ //选择客户完成
      this.chosekehu=false;
      if(!params) return;

      this.baseInfo.company=params.name;
      this.baseInfo.KHGUID=params.id;
    },
   getScanData(id){
      this.$vux.loading.show({
         text: '正在识别...'
      })
      this.$http.get("/api/AjaxWeixinJSSDK/AnalysisVCard?mediaId="+id)
      .then((res)=>{
        this.$vux.loading.hide();
        // alert(JSON.stringify(res))
        var data=res.Data;
          this.baseInfo={
            name:data.Name,
            company:data.CompanyName,
            KHGUID:data.KHGUID,
            phone:data.Mobile,
            jobs:data.JobTitle,
            wechat:"",
            qq:"",
            business:"",
            jobs:"",
            position:3,
            reason:"",
            remark:"",
            jcr:""
          };


          this.jobInfo={
            fax:data.WorkFax,
            qymail:data.Email,
            tel:data.WorkPhone,
            work:data.Address
          };

          if (data.RealCompanyName&&(!data.KHGUID)) {
            this.$vux.alert.show({
              title: '友情提示',
              content: '此公司名暂未收录入库！'
            })
          };
      })
    }
  },
  watch:{
  }
}
</script>

<style lang="less">
.vux-calendar:before{
  display: none;
}
.addlxr{
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
