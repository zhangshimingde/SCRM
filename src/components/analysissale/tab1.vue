<template>
    <div id="tab1">
        <div class="cm-padding  fx-sale-title">
          <template  v-if="!loading">
            <p class="clearfix" style="margin-top:-10px">
              <span class="left date dw" style="margin:9px 0">
                <popup-picker :data="choseYear" class="inline_block" @on-change="changeDateType" v-model="year">
                  <i class="iconfont icon-rili" slot="title" style="margin-right:4px"></i>
                </popup-picker>
              </span>
              <span class="right" id="chose-ar">
                <popup-picker :data="typeList" :display-format="format" :columns="2" v-model="type" ref="picker3" @on-change="choseArea" show-name></popup-picker>
              </span>
            </p>
            <div class="clearfix" >
              <div class="left" style="color:#888">预计成交总金额：<span style="color:#F4333C">{{all.toFixed(2)}}万</span></div>
              <span class="text_right right" style="font-size:0.9rem;color:#999">
                  (单位：万元)
              </span>
            </div>
            <div class="charts-rwap relative">
                <charts id="tab11-charts" styles="width:100%;height:19rem;margin:0 auto" :option="echartsOptions"></charts>
              </div>
          </template>
          <template v-else >
            <p class="text_center" style="padding:40px 0">
              <inline-loading></inline-loading>
              <span style="color:#9d9d9d">数据加载中</span>
            </p>

          </template>
        </div>

    </div>
</template>

<script>
// import { Selector ,Group } from "vux"
import { XTable, Selector ,Group,InlineLoading,PopupPicker } from 'vux'
import charts from "../charts/charts"
export default {
  name: '',
  created(){
    this.getArea();
  },
  components:{
    XTable, Selector ,Group,charts,InlineLoading,PopupPicker
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
      this.tableData.map((el,index)=>{
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
      loading:true,
      max:10,
      all:0,
      choseYear:[['2015', '2016','2017', '2018','2019', '2020']],
      year:[(new Date()).getFullYear().toString()],
      tableData:[],
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
    format(value, name) {
      // console.log(name.split(" ")[1])
        if(name.split(" ")[1]=="全部部门"){
          return name.split(" ")[0]
        }else{
          return name.split(" ")[1]
        }

      },
    getData(){
      this.loading=true;
      var _this=this;

      this.series=[];
      this.tableData=[];
      this.$http.post('/api/EnergizeSaleBulletin/GetFunnelInitData',{
        SalesYear:_this.year[0],
        CompanyGUID:_this.type[0],
        DepartmentGUID:this.type[1]
      })
      .then((res)=>{
        // console.log(res);
        this.series=[];
        this.tableData=[];
        this.loading=false;
        res.Data.map((el)=>{

          this.tableData.push(el.DataString.split(','))

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
</style>
