<template>
  <div>
    <div class="stage-foot-wrap fixed clearfix">
      <div class="left close" @click="guanbi">非成交关闭</div>
      <div class="left prev " :class="canPrev?'active':''" @click="prev">返回上阶段</div>
      <div class="left next" :class="canNext?'active':''" @click="next" v-if="!isLast">进入下阶段</div>
      <div class="left next"  v-else>进入下阶段</div>

    </div>
    <off v-if="off" @closeSj="closeSj" @closedOff="closedOff" :hasReason="4"></off>
  </div>

</template>

<script>
import off from "./off"
export default {
  name: '',
  components:{
    off
  },
  beforeDestroy () {
        this.$cmBus.$off('refreshLastStage');
  },
  mounted(){
    this.$http.get("/api/EnergizaSalesOpportunities/OppRelationContractListHas?OppGUID="+this.$route.params.id)
    .then((res)=>{
      this.isLy=res.IsLy;
      res.Data.length>0?this.hasHt=true:this.hasHt=false;

    })


    // 合同被删之后重新获取是否关联了合同
    this.$cmBus.$on("refreshLastStage",()=>{

      this.hasHt=false;
      // this.$http.get("/api/EnergizaSalesOpportunities/OppRelationContractListHas?OppGUID="+this.$route.params.id)
      // .then((res)=>{
      //   res.Data.length>0?this.hasHt=true:this.hasHt=false;
      // })
     })
  },
  props:['canNext','canPrev','isLast','stageName','index','oppType'],
  data () {
    return {
      off:false,
      hasHt:false,
      isLy:false
    }
  },
  methods:{
    closedOff(){
      this.off=false;
    },
    closeSj(params){
      this.off=false;
      this.$emit("closeSj",params);
    },
    guanbi(){


      if(this.stageName=="成交关闭"){
        this.$vux.alert.show({
          title: '友情提示',
          content: '当前阶段不可非成交关闭！'
        });

        return;
      }

      this.off=true;
    },
    prev(){
      if(this.index==0) return; //第一阶段则不做任何操作
      // 判断是三云的商机，并且是方案竞争阶段，则不让返回上一阶段
      if((this.stageName=="方案竞争")&&(this.oppType=="a314f97a-2720-4cfe-b3d2-0d8ad7df8c34"||this.oppType=="fc40dbbe-94a7-44fd-936f-50f831eb6943"||this.oppType=="bfbd2e01-2226-42ca-8a89-e435bccadbcb")){
        this.$vux.alert.show({
          title: '友情提示',
          content: '现在是首阶段位置，不能返回！'
        });
        return ;
      }

      if(!this.canPrev) {
        this.$vux.alert.show({
          title: '友情提示',
          content: '返回上阶段，请先清空此阶段的必清项!'
        });
        return;
      }


      var _this=this;
      if(this.stageName=="成交关闭"){
          this.$vux.confirm.show({
            title: '友情提示',
            content: '返回上阶段将清空此商机所关联的合同，确定返回？',
            onConfirm () {
              _this.$emit("prev")
            }
          })
      }else{
        this.$vux.confirm.show({
          title: '友情提示',
          content: '确定要返回上阶段？',
          onConfirm () {
            _this.$emit("prev")
          }
        })
      }


    },
    next(){
      if(!this.canNext) {
        this.$vux.alert.show({
              title: '友情提示',
              content: '必填项请填写完整才可进入下阶段!'
            })
        return;
      } ;
      var _this=this;

      // alert(this.$route.params.company)
      if((this.stageName=="合同审批")&&(this.hasHt==false)&&(this.$route.params.company!="云客")&&(this.$route.params.company!="云链")&&(this.$route.params.company!="云空间")&&(!this.isLy)){
          this.$vux.confirm.show({
            title: '恭喜你签单成功!',
            content: '请关联合同信息才能成交关闭商机哦~',
            confirmText:'去关联合同',
            onConfirm () {
              // 跳转
              _this.$router.push({
                  name:"shangjicontract",
                  id:_this.$route.params.id
              })
            }
          })
      }else{
          this.$vux.confirm.show({
            title: '友情提示',
            content: '确定要进入下阶段？',

            onConfirm () {
              _this.$emit("next")
            }
          })
      }

    }
  },
  watch:{
  }
}
</script>

<style lang="less">
.stage-foot-wrap{
  width: 100%;
  @h:3rem;
  height: @h;
  line-height: @h;
  bottom: 0;
  left: 0;
  background-color: white;
  border-top: 1px solid #eaeaea;
  text-align: center;
  &>div{
    width: 33.33%;
    &.prev{
      background-color: #CCCCCC;
      color: white;
      &.active{
        background-color: #5195F8
      }
    }
    &.next{
      background-color: #B2B2B2;
      color: white;
      &.active{
        background-color: #3079D4
      }
    }
  }
}
</style>
