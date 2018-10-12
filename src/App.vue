<template>
  <div id="app" class='full'>

    <loading v-model="isLoading" text="页面加载中.."></loading>

    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    <router-view></router-view>

  </div>
</template>

<script>
import { Loading } from 'vux'
// import { mapState } from 'vuex'
export default {
  name: 'app',
  created(){
      this.getWx();
  },
  methods:{
    getWx(){
        // 配置jssdk
        // let url;
        // if(window.location.href.indexOf("?")>-1){
        //   url=(window.location.href.split('?')[0])
        // }else{
        //   url=(window.location.href.split('#')[0])
        // }
        this.$http.get("/api/AppUser/getSignature",{
          params:{
            url:window.location.href.split('#')[0]
          }
        })
        .then((res)=>{
          var data=res.Data;
          this.$wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId:data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
              timestamp: data.timestamp , // 必填，生成签名的时间戳
              nonceStr:  data.nonceStr, // 必填，生成签名的随机串
              signature: data.signature,// 必填，签名，见附录1
              jsApiList: ['chooseImage','uploadImage','checkJsApi','startRecord','stopRecord','translateVoice','openLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });

        })


        this.$wx.ready(()=>{
            this.$wx.checkJsApi({
            jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function(res) {
                  // console.log(res);
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                }
            });
        });
    }
  },
  components: {
    Loading
  },
  computed: {
    // 以下是两种写法
    // ...mapState({
    //   isLoading: state => state.vux.isLoading
    // })
    isLoading(){
      return this.$store.state.vux.isLoading
    }
  },
  watch: {
    $route(val) {
      this.getWx();  //第一次进页面的时候，请求数据时url没有加home,然后根路由会自动带上/home，导致计算签名的域名和实际域名不一致。所以要在这里检测域名重新获取签名
    }
  }
}
</script>

<style lang="less">
html,body,#app{
  width:100%;
  height:100%;
}
.fadein-enter,.fadein-leave-to{
	opacity: 0;
}
.fadein-enter-active,.fadein-leave-active{
	transition:all 0.1s;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.1s;
}
// .fade-enter{
//   opacity: 0;
//   position: absolute;
//   top: 0;
//   transform: translateX(100%);
// }
// .fade-leave-to {
//   transform: translateX(-100%);
//   opacity: 0;
//   position: absolute;
//   top: 0;
// }
.fade-enter{
  opacity: 0;
  transform: translateX(7px);
}
.fade-leave-to {
  transform: translateX(7px);
  opacity: 0;
}
</style>
