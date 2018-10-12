<template>
    <div id="tab1">
        <template  v-if="!loading">
          <div class="charts-rwap relative" style="">
              <p class="text_right chart-dw" style="padding-top:1rem;font-size:0.9rem;padding-right:1rem;color:#999">(单位：个)</p>
              <charts id="tab11-charts" @changeBar="changeBar" styles="width:100%;height:19rem;margin:0 auto" :option="echartsOptions"></charts>
          </div>
          <div class="table-wrap clearfix">

            <div class="clearfix" v-show="rankType=='员工'&&type!='all'">
              <div class="text_right right" @click="toWarn" style="padding:5px 10px;color:#999;border:1px solid #999;border-radius:5px;font-size:0.8rem;margin:5px">
                查看明细
              </div>
            </div>

            <group>
              <cell  v-for="(item,index) in tableData" :key="index" v-if="filterData(item)" >
                <p slot="title" class="overflow" @click="getDetail(item)">
                  <span class="left">{{item.NodeName}}</span>
                  <span class="right" v-if="type=='all'">{{item.totalCount}}</span>
                  <span class="right" v-else-if="type=='签约前两周新增商机'">{{item.TowWeekQYCount}}</span>
                  <span class="right" v-else-if="type=='跟进周期超过3个月以上商机'">{{item.More90DayCount}}</span>
                  <span class="right" v-else-if="type=='预计成交日期小于当前日期商机'">{{item.OverPredictTradeTimeCount}}</span>
                  <span class="right" v-else-if="type=='当前阶段停留超过30天商机'">{{item.Over30dayStateCount}}</span>
                  <span class="right" v-else-if="type=='跟进超过1个月线索'">{{item.GJZClueCount}}</span>
                </p>

              </cell>
            </group>
          </div>
        </template>
        <template v-else >
          <p class="text_center" style="padding:40px 0">
            <inline-loading></inline-loading>
            <span style="color:#9d9d9d">数据加载中</span>
          </p>

        </template>
    </div>
</template>

