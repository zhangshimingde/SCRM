<template>
    <div id="tab1">
          <div class="charts-rwap relative" style="" v-show="!loading">
              <p class="text_right chart-dw" style="padding-top:0.9rem;font-size:0.9rem;padding-right:1rem;color:#999">(单位：个)</p>
              <datepicker @changeDates="changeDates" class="absolute cm-date-picker"/>
          </div>
        <template  v-if="!loading">
          <charts id="tab11-charts" @changeBar="changeBar" styles="width:100%;height:19rem;margin:0 auto" :option="echartsOptions"></charts>
          <div class="table-wrap clearfix">

            <div class="clearfix" v-show="rankType=='员工'&&type!='all'&&zeroData!=0">
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
                  <span class="right" v-else-if="type=='商机超过两周未跟进'">{{item.NoFollowDynamicBy2WeekCount}}</span>
                  <span class="right" v-else-if="type=='逾期未成交商机'">{{item.OverPredictTradeTimeCount}}</span>
                  <span class="right" v-else-if="type=='当前阶段停留超过30天商机'">{{item.Over30dayStateCount}}</span>
                  <span class="right" v-else-if="type=='线索超过一个月未判断有效性'">{{item.NoValidityBy1MonthCount}}</span>
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
import datepicker from '@/components/common/datepicker'
import datepickerCmData from '@/mixins/datepicker'
var _this;
export default {
  name: '',
  mounted(){
    _this=this;
    this.getData();

    window.addEventListener("popstate", ()=> {
      // console.log(this.$route)
      if(this.$route.name!='analysiserror')return;
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
  activated() {
    this.getData();
  },
  mixins:[datepickerCmData],
  components:{
    XTable, Selector ,Group,Cell,charts,InlineLoading,datepicker
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
              data: ['签约前两周新增商机','逾期未成交商机','当前阶段停留超过30天商机','商机超过两周未跟进','线索超过一个月未判断有效性']
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
      zeroData:0,
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
        case '商机超过两周未跟进':name='warnsj';type='NoFollowDynamicBy2Week';title='商机异常分析'; break;
        case '逾期未成交商机': name='warnsj';type='OverPredictTradeTime';title='商机异常分析';break;
        case '当前阶段停留超过30天商机': name='warnsj';type='Over30dayState';title='商机异常分析';break;
        case '线索超过一个月未判断有效性': name='warnxs';type='NoValidityBy1Month';title='线索异常分析';break;
      }
      // console.log(name,title,this.id);
      // return;

      let current=this.GetDateTimeStr(0);
      let datetype;
      // if(type=='OverPredictTradeTime'){
      //   datetype=`${this.dateRange[0]}~${current}`;
      // }else{
        datetype=`${this.dateRange[0]}~${this.dateRange[1]}`;
      // }

      this.$router.push({
        name:name,
        params:{
          title:title,
          type:type,
          id:this.id,
          // areaId:this.tempId,
          date:datetype
        }
      })
    },
    GetDateTimeStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
        var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
        var h= dd.getHours()<10?"0"+dd.getHours():dd.getHours();
        var min= dd.getMinutes()<10?"0"+dd.getMinutes():dd.getMinutes();
        var s= dd.getSeconds()<10?"0"+dd.getSeconds():dd.getSeconds();
        return y+"-"+m+"-"+d+" "+h+":"+min+":"+s;
    },
    getData(){
      this.loading=true;
      this.type="all";
      this.tableData=[];
      this.$http.post("/api/EnergizeSaleBulletin/GetAbnormalOpportunities",{
        SaleYear:"",
        NodeGUID:this.id,
        GroupBy:this.rankType,
        sdate:this.dateRange[0],
        edate:this.dateRange[1]
      })
      .then((res)=>{
        // console.log(res);
        this.tableData=[];
        this.loading=false;
        if(this.firstTime){


            // 单个区域负责人，或者是部门负责人进来，永远的拿不到区域id，所以这里获取这个人所在的区域
            if(res.GroupBy=="部门"||res.GroupBy=="员工"){
              this.tempId=res.BUGUID;
            }
            // end

            this.firstTime=false;
            this.rankType=res.GroupBy   //层级赋值
        }
        // this.sortByKey(this.tableData,key)
        res.Data.map((el)=>{
          el.totalCount=el.NoFollowDynamicBy2WeekCount+el.Over30dayStateCount+el.OverPredictTradeTimeCount+el.TowWeekQYCount+el.NoValidityBy1MonthCount
        })

        this.tableData=res.Data;
        this.sortByKey(this.tableData, 'totalCount')
        this.fillChartData(res.Data);

      })

    },
    fillChartData(res){
      this.chartData=[0,0,0,0,0];
      res.map((el)=>{
        this.chartData[4]+=el.NoValidityBy1MonthCount;
        this.chartData[2]+=el.Over30dayStateCount;
        this.chartData[1]+=el.OverPredictTradeTimeCount;
        this.chartData[3]+=el.NoFollowDynamicBy2WeekCount;
        this.chartData[0]+=el.TowWeekQYCount;
      })
      // console.log(res)
    },
    changeBar(params){
      // console.log(params)
      this.zeroData=params.data;
      this.type=params.name;
      switch(this.type){
        case '签约前两周新增商机':this.sortByKey(this.tableData, 'TowWeekQYCount');break;
        case '商机超过两周未跟进':this.sortByKey(this.tableData, 'NoFollowDynamicBy2WeekCount');break;
        case '逾期未成交商机':this.sortByKey(this.tableData, 'OverPredictTradeTimeCount');break;
        case '当前阶段停留超过30天商机':this.sortByKey(this.tableData, 'Over30dayStateCount');break;
        case '线索超过一个月未判断有效性':this.sortByKey(this.tableData, 'NoValidityBy1MonthCount');break;
      }
    },
    filterData(item){ //过滤掉为0的数据
      if((this.type=='签约前两周新增商机'&&item.TowWeekQYCount==0)||(this.type=='商机超过两周未跟进'&&item.NoFollowDynamicBy2WeekCount==0)||
      (this.type=='逾期未成交商机'&&item.OverPredictTradeTimeCount==0)||(this.type=='当前阶段停留超过30天商机'&&item.Over30dayStateCount==0)||
      (this.type=='线索超过一个月未判断有效性'&&item.NoValidityBy1MonthCount==0)){
        return false;
      }else{
        return true;
      }
    },
    getDetail(item){
      if(this.rankType=="员工"){
        return ;
      }
      this.id=item.NodeGUID;
      this.type="all";
      if(this.rankType=="公司"){
        this.tempId=item.NodeGUID;
        this.rankType="部门";
        this.pushState();
      }else if(this.rankType=="部门"){
        this.rankType="员工";
        this.pushState();
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
