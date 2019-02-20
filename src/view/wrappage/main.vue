<template>
  <div id="main" class=''>

    <transition name='fade' mode="out-in">
    	<keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <foot></foot>

    <floatBtn :list="list" v-show="list.length>0"></floatBtn>
  </div>
</template>
<style>


</style>
<script>
import foot from '../../components/footer'
import router from '../../router/index'
import floatBtn from '../../components/floatBtn'
import { mapActions } from "vuex";
export default {
  name: 'mains',
  created(){
    this.getMenu();
  },
  data(){
    return{
      list: []
    }
  },
  components: {
    foot,floatBtn
  },
  methods:{
    ...mapActions(["setRootList","setPanelList"]),
    getMenu() {
      this.$http.post("/api/EnergizeSaleCommon/GetUserNavigation").then(res => {
        // console.log(res);

        if (res.Data) {

          this.list = res.Data.map(el => {
            return el.Chn;
          });
          this.$store.dispatch("setRootList", this.list);
          this.setPanelList(this.list);
        }
      });
    },
    setPanelList(list){//仪表盘入口展示权限
      let panelList=[];
      list.map(el=>{
        // console.log(el)
        switch(el){
          case '销售排行':panelList.unshift({ICO: "xiaoshoupaihang",Name: "销售排行",Type: "saleRank"});break;
          case '业绩达成':panelList.unshift({ICO: "yejidacheng",Name: "业绩达成",Type: "getachive"});break;
          case '业绩分析':panelList.unshift({ICO: "yejifenxi",Name: "业绩分析",Type: "analysisachive"});break;
          case '销售分析':panelList.unshift({ICO: "xiaoshoufenxi",Name: "销售分析",Type: "analysissale"});break;
          case '营销效能分析':panelList.unshift({ICO: "yingxiaoxiaonengfenxi",Name: "营销效能分析",Type: "analysiseffect"});break;
          case '异常分析':panelList.unshift({ICO: "yichangfenxi",Name: "异常分析",Type: "analysiserror"});break;
          case '市场报表':panelList.unshift({ICO: "shichangbaobiao",Name: "市场报表",Type: "marketreport"});break;
        }
      })
      this.sortList(panelList);
      // console.log(panelList);
      this.$store.dispatch("setPanelList", panelList);
    },
    sortList(objs){
      objs.sort((a,b)=>{
        // order是规则  objs是需要排序的数组
        var order = ['销售排行','业绩达成','业绩分析','销售分析','营销效能分析','异常分析','市场报表'];
        return order.indexOf(a.Name) - order.indexOf(b.Name);
      })

    }
  }
}
</script>
