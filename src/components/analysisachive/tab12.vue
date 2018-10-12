<template>
      <group id="tab12" style="margin-bottom:20px">
        <div class="clearfix analy-header" style="padding:5px 0">
          <div class="left analy-link-wrap">
            <span class="chart-title active">回款业绩</span>
          </div>
          <span class="right fx-sale-title" id="chose-ar">
            <popup-picker :data="typeList" :display-format="format" :columns="2" v-model="type" ref="picker3" @on-change="choseArea" show-name></popup-picker>
          </span>
        </div>

        <div class="charts-rwap relative">
          <p class="text_right chart-dw" style="font-size:0.9rem;padding-right:1rem;color:#999">金额 (单位：万元)</p>
          <charts id="tab12-charts" styles="width:100%;height:16rem;margin:0 auto" :option="echartsOptions"></charts>
        </div>
      </group>
</template>

<script>
// import { Selector ,Group } from "vux"
import { Selector ,Group,PopupRadio,PopupPicker ,numberComma  } from 'vux'
import charts from "../charts/charts"
export default {
  name: '',
  created(){
    this.getArea();
  },
  components:{
    Selector ,Group,charts,PopupRadio ,numberComma,PopupPicker
  },
  computed:{
    echartsOptions(){
      return {
                color:['#4CC5F1','#F9C269'],
                legend: {
                    data:['今年', '去年同期'],
                    top:-3,
                    right:10
                },
                grid: {
                    top: 30,
                    right:0,
                    left:-1,
                    // bottom:0
                },
                tooltip : {
                    trigger: 'axis',
                    confine:true
                },
                xAxis: [
                    {
                        type: 'category',
                        // boundaryGap :['1%','2%'],
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisPointer: {
                            label: {
                            }
                        },
                        data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        // show:false
                    }
                ],
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        xAxisIndex: [0],
                        filterMode:'none',
                        start: 0,
                        end: 35
                    }

                ],
                series: [
                  {
                        name:'今年',
                        type:'line',
                        smooth: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'right'
                            }
                        },
                        data: this.dataYear
                    },
                    {
                        name:'去年同期',
                        type:'line',
                        smooth: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'top'
                            }
                        },
                        data:this.dataLastYear
                    },

                ]
      }
    }
  },
  data () {
    return {
      colors:['#4CC5F1','#F9C269'],
      dataYear:[],
      dataLastYear:[],
      type: ['allArea','allDepartment'],
      typeList: [],
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
      this.$http.post("/api/EnergizeSaleBulletin/GetYJAnalyse",{
          CompanyGUID:this.type[0],
          DepartmentGUID:this.type[1],
          YJType:"HK"
      })
      .then((res)=>{
        res.Data.map((el,index)=>{
          el.map((ele,index2)=>{
            res.Data[index][index2]=ele.toFixed(2)
          })
        })
        this.dataYear=res.Data[0];
        this.dataLastYear=res.Data[1];
      })
    },
    getArea(){  //获取部门
      this.$http.post('/api/EnergizeSaleUser/GetRoleOrg')
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
    choseArea(val){
      // console.log(val)
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
</style>
