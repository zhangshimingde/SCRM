<template>
    <div class="stage-off-wrap fixed clearfix">
      <group>
        <cell-box is-link>
          <div class="form-item clearfix wmax" @click="chosepeople=true">
            <span class="left banner">上级确认人</span>
            <span class="right content" style="padding-right:0.5rem">{{people}}</span>
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
import {CellBox,TransferDom,Group ,InlineLoading,PopupRadio,Popup   } from 'vux'
import checkpeople from '../../../../../components/common/checkpeople';
export default {
  name: '',
  components:{
    CellBox,Group ,InlineLoading,PopupRadio ,checkpeople,Popup
  },
  directives: {
    TransferDom
  },
  created(){
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
      people:"",
      peopleId:"",
      chosepeople:false,
    }
  },
  methods:{
    closed(){
      this.$emit("closedStart","")
    },
    choseSinglePeopleFinish(params){  //单选人完毕(主责人和上级确认人)
      // console.log(params)
      this.chosepeople=false;
      this.peopleId=params.id;
      this.people=params.name;
    },
    go(){
        
      if(this.people){
        var params={
          people:this.people,
          peopleId:this.peopleId
        }
        this.$emit("closedStart",params)
      }
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
