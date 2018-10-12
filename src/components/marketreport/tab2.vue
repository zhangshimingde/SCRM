<template>
  <div class="">

    <div class="clearfix" v-show="!loading">
      <span class="left date dw" v-if="dates=='year'" style="margin-top:9px;padding-left:15px">
        <popup-picker :data="choseYear" class="inline_block" @on-change="changeDateType" v-model="year">
          <i class="iconfont icon-rili" slot="title" style="margin-right:4px"></i>
        </popup-picker>
        <i class="iconfont icon-qiehuan" style="margin-right:4px"></i><span style="color:rgb(9, 146, 255)"  @click="dates='month'">按月度</span>
      </span>
      <span class="left date dw" v-else style="margin-top:9px;padding-left:15px">
          <popup-picker :data="choseMonth" class="inline_block" @on-change="changeDateType" :display-format="formatMonth" v-model="month">
            <i class="iconfont icon-rili" slot="title" style="margin-right:4px"></i>
          </popup-picker>
          <i class="iconfont icon-qiehuan" style="margin-right:4px"></i><span style="color:rgb(9, 146, 255)"  @click="dates='year'">按年度</span>
      </span>
      <div class="right" style="margin-right:10px">
          <!-- <popup-radio :options="areaList" v-model="area"></popup-radio> -->
          <popup-picker :data="areaList" :columns="1" v-model="area" ref="picker3" @on-change="getData" show-name></popup-picker>
      </div>
    </div>
    <template v-if="!loading">
      <div class="tab-boxs">
        <div class="base-data-wrap">

            <flexbox :gutter="0" wrap="wrap" style="background:white">
              <flexbox-item :span="dataList.length>1?1/3:0" v-for="(item,index) in dataList" :key="index">
                  <div class="text_center links">
                    <span style="color:#999">{{item.name}} </span><br>
                    <span style="font-size:1.2rem;position:relative;top:2px;color:#3079D5">{{item.value}}个</span>
                  </div>
              </flexbox-item>
            </flexbox>

        </div>
      </div>
    </template>
    <template v-else>
      <div class="text_center" style="padding:40px 0;">
        <inline-loading></inline-loading>
        <span style="color:#9d9d9d">数据加载中</span>
      </div>
    </template>
    <div class="tab-boxs">
      <tab21 :year="date" :area="area[0]"></tab21>
    </div>
    <div class="tab-boxs">
      <tab22 :year="date" :area="area[0]"></tab22>
    </div>


  </div>

</template>

<script>
import { InlineLoading,numberComma,PopupPicker,PopupRadio,Flexbox, FlexboxItem } from 'vux'
import tab21 from './tab21'
import tab22 from './tab22'
export default {
  name: '',
  created(){
    this.getArea();
  },
  components:{
   InlineLoading,numberComma,tab21,tab22,PopupPicker,PopupRadio,Flexbox, FlexboxItem
  },
  data(){
    return{
      loading:true,
      area:[],
      date:(new Date()).getFullYear().toString(),
      year:[(new Date()).getFullYear().toString()],
      month:[(new Date()).getFullYear().toString(),(new Date().getMonth()+1).toString()],
      choseYear:[['2015', '2016','2017', '2018','2019', '2020']],
      choseMonth:[['2015', '2016','2017', '2018','2019', '2020'],['1', '2','3', '4','5', '6','7', '8','9', '10','11','12']],
      dates:"year",
      areaList:[],
      dataList:[]
    }
  },
  methods:{
    getArea(){
      this.$http.get("/api/EnergizaSaleKHInfoController/GetUserKhRight")
      .then((res)=>{

        if(res.Data.length==0) return;
        res.Data.map((el)=>{
          this.areaList.push({name:el.AreaName,value:el.AreaName})
        });
        if (this.areaList.length>1) {
          this.areaList.unshift({name:"全部区域",value:"全部区域"});
        };

        this.area=[this.areaList[0].value];
      })
    },
    getData(){
      if(this.area.length==0) return ;
      var dateTemp=this.date.split('-');
      var month;
      dateTemp[1]?month=dateTemp[1]:month="";
      this.loading=true;
      this.$http.post("/api/EnergizeSaleBulletin/GetAcitvilyInfoPan1",{
          AreaName:this.area[0],
          Year:dateTemp[0],
          Month:month
      })
      .then((res)=>{
        this.loading=false;
        this.dataList=[{name:"覆盖人数",value:res.Data.FGMenber},{name:"覆盖企业数",value:res.Data.FGEnterprise},{name:"线索产出",value:res.Data.CHClue}]
      })
    },
    changeDateType(val){ //切换日期之后
      this.dates=="year"?this.date=this.year[0]:this.date=this.formatMonth(this.month);
      this.getData();
    },
    formatMonth(value) {
        return `${value[0]}-${value[1]}`
    }
  },
  watch:{
    // area:{
    //   handler(val){
    //     this.getData();
    //   },
    //   deep:true
    // }
  }
}
</script>

<style lang="less">
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
.tab-boxs{
  // border-radius: 5px;
  // box-shadow: 1px 1px 10px #dcdcdc,-1px -1px 10px #dcdcdc;
  padding: 10px;
  // margin-bottom: 1rem;
  border-bottom: 1rem solid #eaeaea
}
</style>
