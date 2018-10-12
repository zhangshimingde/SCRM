<template>
    <div class="stage-off-wrap fixed clearfix">
      <group>
        <cell-box is-link  v-if="!IsManager">
          <div class="form-item clearfix wmax" @click="chosepeople=true">
            <span class="left banner">上级确认人</span>
            <span class="right content" style="padding-right:0.5rem">{{people}}</span>
          </div>
        </cell-box>
        <cell-box v-if="hasReason==4">
          <div class="form-item clearfix wmax" style="padding-right:0">
            <popup-radio title="关闭类型" :options="optionsReason" v-model="reason" placeholder="placeholder"></popup-radio>
          </div>
        </cell-box>

        <cell-box  v-if="(hasReason==4)||(hasReason==6)">
          <div class="form-item clearfix wmax" style="padding-right:0">
            <x-textarea title="填写原因" v-model="reasonDetail" placeholder="请填写原因"></x-textarea>
          </div>
        </cell-box>

        
      </group>

      <div class="absolute btn-wrap clearfix">
        <!-- <div class="cancel left" @click="closed">取消</div> -->
        <div class="confirm " style="width:100%" @click="go">确认发起</div>
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
import {CellBox,TransferDom,Group ,InlineLoading,PopupRadio,Popup,XTextarea   } from 'vux'
import checkpeople from '../../../../../components/common/checkpeople';
export default {
  name: '',
  components:{
    CellBox,Group ,InlineLoading,PopupRadio ,checkpeople,Popup,XTextarea
  },
  directives: {
    TransferDom
  },
  props:['hasReason'],
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
      reason:"丢单",
      reasonDetail:"",
      people:"",
      peopleId:"",
      chosepeople:false,
      IsManager:false,
      zzrId:"",
      defaultQrr:{
        name:"",
        id:"",
      },
      optionsReason:[
        {
          key:"丢单",
          value:"丢单"
        },
        {
          key:"延期",
          value:"延期"
        },
        {
          key:"主动放弃",
          value:"主动放弃"
        },
        {
          key:"客户主动放弃购买",
          value:"客户主动放弃购买"
        }
      ]
    }
  },
  methods:{
    closed(){
      this.$emit("closedOff")
    },
    getdefaultzzr(){  //获取默认主责人
        this.$http.get("/api/EnergizeSaleUser/WeiXinUserInfo")
        .then((res)=>{
          console.log(res);
          this.zzrId=res.Data.UserGUID;
          this.IsManager=res.Data.IsManager;
          if(!this.IsManager){
            this.getdefaultqrr(res.Data.UserGUID);
          }else{
            this.peopleId=res.Data.UserGUID;
            this.people=res.Data.UserName_Chn;
            this.defaultQrr={
              name:res.Data.UserName_Chn,
              id:res.Data.UserGUID
            }
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
          console.log(res)
          this.peopleId=res.Data.UserGUID;
          this.people=res.Data.UserName_Chn;
          this.defaultQrr={
            name:res.Data.UserName_Chn,
            id:res.Data.UserGUID
          }
        })
    },
    choseSinglePeopleFinish(params){  //单选人完毕(主责人和上级确认人)
      console.log(params)
      this.chosepeople=false;
      if(params.id==this.zzrId){
        this.$vux.alert.show({
              title: '友情提示',
              content: '上级确认人不能与主责人相同!'
        })
        return;
      }
      
      this.peopleId=params.id;
      this.people=params.name;
    },
    go(){

        if(!this.IsManager&&(!this.peopleId||(!this.reasonDetail&&(this.hasReason!=2)))){
          this.$vux.alert.show({
              title: '友情提示',
              content: '未填写主责人或发起原因!'
          });
          return ;
        }else if(this.IsManager&&(!this.reasonDetail&&(this.hasReason!=2))){
          this.$vux.alert.show({
              title: '友情提示',
              content: '未填写发起原因!'
          });
          return;
        }
   


        var params={
          reason:this.reason,
          people:this.people,
          peopleId:this.peopleId,
          reasonDetail:this.reasonDetail
        }
        this.$emit("closeSj",params)

    }
  },
  watch:{
  }
}
</script>

<style lang="less">
.stage-off-wrap{
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
