<template>
    <div id="lxrdetail">
      <div class="relative">
          <img src="static/img/pic_l.png" alt="" style="height:50%;left:0;bottom:0;z-index:2" class="absolute">
          <img src="static/img/pic_r.png" alt="" style="height:50%;right:0;bottom:0;z-index:2" class="absolute">
          <swiper  height="145px" class="sw" :show-dots=false>
            <swiper-item class="black">
              <div class="base-info-wrap text_center" style="margin-top:20px">
                <p class="title text-over">{{swiperInfo1.name}}</p>
                <p class="kh text_center">
                    <i class="iconfont icon-xingbienv" v-if="swiperInfo1.sex=='女'||swiperInfo1.sex=='0'" style="color:#F7867B"></i>
                    <i class="iconfont icon-xingbienan" style="color:#5EB7E8" v-else></i>
                </p>
                <p class=" text-over" style="color:#666">{{swiperInfo1.company}}</p>
                <p class=" text_center" style="color:#999">{{swiperInfo1.station}}</p>
              </div>
            </swiper-item>
          </swiper>
      </div>



        <div class="panel-wrap"  id="tab-data">
          <scroller lock-y :scrollbar-x=false>
            <div  class="clearfix" id="panel-wrap" >
              <router-link :to="{name:'shangji',params:{type:'lianxiren',id:$route.params.id}}" class="panel-link">
                <i class="iconfont icon-shangji c-i" style="color:#EF3D31"></i> <br>
                <span class=" c-t">商机</span> <br>
                <span class=" c-d">{{tabInfo.sjCount}}</span>
              </router-link>
              <!-- <router-link :to="{name:'xiansuo',params:{type:'lianxiren',id:$route.params.id}}" class="panel-link" >
                <i class="iconfont icon-xiansuo c-i" style="color:#FEB711"></i> <br>
                <span class=" c-t">线索</span> <br>
                <span class=" c-d">{{tabInfo.xsCount}}</span>
              </router-link> -->
              <span class="panel-link" @click="toXs">
                <i class="iconfont icon-xiansuo c-i" style="color:#FEB711"></i> <br>
                <span class=" c-t">线索</span> <br>
                <span class=" c-d">{{tabInfo.xsCount}}</span>
              </span>
              <router-link :to="{name:'marketactivity',params:{id:$route.params.id}}" class="panel-link">
                <i class="iconfont icon-hongqi c-i" style="color:#7ED321"></i> <br>
                <span class=" c-t">市场活动</span> <br>
                <span class=" c-d">{{tabInfo.scCount}}</span>
              </router-link>
              <router-link :to="{name:'jobrecord',params:{id:$route.params.id}}" class="panel-link">
                <i class="iconfont icon-renzhilvli c-i" style="color:#2DA6F7"></i> <br>
                <span class=" c-t">任职履历</span> <br>
                <span class=" c-d">{{tabInfo.rzCount}}</span>
              </router-link>
              <router-link :to="{name:'actionrecord',params:{id:$route.params.id}}" class="panel-link">
                <i class="iconfont icon-hangweiguiji c-i" style="color:#FB913F"></i> <br>
                <span class=" c-t">行为轨迹</span> <br>
                <span class=" c-d">{{tabInfo.xwCount}}</span>
              </router-link>
            </div>
          </scroller>
      </div>



      <div class="tab-box">
        <tab active-color="#3079D5" custom-bar-width="6em">
          <tab-item selected @on-item-click="handler">跟进记录</tab-item>
          <tab-item @on-item-click="handler">详细资料</tab-item>
        </tab>
        <div class="tab-content">
          <followrecord v-show="tabIndex==0" :ProType="3" :id="$route.params.id"></followrecord>
          <template v-if="!loading">
            <detail v-show="tabIndex==1" :detailInfo="detailInfo"></detail>
          </template>
        </div>
      </div>
    </div>
</template>

