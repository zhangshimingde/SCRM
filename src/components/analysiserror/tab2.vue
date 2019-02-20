<template>
      <div id="tab2">

        <div class="charts-rwap relative" style="height:42px" v-show="!loading">
            <p class="text_right chart-dw" style="padding-top:0.9rem;font-size:0.9rem;padding-right:1rem;color:#999">(单位：个)</p>
            <datepicker @changeDates="changeDates" class="absolute cm-date-picker"/>
        </div>
        <template  v-if="!loading">
            <div class="relative">
              <p class="absolute totals text_center" style="top:45%">
                总数<br> <span style="font-size:1.2rem">{{total}}</span>
              </p>
              <charts id="tab2-charts" @changePie="changePie" styles="width:100%;height:18rem;margin:0 auto;padding-bottom:20px" :option="echartsOptions"></charts>
            </div>
        </template>
        <template v-else >
          <p class="text_center" style="padding:40px 0">
            <inline-loading></inline-loading>
            <span style="color:#9d9d9d">饼图数据加载中</span>
          </p>
        </template>

        <template  v-if="!loading2">
          <div class="table-wrap" id="res-list">

            <div class="clearfix text_center" id='error-tab'>
              <span class="left" @click="changeSort('预计成交金额')" style="border-right:1px solid #d9d9d9">预计成交金额 <i class="iconfont icon-arrow" :class="sortWay=='desc'?'':'up'" v-if="sortType=='预计成交金额'"></i></span>
              <span class="left" @click="changeSort('关闭日期')">关闭日期<i class="iconfont icon-arrow" :class="sortWay=='desc'?'':'up'" v-if="sortType=='关闭日期'"></i></span>
            </div>

            <group class="error sj">
              <!-- <cell :title="title"></cell> -->
              <template v-if="tableData.length>0">
              <cell-box v-for="(listdata,index) in tableData" :key="index" link="">
                <div class="wraps">
                  <router-link class="block" style="color:rgb(102, 102, 102)" :to="{name:'shangjidetailkeep',params:{id:listdata.OpportunitiesGUID}}">
                    <div class="clearfix header bigger">
                      <p class="left title ">{{listdata.OpportunitiesName}}</p>
                      <span class="right date" >{{listdata.EnterIntoStageTime | formate}}</span>
                    </div>
                    <div class="money" ><i class="iconfont icon-nsiconmy"></i><span style="color:#666" v-html="listdata.PredictTradeMoney+'万元'"></span></div>
                    <div class="people"><i class="iconfont icon-ren"></i><span v-html="listdata.ResponsibleName"></span></div>
                    <div class="kehu" v-if="listdata.SortName"><i class="iconfont icon-gongsi"></i><span v-html="listdata.SortName"></span></div>
                  </router-link>
                </div>
              </cell-box>
            </template>
            <template v-else>
              <div class="text_center" style="padding:20px 0">暂无数据</div>
            </template>
            </group>
          </div>
        </template>
        <template v-else >
          <p class="text_center" style="padding:40px 0">
            <inline-loading></inline-loading>
            <span style="color:#9d9d9d">列表数据加载中</span>
          </p>
        </template>
      </div>
</template>

