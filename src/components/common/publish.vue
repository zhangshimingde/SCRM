<template>
  <div class="publish">
    <group>
      <x-textarea placeholder="请输入..." :rows="pubType=='records'?4:8" v-model="value"></x-textarea>
      <!-- <div class="right yuyin" @click="yy=true" ><i class="iconfont icon-yuyin" style="font-size:2rem;margin:5px 20px;color:#666"></i></div> -->

      <cell-box v-if="pubType=='records'">
        <div class="form-item clearfix qy" style="padding-right:0">
          <popup-radio title="跟进类型" :options="dynamicWayList" v-model="dynamicWay" placeholder="placeholder"></popup-radio>
        </div>
      </cell-box>
      <cell-box v-if="pubType=='records'" is-link>
        <div class="form-item clearfix wmax" style="padding-right:1rem" @click="chosepeople=true">
          <span class="left banner">联系人(选填)</span>
          <span class="right content">{{people.name}}</span>
        </div>
      </cell-box>
      <cell-box is-link v-if="pubType=='records'">
          <div class="form-item clearfix" @click="cashShow=true">
            <span class="left banner">关联费用(选填)</span>
            <span class="right content">{{cashAll}}元</span>
          </div>
      </cell-box>
    </group>
    <div class="clearfix pubSub fixed text_center">
      <div class="left" style="background:#ccc" @click="cancel">取消</div>
      <div class="right" @click="pubSub">发布</div>
    </div>

    <!-- <voice v-if="yy" @comfirm="comfirmVoice" @cancel="cancelVoice"></voice> -->
    <cash v-if="cashShow" :cashList="cashList" :cashDate="cashDate" @closeCash="cashShow=false" @cashFinish="cashFinish"></cash>

    <!-- 选择联系人 -->
      <div v-transfer-dom>
        <popup v-model="chosepeople" @on-show="swit=!swit" :popup-style="{background:'white'}" position="right" width="80%">
          <checkpeople :chosePoepleType="chosePoepleType" :swit="swit" :beChose="people" @choseFinish="choseSinglePeopleFinish"></checkpeople>
        </popup>
      </div>
  </div>
</template>

<script>
import {TransferDom,Group, XTextarea,XInput,Calendar,CellBox,PopupRadio ,Popup} from 'vux'
import voice from '../voice'
import cash from './cashModel'
import checkpeople from '@/components/common/checkpeoplekh';
export default {
  name: '',
  components:{
    XTextarea ,Group,voice,XInput,Calendar,CellBox,PopupRadio,cash,checkpeople,Popup
  },
  directives: {
    TransferDom
  },
  props:["openYy","pubType","chosePoepleType"],
  mounted(){
  },
  data () {
    return {
      value:"",
      cashShow:false,
      dynamicWay:"拜访",
      dynamicWayList:[{key:"拜访",value:"拜访"},{key:"来电",value:"来电"},{label:"去电",value:"去电"},{key:"来访",value:"来访"},{key:"邮寄",value:"邮寄"},{key:"email",value:"email"},{key:"微信",value:"微信"}],
      yy:false,

      cashDate:"",
      cashList:[],
      cashAll:0,
      people:{name:"",id:""},
      chosepeople:false,
      swit:false
    }
  },
  methods:{
    pubSub(){
      if(!this.value) return;
       this.$emit("pubFinish",{content:this.value,dynamicWay:this.dynamicWay,cashList:this.cashList,cashDate:this.cashDate,people:this.people})
    },
    cashFinish(params){ //发布跟进记录时填写费用
      // console.log(params)
      this.cashAll=params.total;
      this.cashList=params.tableData;
      this.cashDate=params.date;
      this.cashShow=false;
    },
    cancel(){
       this.$emit("pubCancel")
    },
    comfirmVoice(val){
      this.yy=false;
      this.value=val;
    },
    cancelVoice(val){
      this.yy=false;
    },
    choseSinglePeopleFinish(params){  //单选人完毕(主责人和上级确认人)
      this.chosepeople=false;
      if( (typeof params) === 'undefined'){  //一个人都没有选，点了确定
        this.people={name:"",id:""};
        return;
      }
      if(params=='cancel'){
        return;
      }
      this.people={name:params.name,id:params.id};


    }
  },
  watch:{
    openYy(){
      this.openYy?this.yy=true:this.yy=false;
    }
  }
}
</script>

<style lang="less">
.publish{
  .weui-cells{
    margin-top:0 !important;
    &:after{
      border: none;
    }
  }
  textarea{
    font-family: '微软雅黑'
  }
  .pubSub{
    @h:2.8rem;
    height: @h;
    line-height: @h;
    background-color: #3079D5;
    color: white;
    width: 100%;
    bottom: 0;
    left: 0;
    &>div{
      width:50%;
      height:100%;
    }
  }
}

.publish{
  background-color: #F6F6F6;
  position:fixed;
  width:100%;
  height:100%;
  background:white;
  top:0;
  left:0;
  z-index:100;
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
