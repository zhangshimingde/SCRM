<template>
  <div>
    <template v-if="!loading">
      <p class="cm-padding dw">单位：万元
        <span class="right date" v-if="dates=='year'">

          <popup-picker :data="choseYear" class="inline_block" @on-change="changeDateType" v-model="year"><i class="iconfont icon-rili" slot="title" style="margin-right:4px"></i></popup-picker>
          <i class="iconfont icon-qiehuan" style="margin-right:4px"></i><span style="color:rgb(9, 146, 255)" @click="dates='month'">按月度</span>
        </span>
        <span class="right date" v-else>
          <popup-picker :data="choseMonth" class="inline_block" @on-change="changeDateType" :display-format="formatMonth" v-model="month"><i class="iconfont icon-rili" slot="title" style="margin-right:4px"></i></popup-picker>
          <i class="iconfont icon-qiehuan" style="margin-right:4px"></i><span style="color:rgb(9, 146, 255)"  @click="dates='year'">按年度</span>
        </span>
      </p>
      <!-- <div class="cm-padding data-show" v-if="dates!='month'&&rankType!='员工'" style="padding-top:0;background:white"> -->
      <div class="cm-padding data-show" v-if="rankType!='员工'" style="padding-top:0;background:white">
        <div class="text_center">
          <span class="digital">{{ hkmb | fix2}}</span> <br>
          <span class="content">回款目标</span>
        </div>
        <div class="text_center">
          <span class="digital">{{wchk | fix2}}</span> <br>
          <span class="content">完成回款</span>
        </div>
        <div class="text_center">
          <span class="digital">{{hkmb!=0?(wchk/hkmb*100).toFixed(0):0}}%</span> <br>
          <span class="content">完成比例</span>
        </div>
      </div>
      <!-- <div class="cm-padding " v-if="dates=='month'&&rankType!='员工'" style="padding-top:0;background:white">

          <span class="content" style="color:#787878">完成回款合计：</span>
          <span class="digital" style="font-size: 1.2rem;color: #F4333C;">{{ ydTotal | fix2}}</span> <br>


      </div> -->
      <x-table :cell-bordered="false" style="background-color:#fff;">
        <thead>
          <tr>
            <th>{{rankType}}</th>
            <th v-if="dates!='month'">回款目标</th>
            <th>完成回款</th>
            <th v-if="dates!='month'">完成比例</th>
            <th>剩余应收</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="tableData.length>0">
            <tr v-for="(item,index) in tableData" @click="getDetail(item)" :key="index">
              <td>
                {{item.NodeName}}
              </td>
              <td v-if="dates!='month'">{{item.BudgetReceivableMoney | fix2}}</td>
              <td>{{item.AmountCashMoney | fix2}}</td>
              <td v-if="dates!='month'">{{item.Percentage  | fix }}%</td>
              <td>{{item.Egg | fix2}}</td>
            </tr>
          </template>
          <template v-else>
            <p class="absolute text_center" style="width: 100%;">暂无数据</p>
          </template>
        </tbody>
      </x-table>
    </template>
    <template v-else>
      <div class="text_center" style="padding:40px 0;">
        <inline-loading></inline-loading>
        <span style="color:#9d9d9d">数据加载中</span>
      </div>
    </template>
  </div>

</template>

