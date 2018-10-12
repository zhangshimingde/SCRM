<template>
    <div id="tab2">
        <div class="cm-padding  fx-sale-title">

          <template  v-if="!loading">
            <p class="clearfix" style="margin-top:-10px">
              <span class="left date dw"  style="margin:9px 0">
                <popup-picker :data="choseYear" class="inline_block" @on-change="changeDateType" v-model="year">
                  <i class="iconfont icon-rili" slot="title" style="margin-right:4px"></i>
                </popup-picker>
              </span>
              <span class="right" id="chose-ar">
                <popup-picker :data="typeList" :display-format="format" :columns="2" v-model="type" ref="picker3" @on-change="choseArea" show-name></popup-picker>
              </span>
            </p>
            <!-- p标签不能套div 这里做出修改 -->
            <div class="clearfix" >
              <div class="left" style="color:#888">总金额：<span style="color:#F4333C">{{all.toFixed(2)}}万</span></div> <br /><br />
              <div class="" style="color:#888">{{title}}：<span style="color:#F4333C">{{totalMoney.toFixed(2)}}万/{{count}}个</span></div>
            </div>
            <div class="charts-rwap relative">
                <charts id="tab11-charts" @changeFunnel="changeFunnel" styles="width:100%;height:15rem;margin:0 auto" :option="echartsOptions"></charts>
            </div>
          </template>
          <template v-else >
            <p class="text_center" style="padding:40px 0;font-size:0.9rem">
              <inline-loading></inline-loading>
              <span style="color:#9d9d9d">数据加载中</span>
            </p>
          </template>
        </div>
          <div style="background:#f6f6f6;height:1rem;"></div>
          <group>
            <cell title="商机信息">
              <!-- <popup-radio :options="sortList" id="sortRadio" v-model="sortType"></popup-radio> -->
            </cell>


            <div class="clearfix text_center" id='error-tab'>
              <span class="left" @click="changeSort('PredictTradeMoney')" style="border-right:1px solid #d9d9d9">预计成交金额 <i class="iconfont icon-arrow" :class="sortWay=='desc'?'':'up'" v-if="sortType=='PredictTradeMoney'"></i></span>
              <span class="left" @click="changeSort('PredictTradeTime')">预计成交时间<i class="iconfont icon-arrow" :class="sortWay=='desc'?'':'up'" v-if="sortType=='PredictTradeTime'"></i></span>
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
                    <span class="left" style="color:#888;">预计成交时间：{{item.PredictTradeTime}}</span>
                  </p>
                </div>
              </cell-box>
            </template>
            <template v-else >
              <p class="text_center" style="padding:40px 0;font-size:0.9rem">
                <inline-loading></inline-loading>
                <span style="color:#9d9d9d">数据加载中</span>
              </p>
            </template>
          </group>

    </div>
</template>

