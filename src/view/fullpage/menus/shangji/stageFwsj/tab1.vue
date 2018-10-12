<template>
    <div class="stage-tab">
      <group>
        <cell-box>
          <p class="stage-title">
            价值呈现(赢率30%)
          </p>
        </cell-box>
        <cell-box v-for="(item ,inde ) in itemData.ListChrlid" :key="inde" v-if="inde==0||inde==2">
            <div style="width:100%">
                <check-icon :value.sync="item.IsChecked"><span :class="item.IsChecked?'act':'nor'">{{item.DetailContent}}</span></check-icon>
            </div>
        </cell-box>
        
      </group>
      <foot @prev="prev" @next="next" @closeSj="closeSj" stageName="价值呈现" :canNext="canNext" :canPrev="canPrev"></foot>
    </div>
</template>

<script>
import {CellBox,Group ,InlineLoading,Checklist,CheckIcon   } from 'vux'
import foot from './footer'
export default {
  name: '',
  components:{
    foot,CellBox,Group,InlineLoading,Checklist ,CheckIcon
  },
  mounted(){
    this.item0=this.itemData.ListChrlid[0].IsChecked;
    // this.item1=this.itemData.ListChrlid[1].IsChecked;
    this.item2=this.itemData.ListChrlid[2].IsChecked;
    // this.item3=this.itemData.ListChrlid[3].IsChecked;

    // if(this.item3&&this.item2&&(this.item1||this.item0)){
    //   this.canNext=true;
    // }else{
    //   this.canNext=false;
    // }

    if(this.item2&&this.item0){
      this.canNext=true;
    }else{
      this.canNext=false;
    }
  },
  props:['itemData'],
  data () {
    return {
      canNext:false,
      canPrev:true,
      item0:null,//向1w进行价值传递
      item1:null,//向选型小组进行价值传递
      item2:null,//确认客户需求
      item3:null
    }
  },
  methods:{
    closeSj(params){
      this.$emit("closeSj",params);
    },
    prev(){
      this.$emit("prev")
    },
    next(){
      this.$emit("next")
    },
    changeCheck(id,bool){ //改变勾选状态
      this.$http.post("/api/EnergizaSalesOpportunities/UpdateSmallStage",{
        IsChecked:bool,
        OppGUID:this.$route.params.id,
        oppStageDetailGUID:id
      }).then((res)=>{
        // console.log(res)
      })
    }
  },
  watch:{
    item0(val,oldval){ 
      if(oldval===null){return;}
      this.changeCheck(this.itemData.ListChrlid[0].stageDetailID,val)
    },
    // item1(val){
    //   this.changeCheck(this.itemData.ListChrlid[1].stageDetailID,val)
    // },
    item2(val,oldval){ 
      if(oldval===null){return;}
     this.changeCheck(this.itemData.ListChrlid[2].stageDetailID,val)
    },
    // item3(val){ 
    //   this.changeCheck(this.itemData.ListChrlid[3].stageDetailID,val)
    // },

    itemData:{  //检测勾选的变化
      handler(val){
        this.item0=this.itemData.ListChrlid[0].IsChecked;
        // this.item1=this.itemData.ListChrlid[1].IsChecked;
        this.item2=this.itemData.ListChrlid[2].IsChecked;
        // this.item3=this.itemData.ListChrlid[3].IsChecked;

        // if(this.item3&&this.item2&&(this.item1||this.item0)){
        //   this.canNext=true;
        // }else{
        //   this.canNext=false;
        // }

        if(this.item2&&this.item0){
          this.canNext=true;
        }else{
          this.canNext=false;
        }
      },
      deep:true
    },

  }
}
</script>

<style lang="less">
.stage-title{
  font-size: 0.85rem;
  color: #ccc;
}
</style>
