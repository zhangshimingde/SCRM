<template>
    <div id="khdetail">
      <div class="relative"  style="background:white">
          <img src="static/img/pic_l.png" alt="" style="height:50%;left:0;bottom:0;z-index:1" class="absolute">
          <img src="static/img/pic_r.png" alt="" style="height:50%;right:0;bottom:0;z-index:1" class="absolute">
          <swiper :options="swiperOption" ref="mySwiper"  class="swipe-plungin sw">
            <swiper-slide class="black swipe-item">
              <div class="base-info-wrap text_center">


                <p class="title text-over">{{swiperInfo1.name}}</p>
                <p class="kh text_center" style="color:#666;font-size:0.9rem;">
                   {{swiperInfo1.area}}
                </p>
                <div class="clearfix icon-list">
                  <span class="icon-wrap" @click="openMap">
                    <i class="iconfont icon-dilizuobiao"></i>
                    <span class="alt">地理坐标</span>
                  </span>
                  <router-link :to="{name:'khtree',params:{id:$route.params.id}}" class="icon-wrap">
                    <i class="iconfont icon-gongsicengji"></i>
                    <span class="alt">公司层级</span>
                  </router-link>
                  <router-link :to="{name:'gongshangmsg',params:{FullName:swiperInfo1.name,id:$route.params.id}}" class="icon-wrap">
                    <i class="iconfont icon-gongshangxinxi"></i>
                    <span class="alt">工商信息</span>
                  </router-link>
                  <!-- <router-link :to="{name:''}" class="icon-wrap">
                    <i class="iconfont icon-chengguowendang"></i>
                    <span class="alt">成果文档</span>
                  </router-link>
                  <router-link :to="{name:''}" class="icon-wrap">
                    <i class="iconfont icon-jingyingjihua"></i>
                    <span class="alt">经营计划</span>
                  </router-link> -->
                </div>

              </div>
            </swiper-slide>
            <swiper-slide class="black swipe-item">
              <div class="people-info-wrap">
                <div class="people-line clearfix">
                  <span class="left banner">主责人</span>
                  <ul class="right people-list">
                    <li  @click="changeZZR">
                      <div class="people-pic cm-bac" v-if="swiperInfo2.zzr.avater" style="background-size:cover;background-position:center" :style="{backgroundImage:'url('+swiperInfo2.zzr.avater+')'}"></div>
                      <div class="people-pic cm-bac" v-else style="background-image:url(static/img/avater.png);background-size:80%;background-repeat:no-repeat;background-position:center" ></div>
                      <p class="people-name">{{swiperInfo2.zzr.name}}</p>
                    </li>
                  </ul>
                </div>

                <div class="people-line clearfix">
                  <span class="left banner">经营团队</span>
                  <ul class="right people-list">

                    <li v-if="hasRight"  @click="choseTeamer">
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
          <div  class="clearfix" id="panel-wrap" :style="{'width':(tabList.length+1)*70+'px'}">
            <!-- <span class="panel-link" @click="getConcat">
              <i class="iconfont icon-yunweifuwu c-i" style="color:#3079D5"></i> <br>
              <span class=" c-t">发起会话</span> <br>
            </span> -->
            <template  v-if="!loading2" >
              <div v-for="(item,index) in tabList" v-if="tabList.length>0" :key="index">
                <router-link :to="{name:'lianxiren',params:{type:'kehu',id:$route.params.id}}" class="panel-link" v-if="item.Key=='lianxiren'">
                  <i class="iconfont icon-lianxiren c-i" style="color:#FFAC3F"></i> <br>
                  <span class=" c-t">联系人</span> <br>
                  <span class=" c-d">{{item.Value}}</span>
                </router-link>
                <router-link :to="{name:'shangji',params:{type:'kehu',id:$route.params.id}}" class="panel-link" v-if="item.Key=='shangji'">
                  <i class="iconfont icon-shangji c-i" style="color:#EF3D31"></i> <br>
                  <span class=" c-t">商机</span> <br>
                  <span class=" c-d">{{item.Value}}</span>
                </router-link>
                <router-link :to="{name:'khhetongpanel',params:{type:'kehu',id:$route.params.id}}" class="panel-link" v-if="item.Key=='hetong'">
                  <i class="iconfont icon-hetong c-i" style="color:#0AC7AC"></i> <br>
                  <span class=" c-t">合同</span> <br>
                  <span class=" c-d">{{item.Value}}</span>
                </router-link>
                <router-link :to="{name:'khchanpinpanel',params:{id:$route.params.id}}" class="panel-link" v-if="item.Key=='chanpin'">
                  <i class="iconfont icon-chanpin c-i" style="color:#50C3FD"></i> <br>
                  <span class=" c-t">产品</span> <br>
                  <span class=" c-d">{{item.Value}}</span>
                </router-link>
                <router-link :to="{name:'khjiaofupanel',params:{id:$route.params.id}}" class="panel-link" v-if="item.Key=='jiaofuxinxi'">
                  <i class="iconfont icon-jiaofuxinxi c-i" style="color:#7ED321"></i> <br>
                  <span class=" c-t">交付信息</span> <br>
                  <span class=" c-d">{{item.Value}}</span>
                </router-link>
                <router-link :to="{name:'yunweipanel',params:{id:SortName}}" class="panel-link" v-if="item.Key=='yunweifuwu'">
                  <i class="iconfont icon-yunweifuwu c-i" style="color:#3079D5"></i> <br>
                  <span class=" c-t">运维服务</span> <br>
                  <span class=" c-d">{{item.Value}}</span>
                </router-link>


              </div>
              <div class="text_center" v-if="tabList.length==0" style="height:54px;line-height:54px;width:100vw">
                <span style="color:#9d9d9d">暂无数据</span>
              </div>
            </template>
            <template v-else>
              <div class="text_center" style="height:54px;line-height:54px;width:100vw">
                <inline-loading></inline-loading>
                <span style="color:#9d9d9d">数据加载中</span>
              </div>
            </template>
          </div>
          </scroller>
      </div>



      <div class="tab-box">
        <tab active-color="#3079D5" custom-bar-width="6em">
          <tab-item  @on-item-click="handler">跟进记录</tab-item>
          <tab-item selected @on-item-click="handler">详细资料</tab-item>
        </tab>
        <div class="tab-content">
          <followrecord v-show="tabIndex==0" :ProType="2" :id="$route.params.id"></followrecord>
          <template v-if="!loading">
            <detail v-show="tabIndex==1" :canEdit="canEdit" :detailInfo="detailInfo"></detail>
            <!-- <div class="pops" v-if="pops"></div> -->
          </template>
        </div>
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

    </div>
