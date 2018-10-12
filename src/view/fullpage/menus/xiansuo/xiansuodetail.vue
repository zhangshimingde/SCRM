<template>
    <div id="sjdetail">
      <div class="relative">
          <img src="static/img/pic_l.png" alt="" style="height:50%;left:0;bottom:0;z-index:2" class="absolute">
          <img src="static/img/pic_r.png" alt="" style="height:50%;right:0;bottom:0;z-index:2" class="absolute">
          <swiper  height="140px" dots-position="center" dots-class="dot" class="sw">
            <swiper-item class="black">
              <div class="base-info-wrap text_center">


                <p class="title" style="margin-bottom:1rem;">{{swiperInfo1.name}} </p>
                <span class="statusXS inline_block" v-show="swiperInfo1.status">{{swiperInfo1.status}}</span>
                <div class="small-info text_center" style="color:#3079D5;margin-top:2rem">
                  <span class="">{{swiperInfo1.people}}</span>
                  <a style="color:#3079D5;margin-left:1rem;"  :href="'tel:'+swiperInfo1.phone"><i class="iconfont icon-dianhua" style="margin-right:0.5rem"></i>呼叫</a>
                </div>
              </div>
            </swiper-item>
            <swiper-item class="black">
              <div class="people-info-wrap">

                <div class="people-line clearfix">
                  <span class="left banner">跟进人</span>
                  <ul class="right people-list">

                    <li  @click="checkpeoplemultiple=true">
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
            </swiper-item>
          </swiper>
      </div>
      <div v-if="swiperInfo1.status=='商机'" style="margin-top:15px"></div>
      <div class="panel-wrap clearfix"  id="tab-data" v-else>
          <router-link :to="{name:'toshangji',params:{id:$route.params.id,name:swiperInfo1.people,phone:swiperInfo1.phone}}" class="xs-panel relative left sj-panel-item">
            <i class="iconfont icon-shangji c-i sj" style="color:#EB3529"></i>
            <span class=" c-t">转商机</span>
          </router-link>
          <router-link :to="{name:'changestatus',params:{type:'close',id:$route.params.id}}" class="xs-panel relative left" v-if="swiperInfo1.status=='未跟进'||swiperInfo1.status=='未指派'||swiperInfo1.status=='跟进中'">
            <i class="iconfont icon-msnui-poweroff c-i gb" style="color:#0F8EE9"></i>
            <span class=" c-t">关闭</span>
          </router-link>
          <router-link :to="{name:'changestatus',params:{type:'change',id:$route.params.id}}" class="xs-panel relative left"  v-else-if="swiperInfo1.status=='关闭'">
            <i class="iconfont icon-shijian c-i zgj" style="color:#FD8933"></i>
            <span class=" c-t">转跟进</span>
          </router-link>
      </div>


      <div class="tab-box">
        <tab active-color="#3079D5" custom-bar-width="6em">
          <tab-item selected @on-item-click="handler">跟进记录</tab-item>
          <tab-item @on-item-click="handler">详细资料</tab-item>
        </tab>
        <div class="tab-content">
          <followrecord v-show="tabIndex==0" :id="$route.params.id" :ProType="1"></followrecord>
          <template v-if="!loading">
            <detail v-show="tabIndex==1" :detailInfo="detailInfo"></detail>
          </template>
        </div>
      </div>


      <!-- 经营团队 -->
      <div v-transfer-dom >
        <popup v-model="checkpeoplemultiple" :popup-style="{background:'white'}" position="right" width="80%">
          <checkpeoplemultiple :deleteId="deleteId" :id="$route.params.id" :isClue="true" @choseFinish="choseMultiplePeopleFinish"></checkpeoplemultiple>
        </popup>
      </div>

    </div>
</template>

