<template>
  <div class="choseForm fixed">
    <group>
      <calendar title="申请日期" v-model="date " placeholder="请选择时间"  highlight-weekend></calendar>
      <x-textarea title="申请原因" v-model="reason" placeholder="请填写申请原因"></x-textarea>

      
    </group>

    <div class="absolute btn-wrap clearfix">
        <x-button type="primary" @click.native="confirm">确定</x-button>
        <x-button  @click.native="cancel">取消</x-button>

      </div>
    
  </div>
          
</template>

<script>
import {Calendar,XTextarea ,XButton,Group  } from 'vux'
export default {
  name: '',
  components:{
    Calendar,XTextarea ,XButton,Group
  },
  data(){
    return{
      date:"",
      reason:"",
    }
  },
  methods:{
    confirm(){
      if(!this.date) return ;
      this.$emit("closeMask",{date:this.date,reason:this.reason});
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
</style>
