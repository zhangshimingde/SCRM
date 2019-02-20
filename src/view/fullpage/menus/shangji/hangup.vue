<template>
    <div class="stage-off-wrap fixed clearfix">
      <group>
        <cell-box>
          <div class="form-item clearfix wmax">
            <calendar title="预计重启日期" class="datecalendar" disable-past :start-date="startDate"  placeholder="必填" v-model="date"></calendar>
          </div>
        </cell-box>
        <cell-box>
          <div class="form-item clearfix wmax">
            <x-textarea title="挂起原因" v-model="reason" placeholder="必填"  text-align="right"></x-textarea>
          </div>
        </cell-box>
        <cell-box is-link  v-show="isShenhe">
          <div class="form-item clearfix wmax" @click="chosepeople=true">
            <span class="left banner">上级确认人</span>
            <span class="right content" style="padding-right:0.5rem">{{qrr.name}}</span>
          </div>
        </cell-box>


      </group>

      <div class="absolute btn-wrap clearfix">
        <!-- <div class="cancel left" @click="closed">取消</div> -->
        <div class="confirm " style="width:100%" @click="go">{{hangupTitle=='发起挂起审批'?'挂起':'挂起延期'}}</div>
      </div>


      <!-- 选择上级确认人 -->
      <div v-transfer-dom>
        <popup v-model="chosepeople" :popup-style="{background:'white'}" position="right" width="80%">
          <checkpeople @choseFinish="choseSinglePeopleFinish"></checkpeople>
        </popup>
      </div>
    </div>
</template>

<script>
import {CellBox,TransferDom,Group ,InlineLoading,PopupRadio,Popup,XTextarea ,Calendar  } from 'vux'
import checkpeople from '@/components/common/checkpeople';
import moment from 'moment'
export default {
  name: '',
  components:{
    CellBox,Group ,InlineLoading,PopupRadio ,checkpeople,Popup,XTextarea,Calendar
  },
  directives: {
    TransferDom
  },
  props:["id","hangupTitle"],
  created(){
    this.getdefaultzzr();
    // document.title="发起审批";
    // 自定义返回事件
     window.history.pushState(null, null, "");
     window.addEventListener("popstate", ()=> {
        this.closed();
      }, false);
  },
  destroyed(){
    // document.title="修改商机阶段"
  },
  data () {
    return {
      startDate:moment().add(1, 'days').format("YYYY-MM-DD"),
      chosepeople:false,
      date:"",
      reason:"",
      zzrId:"",
      qrr:{name:"",id:""},
      defaultqrr:{name:"",id:""},
      isShenhe:false,
    }
  },
  methods:{
    closed(){
      this.$emit("closedOff")
    },
    getdefaultzzr(){  //获取默认主责人
        this.$http.get("/api/EnergizeSaleUser/WeiXinUserInfo")
        .then((res)=>{
          this.zzrId=res.Data.UserGUID;
          res.Data.IsManager?this.isShenhe=false:this.isShenhe=true;
          if(!res.Data.IsManager)this.getdefaultqrr(res.Data.UserGUID);//非管理层要获取上级确认人
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
            id:res.Data.UserGUID
          };
          this.qrr=this.defaultqrr;
        })
    },
    choseSinglePeopleFinish(params){  //单选人完毕(主责人和上级确认人)
      this.chosepeople=false;

      if(params.id==this.zzrId){
        this.$vux.alert.show({
              title: '友情提示',
              content: '上级确认人不能与主责人相同!'
        })
        return;
      }
      this.qrr=params;

    },
    go(){
        if(!(this.date&&this.reason)){
          this.$vux.alert.show({
              title: '友情提示',
              content: '必填项请填写完整!'
          });
          return;
        }
        // ajax
        this.$vux.loading.show({text: '正在提交..'})
        this.$http.post("/api/EnergizaSalesOpportunities/HangUpOpportunities",{
              OppGuid:this.$route.params.id,
              HangUpReason:this.reason,
              PredictReStartTime:this.date,
              FZRGUID:this.qrr.id,
        })
        .then(res=>{
          this.$vux.loading.hide();
          if(res.Success){
            let _this=this;
              this.$vux.alert.show({
                title: '友情提示',
                content: '发起成功！',
                onHide(){
                  // _this.$router.go(-1);
                  window.location.reload();
                }
              })
          }else{
            this.$vux.alert.show({
                title: '操作失败！',
                content: res.Message
              })
          }
        })


    }
  },
  watch:{
  }
}
</script>

<style lang="less">

.stage-off-wrap{
  .form-item .vux-calendar:before {
    border-top: 0px !important;
  }
  width: 100% !important;
  height: 100%;
  top:0;
  left:0;
  background-color: #F6F6F6;
  z-index: 2;
  .form-item{
    padding-right: 0.5rem;
    .weui-cell{
      padding: 0 !important;
    }
  }
  .btn-wrap{
    background-color: white;
    width: 100%;
    @h:3rem;
    line-height: @h;
    height: @h;
    text-align: center;
    left: 0;
    bottom: 0;
    border-top: 1px solid #ccc;
    &>div{
      width: 50%;
      color: white;
      &.cancel{
        background-color: rgb(204, 204, 204)
      }
      &.confirm{
        background-color: #0992ff
      }
    }
  }
}
.wmax{
  width: 100%;
}
</style>