<script>
import { TransferDom,CellBox,Popup ,Group ,InlineLoading,Swiper,SwiperItem,Tab, TabItem,Scroller   } from 'vux'
import detail from "./components/lianxirendetailform"
import followrecord from "../../../../components/common/followrecord"
export default {
  name: '',
  components:{
   CellBox ,Group ,InlineLoading,Popup,Swiper,SwiperItem,Tab, TabItem,followrecord,detail,Scroller
  },
  beforeDestroy () {
        this.$cmBus.$off('changeFieldSJ');
  },
  created(){
    this.getInit();
    this.getgj(this.$route.params.id);
    this.$cmBus.$on("changeFieldSJ",(data)=>{
      this.swiperInfo1[data.field]=data.value
      switch(data.field){
        case 'LxrName':this.swiperInfo1.name=data.value;break;
        case 'KHGUID':this.swiperInfo1.company=data.value;break;
      }
    })
  },
  directives: {
    TransferDom
  },
  filters:{
    subst(value){
      if(value){
          return value.substring(0,1);
      }else{
        return value;
      }
    },
    formate(value){
      if(value){
          return value.substring(0,10);
      }else{
        return value;
      }
    }
  },
  data () {
    return {
      loading:false,
      tabIndex:0,
      detailInfo:{},
      memberId:"",
      jobrecord:[],
      tabInfo:{
        sjCount:0,
        xsCount:0,
        scCount:0,
        rzCount:0,
        xwCount:0
      },
      swiperInfo1:{
        name:"",
        sex:"",
        company:"",
        station:""
      }

    }
  },
  methods:{
    toXs(){
      var phone=this.detailInfo.LxrEntity.Mobile1||"unbind";
      this.$router.push({
        name:"xiansuo",
        params:{
          type:"lianxiren",
          phone:phone,
          id:this.$route.params.id
        }
      });
    },
    getInit(){  //获取联系人信息
      this.loading=true;
      this.$http.post("/api/AjaxLXRinfoController/GetLxrDetail",{
        SortGUID:this.$route.params.id
      })
      .then((res)=>{
        this.loading=false;
        // console.log(res.Data);
        // return;
         // 总数据信息
          this.detailInfo=res.Data;
          // 轮播第一项的信息
          this.swiperInfo1={
            name:res.Data.LxrEntity.LxrName,
            sex:res.Data.LxrEntity.Gender,
            company:res.Data.LxrEntity.FullName,
            station:res.Data.LxrEntity.JobTitle
          }

          // tab栏数据
            this.tabInfo.sjCount=res.Data.OppCount;
            this.tabInfo.xsCount=res.Data.ClueCount;
            this.tabInfo.scCount=res.Data.ActivityCount;
            this.tabInfo.rzCount=res.Data.RelationCount;
            // this.tabInfo.xwCount=res.Data.OppCount


            this.jobrecord=res.Data.ListRelation;



      })
    },
    getgj(SortGUID){  //获取行为轨迹
      this.$http.post("/api/AjaxLXRinfoController/GetLxrtrack ",{
        SortGUID:SortGUID,
        PageSize:1,
        PageIndex:1
      }).then((res)=>{

        this.tabInfo.xwCount=res.Data.data.total;


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
#lxrdetail{
  .panel-link{
    width: 20% !important
  }
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
        color: #ccc;
      }
      .icon-list{
        text-align: center;
        @h:2.5rem;
        font-size: 0;
        position: relative;
        z-index: 10;
        .icon-wrap{
          background-color: #3079D5 ;
          border-radius: 100%;
          height: @h;
          width: @h;
          line-height: @h;

          display: inline-block;
          margin:0 7px;
          i{
            color: white;
            font-size: 1.2rem;
          }
        }
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
            width: 25%;
            padding:0 3%;
            float: left;
            box-sizing: border-box;
            margin-bottom: 2%;
            .people-pic{
              padding-top: 100%;
              // background-color: red;
              border-radius: 3px;
            }
            .people-name{
              font-size: 0.85rem;
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




}

</style>
