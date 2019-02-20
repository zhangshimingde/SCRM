<template>
      <group id="tab2">


          <div class="clearfix analy-header"  style="padding:5px 0">
            <div class="left analy-link-wrap">
              <span @click="changeType('签约业绩')" :class="activeType=='签约业绩'?'active':''">签约业绩</span>
              <span @click="changeType('回款业绩')" :class="activeType=='回款业绩'?'active':''">回款业绩</span>
            </div>
          </div>

          <div class="clearfix relative" v-show="!loading" style="top:-0.5rem">
              <popup-picker :data="paramList" class="left date-year-picker" @on-change="getData" v-model="date"><i class="iconfont icon-rili" slot="title" style="margin-right:4px"></i></popup-picker>
              <!-- <p class="right text_right" style="font-size:0.9rem;line-height:40px;padding-right:1rem;color:#999"><span class="left">套数 (单位：个)</span></p> -->
              <span class="clearfix fx-sale-title" id="chose-ar">
                  <popup-picker :data="typeList" :display-format="format" :columns="2" v-model="type" ref="picker3" class="right" @on-change="choseArea" show-name></popup-picker>
              </span>
          </div>
        <template  v-if="!loading">
          <div class="charts-wrap">


            <p class="left text_right" style="font-size:0.9rem;padding-left:10px;color:#999"><span class="left">金额 (单位：万元)</span></p>
            <div class="relative">
              <p class="absolute totals text_center">
                {{activeType}} <br> <span style="font-size:1.2rem">{{total.toFixed(0)}}</span>
              </p>
              <charts id="tab2-charts" styles="width:100%;height:18rem;margin:0 auto;padding-bottom:20px" :option="echartsOptions"></charts>
            </div>

            <x-table :cell-bordered="false" style="background-color:#fff;">
              <thead>
                <tr>
               <!--    <th>产品</th>
                  <th>套数</th>
                  <th>比例</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in tableData" :key="index">
                  <td style="text-align:left;overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;"><span class=" circle-pie" :class="'circle-pie'+index"></span>{{item.ProductLine}}</td>
                  <td style="width: 30%;">{{item.Amount.toFixed(2)}}</td>
                  <td style="width: 30%;">{{(item.rate*100).toFixed(2)}}%</td>

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
      </group>
</template>

<script>
import { Selector ,Group,TabItem,XTable,PopupRadio,InlineLoading ,PopupPicker  } from 'vux'
import charts from "../charts/charts"
export default {
  name: '',
  created(){
    this.getArea();
  },
  components:{
    Selector ,Group,charts,TabItem,XTable ,PopupRadio,InlineLoading,PopupPicker
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
                    name:'业绩结构',
                    type:'pie',
                    radius: ['35%', '60%'],
                    avoidLabelOverlap: true,
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    lableLine: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:this.pieData
                }
            ]
        }
    }

  },
  data () {
    return {
      activeType:'签约业绩',
      loading:true,
      colors:['#F05A4A', '#3876C1', '#00A5E6','#1FAD92','#A2AD1F',"#ccc"],
      tableData:[],
      total:0,
      pieData:[],
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
      // console.log(name.split(" ")[1])
        if(name.split(" ")[1]=="全部部门"){
          return name.split(" ")[0]
        }else{
          return name.split(" ")[1]
        }

      },
    getData(){


      this.loading=true;

      var url='';
      this.activeType=='回款业绩'?url='/api/EnergizeSaleBulletin/GetPerformanceStractureAnalyseHK':url='/api/EnergizeSaleBulletin/GetPerformanceStractureAnalyse'
      this.$http.post(url,{
          CompanyGUID:this.type[0],
         DepartmentGUID:this.type[1],
         Year:this.date[0]
      })
      .then((res)=>{
        // console.log(res.Data);
        this.total=0;
        this.tableData=[];
        this.pieData=[];
        // return;
        this.loading=false;
        this.sortByKey(res.Data,"Amount")
        var temp=[];
        res.Data.map((el)=>{
          this.total+=el.Amount;
        })
        var sum=0;
        res.Data.map((el,index)=>{
          this.tableData.push({ProductLine:el.ProductLine,Amount:el.Amount,rate:el.Amount/this.total});
          if(index<5){
            this.pieData.push({name:el.ProductLine,value:el.Amount.toFixed(2)})
          }else{
            sum+=el.Amount;
          }
        });
        this.pieData.push({name:"其他",value:sum.toFixed(2)})


      })
    },
    changeType(activeType){
      this.activeType=activeType;
      this.getData();
    },
    sortByKey(array, key) {  //模块排序(降序)
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
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
      // console.log(val)
      this.getData();
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
.analy-link-wrap{
  height:40px;
  line-height: 40px;
  padding-left: 0.5rem;
  font-size: 0.9rem;
  span{
    border:1px solid #ccc;
    border-radius: 5px;
    padding: 5px 10px;
    margin-right: 3px;
    box-sizing: border-box;
    &.active{
      color: #0992FF;
      border-color: #0992FF;
    }
  }
}
table{
  font-size: 0.9rem
}
.totals{
  top:50%;
  left: 50%;
  transform:translate(-50%,-12%);
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
</style>