</template>

<script>
import { TransferDom,CellBox,Popup ,Group ,InlineLoading,Tab, TabItem,Scroller   } from 'vux'
import detail from "./compo/kehudetailform"
import followrecord from "../../../../components/common/followrecord"
import checkpeople from '../../../../components/common/checkpeople';
import checkpeoplemultiple from '../../../../components/common/checkpeoplemultiple';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import wxSDK from '@/assets/js/global.js'
import 'swiper/dist/css/swiper.css'
export default {
  name: '',
  components:{
   CellBox ,Group ,InlineLoading,Popup,Tab,swiper, swiperSlide,  TabItem,checkpeoplemultiple,checkpeople,followrecord,detail,Scroller
  },
  created(){
    this.isHasRight();
    this.getInit();
    this.getTab();
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
  computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
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
      beChoseM:[],
      beChose:[],
      hasRight:true,
      pops:false,
      SortName:"",
      loading:false,
      loading2:true,
      chosepeople:false,
      checkpeoplemultiple:false,
      deleteId:"",
      tabIndex:1,
      detailInfo:{},
      tabList:[],
      swiperInfo1:{
        name:"",
        area:"",
        address:''
      },
      swiperInfo2:{
        zzr:{
          name:"",
          id:"",
          avater:""
        },
        team:[],
        canEdit:true
      },

    }
  },
  methods:{
    getConcat(){
      wxSDK.getConcat('客户',this.swiperInfo1.name);
    },
    choseTeamer(){
      this.checkpeoplemultiple=true;
      this.beChoseM=this.swiperInfo2.team.map(el=>{
        return el.id;
      });
      // console.log(this.beChoseM)
    },
    isHasRight(){

      this.$http.post("/api/EnergizaSaleKHInfoController/IsAssignJobs?KHGUID="+this.$route.params.id)
      .then((res)=>{
        this.hasRight=res.Data;
      })
    },
    changeZZR(){
      if(!this.hasRight)return;
      this.chosepeople=true;
      this.beChose=[this.swiperInfo2.zzr.id];
    },
    getInit(){  //获取商机信息
      this.loading=true;
      // this.$http.post("/api/EnergizaSaleKHInfoController/GetKhDetail",{
      this.$http.post("/api/EnergizaSaleKHInfoController/GetKhDetailPC",{
        KHGUID:this.$route.params.id
      })
      .then((res)=>{
        this.loading=false;
        // console.log(res.Data);
        if(!res.Data.IsEdit){
          this.pops=true
        }
        this.canEdit=res.Data.KhEdit;
         // 总数据信息
          this.detailInfo=res.Data;

          // 轮播第一项的信息
          this.swiperInfo1={
            name:res.Data.entity.FullName,
            area:res.Data.entity.LevelCodeName,
            address:res.Data.entity.Address
          }
          this.SortName=res.Data.entity.SortName;
          // 轮播第2项的信息
            // 主责人
          this.swiperInfo2.zzr={
              name:res.Data.KhresponsePeople.UserName_Chn,
              id:res.Data.KhresponsePeople.UserGUID,
              avater:res.Data.KhresponsePeople.UserIcon
          }
          //经营团队
          res.Data.KhManageTeam.map((el)=>{
            this.swiperInfo2.team.push({
              name:el.UserName,
              id:el.UserGUID,
              avater:el.UserIcon
            })
          })
      })
    },
    getTab(){
      this.loading2=true;
      this.$http.post("/api/EnergizaSaleKHInfoController/GetKhModule",{
        KHGUID:this.$route.params.id
      })
      .then((res)=>{
        this.loading2=false;
        this.tabList=res.Data;
        // document.getElementById("panel-wrap").style.width=res.Data.length*70+'px';
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
      })

      // 提交修改信息
      this.$http.post("/api/EnergizaSaleKHInfoController/SaveDistribution",{
        KHGUID:this.$route.params.id,
        TrustPeople:params.id
      })
      .then((res)=>{
        this.$vux.loading.hide()
        if(res.Success){
            this.$vux.alert.show({
              title: '友情提示',
              content: '修改主责人成功！'
            })

            this.getInit();
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
    if(!this.hasRight) return;

    let _this=this
      this.$vux.confirm.show({
              title: '友情提示',
              content: '确认删除此经营团队成员？',
              onConfirm (){
                  _this.swiperInfo2.team.splice(index,1);
                  // this.deleteId=item.id;

                  // 提交修改信息
                  // console.log(this.swiperInfo2.team)
                  var idList=[];
                  _this.swiperInfo2.team.map((el)=>{
                    idList.push(el.id)
                  })
                  _this.$http.post("/api/EnergizeSaleManageTeam/BuldAddManageTeamerForApp",{
                    OppOrCusGUID:_this.$route.params.id,
                    addUsers:idList.join(","),
                    sourceType:2
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
    handler(val){
      this.tabIndex=val;
    },
    openMap(){  //打开地图
      var _this=this;

      if(!_this.swiperInfo1.address){
        _this.$vux.alert.show({
          title: '友情提示',
          content: '此客户未录入位置信息！'
        })
        return;
      }
      // 两种经纬度坐标体系的换算
      var MapConvert = {
          x_pi: 3.14159265358979324 * 3000.0 / 180.0,
          /// <summary>
          /// 中国正常坐标系GCJ02协议的坐标，转到 百度地图对应的 BD09 协议坐标
          ///  point 为传入的对象，例如{lat:xxxxx,lng:xxxxx}
          /// </summary>
          Convert_GCJ02_To_BD09: function (point) {
              var x = point.lng, y = point.lat;
              var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * MapConvert.x_pi);
              var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * MapConvert.x_pi);
              point.lng = z * Math.cos(theta) + 0.0065;
              point.lat = z * Math.sin(theta) + 0.006;
          },
          /// <summary>
          /// 百度地图对应的 BD09 协议坐标，转到 中国正常坐标系GCJ02协议的坐标
          /// </summary>
          Convert_BD09_To_GCJ02: function (point) {
              var x = point.lng - 0.0065, y = point.lat - 0.006;
              var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * MapConvert.x_pi);
              var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * MapConvert.x_pi);
              point.lng = z * Math.cos(theta);
              point.lat = z * Math.sin(theta);
              console.log(point)
          }
      }
      // end

      var myGeo2 = new BMap.Geocoder();  //根据名称调用百度api获取坐标
      myGeo2.getPoint(_this.swiperInfo1.address, function(point){
          // console.log(point)
          MapConvert.Convert_BD09_To_GCJ02(point);

          // 调用微信地图
          _this.$wx.openLocation({
              latitude: point.lat, // 纬度，浮点数，范围为90 ~ -90
              longitude:point.lng, // 经度，浮点数，范围为180 ~ -180。
              name:_this.swiperInfo1.address, // 位置名
              address: _this.swiperInfo1.address, // 地址详情说明
              scale: 20, // 地图缩放级别,整形值,范围从1~28。默认为最大
              infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
          });


      });


    }
  },
  watch:{
  }
}
</script>

<style lang="less">
#khdetail{
  .tab-box{
    .tab-content{
      .pops{
        position: fixed;
        left: 0;
        top:50%;
        width:100%;
        height:100%;
        background-color: rgba(0, 0, 0, 0);
      }
    }
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
        font-weight: 300;
        color: #3079D5;
        margin:14px 0;
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

          border-radius: 100%;
          height: @h;
          width: 4rem;
          // line-height: @h;
          font-size: 0.8rem;
          display: inline-block;
          margin:0 2px;
          i{
             color: #3079D5 ;
            font-size: 1.7rem;
          }
          .alt{
            color: #666;
            display: block;
            margin-top: 3px;
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
            width: 20%;
            padding:0 2%;
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

}

</style>
