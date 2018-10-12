<template>
    <div id="tab1">
        <!-- <group> -->



        <!-- </group> -->

        <template  v-if="!loading">
          <div class="clearfix analy-header" style="padding:5px 0">
              <div class="left analy-link-wrap">
                <span @click="changeType('本月')" :class="activeType=='本月'?'active':''">本月</span>
                <span @click="changeType('年度')" :class="activeType=='年度'?'active':''">年度</span>
              </div>
            </div>
          <div class="charts-rwap relative">
              <p class="text_right chart-dw" style="font-size:0.9rem;padding-right:1rem;color:#999">(单位：个)</p>
              <charts id="tab11-charts" styles="width:100%;height:19rem;margin:0 auto" :option="echartsOptions"></charts>
            </div>
          <div class="table-wrap">
            <x-table class="EffTable" :cell-bordered="false" style="background-color:#fff;">
                  <thead>
                    <tr>
                      <th>{{rankType}}</th>
                      <th>新增线索</th>
                      <th>跟进中</th>
                      <th>平均跟进周期</th>
                      <!-- <th>新增商机</th> -->
                      <th>转商机</th>
                      <th>转化率</th>
                      <th>关闭线索</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in tableData" @click="getDetail(item)" :key="index">
                    <!-- <tr v-for="(item,index) in tableData" :key="index"> -->
                      <!-- <td>{{rankType=='员工'?item.areaFullName:item.areaName}}</td> -->
                       <td>{{item.areaName}}</td>
                      <td>{{item.XZClue}}</td>
                      <td>{{item.GJZClue}}</td>
                      <td>{{item.AvgGJZQ}}</td>
                      <!-- <td>{{item.XZSJ}}</td> -->
                      <td>{{item.ZSJClue}}</td>
                      <td>{{(item.GJZClue+item.WGJClue+item.ZSJClue+item.GBClue)!=0?(item.ZSJClue/(item.GJZClue+item.WGJClue+item.ZSJClue+item.GBClue)*100).toFixed(2):0}}%</td>
                      <td>{{item.GBClue}}</td>
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
import { XTable, Selector ,Group  ,InlineLoading } from 'vux'
import charts from "../charts/charts"
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
    XTable, Selector ,Group,charts,InlineLoading
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
              legend: {
                  data:this.title,
                  top:-5,
                  right:10
              },
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
                  data: ['新增','跟进中','转商机','关闭'],
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
  props:['dateType'],
  data(){
    return{
      tempId:"",
      loading:false,
      firstTime:true,
      rankType:"",
      id:"",
      current:[0,0,0,0],
      last:[0,0,0],
      activeType:'本月',
      title:['本月'],
      // title:['本月','上月'],
      tableData:[],

    }
  },
  watch:{
    tableData:{
       handler:function(val,oldval){
              var t0=0,t1=0,t2=0,t3=0;
              val.map((el,index)=>{
                  t0+=parseInt(el.XZClue);
                  t1+=parseInt(el.GJZClue);
                  t2+=parseInt(el.ZSJClue);
                  t3+=parseInt(el.GBClue);
              })
              this.current=[t0,t1,t2,t3];
        },
        deep:true//对象内部的属性监听，也叫深度监听
    }
  },
  methods:{
    pushState(){
      window.history.pushState(null, null, "");
    },
    getData(){
      this.loading=true;
      // ajax

      var type;
      this.activeType=="本月"?type="月":type="年";
      this.tableData=[];
      this.$http.post("/api/EnergizeSaleBulletin/CompanyClueStatis",{
          NodeGUID:this.id,
          GroupBy:this.rankType,
          DateType:type

      })
      .then((res)=>{
        this.loading=false;
        this.tableData=[];
        this.tableData=res.Data;

        if(this.firstTime){
            this.firstTime=false;
            this.rankType=res.Level   //层级赋值
            // this.rankType="公司";
        }
        // console.log(res);
      })

    },
    changeType(activeType){
      this.activeType=activeType;
      activeType=='本月'?this.title=['本月']:this.title=['今年'];
      // activeType=='本月'?this.title=['本月','上月']:this.title=['今年','去年'];
      this.getData();
    },
    getDetail(item){
      // console.log(item.areaGUID)
      this.id=item.areaGUID;
      if(this.rankType=="公司"){
        this.tempId=item.areaGUID;
        this.rankType="部门";
        this.pushState();
      }else if(this.rankType=="部门"){
        this.rankType="员工";
        this.pushState();
      }else if(this.rankType=="员工"){
        return ;
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
    width:140%;
  }
}


</style>
