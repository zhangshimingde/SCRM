<template>
    <div class="stage-tab">
      <group>
        <cell-box>
          <p class="stage-title">
            商务谈判(赢率70%)
          </p>
        </cell-box>
        <cell-box v-for="(item ,inde ) in itemData.ListChrlid" :key="inde">
            <div style="width:100%">
                <check-icon :value.sync="item.IsChecked"><span :class="item.IsChecked?'act':'nor'">{{item.DetailContent}}</span></check-icon>
            </div>
        </cell-box>
          <!-- <checklist :options="options" label-position="right"  v-model="value" @on-change="change"></checklist> -->
        
      </group>
      <foot @prev="prev" @next="next" @closeSj="closeSj" stageName="商务谈判" :canNext="canNext" :canPrev="canPrev"></foot>
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
    // console.log(this.itemData)
    this.item0=this.itemData.ListChrlid[0].IsChecked;

    if(this.item0){this.canNext=true}
  },
  props:['itemData'],
  data () {
    return {
      canNext:false,
      canPrev:true,
      item0:null,
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

    itemData:{  //检测勾选的变化
      handler(val){
        this.item0=this.itemData.ListChrlid[0].IsChecked;

        if(this.item0){
          this.canNext=true;
        }else{
          this.canNext=false;
        }
      },
      deep:true
    }
  }
}
</script>

<style lang="less">
.stage-title{
  font-size: 0.85rem;
  color: #ccc;
}
</style>
