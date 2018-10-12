<template>
  <div id="mine" class=''>
    <group style="margin:0 0 1rem 0"  class="mine_content">
      <cell is-link link="">
        <p slot="title"><span style="margin-right:10px">{{person.name}}</span><br><span style="margin-right:10px;color:#999">{{person.station}}</span></p>
        <!-- <img slot="icon" width="60" style="display:block;margin-right:5px;" :src="person.avater"> -->
        <div slot="icon" width="60"  style="background-size:cover;background-position:center;width: 60px;height: 60px; margin-right:8px;border-radius:7px" :style="{backgroundImage:'url('+person.avater+')'}"></div>
        <div slot="child" style="right:3rem" class="absolute">
          <img style="height: 2rem;vertical-align:middle" :src="person.icon">
        </div>
      </cell>
    </group>

    <group style="margin-bottom:15px">
      <cell is-link :link="{name:card.route}" >
        <p slot="title"><span style="margin-right:10px">{{card.title}}</span></p>
        <!-- <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="card.icon"> -->
        <i class="iconfont mine-icon" :class="card.icon" slot="icon" style="font-size:1.2rem" :style="{color:card.color}"></i>
      </cell>
    </group>
    <group style="margin-bottom:15px">
      <cell is-link link="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfe3aa6c1dd22f053&redirect_uri=https://mp.mingyuanyun.com/__oauth2-mobile/wx-callback-rl&response_type=code&scope=snsapi_base#wechat_redirect"  >
        <p slot="title"><span style="margin-right:10px">{{richeng.title}}</span></p>
        <!-- <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="card.icon"> -->
        <i class="iconfont mine-icon" :class="richeng.icon" slot="icon" style="font-size:1.2rem" :style="{color:richeng.color}"></i>
      </cell>
      <cell is-link link="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfe3aa6c1dd22f053&redirect_uri=https://mp.mingyuanyun.com/__oauth2-mobile/wx-callback-weekly&response_type=code&scope=snsapi_base#wechat_redirect" >
        <p slot="title"><span style="margin-right:10px">{{zhoubao.title}}</span></p>
        <!-- <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="card.icon"> -->
        <i class="iconfont mine-icon" :class="zhoubao.icon" slot="icon" style="font-size:1.2rem" :style="{color:zhoubao.color}"></i>
      </cell>
      <cell is-link v-for="(item,index) in listData" :link="{name:item.route,params:{type:item.type}}" :key="index">
        <p slot="title"><span style="margin-right:10px">{{item.title}}</span></p>
        <!-- <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="item.icon"> -->
        <i class="iconfont mine-icon" :class="item.icon" slot="icon" :style="{color:item.color}"></i>
      </cell>
    </group>
    <group>
      <cell is-link :link="{name:recent.route,params:{type:recent.type}}">
        <p slot="title"><span style="margin-right:10px">{{recent.title}}</span></p>
        <!-- <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="recent.icon"> -->
        <i class="iconfont mine-icon" :class="recent.icon" :style="{color:recent.color}"  slot="icon"></i>
      </cell>
    </group>
  </div>
</template>
<style lang="less">
.mine-icon{
  display:block;
  margin-right:15px;
  font-size:1.3rem;
}

</style>
<script>
import router from "../../../router"
import { Cell,Group,Badge  } from 'vux'
export default {
  name: 'mine',
  created(){
    this.getUserData();
  },
  components: {
    Cell,Group,Badge 
  },
  data(){
    return {
      person:{
        name:"明小源",
        station:"研发工程师",
        avater:"static/img/avater.png",
        icon:"static/img/qr.png"
      },
      card:{
        title:"名片夹",
        route:"mingpianjia",
        icon:"icon-mingpianjia",
        color:"#0F8EE9"
      },
      richeng: {
          title:"我的日程",
          route:"",
          icon:"icon-richeng",
          color:"#0CC9AD",
          type:"",
        },
      zhoubao:{
        title:"我的周报",
        route:"",
        icon:"icon-zhoubao",
        color:"#FFB415",
        type:""
      },
      listData:[
        {
          title:"我的关注",
          route:"cmtabwrap",
          icon:"icon-guanzhu",
          color:"#E75647",
          type:"我的关注"
        }
      ],
      recent:{
        title:"最近浏览",
        route:"cmtabwrap",
        icon:"icon-zuijinliulan",
        color:"#0F8EE9",
        type:"最近浏览"
      }
    }
  },
  methods:{
    getUserData(){
      this.$http.get("/api/EnergizeSaleUser/WeiXinUserInfo")
      .then((res)=>{
        // console.log(res)
        this.person.name=res.Data.UserName_Chn;
        // this.person.station=res.Data.UserName_Chn;
        this.person.avater=res.Data.UserIcon;
        this.person.station=res.Data.Station;

      })
    },
  
  }
}
</script>
<style lang="less">
  #mine{
    .mine_content{
      .weui-cells{
        margin-top:0;
      }
    }
  }
</style>