<script>
import { XTable,numberComma,PopupPicker,InlineLoading   } from 'vux'
export default {
  name: '',
  created(){
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
  beforeDestroy () {
    // document.querySelector('html').setAttribute('style', 'background:#F6F6F6')
  },
  components:{
    XTable,numberComma,PopupPicker ,InlineLoading
  },
  props:['dateType'],
  data(){
    return{
      tempId:"",
      loading:false,
      firstTime:true,
      year:[(new Date()).getFullYear().toString()],
      month:[(new Date()).getFullYear().toString(),(new Date().getMonth()+1).toString()],
      choseYear:[['2015', '2016','2017', '2018','2019', '2020']],
      choseMonth:[['2015', '2016','2017', '2018','2019', '2020'],['1', '2','3', '4','5', '6','7', '8','9', '10','11','12']],
      dates:this.dateType,
      datePrama:"", //取数参数,查询日期（年，月）
      rankType:"", //取数参数,查询层级
      id:"",//取数参数，当前点击的数据行id
      tableData:[],
      hkmb:0,
      wchk:0,
      ydTotal:0
    }
  },
  computed:{
    // hkmb(){
    //   var sum=0;
    //   this.tableData.map((el,index)=>{
    //     sum+=el.BudgetReceivableMoney;
    //   })
    //   return sum
    // },
    // wchk(){
    //   var sum=0;
    //   this.tableData.map((el,index)=>{
    //     sum+=el.AmountCashMoney;
    //   })
    //   return sum
    // }
  },
  filters:{
    fix(val){
        return numberComma(val.toFixed(0))
    },
    fix2(val){
        return numberComma(val.toFixed(2))
    }
  },
  methods:{
    pushState(){
      window.history.pushState(null, null, "");
    },
    getData(){ //查询数据
      this.loading=true;
      this.dates=="year"?this.datePrama=this.year[0]:this.datePrama=this.formatMonth(this.month);
      this.tableData=[];
      this.hkmb=0;
      this.wchk=0;
      this.ydTotal=0;
      this.$http.post('/api/EnergizeSaleBulletin/GetQYDataList',{

          BuGUID:this.id,
          DateString:this.datePrama,
          ReportType:"HK",
          Level:this.rankType

       })
       .then((res)=>{
        // console.log(res)
          this.loading=false;
          this.tableData=res.Data;

          this.sortByKey(this.tableData,"AmountCashMoney");
          if(this.firstTime){
            this.firstTime=false;
            this.rankType=res.RankType   //层级赋值
          }


          // 统计数据
          if(this.rankType=="员工") return;

          if(this.dates=="year"){
              this.$http.post('/api/EnergizeSaleBulletin/GetQYHKDashBoardSum',{

                  BuGUID:this.id,
                  DateString:this.datePrama,
                  ReportType:"HK"
              })
              .then((res)=>{
                  this.loading=false;
                  // console.log(res);
                  this.hkmb=res.Data.MB;
                  this.wchk=res.Data.JE;
              })
          }else{
            // this.ydTotal=0;
            // this.tableData.map((el)=>{
            //   this.ydTotal+=el.AmountCashMoney
            // })

            let tempYear=Number(this.datePrama.split("-")[0]);
            let tempMonth=Number(this.datePrama.split("-")[1]);
            let endMonth=tempMonth==12?1:tempMonth+1;
            let endYear=tempMonth==12?tempYear+1:tempYear;
            // alert(tempYear+'-'+tempMonth+","+endYear+"-"+endMonth);return;
            this.$http.post('/api/EnergizeSaleBulletin/GetQYHKDashBoardSum',{
                BuGUID:this.id,
                DateString:tempYear,
                ReportType:"HK",
                StartTime:tempYear+'-'+tempMonth+"-1",
                EndTime:endYear+"-"+endMonth+"-1"
            })
            .then((res)=>{
                this.loading=false;
                console.log(res);
                this.hkmb=res.Data.MB;
                this.wchk=res.Data.JE;
            })


          }
       })

    },
    getDetail(item){
      // console.log(item.NodeGUID.toUpperCase())
      if(item.NodeGUID.toUpperCase()=="00000000-0000-0000-0000-000000000000"||item.NodeGUID.toUpperCase()=="DAA96DB2-70C5-497D-B33E-52915ABC34BF"||item.NodeGUID.toUpperCase()=="EC534E39-4747-4CCC-AD75-8CE9C9F35D4E"||item.NodeGUID.toUpperCase()=="3473C2B8-0AA1-4DED-917F-969E85AE60B5"||item.NodeGUID.toUpperCase()=="6DCCE2D9-728E-4C5D-9896-163655056E2C"){
        return false;
      }
      this.id=item.NodeGUID;
      if(this.rankType=="公司"){
        this.rankType="部门";
        this.tempId=item.NodeGUID;
        this.pushState();
      }else if(this.rankType=="部门"){
        this.rankType="员工"
        this.pushState();
      }else if(this.rankType=="员工"){
        return ;
      }
      this.getData();
    },
    changeDateType(){ //切换日期之后
      this.getData();
    },
    formatMonth(value) {
        return `${value[0]}-${value[1]}`
    },
    sortByKey(array, key) {  //模块排序(降序)
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
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
