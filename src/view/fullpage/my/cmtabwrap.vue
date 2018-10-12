<template>
  <div class=''>
    <div class="fixed tab-sw">
      <tab active-color="#0992FF"  bar-active-color="#0992FF">
        <tab-item :selected="index==0" @on-item-click="index=0">商机</tab-item>
        <tab-item :selected="index==1" @on-item-click="index=1">客户</tab-item>
      </tab>
    </div>
  	<div class="table-wrap content-sw" style="padding:0 !important">
      <tab1 v-if="index==0"></tab1>
      <tab2 v-else-if="index==1"></tab2>
  	</div>
    
  </div>
</template>

<script>
import { Tab, TabItem,Swiper,SwiperItem } from 'vux'
import tab1 from "./cmtab/shangji"
import tab2 from "./cmtab/kehu"
export default {
  name: 'cmtabwrap',
  created(){
  },
  beforeCreate () {
    document.querySelector('html').setAttribute('style', 'background:#fff');
    document.title=this.$route.params.type;
  },
  beforeDestroy () {
    document.querySelector('html').setAttribute('style', 'background:#F6F6F6');
    document.title="我的";
  },
  data(){
  	return{
  		index:0
  	}
  },
  components: {
  	Tab, TabItem,tab1 ,Swiper,SwiperItem,tab2
  },
  methods:{
  }
}
</script>

<style lang="less">
</style>