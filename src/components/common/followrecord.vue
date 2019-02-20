<template>
    <div>
      <template v-if="!loading">

          <div class="follow-wrap" style="padding-bottom:55px">
            <template v-if="followList.length>0">
              <div class="follow-item"  v-for="(list,index) in followList" :key="index">
                <p class="time-title">{{list.date}}</p>
                <ul class="item-content">
                  <li class="cm-padding relative " v-for="(item,index2) in list.data" :key="index2">
                    <div class="cir absolute"></div>
                    <!-- 手动录入的记录 -->
                    <template v-if="item.Type==3">
                      <div class="content-type2">
                        <p class="clearfix">
                          <span class="left time">{{item.time}} <span v-if="item.SourcePort" style="margin-left:10px">发布于[{{item.SourcePort}}]</span> </span>
                          <i class="iconfont icon-pinglun right" @click="recomment(item)" style="color:#3079D5"></i>
                          <i class="iconfont icon-shanchu right"  v-if="item.LastEditor==myCode" @click="delet('跟进记录',item)" style="color:#FF7E8E;margin-right:15px"></i>
                        </p>
                        <div class="user-info clearfix" style="margin-top:5px">
                          <div class="people-pic cm-bac left" v-if="item.UserIcon" style="background-size:cover;background-position:center" :style="{backgroundImage:'url('+item.UserIcon+')'}"></div>
                          <div class="people-pic cm-bac left" v-else style="background-image:url(static/img/avater.png);background-size:80%;background-repeat:no-repeat;background-position:center" ></div>
                          <span class="people-name left">{{item.LastEditorName}}</span>
                        </div>


                         <p class=" contents" v-html="item.RealContent"></p>
                        <!-- 附加信息 -->
                        <div class="clearfix extra-info">
                          <div class="left" v-if="item.LxrName" style="margin-right:15px;">{{item.LxrName}}</div>
                          <div class="left" v-if="item.RecordType" @click="changeRecordType(item)" style="margin-right:15px;">

                            {{item.RecordType}}
                          </div>
                          <div class="left" @click="changeCash(item)">{{item.CostAmount?item.CostAmount:0}}元</div>
                        </div>
                        <!-- 评论模块 -->
                        <ul class="comments-wrap"  v-if="item.comments.length>0">
                          <li v-for="(commentsItem,index3) in item.comments" :key="index3">
                            <div class="user-info clearfix">
                              <span class="user-name left">{{commentsItem.LastEditorName}}：</span>
                              <span class="replays left" v-html="commentsItem.ReplyContent"></span>
                            </div>
                          </li>
                        </ul>
                         <!-- end -->

                      </div>
                    </template>
                    <!-- 系统生成的记录 -->
                    <template v-else>
                      <div class="content-type1 clearfix">
                        <div class="clearfix contents">
                          <span class="left ">{{item.time}}</span>
                          <span class="left "  style="margin-left:10px;color:#000">{{item.LastEditorName}}</span>
                        </div>

                        <p class="wordbreak" style="padding-left:46px;color:#666" v-html="item.RealContent"></p>
                      </div>
                    </template>
                  </li>
                </ul>
              </div>
            </template>
            <p  v-else class="text_center" style="width: 100%;padding:30px 0 0;">暂无数据..</p>

            <div class="fixed write clearfix" v-if="!$route.params.sptype">
              <div class="left input-box" style="width:100%"  @click="writes(false)"> <x-input readonly placeholder="快速记录"></x-input></div>
              <!-- <div class="right yuyin" @click="writes(true)"><i class="iconfont icon-yuyin"></i></div> -->
            </div>
            <!-- 评论 -->
            <!-- <div v-transfer-dom>
              <popup v-model="isPublish" @on-hide="openYy=false"  :popup-style="{background:'white'}" position="bottom" height="50%">
                <publishsimple @pubFinish="pubFinish" :openYy="openYy"></publishsimple>
              </popup>
            </div> -->
            <!-- 发表记录-->
            <publish v-if="isPublish" :chosePoepleType="ProType" :pubType="pubType" @pubFinish="pubFinish" @pubCancel="isPublish=false" :openYy="openYy"></publish>
          </div>

           <!-- 转商机的线索跟进记录 -->
          <div class="follow-wrap relative" style="padding-bottom:55px" @click="showText" v-if="XSfollowList.length>0">
              <!-- <div class="absolute" style="width:100%;height:100%;z-index:1" @click="showText"></div> -->
              以下为线索阶段的跟进记录，只可预览
              <div class="follow-item"  v-for="(list,index) in XSfollowList" :key="index">
                <p class="time-title">{{list.date}}</p>
                <ul class="item-content">
                  <li class="cm-padding relative " v-for="(item,index2) in list.data" :key="index2">
                    <div class="cir absolute"></div>
                    <!-- 手动录入的记录 -->
                    <template v-if="item.Type==3">
                      <div class="content-type2">
                        <p class="clearfix">
                          <span class="left time">{{item.time}} <span v-if="item.SourcePort" style="margin-left:10px">发布于[{{item.SourcePort}}]</span> </span>
                          <!-- <i class="iconfont icon-pinglun right" @click="recomment(item)" style="color:#3079D5"></i>
                          <i class="iconfont icon-shanchu right"  v-if="item.LastEditor==myCode" @click="delet('跟进记录',item)" style="color:#FF7E8E;margin-right:15px"></i> -->
                        </p>
                        <div class="user-info clearfix" style="margin-top:5px">
                          <div class="people-pic cm-bac left" v-if="item.UserIcon" style="background-size:cover;background-position:center" :style="{backgroundImage:'url('+item.UserIcon+')'}"></div>
                          <div class="people-pic cm-bac left" v-else style="background-image:url(static/img/avater.png);background-size:80%;background-repeat:no-repeat;background-position:center" ></div>
                          <span class="people-name left">{{item.LastEditorName}}</span>
                        </div>


                         <p class=" contents" v-html="item.RealContent"></p>
                        <!-- 附加信息 -->
                        <!-- <div class="clearfix extra-info">
                          <div class="left" v-if="item.LxrName" style="margin-right:15px;">{{item.LxrName}}</div>
                          <div class="left">{{item.RecordType}}</div>
                        </div> -->
                        <!-- 评论模块 -->
                        <ul class="comments-wrap"  v-if="item.comments.length>0">
                          <li v-for="(commentsItem,index3) in item.comments" :key="index3">
                            <div class="user-info clearfix">
                              <span class="user-name left">{{commentsItem.LastEditorName}}：</span>
                              <span class="replays left" v-html="commentsItem.ReplyContent"></span>
                            </div>
                          </li>
                        </ul>
                         <!-- end -->

                      </div>
                    </template>
                    <!-- 系统生成的记录 -->
                    <template v-else>
                      <div class="content-type1 clearfix">
                        <div class="clearfix contents">
                          <span class="left ">{{item.time}}</span>
                          <span class="left "  style="margin-left:10px;color:#000">{{item.LastEditorName}}</span>
                        </div>

                        <p class="wordbreak" style="padding-left:46px;color:#666" v-html="item.RealContent"></p>
                      </div>
                    </template>
                  </li>
                </ul>
              </div>
          </div>
      </template>
      <template v-else>
        <div class="text_center" style="padding:40px 0;">
          <inline-loading></inline-loading>
          <span style="color:#9d9d9d">数据加载中</span>
        </div>
      </template>

      <voice v-if="openYy" @comfirm="comfirmVoice" @cancel="cancelVoice"></voice>

      <cash v-if="cashShow" :followId="recordId" @closeCash="cashShow=false" @cashFinish="cashFinish"></cash>

      <group>
        <popup-picker :show.sync="showPopupPicker" :show-cell="false" title="TEST" :data="dynamicWayList" @on-change="popupChange"></popup-picker>
      </group>
    </div>
