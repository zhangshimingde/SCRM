<template>
    <div>
      <template v-if="!loading">
        <div class="follow-wrap">
          <div class="follow-item" v-for="(list,index) in followList">
            <p class="time-title">{{list.date}}</p>
            <ul class="item-content">
              <li class="cm-padding relative " v-for="(item,index2) in list.data">
                <div class="cir absolute"></div>
                <!-- 手动录入的记录 -->
                <template v-if="item.Type==3"> 
                  <div class="content-type2">
                    <p class="clearfix">
                      <span class="left time">{{item.time}}</span>
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
                      <div class="left">{{item.RecordType}}</div>
                    </div>
                    <!-- 评论模块 -->
                    <ul class="comments-wrap"  v-if="item.comments.length>0">
                      <li v-for="(commentsItem,index3) in item.comments">
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
          <!-- 发表记录，评论 -->
          <div v-transfer-dom>
            <popup v-model="isPublish" @on-hide="openYy=false"  :popup-style="{background:'white',zIndex:10}" position="bottom" height="50%">
              <publish @pubFinish="pubFinish" :openYy="openYy"></publish>
            </popup> 
          </div>
        </div>
      </template>
      <template v-else>
        <div class="text_center" style="padding:40px 0;">
          <inline-loading></inline-loading>
          <span style="color:#9d9d9d">数据加载中</span>
        </div>
      </template>


    </div>
</template>

<script>
import { Search,Checklist,Group,InlineLoading,TransferDom ,XInput ,Popup } from 'vux'
import publish from "../../../../../components/common/publish"
export default {
  name: '',
  components:{
    Group ,InlineLoading,XInput ,Popup,publish
  },
  directives: {
    TransferDom
  },
  mounted(){
    this.getUserData();
    this.getData();
  },
  props:['id','list'],
  data () {
    return {
      pubType:"",
      loading:false,
      isPublish:false,
      openYy:false,
      myCode:"",
      recordId:"",
      followList:[]
    }
  },
  filters:{
    timesub(val){
      if(!val) return val;
      return val.replace("T"," ").substring(0,19)
    }
  },
  methods:{
    getData(){ //获取跟进记录
      this.sort(this.list);
    },
    pubFinish(param){//发布评论
      this.isPublish=false;
      // this.openYy=false;
      this.$vux.loading.show({
         text: '正在提交..'
        })
      this.$http.post("/api/AjaxFollowLogController/AddFollowReplyNew",{
        ReplyContent:param,
        ChangeGUID:this.recordId
      })
      .then((res)=>{
        console.log(res)
        this.$vux.loading.hide()
        if(res.Success){
            this.$vux.alert.show({
              title: '友情提示',
              content: "提交成功！"
            })
            this.$emit("refreshFollow");

        }else{
          this.$vux.alert.show({
              title: '评论失败',
              content: res.Message
            })
        }
      })

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
                SourceType:1,
              })
              .then((res)=>{
                _this.$vux.loading.hide()
                if(res.Success){
                    _this.$vux.alert.show({
                      title: '友情提示',
                      content: "删除成功！"
                    })
                    _this.$emit("refreshFollow");
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
        if(el.entity_flr.LastEditTime){
          el.entity_flr.date=el.entity_flr.LastEditTime.substring(0,10);
          el.entity_flr.time=el.entity_flr.LastEditTime.substring(11,16);
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

        console.log(dest);
        this.followList=dest;

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

              console.log(arr)
            }

          })
        })
        
    }
    
  },
  watch:{
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
