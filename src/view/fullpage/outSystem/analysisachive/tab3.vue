<template>
      <group id="tab3">


        <div class="clearfix analy-header" v-show="!loading"  style="padding:5px 0 0">
            <div class="left analy-link-wrap">

              <span @click="changeType('线索')" :class="activeType=='线索'?'active':''">线索</span>
              <span @click="changeType('商机')" :class="activeType=='商机'?'active':''">商机</span>
              <span @click="changeType('签约')" v-show="showQy" :class="activeType=='签约'?'active':''">签约</span>
            </div>
          </div>

          <div class="clearfix relative" v-show="!loading" style="top:-0.5rem">
                <datepicker @changeDates="changeDates" style="left:0;right:unset" class="absolute cm-date-picker"/>
                <!-- <p class="right text_right" style="font-size:0.9rem;line-height:40px;padding-right:1rem;color:#999"><span class="left">套数 (单位：个)</span></p> -->
                <span class="clearfix fx-sale-title right" id="chose-ar">
                    <popup-picker :data="typeList" v-if="activeType!='签约'" :display-format="format" :columns="2"  v-model="type" ref="picker3" class="right" @on-change="choseArea" show-name></popup-picker>
                    <popup-picker :data="typeListQY" v-else  :columns="1"  v-model="typeQY" ref="picker4" class="right" @on-change="choseArea" show-name></popup-picker>
                </span>
            </div>
        <template  v-if="!loading">
          <div class="charts-wrap">
            <!-- <span class="clearfix fx-sale-title" id="chose-ar">
                <popup-picker :data="typeList" :columns="2" v-model="type" ref="picker3" class="left" @on-change="choseArea" show-name></popup-picker>
            </span> -->
            <p class="left text_right" style="font-size:0.9rem;padding-left:10px;color:#999"><span class="left">套数 (单位：个)</span></p>
            <div class="relative">
              <p class="absolute totals text_center">
                {{activeType}} <br> <span style="font-size:1.2rem">{{totalSum?totalSum:0}}</span>
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
                  <td style="text-align:left;width:40%;"><span class=" circle-pie" :class="'circle-pie'+index"></span>{{item.ProductLine}}</td>
                  <td style="width: 30%;">{{item.Num.toFixed(0)}}</td>
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
import { Selector ,Group,TabItem,XTable,PopupRadio,InlineLoading,PopupPicker   } from 'vux'
import charts from "@/components/charts/charts"
import { outSystem } from "@/mixins/outSystemUrl"
import datepicker from '@/components/common/datepicker'
import datepickerCmData from '@/mixins/datepicker'
export default {
  name: '',
  created(){
    // console.log(this.UserCode);
    // console.log(this.Password);
    this.$http.post("/api/EnergizeAllow/IsShowProductQy",{UserCode:this.UserCode}).then((res)=>{
        this.showQy=res.Data.IsShowProductQy;
      });
    this.getArea();

  },
  components:{
    Selector ,Group,charts,TabItem,XTable ,PopupRadio,InlineLoading,PopupPicker,datepicker
  },
  mixins:[outSystem,datepickerCmData],
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
                    name:'产品结构',
                    type:'pie',
                    radius: ['35%', '60%'],
                    avoidLabelOverlap: true,
                    label: {
                        normal: {
                            show: true,
                            formatter: "{d}%\n{b}",
                            color:"#666"
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
      showQy:false,
      activeType:'线索',
      loading:true,
      colors:['#F05A4A', '#3876C1', '#00A5E6','#1FAD92','#A2AD1F',"#ccc"],
      tableData:[],
      total:0,
      totalSum:0,
      pieData:[],
      type: ['allArea','allDepartment'],
      typeQY: ['allArea'],
      typeList: [],
      typeListQY: [],
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
      var url;
      if(this.activeType=="签约"){
        url="/api/EnergizeAllow/GetProductStractureSingAnalyse";
        this.$http.post(url,{
            CompanyGUID:this.typeQY[0],
            UserCode:this.UserCode,
            sdate:this.dateRange[0],
            edate:this.dateRange[1]
        })
        .then((res)=>{
          this.setData(res);
        })
      }else{
        if(this.activeType=="线索"){url="/api/EnergizeAllow/GetProductStractureClueAnalyse"}
        else if(this.activeType=="商机"){url="/api/EnergizeAllow/GetProductStractureOpportunitiesAnalyse"}
        this.$http.post(url,{
            CompanyGUID:this.type[0],
            DepartmentGUID:this.type[1],
            UserCode:this.UserCode,
            sdate:this.dateRange[0],
            edate:this.dateRange[1]
        })
        .then((res)=>{
          this.setData(res);
        })
      }

    },
    setData(res){
       this.total=0;
        this.tableData=[];
        this.pieData=[];
        // console.log(res.Data);
        this.loading=false;
        this.sortByKey(res.Data,"Num")
        var temp=[];
        this.totalSum=res.OpportunityNum||res.OpportunitiesNum||res.qyNum;
        res.Data.map((el)=>{
          this.total+=el.Num;
        })
        var sum=0;
        res.Data.map((el,index)=>{
          this.tableData.push({ProductLine:el.ProductLine,Num:el.Num,rate:el.Num/this.total});
          if(index<5){
            this.pieData.push({name:el.ProductLine,value:el.Num})
          }else{
            sum+=el.Num;
          }
        });
        this.pieData.push({name:"其他",value:sum})
    },
    changeType(activeType){
      // this.type=['allArea','allDepartment'];
      // this.typeQY=['allArea'];
      this.activeType=activeType;
      this.getData();
      // this.getArea();
    },
    sortByKey(array, key) {  //模块排序(降序)
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
    },
    getArea(){  //获取部门
      this.$http.post('/api/EnergizeAllow/GetRoleOrg',{
        UserCode:this.UserCode
      })
        .then((res)=>{
          this.fillArea(res);
      })


      this.$http.post('/api/EnergizeAllow/GetRoleAreaOrg',{
        UserCode:this.UserCode
      })
        .then((res)=>{
          this.fillArea2(res);
      })

    },
    fillArea(res){
      this.typeList=[];
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
    },
    fillArea2(res){ //签约模块组织架构
      this.typeListQY=[];
        var temp=[];
        if(res.UserTopRole==0){
            res.Data.unshift({
              name:'全部区域',
              value:"allArea",
              parent:""
            });
        }else if(res.UserTopRole==1){
            this.typeQY=[res.Data[0].value];
        }

        this.typeListQY=temp.concat(res.Data);
        // this.getData();
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

table{
  font-size: 0.9rem
}
.totals{
  top:50%;
  left: 50%;
  transform:translate(-50%,-12%);
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
