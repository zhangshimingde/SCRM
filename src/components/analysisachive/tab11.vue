<template>
      <group id="tab11" style="margin-bottom:20px">
        <template  v-if="!loading">
          <div class="clearfix analy-header" style="padding:5px 0">
            <div class="left analy-link-wrap">
              <span class="chart-title active">签约业绩</span>
            </div>

            <span class="right fx-sale-title" id="chose-ar">
              <popup-picker :data="typeList" :display-format="format" :columns="2" v-model="type" ref="picker3" @on-change="choseArea" show-name></popup-picker>
            </span>

            <popup-picker :data="paramList" class="left date-year-picker" @on-change="choseDate" v-model="date"><i class="iconfont icon-rili" slot="title" style="margin-right:4px"></i></popup-picker>
          </div>

          <div class="charts-rwap relative">
            <p class="text_right chart-dw" style="font-size:0.9rem;padding-right:1rem;color:#999">金额 (单位：万元)</p>
            <charts id="tab11-charts" styles="width:100%;height:16rem;margin:0 auto" :option="echartsOptions"></charts>
          </div>
        </template>
        <template v-else >
          <p class="text_center" style="padding:40px 0">
            <inline-loading></inline-loading>
            <span style="color:#9d9d9d">数据加载中</span>
          </p>

        </template>
      </group>
</template>

<script>
// import { Selector ,Group } from "vux"
import { Selector ,Group,PopupRadio,PopupPicker ,numberComma,InlineLoading  } from 'vux'
import charts from "../charts/charts"
export default {
  name: '',
  created(){
    this.getArea();
  },
  components:{
    Selector ,Group,charts,PopupRadio,PopupPicker ,numberComma,InlineLoading
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
                tooltip : {
                    trigger: 'axis',
                    confine:true,
                    formatter: function (params, ticket, callback) {
                        // console.log(params)
                        if(params.length==1){
                          return `${params[0].name}</br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${params[0].color};"></span><span>${params[0].seriesName}：${params[0].data}</span> `;
                        }else{
                          return `${params[1].name}</br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${params[0].color};"></span><span>今年：${params[0].data}</span> </br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${params[1].color};"></span><span>去年同期：${params[1].data}</span></br>同比增长：${(Number(params[0].data)-Number(params[1].data)).toFixed(2)}</br>同比增长率：${(parseInt(params[1].data)?(Number(params[0].data)-Number(params[1].data))/Number(params[1].data)*100:0).toFixed(2)}%`
                        }
                    }
                },
                grid: {
                    top: 30,
                    right:0,
                    left:-1,
                    // bottom:0
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
                        // axisLabel:{
                        //   inside:true
                        // }
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
      loading:true,
      colors:['#4CC5F1','#F9C269'],
      dataYear:[],
      dataLastYear:[],
      type: ['allArea','allDepartment'],
      typeList: [],

      date:[(new Date()).getFullYear().toString()],
      paramList:[this.setYearList()],
    }
  },
  methods:{
    setYearList(){
        let yearList=[];
        let now=(new Date()).getFullYear();
        for(let i=0;i<10;i++){
          yearList.push((now-i).toString());
        };
        return yearList;
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
      this.$http.post("/api/EnergizeSaleBulletin/GetYJAnalyse",{
          CompanyGUID:this.type[0],
         DepartmentGUID:this.type[1],
          YJType:"QY",
          Year:this.date[0]
      })
      .then((res)=>{
        this.loading=false;
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
        // var temp=[];
        // if(res.UserTopRole==0){
        //     res.Data.unshift({
        //       name:'全部区域',
        //       value:"allArea",
        //       parent:""
        //     });

        //     res.Data.map((el)=>{
        //       if(el.parent==""){
        //         temp.unshift({
        //           name:"全部部门",
        //           value:"allDepartment",
        //           parent:el.value
        //         })
        //       }
        //     })
        // }else if(res.UserTopRole==1){
        //     res.Data.map((el)=>{
        //       if(el.parent==""){
        //         temp.unshift({
        //           name:"全部部门",
        //           value:"allDepartment",
        //           parent:el.value
        //         })

        //         this.type=[el.value,"allDepartment"]
        //       }
        //     })
        // }else if(res.UserTopRole==2){
        //     res.Data.map((el)=>{
        //         this.type=[res.Data[0].value,res.Data[1].value]
        //     })
        // }

        // this.typeList=temp.concat(res.Data);
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
    choseArea(val){
      // console.log(val);
      this.$cmBus.$emit('analysisachiveFresh',{type:'area',area:this.type,date:this.date});
      this.getData();
    },
    choseDate(val){
      // console.log(val);
      this.$cmBus.$emit('analysisachiveFresh',{type:'area',area:this.type,date:this.date});
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
.date-year-picker{
  font-size:0.9rem;
  &:before{
    display:none;
  }
  i{
    font-size:0.9rem;
  }
  span{
    position:relative;
    top:1px;
  }
}
</style>
