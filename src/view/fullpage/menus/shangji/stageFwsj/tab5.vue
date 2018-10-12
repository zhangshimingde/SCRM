<template>
    <div class="stage-tab">
      <group>
        <cell-box>
          <p class="stage-title">
            成交关闭(赢率100%)
          </p>
        </cell-box>
        <cell-box v-for="(item ,inde ) in itemData.ListChrlid" :key="inde">
            <div style="width:100%">
                <check-icon :value.sync="item.IsChecked"><span :class="item.IsChecked?'act':'nor'">{{item.DetailContent}}</span></check-icon>
            </div>
        </cell-box>
          <!-- <checklist :options="options" label-position="right"  v-model="value" @on-change="change"></checklist> -->
        
      </group>
      
      <template v-if="!loading">
        <div id="ht-list" v-if="htList.length">
          <group style="" v-for="(item,index) in htList" :key="index">
            <cell-box>
                <div style="width:100%">
                    <span class="left" style="border-left:5px solid #5195F8;padding-left:0.5rem">合同基本信息</span>
                    <i class="iconfont icon-shanchu right" style="color:red" @click="del(item)"></i>
                </div>
            </cell-box>
            <cell-box>
                <div style="width:100%">
                    <x-input title="客户名称" v-model="item.CustomFullName" readonly placeholder="无" :show-clear="true" text-align="right"></x-input>
                </div>
            </cell-box>
            <cell-box>
                <div style="width:100%">
                    <x-input title="合同编号" v-model="item.ContractCode" readonly placeholder="无" :show-clear="true" text-align="right"></x-input>
                </div>
            </cell-box>
            <cell-box>
                <div style="width:100%">
                    <x-input title="签约金额" v-model="item.SignMoney" readonly placeholder="无" :show-clear="true" text-align="right"></x-input>
                </div>
            </cell-box>
            <cell-box>
                <div style="width:100%">
                    <x-input title="签约时间" v-model="item.SignDate" readonly placeholder="无" :show-clear="true" text-align="right"></x-input>
                </div>
            </cell-box>
            <cell-box>
                <div style="width:100%">
                    <x-input title="签约人" v-model="item.SignUserName" readonly placeholder="无" :show-clear="true" text-align="right"></x-input>
                </div>
            </cell-box>
          </group>
          <i class="icon-bianji iconfont fixed" id="editHt" @click="goht"></i>
        </div>
      </template>
      <template v-else>
        <div class="text_center" style="padding:40px 0;">
          <inline-loading></inline-loading>
          <span style="color:#9d9d9d">数据加载中</span>
        </div>
      </template>
      
      <foot @prev="prev" @next="next" :isLast="true" @closeSj="closeSj" stageName="成交关闭" :canNext="canNext" :canPrev="canPrev"></foot>
    </div>
</template>

<script>
import {CellBox,Group ,InlineLoading,Checklist,CheckIcon,XInput   } from 'vux'
import foot from './footer'
export default {
  name: '',
  components:{
    foot,CellBox,Group,InlineLoading,Checklist ,CheckIcon,XInput
  },
  beforeDestroy () {
        this.$cmBus.$off('refreshLastStage');
  },
  mounted(){
    console.log(this.itemData.ListChrlid[0].IsChecked)
    // this.itemData.ListChrlid[0].IsChecked=true;
    this.item0=this.itemData.ListChrlid[0].IsChecked;
    this.getHtData();
    // if(this.item0){this.canNext=true}

    this.$cmBus.$on("refreshLastStage",()=>{
       this.itemData.ListChrlid[0].IsChecked=false;
       this.item0=this.itemData.ListChrlid[0].IsChecked;
       this.getHtData();
     })
  },
  props:['itemData'],
  data () {
    return {
      canNext:false,
      canPrev:true,
      item0:null,
      loading:false,
      htList:[]
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
    getHtData(){
      this.loading=true;
      this.$http.get("/api/EnergizaSalesOpportunities/OppRelationContractListHas?OppGUID="+this.$route.params.id)
      .then((res)=>{
        console.log(res);
        this.loading=false;
        res.Data.map((el)=>{
          el.SignDate=el.SignDate?el.SignDate.substring(0,10):el.SignDate;
          el.SignMoney=Number(el.SignMoney).toFixed(2);
        })
        this.htList=res.Data;
      })
    },
    changeCheck(id,bool){ //改变勾选状态
      this.$http.post("/api/EnergizaSalesOpportunities/UpdateSmallStage",{
        IsChecked:bool,
        OppGUID:this.$route.params.id,
        oppStageDetailGUID:id
      }).then((res)=>{
        // console.log(res)
      })
    },
    del(item){
      var _this=this;
      if(this.htList.length==1){
            this.$vux.alert.show({
              title: '友情提示',
              content: '请至少保留一份关联合同!'
            })
            return;
      }
      
      this.$vux.confirm.show({
        title: '友情提示',
        content: '确认删除此合同？',

        onConfirm (){
          _this.$http.post("/api/EnergizaSalesOpportunities/OppRelationContract",{
            ContractGUIDlist:item.ContractGUID,
            OppGUID:_this.$route.params.id,
            Checked:false
          }).then((res)=>{
            _this.$vux.alert.show({
                title: '友情提示',
                content: '删除成功！'
              })
            _this.getHtData();
          })
        }
      })
    },
    goht(){
       // 跳转
              this.$router.push({
                  name:"shangjicontract",
                  id:this.$route.params.id
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

        // if(this.item0){
        //   this.canNext=true;
        // }else{
        //   this.canNext=false;
        // }
      },
      deep:true
    }
  }
}
</script>

<style lang="less">
#ht-list{
  background-color: #f8f8f8;
  padding: 1rem 0;
  .vux-x-input.weui-cell{
    padding: 0 !important;
  }
}
.stage-title{
  font-size: 0.85rem;
  color: #ccc;
}
#editHt{
  opacity: 0.7;
  background-color: #3079D5;
  color:#fff;
  border-radius: 100%;
  text-align: center;
  @w:3rem;
  height: @w;
  width: @w;
  line-height: @w;
  right: 10px;
  bottom: 100px;
}
</style>
