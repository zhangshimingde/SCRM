<template>
    <div id="tab1" class="scroll-tab" style='background:white'>
      <div class="scroll-inner">
        <div class="cm-padding  fx-sale-title">
          <template  v-if="!loading">
            <p class="clearfix" style="margin-top:-10px">
              <span class="left date dw" style="margin:9px 0">
                <popup-picker :data="choseYear" class="inline_block" @on-change="changeDateType" v-model="year">
                  <i class="iconfont icon-rili" slot="title" style="margin-right:4px"></i>
                </popup-picker>
              </span>
              <span class="right" id="chose-ar">
                <popup-picker :data="typeList"  :display-format="format" :columns="2" v-model="type" ref="picker3" @on-change="choseArea" show-name></popup-picker>
              </span>
            </p>
            <div class="clearfix" >
              <div class="left" style="color:#888">预计成交总金额：<span style="color:#F4333C">{{all.toFixed(2)}}万</span></div>
              <span class="text_right right" style="font-size:0.9rem;color:#999">
                  (单位：万元)
              </span>
            </div>
            <div class="charts-rwap relative">
                <charts id="tab11-charts"  @changeSaleYC="changeSaleYC" style="width:100%;height:19rem;margin:0 auto" :option="echartsOptions"></charts>
              </div>
          </template>
          <template v-else >
            <p class="text_center" style="padding:40px 0">
              <inline-loading></inline-loading>
              <span style="color:#9d9d9d">数据加载中</span>
            </p>
          </template>
        </div>

        <div style="background:#f6f6f6;height:1rem;"></div>
        <group>
          <cell title="商机信息">
            <!-- <popup-radio :options="sortList" id="sortRadio" v-model="sortType"></popup-radio> -->
            {{season}}
          </cell>


          <div class="clearfix text_center" id='error-tab'>
            <span class="left" @click="changeSort('PredictTradeMoney')" style="border-right:1px solid #d9d9d9">预计成交金额 <i class="iconfont icon-arrow" :class="sortWay=='descending'?'':'up'" v-if="sortType=='PredictTradeMoney'"></i></span>
            <span class="left" @click="changeSort('PredictTradeTime')">预计成交时间<i class="iconfont icon-arrow" :class="sortWay=='descending'?'':'up'" v-if="sortType=='PredictTradeTime'"></i></span>
          </div>

          <template  v-if="!loading2">
            <cell-box v-for="(item,index) in tableData"  :key="index" link="">
              <div class="" style="width: 100%;" @click="jumpSj(item)">
                <p style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width:100%;font-size:0.95rem;color:#666">{{item.OpportunitiesName}}</p>
                <p style="font-size:0.8rem" class="clearfix">
                  <span class="left" style="color:#888;">主责人：{{item.ResponsibleName}}</span>
                  <span class="right" style="color:#888;">{{item.PredictTradeMoney}}万元</span>
                </p>
                <p style="font-size:0.8rem" class="clearfix">
                  <span class="left" style="color:#888;">预计成交时间：{{item.PredictTradeTime?item.PredictTradeTime.substring(0,10):'--'}}</span>
                </p>
              </div>
            </cell-box>

            <p class="text_center" v-show="loadMoreFlag" style="padding:9px 0">
              <inline-loading></inline-loading>
              <span style="color:#9d9d9d">数据加载中</span>
            </p>
          </template>
          <template v-else >
            <p class="text_center" style="padding:40px 0;font-size:0.9rem">
              <inline-loading></inline-loading>
              <span style="color:#9d9d9d">数据加载中</span>
            </p>
          </template>
        </group>
      </div>
    </div>
</template>

