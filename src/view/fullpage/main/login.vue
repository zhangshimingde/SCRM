<template>
  <div id="login" class=''>
  </div>
</template>
<style lang="less">
</style>
<script>
import route from '../../../router/index'
export default {
  name: 'login',
  created(){
        // alert(window.location.href)
        // if(!window.location.hash.match(/code=(\S*)&/g)){
          window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfe3aa6c1dd22f053&redirect_uri="+encodeURIComponent(window.location.href)+"&response_type=code&scope=snsapi_base&state=Receivables#wechat_redirect"; // code和token都没有，则跳转重新授权

          var timer=setInterval(()=>{

            if(window.location.hash.match(/code=(\S*)&/g)){
              // alert(3)
              clearInterval(timer);
              var str=window.location.hash.match(/code=(\S*)&/g)[0];
              this.$code=str.replace("code=","").replace("&","");
              this.$cmJs.getToken(this,()=>{
                this.$http.defaults.headers.common['Authorization'] =localStorage.getItem("token");
                window.location.reload(true);
              });
            }
          }, 10)

        // }

        

  },
  components: {
  },
  data(){
    return {
    }
  }
}
</script>
