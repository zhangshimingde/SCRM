<template>
  <div id="home" class=''>
    <div class="fixed" style="width:100%;top: 0;left: 0;z-index:2">
        <search ref="search" @on-focus="sear" placeholder="搜索"></search>
        <!-- <i class="iconfont icon-yuyin1 absolute global-yy" @click="yy"></i> -->
    </div>
    <div style="height: 45px;"></div>
    <chosePopup></chosePopup>
    <overview></overview>
    <homeList></homeList>
  </div>
</template>

<script>
import chosePopup from '../../../components/home/chosePopup'
import overview from '../../../components/home/overview'
import homeList from '../../../components/home/homeList'
import { Search } from 'vux'
export default {
  name: 'home',
  created(){
    var _this=this;
        // _this.$http.get("/api/EnergizeSaleTest/GetTest").then(function(response){})
  },
  components: {
    chosePopup,overview,homeList,Search
  },
  data(){
    return{
      key:""
    }
  },
  methods:{
    sear(){
      this.$router.push({name:"search",params:{yy:false}})
    },
    yy(){
      this.$router.push({name:"search",params:{yy:true}})
    }
  }
}
</script>
<style lang="less">

</style>