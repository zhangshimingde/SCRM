<template>
  <div class="choseForm fixed">
    <group>
      <div @click="ch">
        <x-input title="负责人 " placeholder="请选择负责人" readonly  v-model="people.name"></x-input>
      </div>
      
      <x-textarea title="申请原因" v-model="reason" placeholder="请填写申请原因"></x-textarea>

      
    </group>

    <div class="absolute btn-wrap clearfix">
        <x-button type="primary" @click.native="confirm">确定</x-button>
        <x-button  @click.native="cancel">取消</x-button>

      </div>
    
   <!-- <popup v-model="showMask" position="right" width="80%"> -->
    <!-- fdsf -->
        <!-- <checkpeople v-if="showMask" @choseFinish="choseFinish"></checkpeople> -->
    <!-- </popup> -->

    <div v-transfer-dom>
      <popup v-model="showMask" :popup-style="{background:'white'}" position="right" width="80%">
        <checkpeople @choseFinish="choseFinish"></checkpeople>
      </popup>
    </div>
    
  </div>
          
</template>

<script>
import {TransferDom,XTextarea ,Popup ,XButton,Group,XInput  } from 'vux'
import checkpeople from "../common/checkpeople"
export default {
  name: '',
  components:{
    XTextarea ,XButton,Group,checkpeople,Popup ,XInput
  },
  directives: {
    TransferDom
  },
  data(){
    return{
      showMask:false,
      reason:"",
      people:{
        name:"",
        id:"",
      }
    }
  },
  methods:{
    ch(){
      this.showMask=true;
    },
    choseFinish(params){
      console.log(params);

      this.showMask=false;
      if(!params) return ;
      this.people={
        name:params.name,
        id:params.id
      }
    },
    confirm(){
      if(!this.people.name) return ;
      this.$emit("closeMask",{people:this.people,reason:this.reason});
    },
    cancel(){
      this.$emit("closeMask","");
    }
  }
  
}
</script>

<style lang="less">
.choseForm{
  background-color: white;
  width: 100%;
  height: 100%;
  top:0;
  left:0;
  z-index: 15;
  .btn-wrap{
    box-sizing: border-box;
    padding: 10px 15px;
    width: 100%;
    bottom:2rem;
    left: 0;
  }

}
.vux-popup-dialog.vux-popup-right{
    overflow: unset
  };
</style>