</template>

<script>
import { Search,Checklist,Group,InlineLoading,TransferDom ,XInput ,Popup,PopupPicker  } from 'vux'
import publish from "./publish"
import cash from './cashModel'
import voice from '../voice'
export default {
  name: '',
  components:{
    Group ,InlineLoading,XInput ,Popup,publish,voice,cash,PopupPicker
  },
  directives: {
    TransferDom
  },
  mounted(){
    this.getUserData();
    this.getData();
  },
  props:['id','ProType','isXsZSj'],
  data () {
    return {
      pubType:"",
      cashShow:false,
      loading:true,
      isPublish:false,
      openYy:false,
      myCode:"",
      recordId:"",
      followList:[],
      XSfollowList:[],
      showPopupPicker:false,
      // dynamicWayList:[{key:"拜访",value:"拜访"},{key:"来电",value:"来电"},{key:"来访",value:"来访"},{key:"邮寄",value:"邮寄"},{key:"email",value:"email"},{key:"微信",value:"微信"}],
      dynamicWayList:[["拜访","来电","来访","邮寄","email","微信","去电"]],
    }
  },
  filters:{
    timesub(val){
      if(val){
        return val.replace("T"," ").substring(0,19)
      }else{
        return val
      }

    }
  },
  methods:{
    cashFinish(){
      this.cashShow=false;
      this.getData();
    },
    getData(){ //获取跟进记录
      this.loading=true;
      this.$http.post("/api/EnergizaSalesOpportunities/GetFollowLogViewByOppGUID",{
        OpportunitiesGUID:this.id,
        SourceType:this.ProType  //类型，1.商机 2 客户 3 联系人
      })
      .then((res)=>{
        // console.log(res)
        this.loading=false;
        this.followList=this.sort(res.Data);
      })
    },
    showText(){
      this.$vux.alert.show({
                  title: '温馨提示',
                  content:"线索阶段的跟进记录只可浏览，不可操作！"
                })
    },
    pubFinish(param){//发布记录，评论
      this.isPublish=false;
      // this.openYy=false;
      this.$vux.loading.show({
         text: '正在提交..'
        })

      if(this.pubType=="records"){ //发布新的跟进记录
          this.$http.post("/api/AjaxFollowLogController/AddFollowLogUserDefined",{
            ChangeTitle:param.content,
            sourceGUID:"6ce57741-342b-4070-a121-a02be403cc97",
            OpportunitiesGUID:this.id,
            Type:3,
            SourceType:this.ProType , //类型，1.商机 2 客户 3 联系人,
            RecordType:param.dynamicWay,
            SourcePort:"移动端SCRM",

            LxrName:param.people.name,
            SortGUID:param.people.id,
            CostDate:param.cashDate,
            CostParamList:param.cashList
          })
          .then((res)=>{
            this.$vux.loading.hide()
            if(res.Success){
                this.$vux.alert.show({
                  title: '友情提示',
                  content: "提交成功！"
                })

                this.getData();

            }else{
              this.$vux.alert.show({
                  title: '提交失败',
                  content: res.Message
                })
            }
          })
      }else{  //发表评论
          this.$http.post("/api/AjaxFollowLogController/AddFollowReplyNew",{
            ReplyContent:param.content,
            ChangeGUID:this.recordId,
            RelationGUID:this.id
          })
          .then((res)=>{
            // console.log(res)
            this.$vux.loading.hide()
            if(res.Success){
                this.$vux.alert.show({
                  title: '友情提示',
                  content: "提交成功！"
                })

                this.getData();

            }else{
              this.$vux.alert.show({
                  title: '评论失败',
                  content: res.Message
                })
            }
          })
      }
    },
    writes(bool){ //点击弹出输入框新建记录
      this.pubType="records";
      bool?this.openYy=true:this.isPublish=true;
    },
    recomment(item){//评论弹窗
      this.pubType="recomment";
      this.isPublish=true;
      // this.openYy=false;
      this.recordId=item.FlowerGUID;
    },
    changeCash(item){//费用弹窗
      this.cashShow=true;
      this.recordId=item.FlowerGUID;
    },
    changeRecordType(item){//发表类型弹窗
      this.showPopupPicker=true;
      this.recordId=item.FlowerGUID;
    },
    popupChange(params){
      console.log(params[0])
      this.$vux.loading.show({
         text: '正在提交..'
        })
      this.$http.post("/api/AjaxFollowLogController/UpdateFollowLog",{
            FlowerGUID:this.recordId,
            RecordType:params[0]
      })
      .then((res)=>{
        this.$vux.loading.hide()
            if(res.Success){
                this.$vux.alert.show({
                  title: '友情提示',
                  content: "提交成功！"
                })

                this.getData();

            }else{
                this.$vux.alert.show({
                  title: '提交失败',
                  content: res.Message
                })
            }
      })
    },
    comfirmVoice(val){
      this.openYy=false;
      this.$vux.loading.show({
         text: '正在提交..'
        })
      this.$http.post("/api/AjaxFollowLogController/AddFollowLogUserDefined",{
            ChangeTitle:val,
            sourceGUID:"6ce57741-342b-4070-a121-a02be403cc97",
            OpportunitiesGUID:this.id,
            Type:3,
            SourceType:this.ProType , //类型，1.商机 2 客户 3 联系人,
            RecordType:"拜访",
          })
          .then((res)=>{
            this.$vux.loading.hide()
            if(res.Success){
                this.$vux.alert.show({
                  title: '友情提示',
                  content: "提交成功！"
                })

                this.getData();

            }else{
                this.$vux.alert.show({
                  title: '提交失败',
                  content: res.Message
                })
            }
          })

    },
    cancelVoice(val){
      this.openYy=false;
    },
    delet(type,item){ //删除当前记录、评论
      var _this=this;
      this.$vux.confirm.show({
        title: '友情提示',
        content: '确认要删除当前'+type+'?',
        onConfirm () {
          _this.$vux.loading.show({
             text: '正在删除..'
          });
          if(type=='跟进记录'){ //删除记录
              _this.$http.post("/api/AjaxFollowLogController/DelFollwLog",{
                Follow_log_guid:item.FlowerGUID,
                recordGUID:_this.id,
                SourceType:this.ProType  //类型，1.商机 2 客户 3 联系人,
              })
              .then((res)=>{
                _this.$vux.loading.hide()
                if(res.Success){
                    _this.$vux.alert.show({
                      title: '友情提示',
                      content: "删除成功！"
                    })
                    _this.getData();
                }else{
                  _this.$vux.alert.show({
                      title: '友情提示',
                      content: res.Message
                    })
                }
              })
          }else{  //删除评论

          }
        }
      })
    },
    sort(arr){ //数据重排
      arr.map((el)=>{
        // el.list_fry.avater=""; //给默认空头像
        el.entity_flr.comments=el.list_fry||[];
        if(el.entity_flr.CreateTime){
          el.entity_flr.date=el.entity_flr.CreateTime.substring(0,10);
          el.entity_flr.time=el.entity_flr.CreateTime.substring(11,16);
        }
        // el.entity_flr.avater="" //给默认空头像
        delete el["list_fry"];
      })

        var map = {},
            dest = [];
        for(var i = 0; i < arr.length; i++){
            var ai = arr[i].entity_flr;
            if(!map[ai.date]){
                dest.push({
                    date: ai.date,
                    data: [ai]
                });
                map[ai.date] = ai;
            }else{
                for(var j = 0; j < dest.length; j++){
                    var dj = dest[j];
                    if(dj.date == ai.date){
                        dj.data.push(ai);
                        break;
                    }
                }
            }
        }

        // console.log(dest);
        // this.followList=dest;
        return dest;

        // this.getAvater(this.followList);//取头像
    },
    getUserData(){  //获取当前用户id
      this.$http.get("/api/EnergizeSaleUser/WeiXinUserInfo")
      .then((res)=>{
        this.myCode=res.Data.UserName;
      })
    },
    getAvater(arr){ //获取头像()
        //获取所有用户code
        var idList=[];
        arr.map((el)=>{
          el.data.map((el2)=>{
               idList.push(el2.LastEditor);
               el2.comments.map((el3)=>{
                  idList.push(el3.LastEditor);
               })
          })
        })
        // 用户code去重
        var hash={},brr=[];
        idList.map((el)=>{
          if(!hash[el]){
            hash[el]=true;
            brr.push(el);
          }
        })
        // console.log(brr);


        // 用code取头像
        brr.map((el)=>{
          this.$http.get("/api/EnergizeSaleUser/WeiXinUserInfoByUserCode?userCode="+el)
          .then((res)=>{

            if(res.Data){
              arr.map((el)=>{
                el.data.map((el2)=>{
                    if(el2.LastEditor==res.Data.UserName){
                      el2.avater=res.Data.UserIcon;
                    }
                    el2.comments.map((el3)=>{
                        if(el3.LastEditor==res.Data.UserName){
                          el3.avater=res.Data.UserIcon;
                        }
                     })
                })
              })

              // console.log(arr)
            }

          })
        })

    }

  },
  watch:{
    isXsZSj(val){
      if(val){
        this.$http.post("/api/EnergizaSaleClueController/GetFlowLogList",{
          OpportunityGUID:val,
          PageIndex:0,
          PageSize:1000
        })
        .then((res)=>{
          // console.log(res);
          this.XSfollowList=this.sort(res.Data);
          // console.log(this.XSfollowList)
        })
      }
    }
  }
}
</script>