<script>
// import { Selector ,Group } from "vux"
import { XTable, CellBox,Cell,Selector ,Group  ,InlineLoading,PopupPicker ,PopupRadio } from 'vux'
import charts from "../charts/charts"
export default {
  name: '',
  created(){
    this.getArea();
  },
  components:{
    XTable, Selector,Cell ,CellBox,Group,charts,InlineLoading,PopupPicker,PopupRadio
  },
  computed:{
    echartsOptions(){
      return {
        tooltip: {
          confine:true,
            trigger: 'item',
            formatter: "{a} <br/>{b}万"
        },
        calculable: true,
        series: [
            {
                name:'销售漏斗',
                type:'funnel',
                left: '5%',
                top: 15,
                bottom: 20,
                width: '90%',
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                color:['#3079D5','#45B9E6','#9EC83B','#FFAC3F','#F0796C'],
                gap: 0,
                sort:"none",
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: "{b}万",
                        color:'#000'
                    },
                    emphasis: {
                        textStyle: {
                            fontSize: 12
                        },
                        dataIndex: 1,
                        position: 'inside',
                        formatter: "{b}万",
                        color:'#333'
                    }
                },
                labelLine: {
                    normal: {
                        length: 10,
                        lineStyle: {
                            width: 1,
                            type: 'solid',
                            color:'#666'
                        }
                    },
                    emphasis: {
                        lineStyle: {
                            width: 1,
                            type: 'solid',
                            color:'#3079D5'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: '#fff',
                        borderWidth: 0
                    }
                },
                data: this.funnelData
            }
        ]
      }
    }
  },
  data(){
    return{
      sortType:"PredictTradeMoney",
      sortWay:"desc",
      loading:true,
      loading2:true,
      choseYear:[['2015', '2016','2017', '2018','2019', '2020']],
      year:[(new Date()).getFullYear().toString()],
      type: ['allArea','allDepartment'],
      typeList: [],
      funnelData:[],
      pages:0,
      pageIndex:0,
      title:"",
      all:0,
      totalMoney:0,
      count:0,
      funnelDataAll:[],
      tableData:[],
      sortList:[{key:"PredictTradeMoney",value:"预计成交金额↓"},{key:"PredictTradeTime",value:"预计成交时间↓"}]
    }
  },
  methods:{
    format(value, name) {
      // console.log(name.split(" ")[1])
        if(name.split(" ")[1]=="全部部门"){
          return name.split(" ")[0]
        }else{
          return name.split(" ")[1]
        }

      },
    getFunnelData(){  //获取漏斗图数据
      var _this=this;
      this.funnelData=[];
      this.funnelDataAll=[];
      this.tableData=[];
      this.pageIndex=0;
      this.pages=0;
      this.loading2=true;
      this.loading=true;
      this.$http.post('/api/EnergizeSaleBulletin/GetLDGraphicsData',{
        SalesYear:_this.year[0],
        CompanyGUID:_this.type[0],
        DepartmentGUID:this.type[1]
      })
      .then((res)=>{

        this.loading=false;
        this.funnelData=[];
        this.funnelDataAll=[];
        this.tableData=[];
        this.pageIndex=0;
        this.pages=0;
        this.all=0;
        // this.funnelDataAll=this.sortByKey(res.Data,this.sortType);
        this.funnelDataAll=res.Data;
        let random=[100,82,50,33,10,0]
        this.funnelDataAll.map((el,index)=>{
          this.funnelData.push({
              name: el.StageName+":"+el.SumPredictTradeMoney,
              value:random[index]
          })
          this.all+=el.SumPredictTradeMoney;
        });

        // console.log(this.funnelData)
        this.title=this.funnelDataAll[0].StageName;
        this.totalMoney=this.funnelDataAll[0].SumPredictTradeMoney;
        // console.log(this.funnelDataAll[0].StageName)
        this.getTableData(this.funnelDataAll[0]);


        // console.log(this.funnelData[0],this.funnelDataAll[0])
      })

    },
    getTableData(val){  //获取列表数据

      if (this.pageIndex>this.pages) return ;
      this.$http.post('/api/EnergizeSaleBulletin/GetConditionListForApp',{
        PageIndex:0,
        PageSize:1000,
        SalesYear:this.year[0],
        StageGUID:val.StageGUID,
        CompanyGUID:this.type[0],
        DepartmentGUID:this.type[1]
      })
      .then((res)=>{
        // console.log(res);
        this.tableData=[];
        this.loading2=false;
        this.pages=Math.ceil(res.Data.PagingInfo.TotalRecords/1000);
        // alert(this.pages)
        this.pageIndex++;


        this.count=res.Data.PagingInfo.TotalRecords;
        res.Data.SOListDataTable.map((el)=>{
          this.tableData.push(el);
        })

        this.sortByKey(this.tableData,this.sortType);
      })
    },
    getArea(){  //获取部门
      this.$http.post('/api/EnergizeSaleUser/GetUserOrg',{
        Type:1
      })
      .then((res)=>{
        // console.log(res.Data)
        // res.Data.unshift({
        //   name:'全部区域',
        //   value:"allArea",
        //   parent:""
        // });
        // var temp=[];
        // res.Data.map((el)=>{
        //   if(el.parent==""){
        //     temp.unshift({
        //       name:"全部部门",
        //       value:"allDepartment",
        //       parent:el.value
        //     })
        //   }
        // })
        // this.typeList=temp.concat(res.Data);
        // console.log(this.typeList);

        var temp=[];
        if(res.UserTopRole==0){
            res.Data.unshift({
              name:'全部区域',
              value:"allArea",
              parent:""
            });

            res.Data.map((el)=>{
              if(el.parent==""){
                temp.unshift({
                  name:"全部部门",
                  value:"allDepartment",
                  parent:el.value
                })
              }
            })
        }else if(res.UserTopRole==1){
            res.Data.map((el)=>{
              if(el.parent==""){
                temp.unshift({
                  name:"全部部门",
                  value:"allDepartment",
                  parent:el.value
                })

                this.type=[el.value,"allDepartment"]
              }
            })
        }else if(res.UserTopRole==2){
            res.Data.map((el)=>{
                this.type=[res.Data[0].value,res.Data[1].value]
            })
        }

        this.typeList=temp.concat(res.Data);
        this.getFunnelData();
      })
    },
    changeDateType(){ //切换日期之后
      this.getFunnelData();
    },
    choseArea(val){
      this.getFunnelData();
    },
    changeFunnel(params){  //切换漏斗选区
      this.title=params.name.split(':')[0];
      this.tableData=[];
      this.pageIndex=0;
      this.pages=0;
      this.loading2=true;
      this.totalMoney=this.funnelDataAll[params.dataIndex].SumPredictTradeMoney;
      this.getTableData(this.funnelDataAll[params.dataIndex]);
    },
    jumpSj(item){
      this.$router.push({
        name:"shangjidetail",
        params:{
          id:item.OpportunitiesGUID
        }
      })
    },
    sortByKey(array, key) {  //模块排序(降序)
        array.sort((a, b) =>{
            var x = a[key]; var y = b[key];
            return this.sortWay=='desc'?((x > y) ? -1 : ((x < y) ? 1 : 0)):((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    },
    changeSort(filed){
      this.sortType=filed;
      this.sortWay=="desc"?this.sortWay="asc":this.sortWay="desc";
      this.sortByKey(this.tableData,this.sortType);
    }
  },
  watch:{
    sortType(val){
      this.sortWay="desc";
      this.sortByKey(this.tableData,val);
    }
  }
}
</script>

<style lang="less">
.fx-sale-title{
  font-size: 0.8rem;
}
#sortRadio{
  padding: 0 !important;
  font-size:0.95rem;
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
