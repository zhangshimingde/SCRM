<template>
      <div id="floatBtn">
          <div class="mask" @click="show=!show" :class="show?'':'none'"></div>
          <div class="absolute float" >
            <img src="static/img/float.png"  :class="show?'rotate':''" alt="" id="float" @click="show=!show">

            <div class="absolute btn-box" :class="show?'':'none'">
                <!-- <div class="relative functionBtn" :class="show?'':'close'" @click="!openReceipt">
                  <img src="static/img/apply.png" alt="">
                  <span class="absolute name">开票申请</span>
                </div>
                <div class="relative functionBtn" :class="show?'':'close'" >
                  <img src="static/img/calc.png" alt="">
                  <span class="absolute name">报价测算</span>
                </div> -->
                <div class="relative functionBtn" v-show="list.indexOf('新联系人')>0" :class="show?'':'close'" @click="addlianxiren">
                  <img src="static/img/conact.png" alt="">
                  <span class="absolute name">新增联系人</span>
                </div>
                <div class="relative functionBtn"  v-show="list.indexOf('新客户')>0" :class="show?'':'close'" @click="goTo('kehuadd')">
                  <img src="static/img/customer.png" alt="">
                  <span class="absolute name">新增客户</span>
                </div>
                <div class="relative functionBtn"  v-show="list.indexOf('SCRM')>0" :class="show?'':'close'" @click="goTo('shangjiadd')">
                  <img src="static/img/newbusiness.png" alt="">
                  <span class="absolute name">新增商机</span>
                </div>
                <div class="relative functionBtn"  v-show="list.indexOf('线索管理')>0" :class="show?'':'close'" @click="goTo('xiansuoadd')">
                  <img src="static/img/addxiansuo.png" alt="">
                  <span class="absolute name">新增线索</span>
                </div>
            </div>

          </div>
      </div>
</template>

<script>
export default {
  name: 'floatBtn',
  components:{
  },
  props: ["list"],
  data () {
    return {
      show:false,
      arcList:[
      {
        name:"home",
        icon:"icon-xunhuan",
        title:"新增商机"
      },{
        name:"",
        icon:"icon-kaipiao",
        title:"申请开票"
      },{
        name:"",
        icon:"icon-jisuanqi",
        title:"报价测算"
      },
      {
        name:"",
        icon:"",
        title:"新增线索"
      }

      ]
    }
  },
  watch:{
    show:{
        handler:function(val,oldval){
            // console.log(val)  ;
        },
        deep:true//对象内部的属性监听，也叫深度监听
    }
  },
  methods:{
    goTo(name){
      this.$router.push({name:name})
    },
    shows(){
      this.show=true;
    },
    unshows(){
      this.show=false;
      this.$('.mint-main-button').css('-webkit-transform','rotate(0deg)')
    },
    rotate(){
      this.$('.mint-main-button').css('-webkit-transform','rotate(45deg)')
    },
    addlianxiren(){
      this.$router.push({name:"lianxirenadd",params:{scan:false}})
    }
    //开票
    // openReceipt(){
    //   this.$router.push({name:"openReceipt",params:{}})
    // }
  }
}
</script>

<style lang="less">
#floatBtn{
  position: fixed;
   bottom: 4rem;
    right: 2rem;
    width: 3.55rem;
    height: 3.55rem;
    z-index: 3;
  .btn-box{
    bottom:100%
  }
  .mask{
    position: fixed;
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.6);
    top:0;
    bottom:0;
    // z-index: 3;
  }

  .float{
    z-index: 3;
    img{
      width:3.1rem;
      vertical-align: top;
    }
    #float{
      -webkit-transition:all 0.3s ease;
      position: relative;
      z-index: 4;
      width: 3.55rem;
      &.rotate{
        -webkit-transform:rotateZ(135deg)
      }
    }
    .functionBtn{
      left: 0.31rem;
      -webkit-transition:all 0.3s ease;
      margin-bottom:1.5rem;
      &.close{
        opacity: 0;
        overflow: hidden;
        bottom: 0.2rem !important;

      }
      .name{
        right: 110%;
        color: white;
        font-size: 0.9rem;
        width:5rem;
        top:50%;
        -webkit-transform:translateY(-50%);
        text-align: right;
        margin-right: 0.8rem;
      }
    }
  }
}

</style>