<script>
// import { Selector ,Group } from "vux"
import { XTable, Selector ,Cell,Group,InlineLoading,PopupPicker,CellBox } from 'vux'
import charts from "../charts/charts"
export default {
  name: '',
  created(){
    this.getArea();
  },
  mounted(){
    document.getElementsByClassName('scroll-tab')[0].style.height=document.documentElement.clientHeight-45+'px';
    let _this=this;
    document.getElementsByClassName('scroll-tab')[0].onscroll=function(){
          if(_this.loading) return;
          // console.log(this.scrollTop ,this.offsetHeight,document.getElementsByClassName('scroll-inner')[0].offsetHeight)
          if(this.scrollTop + this.offsetHeight>=document.getElementsByClassName('scroll-inner')[0].offsetHeight){
            _this.loadMore();
          }
    }
  },
  components:{
    XTable, Selector ,Group,charts,InlineLoading,PopupPicker,Cell,CellBox
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
              color:['#5690D6','#45B9E6','#9EC83B','#FFAC3F','#F0796C'],
              grid: {
                    top: 25,
                    right:10,
                    left:50,
                    bottom:30
                },
              yAxis: {
                  type: 'value',
                  max:this.max,
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
                  data: ['一季度','二季度','三季度','四季度'],
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
              series:this.series
          }
    },
    total(){
      var temp=[],t0=0,t1=0,t2=0,t3=0;
      this.chartData.map((el,index)=>{
          t0+=Number(el[0]);
          t1+=Number(el[1]);
          t2+=Number(el[2]);
          t3+=Number(el[3]);
      })
      temp=[Number(t0.toFixed(2)),Number(t1.toFixed(2)),Number(t2.toFixed(2)),Number(t3.toFixed(2))];
      // console.log(temp)
      return temp
    }
  },
  data(){
    return{
      sortType:"PredictTradeMoney",
      sortWay:"descending",
      loading:true,
      loading2:true,
      loadMoreFlag:false,
      tableData:[],
      pages:0,
      pageIndex:0,
      pageSize:10,
      season:"一季度",
      max:10,
      all:0,
      choseYear:[['2015', '2016','2017', '2018','2019', '2020']],
      year:[(new Date()).getFullYear().toString()],
      chartData:[],
      series:[],
      type: ['allArea','allDepartment'],
      typeList: [],
    }
  },
  watch:{
    total:{
      handler:function(val){
        // console.log(val)
        this.echartsOptions.yAxis.max=Math.max.apply(null, val)+30;
        this.all=0;
        val.map((el)=>{
          this.all+=el;
        })
      },
      deep:true
    }
  },
  methods:{
    loadMore() {
      this.pageIndex++;
      // console.log(this.pageIndex+","+this.pages);
      if(this.pageIndex>=this.pages&&this.pages!=0) return;
      this.loadMoreFlag=true;
      this.getTableData();
    },
    format(value, name) {
      // console.log(name)
        if(name.split(" ")[1]=="全部部门"){
          return name.split(" ")[0]
        }else{
          return name.split(" ")[1]
        }

      },
    getData(){
      this.loading=true;
      var _this=this;
      this.init();
      this.series=[];
      this.chartData=[];
      this.$http.post('/api/EnergizeSaleBulletin/GetFunnelInitData',{
        SalesYear:_this.year[0],
        CompanyGUID:_this.type[0],
        DepartmentGUID:this.type[1]
      })
      .then((res)=>{
        // console.log(res);
        this.series=[];
        this.chartData=[];
        this.loading=false;
        res.Data.map((el)=>{

          this.chartData.push(el.DataString.split(','))

          this.series.push({
              name: el.StageName,
              type: 'bar',
              data: el.DataString.split(','),
              barWidth:'20%',
              stack: '季度成交',
          })
        })

        this.series.push({
            name: '合计总量',
            type: 'bar',
            stack: '季度成交',
            label: {
              normal: {
                // offset:['150', '80'],
                show: true,
                position: 'insideBottom',
                formatter:'{c}w',
                textStyle:{ color:'#000' }
              }
            },
            itemStyle:{
              normal:{
                color:'transparent'
              }
            },
            data: this.total
        })

        this.getTableData();

      })



    },
    getTableData(){  //获取列表数据
      let months;
      switch(this.season){
        case '一季度':months="1,2,3";break;
        case '二季度':months="4,5,6";break;
        case '三季度':months="7,8,9";break;
        case '四季度':months="10,11,12";break;
      }
      this.$http.post('/api/EnergizeSaleBulletin/GetMobileFunnelListData',{
        PageIndex:this.pageIndex,
        PageSize:this.pageSize,
        CompanyGUID:this.type[0],
        DepartmentGUID:this.type[1],
        Months:months,
        SalesYear:this.year[0],
        OrderField:this.sortType,
        OrderByType:this.sortWay
      })
      .then((res)=>{
        // console.log(res);
        this.loading2=false;
        this.loadMoreFlag=false;
        this.pages=Math.ceil(res.total/this.pageSize);
        res.Data.map((el)=>{
          this.tableData.push(el);
        })
      })
    },
    getArea(){  //获取部门
      this.$http.post('/api/EnergizeSaleUser/GetUserOrg',{
        Type:1
      })
      .then((res)=>{


        var temp=[];
        if(res.UserTopRole==0){ //总部负责人

            let count=0;
            res.Data.map((el)=>{
              if(el.parent==""){
                temp.unshift({
                  name:"全部部门",
                  value:"allDepartment",
                  parent:el.value
                })
                this.type=[el.value,"allDepartment"];
                count++;
              }
            })

            if(count>1){
              temp.unshift({
                  name:'全部区域',
                  value:"allArea",
                  parent:""
              })
              temp.unshift({
                  name:"全部部门",
                  value:"allDepartment",
                  parent:"allArea"
              })
              this.type=["allArea","allDepartment"];
            }
        }else if(res.UserTopRole==1){ //区域负责人，有可能有多个区域权限
            let count=0;
            res.Data.map((el)=>{
              if(el.parent==""){
                temp.unshift({
                  name:"全部部门",
                  value:"allDepartment",
                  parent:el.value
                })

                this.type=[el.value,"allDepartment"];
                count++;
              }
            })


            // 当有多个区域权限时
            if(count>1){
              temp.unshift({
                  name:'全部区域',
                  value:"allArea",
                  parent:""
              })
              temp.unshift({
                  name:"全部部门",
                  value:"allDepartment",
                  parent:"allArea"
              })
              this.type=["allArea","allDepartment"];
            }


        }else if(res.UserTopRole==2){ //部门负责人，有可能有多个部门权限
            res.Data.map((el)=>{
                this.type=[res.Data[0].value,res.Data[1].value]
            })

            // 当有多个部门权限时
            if(res.Data.length>2){
              temp.unshift({
                  name:"全部部门",
                  value:"allDepartment",
                  parent:res.Data[0].value
              })
              this.type=[res.Data[0].value,"allDepartment"];
            }
        }

        this.typeList=temp.concat(res.Data);


        this.getData();
      })
    },
    changeDateType(val){ //切换日期之后
      // console.log(val)
      this.getData();
    },
    choseArea(val){
      // console.log(val)
      this.getData();
    },
    jumpSj(item){
      this.$router.push({
        name:"shangjidetailkeep",
        params:{
          id:item.OpportunitiesGUID
        }
      })
    },
    changeSaleYC(params){  //切换季度选区
      this.season=params.name;
      this.init();
      this.getTableData();
    },
    init(){
      this.pageIndex=0;
      this.pages=0;
      this.tableData=[];
      this.loading2=true;
    },
    changeSort(filed){
      if(this.sortType==filed){
        this.sortWay=="descending"?this.sortWay="asc":this.sortWay="descending";
      }else{
        this.sortType=filed;
        this.sortWay="descending";
      }
      this.init();
      this.getTableData();
    }
  }
}
</script>

<style lang="less">
.fx-sale-title{
  font-size: 0.8rem;
}
.weui-cell {
    padding: 10px 15px;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.weui-cell_access .weui-cell__ft:after {
    content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: 2px;
}
.vux-cell-value{
  color: #999
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
</style>
