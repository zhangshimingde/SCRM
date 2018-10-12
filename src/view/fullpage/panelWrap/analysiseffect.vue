<template>
  <div id="analysiseffect" class='cm-group'>
    <div class='cm-group fixed tab-sw'>
      <tab active-color="#0992FF" bar-active-color="#0992FF">
        <tab-item :selected="index==0" @on-item-click="changeTab(0)">线索转化</tab-item>
        <tab-item :selected="index==1" @on-item-click="changeTab(1)">商机转化</tab-item>
      </tab>
    </div>

    
    <div class="table-wrap" style="padding-top:42px">
      <tab1 v-if="index==0" :dateType="date"></tab1>
      <tab2 v-else-if="index==1" :dateType="date"></tab2>
    </div>
  </div>
</template>

<script>
import tab1 from "../../../components/analysiseffect/tab1"
import tab2 from "../../../components/analysiseffect/tab2"
import { Tab, TabItem} from 'vux'
export default {
  name: 'analysiseffect',
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
      date:this.$route.params.date||"month",
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