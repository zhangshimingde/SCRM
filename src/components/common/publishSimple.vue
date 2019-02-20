<template>
  <div class="publish">
    <group>
      <x-textarea placeholder="请输入..." :rows="6" v-model="value"></x-textarea>
      <!-- <div class="right yuyin" @click="yy=true" ><i class="iconfont icon-yuyin" style="font-size:2rem;margin:5px 20px;color:#666"></i></div> -->
    </group>
    <div class="pubSub fixed text_center" @click="pubSub">提交</div>

    <!-- <voice v-if="yy" @comfirm="comfirmVoice" @cancel="cancelVoice"></voice> -->
  </div>
</template>

<script>
import {Group, XTextarea } from 'vux'
import voice from '../voice'
export default {
  name: '',
  components:{
    XTextarea ,Group,voice
  },
  props:["openYy"],
  mounted(){
  },
  data () {
    return {
      value:"",
      yy:false,
    }
  },
  methods:{
    pubSub(){
      if(!this.value) return;
       this.$emit("pubFinish",this.value)
    },
    comfirmVoice(val){
      this.yy=false;
      this.value=val;
    },
    cancelVoice(val){
      this.yy=false;
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
  }
}
</style>
