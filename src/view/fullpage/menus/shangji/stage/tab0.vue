<template>
    <div class="stage-tab">
      <group>
        <cell-box>
          <p class="stage-title">
            需求引导(赢率10%)
          </p>
        </cell-box>

        <cell-box v-for="(item ,inde ) in itemData.ListChrlid" :key="inde">
            <div style="width:100%" class="relative">
              <div class="masks absolute" v-if="(item.DetailContent=='明确客户基础信息'||item.DetailContent=='确认客户需求')&&currentIndex!=0" style="width:100%;height:100%;top:0;left:0;z-index:2"  @click="alt"></div>
              <div class="masks absolute" v-if="(item.DetailContent=='建立c'||item.DetailContent=='明确商机1W')&&currentIndex!=0" style="width:70%;height:100%;top:0;left:0;z-index:2"  @click="alt"></div>
<!--               {{currentIndex}} -->
              <template  v-if="item.DetailContent=='明确客户基础信息'">
                <check-icon readonly :value.sync="item.IsChecked"><span :class="item.IsChecked?'act':'nor'">{{item.DetailContent}}(必清项)</span></check-icon>
                <i class="iconfont icon-tianjia right" style="font-size:1.2rem;color:#3079D4" v-if="item.IsChecked" @click="addFllow('baseInfo')"></i>
                <template v-if="!loading1">
                  <follow v-if="recordBaseInfo.length>0" @refreshFollow="refreshFollow('baseInfo')" :list="recordBaseInfo"></follow>
                </template>
                <template v-else>
                  <p class="text_center" style="padding:40px 0">
                    <inline-loading></inline-loading>
                    <span style="color:#9d9d9d">数据加载中</span>
                  </p>
                </template>
              </template>
              <template  v-else-if="item.DetailContent=='建立c'">
                <check-icon :value.sync="item.IsChecked"><span :class="item.IsChecked?'act':'nor'">{{item.DetailContent}}</span></check-icon>
                <i class="iconfont icon-bianji right" style="font-size:1.2rem;color:#3079D4" v-if="item.IsChecked" @click="addPeople('c')"></i>
                <template v-if="!loading2">
                  <ul class="lxr-lists"  v-if="lxrC.length>0" >
                    <li class="lxr-lists-item clearfix" v-for="(list,inde2) in lxrC" :key="inde2">
                        <div class="name left">{{list.LxrName}}</div>
                        <i class="iconfont icon-shanchu right sc" @click="delePeople(list.ID,list.LxrName,'c')"></i>
                        <div class="lc right">立场：{{list.Position}} <span style="color:#ccc;margin:0 5px">|</span> 是否决策者：{{list.jcr}}</div>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <p class="text_center" style="padding:40px 0">
                    <inline-loading></inline-loading>
                    <span style="color:#9d9d9d">数据加载中</span>
                  </p>
                </template>
              </template>
              <template  v-else-if="item.DetailContent=='明确商机1W'">
                <check-icon :value.sync="item.IsChecked"><span :class="item.IsChecked?'act':'nor'">*{{item.DetailContent}}</span></check-icon>
                <i class="iconfont icon-bianji right" style="font-size:1.2rem;color:#3079D4" v-if="item.IsChecked" @click="addPeople('onew')"></i>
                <template v-if="!loading3">
                  <ul class="lxr-lists"  v-if="lxrOneW.length>0" >
                    <li class="lxr-lists-item clearfix" v-for="(list,inde2) in lxrOneW" :key="inde2">
                        <div class="name left">{{list.LxrName}}</div>
                        <i class="iconfont icon-shanchu right sc" @click="delePeople(list.ID,list.LxrName,'onew')"></i>
                        <div class="lc right">立场：{{list.Position}} <span style="color:#ccc;margin:0 5px">|</span> 是否决策者：{{list.jcr}}</div>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <p class="text_center" style="padding:40px 0">
                    <inline-loading></inline-loading>
                    <span style="color:#9d9d9d">数据加载中</span>
                  </p>
                </template>
              </template>
              <template  v-if="item.DetailContent=='确认客户需求'">
                <check-icon :value.sync="item.IsChecked"><span :class="item.IsChecked?'act':'nor'">*{{item.DetailContent}}(必清项)</span></check-icon>
                <i class="iconfont icon-tianjia right" style="font-size:1.2rem;color:#3079D4" v-if="item.IsChecked" @click="addFllow('needs')"></i>
                <template v-if="!loading4">
                  <follow v-if="recordneeds.length>0" @refreshFollow="refreshFollow('needs')" :list="recordneeds"></follow>
                </template>
                <template v-else>
                  <p class="text_center" style="padding:40px 0">
                    <inline-loading></inline-loading>
                    <span style="color:#9d9d9d">数据加载中</span>
                  </p>
                </template>
              </template>
            </div>
        </cell-box>
      </group>
      <foot @prev="prev" @next="next" @closeSj="closeSj" stageName="需求引导" :index="0" :canNext="canNext" :canPrev="canPrev"></foot>
      <write v-if="write" @opRecord="opRecord"></write>

      <!-- 选择联系人 -->
      <!-- <div v-transfer-dom> -->
        <!-- <popup v-model="checklxr" :popup-style="{background:'white'}" position="right" width="80%"> -->
          <checklxr v-if="checklxr" :roleType="lxrType" :beChosed="beChosed" @peoplesetFinish="peoplesetFinish"></checklxr>
        <!-- </popup> -->
      <!-- </div> -->
    </div>