<script>
import {  TabItem,InlineLoading,Group ,Cell,CellBox  } from 'vux'
import charts from "../charts/charts"
import datepicker from '@/components/common/datepicker'
import datepickerCmData from '@/mixins/datepicker'
export default {
  name: '',
  created(){
    this.getData();

    window.addEventListener("popstate", ()=> {
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
    charts,TabItem ,InlineLoading,Group,Cell,CellBox,datepicker
  },
  computed:{
    echartsOptions(){
        return {
            color:['#F05A4A', '#3876C1', '#00A5E6','#1FAD92','#A2AD1F','#ccc'],
            tooltip: {
                trigger: 'item',
                confine:true,
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
                {
                    name:'非成交关闭商机分布',
                    type:'pie',
                    radius: ['35%', '60%'],
                    avoidLabelOverlap: true,
                    label: {

                        normal: {
                            show: true,
                            formatter: function (val) {   //让series 中的文字进行换行
                                return val.name+"\n"+val.value;
                            },
                            align:'left'
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    // lableLine: {
                    //     normal: {
                    //         show: true,
                    //         // length:2,
                    //         // length2:3,
                    //         smooth:true,
                    //         lineStyle:{
                    //           width:3
                    //         }
                    //     },
                    //     emphasis: {
                    //         show: true
                    //     }
                    // },
                    data:this.pieData
                }
            ]
        }
    }

  },
  data () {
    return {
      tempId:"",
      loading:false,
      loading2:false,
      sortType:"预计成交金额",
      sortWay:"desc",
      colors:['#F05A4A', '#3876C1', '#00A5E6','#1FAD92','#A2AD1F',"#ccc"],
      tableData:[],
      total:0,
      firstTime:true,
      pieData:[],
      pieDataAll:[],
      rankType:"", //取数参数,查询层级
      id:"",//取数参数，当前点击的数据行id
    }
  },
  filters:{
    formate(val,old){
      if(val){
        return val.substring(0,10)
      }else{
        return val;
      }

    }
  },
  methods:{
    pushState(){
      window.history.pushState(null, null, "");
    },
    getData(){  //获取饼图数据
      // alert(this.rankType)
      this.loading=true;
      this.pieData=[];
      this.pieDataAll=[];
      this.$http.post("/api/EnergizeSaleBulletin/GetClosedOpportunitiesPie",{
          NodeGUID:this.id,
          GroupBy:this.rankType,
          sdate:this.dateRange[0],
          edate:this.dateRange[1]
      })
      .then((res)=>{
        this.total=0;
        this.pieData=[];
        this.pieDataAll=[];
        // console.log(res);
        this.pieDataAll=res.Data;
        res.Data.map((el)=>{
          this.pieData.push({
            name:el.NodeName,
            value:el.NewCount
          })
          this.total+=el.NewCount;
        })
        this.loading=false;
        if(this.firstTime){
            this.firstTime=false;
            this.rankType=res.GroupBy;   //层级赋值
        }

      })

      this.getTableData();
    },
    getTableData(){  //获取列表数据
      this.tableData=[];
      this.loading2=true;
      this.$http.post("/api/EnergizeSaleBulletin/GetClosedOpportunities",{
          NodeGUID:this.id,
          GroupBy:this.rankType,
          sdate:this.dateRange[0],
          edate:this.dateRange[1]
      })
      .then((res)=>{
        // console.log(res);
        this.tableData=[];
        this.loading2=false;
        this.tableData=res.Data;
        this.sortList(this.sortType)
      })
    },
    changePie(params){
      // console.log(params.dataIndex)
      if(this.rankType=="员工"){
        return ;
      }
      this.id=this.pieDataAll[params.dataIndex].NodeGUID;

      if(this.rankType=="公司"){
        this.tempId=this.pieDataAll[params.dataIndex].NodeGUID;
        this.rankType="部门";
        this.pushState();
      }else if(this.rankType=="部门"){
        this.rankType="员工";
        this.pushState();
      }
      this.getData();
    },
    sortList(type){
      var key="";
      type=="预计成交金额"?key="PredictTradeMoney":key="EnterIntoStageTime";
      this.sortByKey(this.tableData,key)
    },
    changeSort(val){
      this.sortType=val;
      this.sortWay=="desc"?this.sortWay="asc":this.sortWay="desc";
      this.sortList(this.sortType)
    },
    sortByKey(array, key) {  //模块排序(降序)
        array.sort((a, b)=> {
            var x = a[key]; var y = b[key];
            return this.sortWay=='desc'?((x > y) ? -1 : ((x < y) ? 1 : 0)):((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
  },
  watch:{
    sortType:{
      handler(val,old){
        this.sortWay="desc";
        this.sortList(val)
      },
      deep:true
    }
  }
}
</script>

<style lang="less">
#analysis{
  .weui-cells{
    margin-top: 0;
    &:before{
      height:0;
      border:none;
    }
    &:after{
      height:0;
      border:none;
    }
  }
  .weui-select{
    height:40px;
    line-height: 40px;
    font-size: 0.9rem;
  }
}

table{
  font-size: 0.9rem
}
.totals{
  top:50%;
  left: 50%;
  transform:translate(-50%,-30%);
  // transform:translateX(-50%);
  font-size: 0.9rem;
}
// #F05A4A', '#3876C1', '#00A5E6','#1FAD92','#A2AD1F'
.circle-pie{
  border-radius: 100%;
  @h:0.8rem;
  height: @h;
  width: @h;
  background-color: #ccc;
  display: inline-block;
  vertical-align: middle;
  margin:0 1rem;
  &.circle-pie0{
    background-color: #F05A4A
  }
  &.circle-pie1{
    background-color: #3876C1
  }
  &.circle-pie2{
    background-color: #00A5E6
  }
  &.circle-pie3{
    background-color: #1FAD92
  }
  &.circle-pie4{
    background-color: #A2AD1F
  }
}
#error-tab{
  padding: 0.6rem 0;
  width: 100%;
  position: relative;
  &:before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #D9D9D9;
      color: #D9D9D9;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
  }
  .icon-arrow{
    display: inline-block;
    &.up{
      transform:rotatex(180deg) translateY(2px);

    }
  }
  span{
    width: 50%;
    box-sizing: border-box;
    color: #666
  }
}
.error .weui-cells{
  margin-top: 0;
}
</style>
