<template>
  <div id="saleRank" class=''>
    <div class="fixed tab-sw">
      <tab active-color="#0992FF"  bar-active-color="#0992FF">
        <tab-item :selected="index==0" @on-item-click="changeTab(0)">签约预算</tab-item>
        <tab-item :selected="index==1" @on-item-click="changeTab(1)">回款预算</tab-item>
        <tab-item :selected="index==2" @on-item-click="changeTab(2)">月度款项</tab-item>
      </tab>
    </div>
    
	

	<div class="table-wrap content-sw">
    
    <tab1 v-if="index==0" :dateType="date"></tab1>
    <tab2 v-else-if="index==1" dateType="year"></tab2>
    <tab3 v-else-if="index==2" dateType="month"></tab3>
	<!-- 	<swiper :aspect-ratio="300/800" v-model="index" :show-dots="false">
      <swiper-item class="swiper-demo-img">
        <tab1 :dateType="date"></tab1>
      </swiper-item>
      <swiper-item class="swiper-demo-img">
        <tab2 :dateType="date"></tab2>
      </swiper-item>
      <swiper-item class="swiper-demo-img">
        <tab3 dateType="month"></tab3>
      </swiper-item>
    </swiper> -->
	</div>
    
  </div>
</template>

<script>
import { Tab, TabItem,Swiper,SwiperItem } from 'vux'
import tab1 from "../../../components/getachive/tab1"
import tab2 from "../../../components/getachive/tab2"
import tab3 from "../../../components/getachive/tab3"
export default {
  name: 'main',
  created(){
  },
  beforeCreate () {
    document.querySelector('html').setAttribute('style', 'background:#fff')
  },
  beforeDestroy () {
    document.querySelector('html').setAttribute('style', 'background:#F6F6F6')
  },
  data(){
  	return{
  		index:this.$route.params.index||0,
      date:this.$route.params.date||"year",
  	}
  },
  components: {
  	Tab, TabItem,tab1 ,Swiper,SwiperItem,tab2,tab3
  },
  methods:{
    changeTab(index){
      this.index=7;
      setTimeout(()=>{
        this.index=index;
      }, 200)
      
    }
  },
  computed:{
    
  }
}
</script>

<style lang="less">

</style>