</template>

<script>
import {TransferDom,CellBox,Group ,InlineLoading,Popup,CheckIcon   } from 'vux'
import foot from './footer'
import write from './write'
import checklxr from './checklxr'
import follow from './follow'
export default {
  name: '',
  components:{
    foot,CellBox,Group,InlineLoading,write,checklxr,Popup,CheckIcon,follow
  },
  directives: {
    TransferDom
  },
  props:['itemData','currentIndex'],
  mounted(){
    // alert(this.$route.params.id)
      // console.log(this.itemData)
      this.baseInfo=this.itemData.ListChrlid[0].IsChecked;
      this.c=this.itemData.ListChrlid[1].IsChecked;
      this.onew=this.itemData.ListChrlid[2].IsChecked;
      this.needs=this.itemData.ListChrlid[3].IsChecked;


      this.getList1();
      this.getList2();
      this.getList3();
      this.getList4();
      if(this.baseInfo&&this.c&&this.onew&&this.needs){
        this.canNext=true;
      }else{
        this.canNext=false;
      }
  },
  data () {
    return {
      loading1:false,
      loading2:false,
      loading3:false,
      loading4:false,
      peoples:[],
      checklxr:false,
      write:false,
      canNext:false,
      canPrev:false,
      writeType:'',
      lxrType:'',
      baseInfo:null,//明确客户基础信息
      c:null,//建立c
      onew:null,//建立1w
      needs:null,//确认客户需求
      recordBaseInfo:[], 
      recordneeds:[],
      lxrC:[],
      lxrOneW:[],
      beChosed:[]
    }
  },
  methods:{
     alt(){
      this.$vux.alert.show({
        title: '友情提示',
        content: '此商机不处于当前阶段，只可预览!'
      });
    },
    getList1(){
        this.loading1=true;
        this.$http.post("/api/EnergizaSalesOpportunities/GetFollowLogViewByStageDetail",{
          OpportunitiesGUID:this.itemData.ListChrlid[0].stageDetailValueID
        })
        .then((res)=>{
          this.loading1=false;
          this.recordBaseInfo=[];
          this.recordBaseInfo=res.Data;
          // console.log(res.Data)
        })
    },
    getList2(){
        // 获取建立c下的联系人
        this.loading2=true;
        this.$http.post("/api/EnergizaSalesOpportunities/GetOppStageLXR",{
          OppGUID:this.$route.params.id,
          ProjRole:"c"
        })
        .then((res)=>{
          // console.log(res);return;
          this.loading2=false;
          res.Data.map((el)=>{
              el.IsDecisionMaker?el.jcr="是":el.jcr="否";

               switch(el.Position){
                case "1":el.Position=-3;break;
                case "5":el.Position=-2;break;
                case "6":el.Position=-1;break;
                case "3":el.Position="0";break;
                case "2":el.Position=1;break;
                case "7":el.Position=2;break;
                case "8":el.Position=3;break;
              }
          })
            this.lxrC=res.Data;
        })
    },
    getList3(){
        // 获取1w的联系人
      this.loading3=true;
      this.$http.post("/api/EnergizaSalesOpportunities/GetOppStageLXR",{
          OppGUID:this.$route.params.id,
          ProjRole:"1w"
      })
      .then((res)=>{
          this.loading3=false;
          res.Data.map((el)=>{
              el.IsDecisionMaker?el.jcr="是":el.jcr="否";

              switch(el.Position){
                case "1":el.Position=-3;break;
                case "5":el.Position=-2;break;
                case "6":el.Position=-1;break;
                case "3":el.Position="0";break;
                case "2":el.Position=1;break;
                case "7":el.Position=2;break;
                case "8":el.Position=3;break;
              }
          })
          this.lxrOneW=res.Data;
      })
    },
    getList4(){
        this.loading4=true;
        this.$http.post("/api/EnergizaSalesOpportunities/GetFollowLogViewByStageDetail",{
          OpportunitiesGUID:this.itemData.ListChrlid[3].stageDetailValueID
        })
        .then((res)=>{
          this.loading4=false;
          this.recordneeds=[];
          this.recordneeds=res.Data;
          // console.log(res.Data)
        })
    },
    closeSj(params){
      this.$emit("closeSj",params);
    },
    prev(){
      this.$emit("prev")
    },
    next(){
      this.$emit("next")
    },
    refreshFollow(type){
      if(type=="baseInfo"){
        this.getList1();
      }else{
        this.getList4();
      }
    },
    opRecord(bool,params){  //填写跟进记录完成
      this.write=false;
      if(bool){
        // ajax
        var stageId;
        this.writeType=="baseInfo"?stageId=this.itemData.ListChrlid[0].stageDetailValueID:stageId=this.itemData.ListChrlid[3].stageDetailValueID;
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

                if(this.writeType=='baseInfo'){
                  this.getList1();
                }else{
                  this.getList4();
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
    peoplesetFinish(params){  //添加联系人
      this.checklxr=false;
      // console.log(params); return;
      if(params==""){  //取消选择联系人,则取消勾选
        var ids;
        if(this.lxrType=='c'&&this.lxrC.length==0){
          this.itemData.ListChrlid[1].IsChecked=false;
        }else if(this.lxrType=='onew'&&this.lxrOneW.length==0){
          this.itemData.ListChrlid[2].IsChecked=false;
        }
        return;
      }


      

      
      // this.$http.post("/api/EnergizaSalesOpportunities/AddOppStageLXR",{
      //   listData:objArr,
      //   OppGUID:this.$route.params.id
      // }).then((res)=>{
      //   this.$router.go(-1);  //选择了联系人之后，点了确定就删除一个history.state
      //   if(this.lxrType=='c'){
      //     this.getList2();
      //     this.changeCheck(this.itemData.ListChrlid[1].stageDetailID,true);
      //   }else{
      //     this.getList3();
      //     this.changeCheck(this.itemData.ListChrlid[2].stageDetailID,true)
      //   }
      // })

       var peopleList=[],role="";
       this.lxrType=='c'?role="c":role="1w";
        params.map((el)=>{
          peopleList.push({
            SortGUID:el.id,
            OpportunitiesGUID:this.$route.params.id,
            ProjRole:role,
            Position:el.lic,
            IsDecisionMaker:el.jcr
          });
        })

        this.$http.post("/api/EnergizaSalesOpportunities/AddOpportunitiesLxrInfo",{
          listData:peopleList,
          OppGUID :this.$route.params.id,
          IsMobile :1,
          ProjRole :role
        })
        .then((res)=>{
           if(res.Success){
              this.$router.go(-1);  //选择了联系人之后，点了确定就删除一个history.state
              this.$cmBus.$emit('freshStageOne');  //刷新需求引导阶段
            }else{
              
              

            }
        })
      
    },
    delePeople(id,name,type){//删除联系人
      if(type=='c'){
        if(this.lxrC.length<=1){
            this.$vux.alert.show({
              title: '友情提示',
              content: "至少保留一个联系人！"
            });
            return;
        }
      }else{
        if(this.lxrOneW.length<=1){
            this.$vux.alert.show({
              title: '友情提示',
              content: "至少保留一个联系人！"
            });
            return;
        }
      }

        var _this=this;
        this.$vux.confirm.show({
          title: '友情提示',
          content: '确定要删除联系人'+name+'？',
          onConfirm () {
            _this.$http.post("/api/EnergizaSalesOpportunities/DeleteOpportunitiesLxr",{
              OfGUID:id
            })
            .then((res)=>{

              if(res.Success){
                _this.$cmBus.$emit('freshStageOne');  //刷新需求引导阶段
              }else{
                _this.$vux.alert.show({
                  title: '删除失败！',
                  content: res.Message,
                });

              }

              
            })
          }
        })
    },
    addFllow(type){ //点击手动添加记录
      this.write=true;
      this.writeType=type;
    },
    addPeople(type){ //点击手动添加记录
      this.checklxr=true;
      this.lxrType=type;

      type=="c"?this.beChosed=this.lxrC:this.beChosed=this.lxrOneW;
    },
    changeCheck(id,bool,fn){ //改变勾选状态
      this.$http.post("/api/EnergizaSalesOpportunities/UpdateSmallStage",{
        IsChecked:bool,
        OppGUID:this.$route.params.id,
        oppStageDetailGUID:id
      }).then((res)=>{
        // console.log(res)
        if(fn) fn();
      })
    }
  },
  watch:{
    baseInfo(val,oldval){ 
      if(oldval===null){return;}
      // console.log(val)
      if(val){ //明确客户基础信息 跟进记录 选中
        this.write=true;
        this.writeType="baseInfo";
      }else{
        this.recordBaseInfo=[];
      }
      this.changeCheck(this.itemData.ListChrlid[0].stageDetailID,val)
    },
    c(val,oldval){ 
      if(oldval===null){return;}
      if(val){ //建立c
        this.checklxr=true;
        this.lxrType="c";
        this.beChosed=this.lxrC;
      }else{
        this.changeCheck(this.itemData.ListChrlid[1].stageDetailID,val,()=>{
          if(this.lxrC.length!=0){  //反选的时候如果，之前是有联系人的，则刷新列表；若之前是没有联系人就不动
            this.$cmBus.$emit('freshStageOne');  //刷新需求引导阶段
          }
        })
      }
      
    },
    onew(val,oldval){ 
      if(oldval===null){return;}
      if(val){ //明确商机1w 选中
        this.checklxr=true;
        this.lxrType="onew";
        this.beChosed=this.lxrOneW;
      }else{
        this.changeCheck(this.itemData.ListChrlid[2].stageDetailID,val,()=>{
          if(this.lxrOneW.length!=0){ //反选的时候如果，之前是有联系人的，则刷新列表；若之前是没有联系人就不动
            this.$cmBus.$emit('freshStageOne');  //刷新需求引导阶段
          }
        })
      }
      
    },
    needs(val,oldval){ 
      if(oldval===null){return;}
      // console.log(val)
      if(val){ //确认客户需求 跟进记录 选中
        this.write=true;
        this.writeType="needs"
      }else{
        this.recordneeds=[];
      }
      this.changeCheck(this.itemData.ListChrlid[3].stageDetailID,val)
     
    },
    itemData:{  //检测勾选的变化
      handler(val){
        this.baseInfo=val.ListChrlid[0].IsChecked;
        this.c=val.ListChrlid[1].IsChecked;
        this.onew=val.ListChrlid[2].IsChecked;
        this.needs=val.ListChrlid[3].IsChecked;

        if(this.baseInfo&&this.c&&this.onew&&this.needs){
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