<script>
import { TransferDom,CellBox,Popup ,Group ,InlineLoading,Swiper,SwiperItem,Tab, TabItem,Scroller   } from 'vux'
import detail from "./compo/xiansuodetailform"
import followrecord from "../../../../components/common/followrecordXS"
import checkpeople from '../../../../components/common/checkpeople';
import checkpeoplemultiple from './compo/checkpeoplemultiple';
export default {
  name: '',
  components:{
   CellBox ,Group ,InlineLoading,Popup,Swiper,SwiperItem,Tab, TabItem,detail,checkpeoplemultiple,checkpeople,followrecord,Scroller
  },
  beforeDestroy () {
        this.$cmBus.$off('changeFieldXS');
  },
  created(){
    this.getInit();
    this.$cmBus.$on("changeFieldXS",(data)=>{
      this.swiperInfo1[data.field]=data.value
      switch(data.field){
        case 'name':this.swiperInfo1.name=data.value;break;
        case 'people':this.swiperInfo1.people=data.value;break;
        case 'phone':this.swiperInfo1.phone=data.value;break;
      }
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
      off:false,
      loading:false,
      checkpeoplemultiple:false,
      deleteId:"",
      company:"",
      tabIndex:0,
      detailInfo:{},
      swiperInfo1:{
        name:"",
        status:"",
        people:"",
        phone:"",
      },
      swiperInfo2:{
        team:[]
      },

    }
  },
  methods:{
    getInit(){  //获取线索信息
      this.loading=true;
      this.$http.post("/api/EnergizaSaleClueController/GetOpportunitiesKH",{
        OpportunityGUID:this.$route.params.id
      })
      .then((res)=>{
        // console.log(res);
        this.loading=false;

         // 总数据信息
          this.detailInfo=res.Data;

          // 轮播第一项的信息
          this.swiperInfo1={
            name:res.Data.CustomerName,
            status:res.Data.OpportunityStatusDesc,
            people:res.Data.ContactName,
            phone:res.Data.Telephone,
          };

      });

      this.$http.get("/api/EnergizaSaleClueController/GetFollower?OpportunityGUID="+this.$route.params.id)
      .then((res)=>{
        // console.log(res);
        // 轮播第2项的信息
          //经营团队
          res.Data.map((el)=>{
            this.swiperInfo2.team.push({
              name:el.FollowerName,
              id:el.FollowerGUID,
              code:el.FollowerCode,
              avater:el.UserIcon
            })
          })
      })
    },
    choseMultiplePeopleFinish(params){ //多选人团队成员
      this.checkpeoplemultiple=false;
      if(!params) return; //点了取消
      // console.log(params);
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
          avater:"",
          code:el.code
        })

      })


      this.swiperInfo2.team.map((el)=>{
        this.getUserData(el.id,(data)=>{
          if(data.UserIcon){
            el.avater=data.UserIcon;
          }

        })
      })


      // 提交修改信息
      this.$vux.loading.show({
         text: '正在指派..'
        })

      var zpList=[],idList=[];
      this.swiperInfo2.team.map((el)=>{
        zpList.push({
          OpportunityGUID:this.$route.params.id,
          FollowerGUID:el.id,
          FollowerCode:el.code,
          FollowerName:el.name
        })
        idList.push(el.id);
      })
      // console.log(zpList)
      // this.$http.post("/api/EnergizaSaleClueController/SaveFollowerArrange",{
      //   StrFollowers:JSON.stringify(zpList)
      // })
      this.$http.post("/api/EnergizaSaleClueController/SetClueFollower",{
          oppGuidStr:this.$route.params.id,
          followerGuid:idList.join(",")
      })
      .then((res)=>{
        this.$vux.loading.hide()
        if(res.Success){
            this.$vux.alert.show({
              title: '友情提示',
              content: '指派成功！'
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
    removePeople(item,index){ //删除团队成员
      if(this.swiperInfo2.team.length<=1){
        this.$vux.alert.show({
              title: '友情提示',
              content: '请至少保留一个跟进人！'
        })
        return;
      }
      var _this=this;
      this.$vux.confirm.show(
      {
          title: '友情提示',
          content: '确认删除此跟进人？',
          onConfirm () {
            _this.swiperInfo2.team.splice(index,1);
            _this.$http.post("/api/EnergizaSaleClueController/DeleteFollowerArrange",{
              OpportunityGUID:_this.$route.params.id,
              UserGUID:item.id
          })
          .then((res)=>{
              _this.$vux.toast.text('删除成功！', 'top');
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
    handler(val){
      this.tabIndex=val;
    }
  },
  watch:{
  }
}
</script>

<style lang="less">
.xs-panel{
  width: 50%;
  text-align: center;
  &.sj-panel-item{
    border-right: 1px solid #eaeaea;
    box-sizing: border-box;
  }
  i{
    font-size: 1.5rem;
    vertical-align: middle;
    margin-right: 0.4rem
  }
  span{
    font-size: 1.1rem;
    color: #333;
    position: relative;
    top:0.1rem;
  }

}
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
      width: 25% !important;
    }
  }
}
.statusXS{
  color: #888;
  border: 1px solid #888;
  border-radius: 10px;
  padding:2px 10px;
  font-size: 0.8rem;
}
</style>
