<template>
  <div id="analysissale" >
    <div class="fixed tab-sw">
      <tab active-color="#0992FF"  bar-active-color="#0992FF">
        <tab-item :selected="index==0" @on-item-click="index=0">销售预测</tab-item>
        <tab-item :selected="index==1" @on-item-click="index=1">销售漏斗</tab-item>
      </tab>
    </div>
    <div class="table-wrap content-sw">
      <!-- <p class="cm-padding dw">单位：万元</p> -->
      <tab1 v-if="index==0"></tab1>
      <tab2 v-else-if="index==1"></tab2>
    </div>

  </div>
</template>

<script>
import { Tab, TabItem} from 'vux'
import tab1 from "../../../components/analysissale/tab1"
import tab2 from "../../../components/analysissale/tab2"
export default {
  name: 'analysissale',
  created(){
  },
  // beforeCreate () {
  //   document.querySelector('html').setAttribute('style', 'background:#fff')
  // },
  // beforeDestroy () {
  //   document.querySelector('html').setAttribute('style', 'background:#F6F6F6')
  // },
  data(){
    return{
      index:0
    }
  },
  components: {
    Tab, TabItem,tab1 ,tab2
  },
  methods:{
  }
}
</script>

<style lang="less">
@import '../../../assets/less/exports.less';

</style>