<script>
// import { Selector ,Group } from "vux"
import { XTable, Selector ,Group,Cell  ,InlineLoading } from 'vux'
import charts from "../charts/charts"
var _this;
export default {
  name: '',
  mounted(){
    _this=this;
    this.getData();

    window.addEventListener("popstate", ()=> {
      // console.log("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
      if(this.rankType=="公司") return;
      if(this.rankType=="员工"){
        this.rankType="部门";
        this.id=this.tempId;
      }else if(this.rankType=="部门"){
        this.rankType="公司";
        this.id="";
      }
      this.getData();
    }, false);
  },
  components:{
    XTable, Selector ,Group,Cell,charts,InlineLoading
  },
  computed:{
    echartsOptions(){
      return{
        color:['#4CC5F1'],
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              },
              confine:true,
              formatter: function(a,b,c) {
                _this.changeBar(a[0])
                // return a[0].data;
              }
          },
          grid: {
              left: '1%',
              right: '4%',
              bottom: '3%',
              top:'15%',
              containLabel: true
          },
          xAxis: {
              type: 'value',
              axisLine: {
                  lineStyle: {
                      type: 'solid',
                      color: '#fff',//左边线的颜色
                      width:'1'//坐标线的宽度
                  }
              },
              axisTick:{
                show:false
              },
              axisLabel: {
                textStyle: {
                    color: '#666',//坐标值得具体的颜色

                },
                rotate:45
              },
          },
          yAxis: {
              type: 'category',
              axisLine: {
                  lineStyle: {
                      type: 'solid',
                      color: '#ccc',//左边线的颜色
                      width:'1'//坐标线的宽度
                  }
              },
              axisTick:{
                show:false
              },
              axisLabel: {
                textStyle: {
                    color: '#666',//坐标值得具体的颜色

                }
              },
              data: ['签约前两周新增商机','跟进周期超过3个月以上商机','预计成交日期小于当前日期商机','当前阶段停留超过30天商机','跟进超过1个月线索']
          },
          series: [
              {
                  name: '异常预警',
                  type: 'bar',
                  barWidth:'60%',
                  data: this.chartData,
                  label:{
                    normal: {
                              show: true,
                              position: 'inside',
                              fromatter:"{b}: {c}"
                          }
                  }
              }
          ]
      }
    }
  },
  data(){
    return{
      tempId:"",
      loading:false,
      firstTime:true,
      chartData:[0,0,0,0,0],
      tableData:[],
      rankType:"", //取数参数,查询层级
      id:"",//取数参数，当前点击的数据行id
      type:"all"
    }
  },
  methods:{
    pushState(){
      window.history.pushState(null, null, "");
    },
    toWarn(){
      let name,title,type;
      // console.log(this.type)
      switch(this.type){
        case '签约前两周新增商机':name='warnsj';type='TowWeekQY';title='商机异常分析'; break;
        case '跟进周期超过3个月以上商机':name='warnsj';type='More90Day';title='商机异常分析'; break;
        case '预计成交日期小于当前日期商机': name='warnsj';type='OverPredictTradeTime';title='商机异常分析';break;
        case '当前阶段停留超过30天商机': name='warnsj';type='Over30dayState';title='商机异常分析';break;
        case '跟进超过1个月线索': name='warnxs';type='FollowMore30Day';title='线索异常分析';break;
      }
      // console.log(name,title,this.id);
      // return;
      this.$router.push({
        name:name,
        params:{
          title:title,
          type:type,
          id:this.id
        }
      })
    },
    getData(){
      this.loading=true;
      this.type="all";
      this.tableData=[];
      this.$http.post("/api/EnergizeSaleBulletin/GetAbnormalOpportunities",{
        SaleYear:"",
        NodeGUID:this.id,
        GroupBy:this.rankType
      })
      .then((res)=>{
        // console.log(res);
        this.tableData=[];
        this.loading=false;
        if(this.firstTime){
            this.firstTime=false;
            this.rankType=res.GroupBy   //层级赋值
        }
        // this.sortByKey(this.tableData,key)
        res.Data.map((el)=>{
          el.totalCount=el.More90DayCount+el.Over30dayStateCount+el.OverPredictTradeTimeCount+el.TowWeekQYCount+el.GJZClueCount
        })

        this.tableData=res.Data;
        this.sortByKey(this.tableData, 'totalCount')
        this.fillChartData(res.Data);

      })

    },
    fillChartData(res){
      this.chartData=[0,0,0,0,0];
      res.map((el)=>{
        this.chartData[4]+=el.GJZClueCount;
        this.chartData[3]+=el.Over30dayStateCount;
        this.chartData[2]+=el.OverPredictTradeTimeCount;
        this.chartData[1]+=el.More90DayCount;
        this.chartData[0]+=el.TowWeekQYCount;
      })
      // console.log(res)
    },
    changeBar(params){
      // console.log(params)
      this.type=params.name;
      switch(this.type){
        case '签约前两周新增商机':this.sortByKey(this.tableData, 'TowWeekQYCount');break;
        case '跟进周期超过3个月以上商机':this.sortByKey(this.tableData, 'More90DayCount');break;
        case '预计成交日期小于当前日期商机':this.sortByKey(this.tableData, 'OverPredictTradeTimeCount');break;
        case '当前阶段停留超过30天商机':this.sortByKey(this.tableData, 'Over30dayStateCount');break;
        case '跟进超过1个月线索':this.sortByKey(this.tableData, 'GJZClueCount');break;
      }
    },
    filterData(item){ //过滤掉为0的数据
      if((this.type=='签约前两周新增商机'&&item.TowWeekQYCount==0)||(this.type=='跟进周期超过3个月以上商机'&&item.More90DayCount==0)||
      (this.type=='预计成交日期小于当前日期商机'&&item.OverPredictTradeTimeCount==0)||(this.type=='当前阶段停留超过30天商机'&&item.Over30dayStateCount==0)||
      (this.type=='跟进超过1个月线索'&&item.GJZClueCount==0)){
        return false;
      }else{
        return true;
      }
    },
    getDetail(item){
      this.id=item.NodeGUID;
      this.type="all";
      // alert(this.id)
      if(this.rankType=="公司"){
        this.tempId=item.NodeGUID;
        this.rankType="部门";
        this.pushState();
      }else if(this.rankType=="部门"){
        this.rankType="员工";
        this.pushState();
      }else if(this.rankType=="员工"){
        return ;
      }
      this.getData();
    },
    sortByKey(array, key) {  //模块排序(降序)
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
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
