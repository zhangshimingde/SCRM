<template>
  <div>
    <template v-if="!loading">
          <p class="cm-padding dw">单位：万元</p>
          <x-table :cell-bordered="false" style="background-color:#fff;">
            <thead>
              <tr>
                <th>姓名</th>
                <th @click="changeSort('签约金额')">签约金额 <i class="iconfont icon-arrow" v-if="sortType=='签约金额'"></i></th>
                <th @click="changeSort('回款金额')">回款金额 <i class="iconfont icon-arrow" v-if="sortType=='回款金额'"></i></th>
                <th @click="changeSort('商机成交率')">商机成交率 <i class="iconfont icon-arrow" v-if="sortType=='商机成交率'"></i></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in tableData" v-if="tableData.length>0" :key="index">
                <td style="text-align:left;padding-left:5px;box-sizing:border-box">
                  <span class="jiang inline_block" v-if="index==0"><i class="iconfont icon-iconfont-jiangbei" style="color:#FFB415"></i></span>
                  <span class="jiang inline_block" v-else-if="index==1"><i class="iconfont icon-iconfont-jiangbei" style="color:#9B9B9B"></i></span>
                  <span class="jiang inline_block" v-else-if="index==2"><i class="iconfont icon-iconfont-jiangbei" style="color:#8B572A"></i></span>
                  <span class="rank inline_block" v-else>{{index+1}}</span>
                  {{item.MyName}}
                </td>
                <td>{{item.SaleAmount | fix}}</td>
                <td>{{item.HKAmount | fix}}</td>
                <td>{{(item.OpptunititesRatio*100).toFixed(0)}}%</td>
              </tr>
              <tr v-if="tableData.length==0" class="relative text_center">
                <p class="absolute text_center" style="width: 100%;">暂无数据..</p>
              </tr>
            </tbody>
          </x-table>
    </template>
    <template v-else >
      <p class="text_center" style="padding:40px 0;">
        <inline-loading></inline-loading>
        <span style="color:#9d9d9d">数据加载中</span>
      </p>
      
    </template>
  </div>
    
</template>

<script>
// import { Selector ,Group } from "vux"
import { XTable,InlineLoading,numberComma } from 'vux'
export default {
  name: '',
  created(){
    this.getData();
  },
  components:{
    XTable,InlineLoading,numberComma
  },
  data(){
    return{
      sortType:"签约金额",
      loading:true,
      tableData:[
      ],
    }
  },
  filters:{
    fix(val){
        return numberComma(val.toFixed(2))
    }
  },
  methods:{
    getData(){
      this.$http.post('/api/EnergizeSaleBulletin/GetSaleTop',{

            Orderby:"",
            Type:"个人"
  
      })
      .then((res)=>{
        console.log(res)
        this.tableData=res.Data;
        this.loading=false;
        this.sortList(this.sortType);
      })
    },
    sortList(type){
      var key="";
      switch(type){
        case "签约金额": key="SaleAmount";break;
        case "回款金额": key="HKAmount";break;
        case "商机成交率": key="OpptunititesRatio";break;
      }
      this.sortByKey(this.tableData,key)
    },
    changeSort(val){
      this.sortType=val;
    },
    sortByKey(array, key) {  //模块排序(降序)
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
    }
  },
  watch:{
    sortType:{
      handler(val,old){
        this.sortList(val)
      },
      deep:true
    }
  }
}
</script>

<style lang="less">
.analy-link-wrap{
  height:40px;
  line-height: 40px;
  padding-left: 0.5rem;
  font-size: 0.9rem;
  span{
    &.active{
      color: #0992FF
    }
  }
}
</style>
