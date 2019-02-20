<template>
    <div class="stage-tab">
      <group>
        <cell-box>
          <p class="stage-title">
            方案竞争(赢率50%)
          </p>
        </cell-box>

        <cell-box v-for="(item ,inde ) in itemData.ListChrlid" :key="inde">
            <div style="width:100%">


              <template  v-if="item.DetailContent=='明确竞争对手信息'">
                <check-icon readonly :value.sync="item.IsChecked"><span :class="item.IsChecked?'act':'nor'">{{item.DetailContent}}</span></check-icon>
                <i class="iconfont icon-tianjia right" style="font-size:1.2rem;" v-if="item.IsChecked" @click="comp=true"></i>
                <template v-if="!loading0">
                  <jzds v-if="item0List.length>0" :list="item0List"></jzds>
                </template>
                <template v-else>
                  <p class="text_center" style="padding:40px 0">
                    <inline-loading></inline-loading>
                    <span style="color:#9d9d9d">数据加载中</span>
                  </p>
                </template>
              </template>
              <template  v-else-if="item.DetailContent=='制定竞争策略'">
                <check-icon :value.sync="item.IsChecked"><span :class="item.IsChecked?'act':'nor'">{{item.DetailContent}}(必清项)</span></check-icon>
                <i class="iconfont icon-tianjia right" style="font-size:1.2rem;" v-if="item.IsChecked" @click="addFllow('type1')"></i>
                <template v-if="!loading1">
                  <follow v-if="item1List.length>0" @refreshFollow="refreshFollow('item1List')" :list="item1List"></follow>
                </template>
                <template v-else>
                  <p class="text_center" style="padding:40px 0">
                    <inline-loading></inline-loading>
                    <span style="color:#9d9d9d">数据加载中</span>
                  </p>
                </template>
              </template>
              <template  v-else-if="item.DetailContent=='明确客户决策流程'">
                <check-icon :value.sync="item.IsChecked"><span :class="item.IsChecked?'act':'nor'">{{item.DetailContent}}(必清项)</span></check-icon>
                <i class="iconfont icon-tianjia right" style="font-size:1.2rem;" v-if="item.IsChecked" @click="addFllow('type2')"></i>
                <template v-if="!loading2">
                  <follow v-if="item2List.length>0" @refreshFollow="refreshFollow('item2List')" :list="item2List"></follow>
                </template>
                <template v-else>
                  <p class="text_center" style="padding:40px 0">
                    <inline-loading></inline-loading>
                    <span style="color:#9d9d9d">数据加载中</span>
                  </p>
                </template>
              </template>
              <template  v-if="item.DetailContent=='明确客户项目小组成员政治地图&需求分析'">
                <check-icon :value.sync="item.IsChecked"><span :class="item.IsChecked?'act':'nor'">{{item.DetailContent}}</span></check-icon>
              </template>
            </div>
        </cell-box>
      </group>
      <foot :oppType="oppType" @prev="prev" @next="next" @closeSj="closeSj" stageName="方案竞争" :canNext="canNext" :canPrev="canPrev"></foot>
      <write v-if="write" @opRecord="opRecord"></write>
      <comp v-if="comp" @opComp="opComp"></comp>
    </div>
</template>

