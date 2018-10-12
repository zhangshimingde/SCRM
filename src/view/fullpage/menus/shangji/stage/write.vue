<template>
  <div class="gjjl fixed">
    <div class="textarea-box">
       <x-textarea v-model="content" placeholder='请填写跟进内容' :rows="8"></x-textarea>
       <p class="clearfix"></p>
       <group class="clearfix btn-group">
         <popup-radio class="left btn-sy" :options="options" v-model="way" placeholder="placeholder"></popup-radio>

          <!-- <datetime  v-model="date" class="right btn-sy" format="YYYY-MM-DD HH:mm" :default-selected-value="defaultDate" title="实际跟进时间"></datetime> -->
       </group>
    </div>

    <group class="people-wrap">
      <cell-box is-link >
        <div class="form-item clearfix wmax" style="padding-right:1rem" @click="chosepeople=true">
          <span class="left banner">联系人</span>
          <span class="right content">{{people}}</span>
        </div>
      </cell-box>
    </group>


    <!-- 选择联系人 -->
      <div v-transfer-dom>
        <popup v-model="chosepeople" :popup-style="{background:'white'}" position="right" width="80%">
          <checkpeople @choseFinish="choseSinglePeopleFinish"></checkpeople>
        </popup>
      </div>


    <div class="absolute btn-wrap clearfix">
        <div class="cancel left" @click="quxiao">取消</div>
        <div class="confirm left" @click="go">保存</div>
    </div>
  </div>
    
</template>

<script>
import {CellBox,Group ,TransferDom,InlineLoading,XTextarea,PopupRadio ,Popup,Datetime   } from 'vux'
import checkpeople from '../../../../../components/common/checkpeoplekh';
export default {
  name: '',
  components:{
    CellBox,Group ,InlineLoading,XTextarea ,PopupRadio ,Popup,checkpeople,Datetime 
  },
  directives: {
    TransferDom
  },
  created(){
    // 自定义返回事件
     window.history.pushState(null, null, ""); 
     window.addEventListener("popstate", ()=> { 
        this.closed();
      }, false); 
  },
  props:[],
  data () {
    return {
      chosepeople:false,
      defaultDate:"2017-09-22 22:00:00",
      date:"",
      people:"",
      content:"",
      way:"拜访",
      options:[
        {
          key:"拜访",
          value:"拜访"
        },
        {
          key:"来电",
          value:"来电"
        },
        {
          key:"来访",
          value:"来访"
        },
        {
          key:"邮寄",
          value:"邮寄"
        },
        {
          key:"email",
          value:"email"
        },
        {
          key:"微信",
          value:"微信"
        }
      ]
    }
  },
  methods:{
    quxiao(){
      this.$router.go(-1)
    },
    closed(){
      this.$emit("opRecord",false,{})
    },
    
    go(){
        
      if(this.content&&this.way&&this.people){
        // ajax
        var params={
          content:this.content,
          way:this.way,
          people:this.people
        }

        this.$router.go(-1);
        this.$emit("opRecord",true,params);
        // end
      }else{
        this.$vux.alert.show({
          title: '友情提示',
          content: '必填项请填写完整!',
        })
      }
    },
    choseSinglePeopleFinish(params){  //单选人完毕(主责人和上级确认人)
      console.log(params);
      this.people=params.name;
      this.chosepeople=false;
    }
  },
  watch:{
  }
}
</script>

<style lang="less">
.gjjl{
  width: 100%;
  height:100%;
  top:0;
  left:0;
  background-color: #f6f6f6;
  z-index: 2;
  .textarea-box{
    background-color: white;
    textarea{
      font-family: '微软雅黑'
    }
  }
  .btn-group{
    padding: 0 10px;
  }
  .btn-sy{
    font-size: 0.9rem;
    color: #3079D5;
    border:1px solid #3079D5;
    border-radius: 20px;
    margin:10px 0px;
    padding: 5px 15px !important;
    .weui-cell__ft{
      
      .vux-cell-value{
        color: #3079D5;
      }
      padding: 0;
      &:after{
        display: none;

      }
    }
  }
  .form-item{
    padding-right: 0.5rem;
    width: 100%;
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

</style>
