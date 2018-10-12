<template>
  <div id="analysiserror" class=''>
    <div class='cm-group fixed tab-sw'>
      <tab active-color="#0992FF" bar-active-color="#0992FF">
        <tab-item :selected="index==0" @on-item-click="changeTab(0)">异常预警</tab-item>
        <tab-item :selected="index==1" @on-item-click="changeTab(1)">非成交关闭商机分布</tab-item>
      </tab>
    </div>

    
    <div class="table-wrap" style="padding-top:42px">
      <tab1 v-if="index==0"></tab1>
      <tab2 v-else-if="index==1"></tab2>
    </div>
  </div>
</template>

<script>
import tab1 from "../../../components/analysiserror/tab1"
import tab2 from "../../../components/analysiserror/tab2"
import { Tab, TabItem} from 'vux'
export default {
  name: 'analysiserror',
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
    tab1,tab2,Tab, TabItem
  },
  methods:{
    changeTab(index){
      this.index=7;
      setTimeout(()=>{
        this.index=index;
      }, 200)
      
    }
  }
}
</script>

<style lang="less">
@import '../../../assets/less/exports.less';
  .table-wrap{
    padding: 10px 0;
  }
  
</style>