<style lang="less">
.follow-wrap{
  background: white;
  padding:0 10px;
  // padding-bottom: 55px;
  .follow-item{
    margin:0 0 10px;
    .time-title{
      padding: 10px 0;
      background-color: white;
    }
    .item-content{
      margin-left: 10px;
      border-left:1px solid #D8D8D8;
      padding-left: 10px;
      li{
        background-color: #F6F6F6;
        border-radius: 3px;
        margin-bottom:10px;
        .cir{
          border-radius: 100%;
          width: 10px;
          height: 10px;
          background-color: #3079D5;
          top:0;
          bottom:0;
          margin:auto;
          left:-19px;
          border:4px solid white
        }
        .time,.contents{
          color: #666;
          word-break:break-all;
        }
        .content-type1{
          .time{
            width: 20%;
          }
          .name{
            width: 20%
          }
          .contents{
            width: 60%;

          }
        }
        .content-type2{
          .user-info{
            @h:2.6rem;
            height: @h;
            line-height: @h;
            margin:0px 0 5px;
            .people-pic{
              height: @h;
              width: @h;
              border-radius: 4px;
              margin-right: 10px;
            }
          }
          .extra-info{
            padding: 10px 0 0;
            border-top: 1px solid #eaeaea;
            margin:10px 0;
            &>div{
              border: 1px solid #666;
              border-radius: 20px;
              color: #666;
              padding: 5px 15px;
              font-size: 0.9rem;
            }
          }
          .comments-wrap{
            position: relative;
            padding-top: 10px;
            margin-top:10px;
            &:before{
              content: '';
              display: block;
              height: 0;
              position: absolute;
              width: 100%;
              border-top: 1px dashed #eaeaea;
              left: 0;
              top:0;
            };
            li{
              margin:6px 0;
              &:last-child{
                margin-bottom: 0;
              };
              &:first-child{
                margin-top: 0;
              };
              border-radius: 3px;
              font-size: 0.9rem;
              .user-info{
                line-height: normal;
                height: auto;
              }
              .user-name{
                width: 25%;
                color: #333;
                line-height: normal;
              }
              .replays{
                width: 75%;
                color:#888;
                line-height: normal;
                word-break:break-all;
              }
            }
          }
        }
      }
    }
  }

  .write{
    background-color: #F0EFF5;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    bottom: 0;
    left:0;
    z-index: 1;
    .yuyin{
      i{
        font-size: 2rem;
        color: #666;
      }

    }
    .input-box{
      width: 87%;
    }
    .vux-x-input{
      padding:0 !important;
      background-color: white;
      border-radius: 5px;
      input{
        padding: 5px 3%;
        width: 94%

      }
    }
  }
}
</style>
