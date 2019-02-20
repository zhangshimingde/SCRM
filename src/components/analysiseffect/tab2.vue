<template>
    <div id="tab1">



          <div class="clearfix analy-header relative" v-show="!loading" style="padding:5px 0">
            <!-- <div class="left analy-link-wrap">
              <span @click="changeType('本月')" :class="activeType=='本月'?'active':''">本月</span>
              <span @click="changeType('年度')" :class="activeType=='年度'?'active':''">年度</span>
            </div> -->
            <datepicker @changeDates="changeDates" class="absolute cm-date-picker"/>
          </div>
        <template  v-if="!loading">
          <div class="charts-rwap relative">
            <p class="text_right chart-dw" style="font-size:0.9rem;padding-right:1rem;color:#999">(单位：个)</p>
            <charts id="tab11-charts" styles="width:100%;height:19rem;margin:0 auto" :option="echartsOptions"></charts>
          </div>
          <div class="table-wrap">
            <x-table class="EffTable" :cell-bordered="false" style="background-color:#fff;">
                  <thead>
                    <tr>
                      <th>{{rankType}}</th>
                      <th>新增</th>
                      <th>跟进中</th>
                      <th>平均跟进周期</th>
                      <th>平均订单金额</th>
                      <th v-if="activeType=='本月'">待签约</th>
                      <th>成交</th>
                      <th>非成交</th>
                      <th>成交率</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in tableData"  @click="getDetail(item)" :key="index">
                      <td>{{item.AreaName}}</td>
                      <td @click="toTranslate(item,'OppNewAdd')" :class="rankType=='员工'?'clickable':''">{{item.XzCount}}</td>
                      <td @click="toTranslate(item,'OppFollow')" :class="rankType=='员工'?'clickable':''">{{item.GJZCount}}</td>
                      <td>{{item.AvgDayCount}}</td>
                      <td>{{item.AvgAmount}}万</td>
                      <td @click="toTranslate(item,'OppBeSign')" :class="rankType=='员工'?'clickable':''" v-if="activeType=='本月'">{{item.DQYCount}}</td>
                      <td @click="toTranslate(item,'OppDeal')" :class="rankType=='员工'?'clickable':''">{{item.CJCount}}</td>
                      <td @click="toTranslate(item,'OppNoDeal')" :class="rankType=='员工'?'clickable':''">{{item.FCJCount}}</td>
                      <td>{{(item.CJRate).toFixed(2)}}%</td>
                    </tr>
                  </tbody>
            </x-table>
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
import { XTable, Selector ,Group  ,InlineLoading } from 'vux'
import charts from "../charts/charts"
import datepicker from '@/components/common/datepicker'
import datepickerCmData from '@/mixins/datepicker'
export default {
  name: '',
  mounted(){
    if(this.dateType=="year"){
       this.activeType="年度";
       this.title=['今年'];
    }else{
      this.activeType="本月";
      this.title=['本月'];
    }
    this.getData();
    window.addEventListener("popstate", ()=> {
        if(this.$route.name!='analysiseffect')return;
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
  mixins:[datepickerCmData],
  components:{
    XTable, Selector ,Group,charts,InlineLoading,datepicker
  },
  computed:{
    echartsOptions(){
      return {
              tooltip: {
                  trigger: 'axis',
                  confine:true,
                  axisPointer: {
                      type: 'shadow'
                  }
              },
              // legend: {
              //     data:this.title,
              //     top:-5,
              //     right:10
              // },
              color:['#51C6EF','#F9C268'],
              grid: {
                    top: 35,
                    right:10,
                    left:50,
                    bottom:30
                },
              yAxis: {
                  type: 'value',
                  boundaryGap: [0, 0.01],
                  splitLine:{//网格线的格式
                    lineStyle:{
                      color: '#eaeaea',//网格线颜色
                      width: 1,//网格线宽度
                      type: 'solid'//网格线样式

                      }
                  },
                  axisLine: {
                      lineStyle: {
                          type: 'solid',
                          color: '#fff',//左边线的颜色
                          width:'1'//坐标线的宽度
                      }
                  },
                  axisLabel: {
                    textStyle: {
                        color: '#666',//坐标值得具体的颜色

                    }
                  }
              },
              xAxis: {
                  type: 'category',
                  data: ['新增','跟进中','待签约','成交','非成交'],
                  axisLine: {
                      lineStyle: {
                          type: 'solid',
                          color: '#eaeaea',//左边线的颜色
                          width:'1'//坐标线的宽度
                      }
                  },
                  axisLabel: {
                    textStyle: {
                        color: '#666',//坐标值得具体的颜色

                    }
                  }
              },
              series: [
                  {
                      name: this.title[0],
                      type: 'bar',
                      data: this.current,
                      barWidth:'20%',
                      label: {
                          normal: {
                              show: true,
                              position: 'top'
                          }
                      }
                  },
                  // {
                  //     name: this.title[1],
                  //     type: 'bar',
                  //     data: this.last,
                  //     barWidth:'20%',
                  //     label: {
                  //         normal: {
                  //             show: true,
                  //             position: 'top'
                  //         }
                  //     }
                  // }
              ]
          }
    }
  },
  activated() {
    this.getData();
  },
   props:['dateType'],
  data(){
    return{
      tempId:"",
      loading:false,
      firstTime:true,
      rankType:"",
      id:"",
      current:[0,0,0,0,0],
      last:[0,0,0,0],
      activeType:'本月',
      title:['本月'],
      // title:['本月','上月'],
      tableData:[],

    }
  },
  watch:{
    tableData:{
       handler:function(val,oldval){
             // console.log(111,val);
              var t0=0,t1=0,t2=0,t3=0,t4=0;
              val.map((el,index)=>{
                  t0+=parseInt(el.XzCount);
                  t1+=parseInt(el.GJZCount);
                  t2+=parseInt(el.DQYCount);
                  t3+=parseInt(el.CJCount);
                  t4+=parseInt(el.FCJCount);
              })
              this.current=[t0,t1,t2,t3,t4];
        },
        deep:true//对象内部的属性监听，也叫深度监听
    }
  },
  methods:{
    toTranslate(item,type){
      if(this.rankType!='员工')return;
      // console.log(item);
      // console.log(type);
      let dateType;
      this.activeType=="本月"?dateType="月":dateType="年";
      let title;
      switch(type){
        case 'OppNewAdd':title=`商机新增(${dateType})`;break;
        case 'OppFollow':title=`商机跟进(${dateType})`;break;
        case 'OppBeSign':title=`商机待签约(${dateType})`;break;
        case 'OppDeal':title=`商机成交(${dateType})`;break;
        case 'OppNoDeal':title=`商机非成交(${dateType})`;break;
      }
      this.$router.push({
        name:'zhsj',
        params:{
          title:title,
          type:type,
          id:item.AreaGUID,
          dateType:dateType,
          date:`${this.dateRange[0]}~${this.dateRange[1]}`
        }
      })
    },
    pushState(){
      window.history.pushState(null, null, "");
    },
    getData(){
      this.loading=true;
      // ajax

      var type;
      this.activeType=="本月"?type="月":type="年";
      this.tableData=[];
      this.$http.post("/api/EnergizeSaleBulletin/EfficacyOpportunitiesTree",{
          NodeGUID:this.id,
          GroupBy:this.rankType,
          // DateType:type,

          sdate:this.dateRange[0],
          edate:this.dateRange[1]
      })
      .then((res)=>{
        // console.log(res)
        this.loading=false;

        if(this.firstTime){
            this.firstTime=false;
            this.rankType=res.Level   //层级赋值
        }
        this.tableData=[];
        this.tableData=res.Data;
        // console.log(this.tableData);
      })

    },
    changeType(activeType){
      this.activeType=activeType;
      // activeType=='本月'?this.title=['本月','上月']:this.title=['今年','去年'];
      activeType=='本月'?this.title=['本月']:this.title=['今年'];
      this.getData();
    },
    getDetail(item){
      // console.log(item)
      if(this.rankType=="员工"){
        return ;
      }
      this.id=item.AreaGUID;
      if(this.rankType=="公司"){
        this.tempId=item.AreaGUID;
        this.rankType="部门";
        this.pushState();
      }else if(this.rankType=="部门"){
        this.rankType="员工";
        this.pushState();
      }
      this.getData();
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

.table-wrap{
  overflow-x: auto;
  .vux-table{
    width:170%;
  }
}

</style>