<script>
import {TransferDom,CellBox,Group ,InlineLoading,Popup,CheckIcon   } from 'vux'
import foot from './footer'
import write from '../stage/write'
import comp from '../stage/comp'
import follow from '../stage/follow'
import jzds from '../stage/jzds'
export default {
  name: '',
  components:{
    foot,CellBox,Group,InlineLoading,write,Popup,CheckIcon ,follow,jzds,comp
  },
  directives: {
    TransferDom
  },
  props:['itemData','oppType'],
  mounted(){

    // alert(this.$route.params.id)
      // console.log(this.itemData)
      this.item0=this.itemData.ListChrlid[0].IsChecked;
      this.item1=this.itemData.ListChrlid[1].IsChecked;
      this.item2=this.itemData.ListChrlid[2].IsChecked;
      this.item3=this.itemData.ListChrlid[3].IsChecked;


      this.getList0();
      this.getList1();
      this.getList2();
      if(this.item1&&this.item2&&this.item3){
        this.canNext=true;
      }else{
        this.canNext=false;
      }

      if(this.item1||this.item2){
        this.canPrev=false;
      }else{
        this.canPrev=true;
      }
  },
  data () {
    return {
      loading0:false,
      loading1:false,
      loading2:false,
      write:false,
      comp:false,
      canNext:false,
      canPrev:true,
      writeType:'',
      item0:null,//明确竞争对手信息
      item1:null,//制定竞争对手策略
      item2:null,//明确客户决策流程
      item3:null,//明确客户项目小组
      item0List:[],
      item1List:[],
      item2List:[],
    }
  },
  methods:{
    getList0(){
        this.loading0=true;
        this.$http.post("/api/EnergizaSalesOpportunities/GetFollowLogViewByStageDetail",{
          OpportunitiesGUID:this.itemData.ListChrlid[0].stageDetailValueID
        })
        .then((res)=>{
          this.loading0=false;
          this.item0List=[];
          this.item0List=res.Data;
          // console.log(res.Data)
        })
    },
    getList1(){
        this.loading1=true;
        this.$http.post("/api/EnergizaSalesOpportunities/GetFollowLogViewByStageDetail",{
          OpportunitiesGUID:this.itemData.ListChrlid[1].stageDetailValueID
        })
        .then((res)=>{
          this.loading1=false;
          this.item1List=[];
          this.item1List=res.Data;
          // console.log(res.Data)
        })

    },
    getList2(){
        this.loading2=true;
        this.$http.post("/api/EnergizaSalesOpportunities/GetFollowLogViewByStageDetail",{
          OpportunitiesGUID:this.itemData.ListChrlid[2].stageDetailValueID
        })
        .then((res)=>{
          this.loading2=false;
          this.item2List=[];
          this.item2List=res.Data;
          // console.log(res.Data)
        })
    },
    closeSj(params){
      this.$emit("closeSj",params);
    },
    prev(){
      this.$emit("prev");
    },
    next(){
      this.$emit("next")
    },
    refreshFollow(type){
      if(type=="item1List"){
        this.getList1();
      }else if(type=="item2List"){
        this.getList2();
      }
    },
    opRecord(bool,params){  //填写跟进记录完成
      this.write=false;
      if(bool){
        // ajax
        // console.log(params);
        var stageId;
        this.writeType=="type1"?stageId=this.itemData.ListChrlid[1].stageDetailValueID:stageId=this.itemData.ListChrlid[2].stageDetailValueID;
        // console.log(stageId)
        this.$vux.loading.show({
         text: '正在提交..'
        })
        this.$http.post("/api/AjaxFollowLogController/AddFollowLogUserDefined",{
            ChangeTitle:params.content,
            sourceGUID:"6ce57741-342b-4070-a121-a02be403cc97",
            OpportunitiesGUID:this.$route.params.id,
            Type:3,
            SourceType:1,
            RecordType:params.way,
            StageDetailValueGUID:stageId,
            LxrName:params.people
          })
          .then((res)=>{
            this.$vux.loading.hide()
            if(res.Success){
                this.$vux.alert.show({
                  title: '友情提示',
                  content: "提交成功！"
                })
                // 重新获取相应的跟进记录
                if(this.writeType=='type1'){
                  this.getList1();
                }else{
                  this.getList2();
                }

            }else{
              this.$vux.alert.show({
                  title: '提交失败',
                  content: res.Message
                })
            }
          })
        // ajax
      }
    },
    opComp(bool,params){  //填写竞争对手信息
      this.comp=false;
      // this.$router.go(-1);
      if(!bool) {
        if(this.item0List.length==0){
          this.itemData.ListChrlid[0].IsChecked=false;
        }

        return ;
      }


      // console.log(params)
      this.$vux.loading.show({
       text: '正在提交..'
      })
      this.$http.post("/api/AjaxFollowLogController/AddFollowLogUserDefined",{
          ChangeTitle:params.content,
          sourceGUID:"6ce57741-342b-4070-a121-a02be403cc97",
          OpportunitiesGUID:this.$route.params.id,
          Type:3,
          SourceType:1,
          RecordType:"",
          StageDetailValueGUID:this.itemData.ListChrlid[0].stageDetailValueID,
          LxrName:params.people
        })
        .then((res)=>{
          this.$vux.loading.hide()
          if(res.Success){
              this.$vux.alert.show({
                title: '友情提示',
                content: "提交成功！"
              })
              this.$router.go(-1);
              // 重新获取相应的跟进记录
              this.changeCheck(this.itemData.ListChrlid[0].stageDetailID,true);
              this.getList0();

          }else{
            this.$vux.alert.show({
                title: '提交失败',
                content: res.Message
              })
          }
        })
    },
    addFllow(type){ //点击手动添加记录
      this.write=true;
      this.writeType=type;
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
      // console.log(val)
      if(val){ //明确客户基础信息 跟进记录 选中
        this.comp=true;
      }else{
        this.item0List=[];
        this.changeCheck(this.itemData.ListChrlid[0].stageDetailID,val);
      }
      // this.changeCheck(this.itemData.ListChrlid[0].stageDetailID,val)
    },
    item1(val,oldval){
      if(oldval===null){return;}
      // console.log(val)
      if(this.item1||this.item2){
        this.canPrev=false;
      }else{
        this.canPrev=true;
      }

      if(val){ //跟进记录 选中
        this.write=true;
        this.writeType="type1";
      }else{
        this.item1List=[];
      }
      this.changeCheck(this.itemData.ListChrlid[1].stageDetailID,val)
    },
    item2(val,oldval){
      if(oldval===null){return;}
      // console.log(val)
      if(this.item1||this.item2){
        this.canPrev=false;
      }else{
        this.canPrev=true;
      }

      if(val){ // 跟进记录 选中
        this.write=true;
        this.writeType="type2";
      }else{
        this.item2List=[];
      }
      this.changeCheck(this.itemData.ListChrlid[2].stageDetailID,val)
    },
    item3(val,oldval){
      if(oldval===null){return;}
      // console.log(val)
      this.changeCheck(this.itemData.ListChrlid[3].stageDetailID,val)
    },
    itemData:{  //检测勾选的变化
      handler(val){
        this.item0=val.ListChrlid[0].IsChecked;
        this.item1=val.ListChrlid[1].IsChecked;
        this.item2=val.ListChrlid[2].IsChecked;
        this.item3=val.ListChrlid[3].IsChecked;

        if(this.item1&&this.item2&&this.item3){
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
