<template>
    <div id="sjstage"  style="padding-bottom:3rem">
      <heads :oppType="oppType" :index="currentIndex" @preview="preview" v-if="!loading"></heads>
      <div class="stage-content relative" v-if="!loading">
        <tab0 v-show="index==0" :itemData="dataList[0]" :currentIndex="currentIndex"  @prev="prev" @next="next" @closeSj="closeSj"></tab0>
        <tab1 v-show="index==1" :itemData="dataList[1]" @prev="prev" @next="next" @closeSj="closeSj"></tab1>
        <!-- <tab2 v-show="index==2" :oppType="oppType" :itemData="dataList[2]" @prev="prev" @next="next" @closeSj="closeSj"></tab2>
        <tab3 v-show="index==3" :itemData="dataList[3]" @prev="prev" @next="next" @closeSj="closeSj"></tab3> -->
        <tab4 v-show="index==2" :itemData="dataList[4]" @prev="prev" @next="next" @closeSj="closeSj"></tab4>
        <tab5 v-show="index==3" :itemData="dataList[5]" @prev="prev" @next="next" @closeSj="closeSj"></tab5>
        <div class="masks absolute" v-show="index!=currentIndex" @click="alt" v-if="index!=0"></div>
        <div class="masks-foot fixed" v-show="index!=currentIndex"  @click="alt"></div>
      </div>
      <div v-else style="padding:40px 0; text-align:center">
        <inline-loading></inline-loading>
        <span style="color:#9d9d9d">数据加载中</span>
      </div>
    </div>
</template>

<script>
import {InlineLoading  } from 'vux'
import heads from "./stageFwsj/header"
import tab0 from "./stageFwsj/tab0"
import tab1 from "./stageFwsj/tab1"
import tab2 from "./stageFwsj/tab2"
import tab3 from "./stageFwsj/tab3"
import tab4 from "./stageFwsj/tab4"
import tab5 from "./stageFwsj/tab5"
export default {
  name: '',
  components:{
    heads,tab0,tab1,tab2,tab3,tab4,tab5,InlineLoading
  },
  beforeDestroy () {
        this.$cmBus.$off('freshStageOne');
  },
  created(){
    this.getData();
    this.$cmBus.$on('freshStageOne',()=>{
      this.getData();
    });
  },
  data () {
    return {
      oppType:this.$route.params.oppType,
      loading:false,
      index:0,
      currentIndex:0,
      dataList:[{},{},{},{},{},{}],
    }
  },
  methods:{
    getData(){  //获取商机状态
      this.loading=true;
      this.$http.get("/api/EnergizaSalesOpportunities/GetOppNewStage?OppGUID="+this.$route.params.id)
      .then((res)=>{
          // console.log(res)
          this.loading=false;
          this.dataList=res.Data;

          switch(res.CurrentSate.StageGUID){
            case "ec4e9fff-85c7-4908-8dcc-8b20466ae3ce": this.index=0;break;
            case "dd4bc757-4e96-43dc-9f8a-5af15bc1e91e": this.index=1;break;
            // case "25fcd794-bc55-4080-a799-33151301e9a9": this.index=2;break;
            // case "b61c8585-7e93-4268-8322-46ff49bbec3a": this.index=3;break;
            case "01bd821c-613f-4502-9f65-a3475d7bfbc7": this.index=2;break;
            case "1a042316-2660-4581-9384-b1fc89878760": this.index=3;break;
          }


          this.currentIndex=this.index;
      })
    },
    prev(){  //返回上阶段
      if(this.index>0){
        this.index--;
        // ajax提交
        var stageId;
        switch(this.index){
            case 0: stageId="ec4e9fff-85c7-4908-8dcc-8b20466ae3ce";break;
            case 1: stageId="dd4bc757-4e96-43dc-9f8a-5af15bc1e91e";break;
            // case 2: stageId="25fcd794-bc55-4080-a799-33151301e9a9";break;
            // case 3: stageId="b61c8585-7e93-4268-8322-46ff49bbec3a";break;
            case 2: stageId="01bd821c-613f-4502-9f65-a3475d7bfbc7";break;
            case 3: stageId="1a042316-2660-4581-9384-b1fc89878760";break;
          }

        // console.log(stageId)
        if(this.index==2){  //从成交关闭返回上一阶段的时候，要清空合同
          this.changeStage(stageId,true)
        }else{
          this.changeStage(stageId)
        }
        // end
      }
      
    },
    next(){  //进入下阶段
      if(this.index<=2){
        this.index++;
        // ajax提交
         var stageId;
        switch(this.index){
            case 0: stageId="ec4e9fff-85c7-4908-8dcc-8b20466ae3ce";break;
            case 1: stageId="dd4bc757-4e96-43dc-9f8a-5af15bc1e91e";break;
            // case 2: stageId="25fcd794-bc55-4080-a799-33151301e9a9";break;
            // case 3: stageId="b61c8585-7e93-4268-8322-46ff49bbec3a";break;
            case 2: stageId="01bd821c-613f-4502-9f65-a3475d7bfbc7";break;
            case 3: stageId="1a042316-2660-4581-9384-b1fc89878760";break;
          }

        this.changeStage(stageId)
        // end
      }
    },
    changeStage(stageId,IsDelContract=false){
      this.$http.post("/api/EnergizaSalesOpportunities/EditOpportunityStage",{
         OppGUID:this.$route.params.id,
         OppStageGUID:stageId,
         IsDelContract:IsDelContract
      })
      .then((res)=>{
        // console.log(res)
        this.currentIndex=this.index;
        // this.getData();
        if(IsDelContract){
          this.$cmBus.$emit("refreshLastStage")
        }
      })
    },
    closeSj(params){  //非成交关闭发起
      // console.log(params)
        this.$http.post("/api/EnergizaSalesOpportunities/WPAddSponsorImDealClose",{
           OpportunitiesGUID:this.$route.params.id,
           FZRGUID:params.peopleId,
           Memo:params.reasonDetail,
           ReasonName:params.reason
        })
        .then((res)=>{
          // console.log(res)
          // this.$vux.loading.hide()
          if(res.Success){
              this.$vux.alert.show({
                title: '友情提示',
                content: '非成交关闭成功！'
              })

              this.$router.go(-2)
          }else{
            this.$vux.alert.show({
                title: '友情提示',
                content: res.Message
              })

          }
        })
    },
    preview(index){
      this.index=index;
    },
    alt(){
      this.$vux.alert.show({
        title: '友情提示',
        content: '此商机不处于当前阶段，只可预览!'
      });
    }
  },
  watch:{
  }
}
</script>

<style lang="less">
.stage-content{
  margin:15px 0;
  background-color: white;
  .masks{
    width: 100%;
    // background-color: rgba(0,0,0,0.5);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .masks-foot{
    // background-color: rgba(0,0,0,0.5);
    height: 3rem;
    bottom: 0;
    right:0;
    width: 66.6%
  }
}
</style>
