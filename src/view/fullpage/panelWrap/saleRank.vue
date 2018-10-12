<template>
  <div id="saleRank" class=''>
    <div class="fixed tab-sw">
      <tab active-color="#0992FF"  bar-active-color="#0992FF">
        <tab-item :selected="index==0" @on-item-click="index=0">公司</tab-item>
        <tab-item :selected="index==1" @on-item-click="index=1">部门</tab-item>
        <tab-item :selected="index==2" @on-item-click="index=2">个人</tab-item>
      </tab>
    </div>
  	<div class="table-wrap content-sw">
      <!-- <p class="cm-padding dw">单位：万元</p> -->
      <tab1 v-if="index==0"></tab1>
      <tab2 v-else-if="index==1"></tab2>
      <tab3 v-else-if="index==2"></tab3>
  		<!-- <swiper :aspect-ratio="300/800" v-model="index" :show-dots="false">
        <swiper-item class="swiper-demo-img">
          <tab1></tab1>
        </swiper-item>
        <swiper-item class="swiper-demo-img">
          <tab2 ></tab2>
        </swiper-item>
        <swiper-item class="swiper-demo-img">
          <tab3 ></tab3>
        </swiper-item>
      </swiper> -->
  	</div>
    
  </div>
</template>

<script>
import { Tab, TabItem,Swiper,SwiperItem } from 'vux'
import tab1 from "../../../components/salerank/tab1"
import tab2 from "../../../components/salerank/tab2"
import tab3 from "../../../components/salerank/tab3"
export default {
  name: 'saleRank',
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
  		index:0
  	}
  },
  components: {
  	Tab, TabItem,tab1 ,Swiper,SwiperItem,tab2,tab3
  },
  methods:{
  }
}
</script>

<style lang="less">
@import '../../../assets/less/exports.less';
// .sortBtn{
//   top:54px;
//   right:10px;
//   span{
//     color: #999;
//     &.active{
//       color: rgb(9, 146, 255)
//     }
//   }
// }
</style>