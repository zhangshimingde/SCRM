<template>
  <div id="analysisachive" >
    <div class='cm-group fixed tab-sw'>
      <tab active-color="#0992FF" bar-active-color="#0992FF">
        <tab-item :selected="index==0" @on-item-click="index=0">业绩动态分析</tab-item>
        <tab-item :selected="index==1" @on-item-click="index=1">业绩结构分析</tab-item>
        <tab-item :selected="index==2" @on-item-click="index=2">产品结构分析</tab-item>
      </tab>
    </div>
    
	

    <div class="table-wrap" style="padding-top:42px">
        <tab1 v-if="index==0"></tab1>
        <tab2 v-else-if="index==1"></tab2>
        <tab3 v-else-if="index==2"></tab3>
    </div>
  </div>
</template>

<script>
import tab1 from "../../../components/analysisachive/tab1"
import tab2 from "../../../components/analysisachive/tab2"
import tab3 from "../../../components/analysisachive/tab3"
import { Tab, TabItem } from 'vux'
export default {
  name: 'analysisachive',
  created(){
  },
  data(){
  	return{
  		index:0
  	}
  },
  components: {
  	Tab, TabItem,tab1,tab2,tab3
  },
  methods:{
  }
}
</script>

<style lang="less">
@import '../../../assets/less/exports.less';
  .table-wrap{
  	padding: 10px 0;
  }
</style>