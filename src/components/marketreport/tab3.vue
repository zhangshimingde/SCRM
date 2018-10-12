<template>
  <div class="">
    <div class="clearfix">
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
          <popup-picker :data="areaList" :columns="1" v-model="area" ref="picker3" show-name></popup-picker>
      </div>
    </div>
    <div class="tab-boxs" style="padding:10px 10px 0;border-top: 1rem solid #eaeaea">
      <tab31 :year="date" :area="area[0]"></tab31>
    </div>
    <div class="tab-boxs">
      <tab32 :year="date" :area="area[0]"></tab32>
    </div>
    <div class="tab-boxs">
      <tab33 :year="date" :area="area[0]"></tab33>
    </div>


  </div>

</template>

<script>
import { InlineLoading,numberComma,PopupPicker,PopupRadio } from 'vux'
import tab31 from './tab31'
import tab32 from './tab32'
import tab33 from './tab33'
export default {
  name: '',
  created(){
    this.getArea();
  },
  components:{
   InlineLoading,numberComma,tab31,tab32,tab33,PopupPicker,PopupRadio
  },
  data(){
    return{
      area:[],
      date:(new Date()).getFullYear().toString(),
      year:[(new Date()).getFullYear().toString()],
      month:[(new Date()).getFullYear().toString(),(new Date().getMonth()+1).toString()],
      choseYear:[['2015', '2016','2017', '2018','2019', '2020']],
      choseMonth:[['2015', '2016','2017', '2018','2019', '2020'],['1', '2','3', '4','5', '6','7', '8','9', '10','11','12']],
      dates:"year",
      areaList:[]
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
    changeDateType(val){ //切换日期之后
      this.dates=="year"?this.date=this.year[0]:this.date=this.formatMonth(this.month);
    },
    formatMonth(value) {
        return `${value[0]}-${value[1]}`
    }
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
