<template>
    <div id="sjdetail">
      <div class="relative" style="background:white">
          <img src="static/img/pic_l.png" alt="" style="height:50%;left:0;bottom:0;z-index:1" class="absolute">
          <img src="static/img/pic_r.png" alt="" style="height:50%;right:0;bottom:0;z-index:1" class="absolute">
          <swiper :options="swiperOption" ref="mySwiper"  class="swipe-plungin sw">
            <swiper-slide class="black swipe-item">
              <div class="base-info-wrap text_center">


                <p class="title text-over">{{swiperInfo1.name}}</p>
                <p class="kh text_center">
                    <span class="stage" v-if="swiperInfo1.stage&&swiperInfo1.stage=='确认中'" style="background:#0fcbaf">确</span>
                    <span class="stage" v-else-if="swiperInfo1.stage&&swiperInfo1.stage=='需求引导'" style="background:#0FCBAF">需</span>
                    <span class="stage" v-else-if="swiperInfo1.stage&&swiperInfo1.stage=='待确认'" style="background:#666">待</span>
                    <span class="stage" v-else-if="swiperInfo1.stage&&swiperInfo1.stage=='草稿'" style="background:#666">稿</span>
                    <span class="stage" v-else-if="swiperInfo1.stage&&swiperInfo1.stage=='挂起'" style="background:#666">挂</span>
                    <span class="stage" v-else-if="swiperInfo1.stage&&swiperInfo1.stage.indexOf('非成交关闭')>-1" style="background:#b2b2b2">非</span>
                    <span class="stage" v-else-if="swiperInfo1.stage&&swiperInfo1.stage.indexOf('商机激活')>-1" style="background:#b2b2b2">商</span>
                    <span class="stage" v-else-if="swiperInfo1.stage&&swiperInfo1.stage=='成交关闭'" style="background:#71C671">成</span>
                    <span class="stage" v-else-if="swiperInfo1.stage&&swiperInfo1.stage=='价值呈现'" style="background:#0F8EE9">价</span>
                    <span class="stage" v-else-if="swiperInfo1.stage&&swiperInfo1.stage=='方案竞争'" style="background:#FFB415">竞</span>
                    <span class="stage" v-else-if="swiperInfo1.stage&&swiperInfo1.stage=='商务谈判'" style="background:#FD8933">谈</span>
                    <span class="stage" v-else-if="swiperInfo1.stage&&swiperInfo1.stage=='赢取承诺'" style="background:#FD8933">赢</span>
                    <span class="stage" v-else-if="swiperInfo1.stage&&swiperInfo1.stage=='合同审批'" style="background:#E75647">审</span>
                    <span  v-if="swiperInfo1.stage.indexOf('草稿')>-1||swiperInfo1.stage.indexOf('方案演示')>-1||swiperInfo1.stage.indexOf('商机激活')>-1||swiperInfo1.stage.indexOf('非成交关闭')>-1||swiperInfo1.stage.indexOf('确认中')>-1||swiperInfo1.stage.indexOf('待确认')>-1||swiperInfo1.stage.indexOf('挂起')>-1">{{swiperInfo1.stage}}</span>
                    <template v-else>
                      <router-link v-if="oppType=='dea7f44e-6a85-4221-8499-5365b085ba66'" style="color:rgb(48, 121, 213)" :to="{name:'shangjistagefwsj',params:{id:$route.params.id,company:company,oppType:oppType}}">{{swiperInfo1.stage}} ></router-link>
                      <router-link v-else style="color:rgb(48, 121, 213)" :to="{name:'shangjistage',params:{id:$route.params.id,company:company,oppType:oppType}}">{{swiperInfo1.stage}} ></router-link>
                    </template>
                </p>
                <!-- <p class="kh" v-if="swiperInfo1.stage.indexOf('商机激活')>-1||swiperInfo1.stage.indexOf('非成交关闭')>-1||swiperInfo1.stage.indexOf('确认中')>-1||swiperInfo1.stage.indexOf('待确认')>-1">
                  {{swiperInfo1.stage}}
                </p>
                <p class="kh" v-else>
                  <router-link style="color:rgb(48, 121, 213)" :to="{name:'shangjistage',parmas:{id:$route.params.id}}">{{swiperInfo1.stage}} ></router-link>
                </p> -->
                <div class="small-info">
                  <p style="padding:4px 0 10px">预计成交金额：{{swiperInfo1.money}}万元</p>
                  <p>预计成交时间：{{swiperInfo1.date | formate}}</p>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide class="black swipe-item">
              <div class="people-info-wrap">
                <div class="people-line clearfix">
                  <span class="left banner">商机主责人</span>
                  <ul class="right people-list">
                    <li  @click="choseZzr">
                      <div class="people-pic cm-bac" v-if="swiperInfo2.zzr.avater" style="background-size:cover;background-position:center" :style="{backgroundImage:'url('+swiperInfo2.zzr.avater+')'}"></div>
                      <div class="people-pic cm-bac" v-else style="background-image:url(static/img/avater.png);background-size:80%;background-repeat:no-repeat;background-position:center" ></div>
                      <p class="people-name">{{swiperInfo2.zzr.name}}</p>
                    </li>
                  </ul>
                </div>

                <div class="people-line clearfix">
                  <span class="left banner">经营团队</span>
                  <ul class="right people-list">

                    <li  @click="choseTeamer">
                      <div class="people-pic cm-bac" style="background-position:center;background-image:url(static/img/add.png);background-size:50%;background-repeat:no-repeat;border:1px solid #eaeaea"></div>
                    </li>
                    <li v-for="(item,index) in swiperInfo2.team" @click="removePeople(item,index)" :key="index">
                      <div class="people-pic cm-bac" v-if="item.avater" style="background-size:cover;background-position:center" :style="{backgroundImage:'url('+item.avater+')'}"></div>
                      <div class="people-pic cm-bac" v-else style="background-image:url(static/img/avater.png);background-size:80%;background-repeat:no-repeat;background-position:center" ></div>
                      <p class="people-name">{{item.name}}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
      </div>

      <div class="panel-wrap"  id="tab-data">
          <scroller lock-y :scrollbar-x=false>
            <div  class="clearfix" id="panel-wrap">
             <!--  <a class="panel-link">
                <i class="iconfont icon-lianxiren c-i" style="color:#FFAC3F"></i> <br>
                <span class=" c-t">联系人</span> <br>
                <span class=" c-d">{{ContactsCount}}</span>
              </a> -->
              <router-link :to="{name:'lianxiren',params:{type:'shangji',id:$route.params.id}}" class="panel-link">
                <i class="iconfont icon-lianxiren c-i" style="color:#FFAC3F"></i> <br>
                <span class=" c-t">联系人</span> <br>
                <span class=" c-d">{{ContactsCount}}</span>
              </router-link>
              <router-link :to="{name:'sjhetong',params:{type:'sjhetong',id:$route.params.id}}" class="panel-link">
                <i class="iconfont icon-hetong c-i" style="color:#0AC7AC"></i> <br>
                <span class=" c-t">合同</span> <br>
                <span class=" c-d">{{heTongCount}}</span>
              </router-link>
              <!-- <a class="panel-link">
                <i class="iconfont icon-chengguowenti c-i" style="color:#FB913F"></i> <br>
                <span class=" c-t">成果文档</span> <br>
                <span class=" c-d">{{list_file_count}}</span>
              </a> -->
              <router-link :to="{name:'competitor',params:{id:$route.params.id}}" class="panel-link">
                <i class="iconfont icon-jingzhengduishou c-i" style="color:#FEB711"></i> <br>
                <span class=" c-t">竞争对手</span> <br>
                <span class=" c-d">{{list_cmp_count}}</span>
              </router-link>

              <span class="panel-link"  @click="isHangUp=true" v-if="showHangUp">
                <i class="iconfont icon-portal-icon-guaqiyunzhuji c-i" style="color:#3079D5"></i> <br>
                <span class=" c-t">{{hangupTitle=='发起挂起审批'?'挂起':'挂起延期'}}</span> <br>
              </span>
              <span class="panel-link"  @click="restartOpp" v-if="showRestart">
                <i class="iconfont icon-cloud-restart c-i" style="color:#3079D5"></i> <br>
                <span class=" c-t">重启</span> <br>
              </span>
            </div>
          </scroller>
      </div>


      <div class="tab-box">
        <tab active-color="#3079D5" custom-bar-width="6em">
          <tab-item selected @on-item-click="handler">跟进记录</tab-item>
          <tab-item @on-item-click="handler">详细资料</tab-item>
        </tab>
        <div class="tab-content">
          <followrecord v-show="tabIndex==0" :isXsZSj="isXsZSj" :id="$route.params.id" :ProType="1"></followrecord>
          <template v-if="!loading">
            <detail v-show="tabIndex==1" @changeMoney="changeMoney" @changeDate="changeDate" :detailInfo="detailInfo"></detail>
          </template>
        </div>
      </div>


  <!-- 审批的按钮 -->
      <div class="sp-wrap clearfix fixed" v-if="sptype==2||sptype==6">
        <!-- <div class="left tab-left" @click="spCancel">取消</div> -->
        <!-- <div class="left tab-right" @click="reStart(sptype)">重新发起</div> -->

        <div class="left tab-right" style="width:100%" @click="getStart(2)"  v-if="this.sptype==2">发起确认</div>
        <!-- <div class="left tab-right" style="width:100%" @click="getStart(4)"  v-if="this.sptype==4">非成交关闭</div> -->
        <div class="left tab-right" style="width:100%" @click="getStart(6)"  v-else-if="this.sptype==6">发起激活</div>
      </div>
      <div class="sp-wrap clearfix fixed" v-if="sptype==1||sptype==3||sptype==5||sptype==9">
        <div class="left tab-left" @click="sp(2)">打回</div>
        <div class="left tab-right" @click="sp(1)">同意</div>
      </div>

      <!-- 发起 -->
      <div class="sp-wrap clearfix fixed" v-if="showConfirm&&!sptype">
        <!-- <div class="left tab-left" @click="showConfirm=false">取消</div> -->
        <div class="left tab-right" style="width:100%" @click="getStart(2)" v-if="stageId=='cb6795a3-c647-4513-bc16-52f97c3c2bc1'">发起确认</div>
        <div class="left tab-right" style="width:100%" @click="getStart(6)" v-else-if="stageId=='70d93ef6-959f-41a1-aec6-3547dbca03c4'">发起激活</div>
      </div>
      <!--  撤回商机确认审批（确认中，激活确认中，非成交关闭确认中商机`） -->
      <div class="sp-wrap clearfix fixed" v-if="showReback&&!sptype">
        <!-- <div class="left tab-left" @click="showReback=false">取消</div> -->
        <div class="left tab-right" style="width:100%" @click="RebackConfirm(1)" v-if="stageId=='0331623b-0075-4558-8e78-10b5ad482151'">撤回商机确认</div>
        <div class="left tab-right" style="width:100%" @click="RebackConfirm(5)" v-else-if="stageId=='fd22139f-93f4-46a9-b51d-d3c60a4bf860'">撤回商机激活确认</div>
        <div class="left tab-right" style="width:100%" @click="RebackConfirm(3)" v-else-if="stageId=='ffe49092-128e-4b37-8d94-e41fba1b271d'">撤回非成交关闭确认</div>
        <div class="left tab-right" style="width:100%" @click="RebackConfirm(9)" v-else-if="stageId.toUpperCase()=='F3470C21-A90A-4777-8E39-7F3CF37F3DEB'">撤回挂起确认</div>
      </div>

      <!-- 经营团队 -->
      <div v-transfer-dom >
        <popup v-model="checkpeoplemultiple" :popup-style="{background:'white'}" position="right" width="80%">
          <checkpeoplemultiple :deleteId="deleteId" :beChose="beChoseM" :flag="checkpeoplemultiple" @choseFinish="choseMultiplePeopleFinish"></checkpeoplemultiple>
        </popup>
      </div>
      <!-- 单选人 -->
      <div v-transfer-dom>
        <popup v-model="chosepeople" :popup-style="{background:'white'}" position="right" width="80%">
          <checkpeople @choseFinish="choseSinglePeopleFinish" :beChose="beChose" :flag="chosepeople"></checkpeople>
        </popup>
      </div>
      <off v-if="off" @closeSj="closeSj" @closedOff="closedOff" :hasReason="writeType"></off>

      <!-- 商机挂起 -->
      <hangup :id="$route.params.id" :hangupTitle="hangupTitle" v-if="isHangUp" @closedOff="isHangUp=false"></hangup>
    </div>
</template>

<script>
import { TransferDom,CellBox,Popup ,Group ,InlineLoading,Tab, TabItem,Scroller,Confirm   } from 'vux'
import detail from "./compo/shangjidetailform"
import followrecord from "../../../../components/common/followrecord"
import checkpeople from '../../../../components/common/checkpeople';
import checkpeoplemultiple from '../../../../components/common/checkpeoplemultiple';
import off from "./stage/off";
import hangup from "./hangup";
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: '',
  components:{
   CellBox ,Group ,InlineLoading,Popup,Tab,swiper, swiperSlide, TabItem,detail,checkpeoplemultiple,checkpeople,followrecord,Scroller,off,Confirm,hangup
  },
  created(){

    this.getOppyType();
    this.getInit();
    // this.getUserName();
    this.$cmBus.$on("changeMoney",(data)=>{
      this.swiperInfo1.money=data
    })
    this.$cmBus.$on("changeName",(data)=>{
      this.swiperInfo1.name=data
    })
  },
  directives: {
    TransferDom
  },
  filters:{
    subst(value){
      if(!value) return value;
      return value.substring(0,1);
    },
    formate(value){
      if(!value) return value;
      return value.substring(0,10)
    }
  },
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      oppType:"",
      off:false,
      beChoseM:[],
      beChose:[],
      loading:false,
      chosepeople:false,
      checkpeoplemultiple:false,
      deleteId:"",
      sptype:null,
      stageId:"",
      writeType:"",
      userName:"",
      company:"",
      isXsZSj:"",
      ContactsCount:0,
      heTongCount:0,
      list_file_count:0,
      list_cmp_count:0,
      tabIndex:0,
      showConfirm:false,
      showReback:false,
      detailInfo:{},
      swiperInfo1:{
        name:"",
        stage:"",
        money:"",
        date:"",
      },
      swiperInfo2:{
        zzr:{
          name:"",
          id:"",
          avater:""
        },
        team:[]
      },
      showHangUp:false,
      hangupTitle:"",
      isHangUp:false,
      showRestart:false,

    }
  },
  computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
  methods:{
    choseZzr(){
      this.chosepeople=true;
      this.beChose=[this.swiperInfo2.zzr.id];
    },
    choseTeamer(){
      this.checkpeoplemultiple=true;
      this.beChoseM=this.swiperInfo2.team.map(el=>{
        return el.id;
      });
      // console.log(this.beChoseM)
    },
    getOppyType(){  //获取商机审批类型
      this.$http.get("/api/EnergizaSalesOpportunities/GetOppSaleApproveInfo?OppGUID="+this.$route.params.id)
      .then((res)=>{
        // console.log(res)
        if(res.Data){
          this.sptype=res.Data.OperType
        }
      })
    },
    getStart(type){  //发起操作
      this.off=true;
      this.writeType=type;
    },
    closeSj(params){  //填写发起表单之后
      this.off=false;
      if(!params) return;
      switch(this.writeType){
        case 2:this.startComfirm(params.peopleId);break;
        case 4:this.startClose(params.peopleId,params.reason,params.reasonDetail);break;
        case 6:this.startRestart(params.peopleId,params.reasonDetail);break;
      }
    },
    startComfirm(people){ //发起商机确认(待确认商机)
        this.$http.get("/api/EnergizaSalesOpportunities/WPAddSponsorAffirm",{
          params:{
            OpportunitiesGUID:this.$route.params.id,
            FZRGUID:people
          }
        })
        .then((res)=>{
          if(res.Success){
              this.$vux.alert.show({
                title: '友情提示',
                content: '发起成功!',
                onHide(){
                  window.location.reload();
                }
              })
          }else{
            this.$vux.alert.show({
              title: '友情提示',
              content: res.Message
            })

          }
        })
    },
    startClose(people,reason,reasonDetail){  //发起非成交关闭
          this.$http.post("/api/EnergizaSalesOpportunities/WPAddSponsorImDealClose",{
            OpportunitiesGUID:this.$route.params.id,
            FZRGUID:people,
            Memo:reasonDetail,
            ReasonName:reason
          })
          .then((res)=>{
            if(res.Success){
              this.$vux.alert.show({
                title: '友情提示',
                content: '发起成功!',
                onHide(){
                  window.location.reload();
                }
              })
            }else{
              this.$vux.alert.show({
                title: '友情提示',
                content: res.Message
              })

            }
          })
    },
    startRestart(people,reasonDetail){  //发起商机激活
        this.$http.post("/api/EnergizaSalesOpportunities/WPReactivationByOppState",{
          OpportunitiesGUID:this.$route.params.id,
          FZRGUID:people,
          ReactionReason:reasonDetail
        })
        .then((res)=>{
          if(res.Success){
            this.$vux.alert.show({
              title: '友情提示',
              content: '发起成功!',
              onHide(){
                window.location.reload();
              }
            })
          }else{
            this.$vux.alert.show({
              title: '友情提示',
              content: res.Message
            })

          }
        })
    },
    RebackConfirm(type){  //撤回操作
      // console.log(this.$route.params.id)
      this.$http.post("/api/EnergizaSalesOpportunities/OppExamine",{
            OpportunitiesGUID:this.$route.params.id,
            ExamineType:type,
            OPType:3
      }).then((res)=>{
        this.$vux.loading.hide()
        if(res.Success){
            this.$vux.alert.show({
              title: '友情提示',
              content: '撤回成功！',
              onHide(){
                window.location.reload();
              }
            });

        }else{
          this.$vux.alert.show({
              title: '友情提示',
              content: res.Message
            })
        }
      })
    },
    restartOpp(){ //重启商机
        var _this=this;
        this.$vux.confirm.show({
          title: '友情提示',
          content: '确定要重启此商机？',
          onConfirm () {

            _this.$http.post("/api/EnergizaSalesOpportunities/OppReStart",{
              OpportunitiesGUIDs:_this.$route.params.id,
            })
            .then((res)=>{
              _this.$vux.loading.hide()
              if(res.Success){
                  _this.$vux.alert.show({
                    title: '友情提示',
                    content: '操作成功！',
                    onHide(){
                       window.location.reload();
                     }
                  });
              }else{
                  _this.$vux.alert.show({
                    title: '友情提示',
                    content: res.Message
                  })
              }
            })

          }
        })
    },
    sp(type){  //审批
      this.$http.post("/api/EnergizaSalesOpportunities/OppExamine",{
        OpportunitiesGUID:this.$route.params.id,
        ExamineType:Number(this.sptype),
        OPType:type
      }).then((res)=>{
        // console.log(res);
        if(res.Success){

          this.$vux.alert.show({
            title: '友情提示',
            content: '操作成功！',
            onHide(){
              window.location.reload();
            }
          })
        }else{
          this.$vux.alert.show({
              title: '友情提示',
              content: '操作失败！'
          })
        }

      })
    },
    getUserName(fn){
      this.$http.get("/api/EnergizeSaleUser/WeiXinUserInfo")
      .then((res)=>{
        this.userName=res.Data.UserName;
        if(fn) fn();
      })
    },
    getInit(){  //获取商机信息
      this.loading=true;
      this.$http.post("/api/EnergizaSalesOpportunities/OppDetailEdit",{
        OpportunitiesGUID:this.$route.params.id
      })
      .then((res)=>{
        this.loading=false;
        // 总数据信息
        this.oppType=res.Data.OppInfo.TypeGUID;
        // console.log(this.oppType);
        this.detailInfo=res.Data;

          this.stageId=this.detailInfo.OppInfo.StageGUID;

          this.getUserName(()=>{
            if(this.userName==this.detailInfo.OppInfo.ResponsibleCode&&(this.stageId=="cb6795a3-c647-4513-bc16-52f97c3c2bc1"||this.stageId=="70d93ef6-959f-41a1-aec6-3547dbca03c4")){//发起商机确认(待确认商机)，发起商机激活(成交关闭商机)
                this.showConfirm=true;
            }else if(this.userName==this.detailInfo.OppInfo.ResponsibleCode&&(this.stageId=="0331623b-0075-4558-8e78-10b5ad482151"||this.stageId=="fd22139f-93f4-46a9-b51d-d3c60a4bf860"||this.stageId=="ffe49092-128e-4b37-8d94-e41fba1b271d"||this.stageId=="f3470c21-a90a-4777-8e39-7f3cf37f3deb")){//撤回(确认中，激活确认中，非成交关闭确认中,挂起确认中商机)
                this.showReback=true;
            }
             // 判断是否显示挂起按钮(商机阶段为“确认中”和5个跟进中阶段的商机详情页面，增加“挂起”按钮)
            if((this.stageId=="0331623b-0075-4558-8e78-10b5ad482151"||this.stageId=="ec4e9fff-85c7-4908-8dcc-8b20466ae3ce"||this.stageId=="dd4bc757-4e96-43dc-9f8a-5af15bc1e91e"||this.stageId=="25fcd794-bc55-4080-a799-33151301e9a9"||this.stageId=="b61c8585-7e93-4268-8322-46ff49bbec3a"||this.stageId=="01bd821c-613f-4502-9f65-a3475d7bfbc7")&&this.detailInfo.HasHangUp){
              this.showHangUp=true;
              this.hangupTitle="发起挂起审批"
            }else if(this.stageId.toUpperCase()=='754D9DF3-2D01-4F41-968E-D5DB83ED4875'&&this.detailInfo.HasHangUp){ //挂起阶段，显示挂起延期(文本改一下)
              this.showHangUp=true;
              this.hangupTitle="发起挂起延期审批"
            }else{
              this.showHangUp=false;
            }

            // 判断是否显示重启按钮
            if(this.stageId.toUpperCase()=='754D9DF3-2D01-4F41-968E-D5DB83ED4875'&&this.detailInfo.HasHangUp){
              this.showRestart=true;
            }else{
              this.showRestart=false;
            }

          });

          // 四大块数字
          this.list_cmp_count=this.detailInfo.list_cmp_count;
          this.ContactsCount=this.detailInfo.ContactsCount;
          this.heTongCount=this.detailInfo.ContractCount;
          this.list_file_count=this.detailInfo.list_file_count;
          // this.list_cmp_count=this.detailInfo.list_cmp_count;
          this.isXsZSj=res.Data.OppInfo.ByOpportunityGUID;

          // document.getElementById("panel-wrap").style.width=4*70+'px';

          // 轮播第一项的信息
          this.swiperInfo1={
            name:res.Data.OppInfo.OpportunitiesName,
            stage:res.Data.OppInfo.StageName,
            money:res.Data.OppInfo.PredictTradeMoney,
            date:res.Data.OppInfo.PredictTradeTime,
          };
          this.company=res.Data.OppInfo.CompanyName;
          // 轮播第2项的信息
            // 主责人
          this.swiperInfo2.zzr={
              name:res.Data.Userinfo.UserName_Chn,
              id:res.Data.Userinfo.UserGUID,
              avater:res.Data.Userinfo.UserIcon
          }
          //经营团队
          res.Data.list_manage.map((el)=>{
            this.swiperInfo2.team.push({
              name:el.UserName,
              id:el.UserGUID,
              avater:el.UserIcon
            })
          })
      })
    },
    choseSinglePeopleFinish(params){  //单选人完毕(主责人和上级确认人)
      this.chosepeople=false;
      if(!params) return; //点了取消
      this.getUserData(params.id,(data)=>{
            this.swiperInfo2.zzr={
              name:data.UserName_Chn,
              id:data.UserGUID,
              avater:data.UserIcon
            }

            this.$cmBus.$emit("refreshSjList");
      })

      // 提交修改信息

      this.$http.post("/api/EnergizaSalesOpportunities/DisOppReponsible",{
        OpportunitiesGUID:this.$route.params.id,
        ResponsibleGUID:params.id
      })
      .then((res)=>{
        this.$vux.loading.hide()
        if(res.Success){
            this.$vux.alert.show({
              title: '友情提示',
              content: '修改主责人成功！'
            })
        }else{
          this.$vux.alert.show({
              title: '友情提示',
              content: res.Message
            })
        }
      })
      // end
    },
    choseMultiplePeopleFinish(params){ //多选人团队成员
      this.checkpeoplemultiple=false;
      if(!params) return; //点了取消
      // console.log(params)
      // this.team=[];
      params.map((el)=>{
        // 去重
        var flag=true;
        this.swiperInfo2.team.map((el2)=>{
          if(el2.id==el.id){
            flag=false;
          }
        });
        if(!flag) return;
        // end

        this.swiperInfo2.team.push({
          name:el.name,
          id:el.id,
          avater:""
        })

      })


      this.swiperInfo2.team.map((el)=>{
        this.getUserData(el.id,(data)=>{
          el.avater=data.UserIcon;
        })
      })


      // 提交修改信息
      var idList=[];
      this.swiperInfo2.team.map((el)=>{
        idList.push(el.id)
      })
      // console.log(idList)
      this.$http.post("/api/EnergizeSaleManageTeam/BuldAddManageTeamerForApp",{
        OppOrCusGUID:this.$route.params.id,
        addUsers:idList.join(","),
        sourceType:1
      })
      .then((res)=>{
        // console.log(res)
      })
      // end
    },
    removePeople(item,index){ //删除团队成员
      let _this=this
      this.$vux.confirm.show({
              title: '友情提示',
              content: '确认删除此经营团队成员？',
              onConfirm (){
                _this.swiperInfo2.team.splice(index,1);
                // _this.deleteId=item.id;

                // 提交修改信息
                // console.log(_this.swiperInfo2.team)
                var idList=[];
                _this.swiperInfo2.team.map((el)=>{
                  idList.push(el.id)
                })
                _this.$http.post("/api/EnergizeSaleManageTeam/BuldAddManageTeamerForApp",{
                  OppOrCusGUID:_this.$route.params.id,
                  addUsers:idList.join(","),
                  sourceType:1
                })
                .then((res)=>{
                  // console.log(res)
                })
                // end
              }
            })

    },
    getUserData(id,fn){
      this.$http.get("/api/EnergizeSaleUser/WeiXinUserInfoByUserGUID",{
        params:{
          userGUID:id
        }
      })
      .then((res)=>{
        // console.log(res)
        if(fn) fn(res.Data);

      })
    },
    changeMoney(val){
      this.swiperInfo1.money=val
    },
    changeDate(val){
      this.swiperInfo1.date=val
    },
    handler(val){
      this.tabIndex=val;
    },
    // spCancel(){
    //   this.$router.go(-1);
    // },

    closedOff(){
      this.off=false;
    },
    //点击跳转竞争对手页面
    competitor(){
      this.$router.push("competitor",{params:{}})
    },
  },
  watch:{
  }
}
</script>

<style lang="less">
#sjdetail{
  .sw{
    background-color: white;
    padding: 15px;
    border-bottom: 1px solid #eaeaea;
    .vux-slider > .vux-indicator > a > .vux-icon-dot.active, .vux-slider .vux-indicator-right > a > .vux-icon-dot.active{
      background-color: #3079D5
    }
    .base-info-wrap{
      .title{
        font-weight: bold;
        font-size: 1.2rem;
      }
      .kh{
        font-size: 1.2rem;
        font-weight: bold;
        color: #3079D5;
        margin:10px 0;
        .stage{
          display: inline-block;
          color: white;
          text-align: center;
          height: 1.6rem;
          width: 1.6rem;
          line-height: 1.6rem;
          margin-top: 0.1rem;
          background-color: red;
          border-radius: 3px;
          margin-right: 5px;
          font-size: 1rem;
        }
      }
      .small-info{
        font-size: 0.9rem;
        color: #b2b2b2;
      }
    }
    .people-info-wrap{
      height: 100%;
      overflow-y: auto;
  -webkit-overflow-scrolling: touch;
      .people-line{
        height: 60px;
        .banner{
          width: 25%;
          font-size: 0.9rem;
          padding-top: 1rem;
        }
        .people-list{
          width: 75%;
          li{
            width: 20%;
            padding:0 1.5%;
            float: left;
            box-sizing: border-box;
            margin-bottom: 2%;
            .people-pic{
              padding-top: 100%;
              // background-color: red;
              border-radius: 3px;
            }
            .people-name{
              font-size: 12px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              text-align: center;
            }
          }
        }
      }
    }
  }
  .panel-wrap{

    .panel-link{
      width: 20% !important;
    }
  }


}

</style>
