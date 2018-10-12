<template>
  <div class="">
    <div class="clearfix"  v-show="!loading">
      <span class="left date dw" style="margin-top:9px;padding-left:15px">
        <popup-picker :data="choseYear" class="inline_block" @on-change="changeDateType" v-model="year">
          <i class="iconfont icon-rili" slot="title" style="margin-right:4px"></i>
        </popup-picker>
      </span>
      <div class="right" style="margin-right:10px">
          <!-- <popup-radio :options="areaList" v-model="area"></popup-radio> -->
          <popup-picker :data="areaList" :columns="1" v-model="area" ref="picker3" @on-change="getData" show-name></popup-picker>
      </div>
    </div>
    <div class="tab-boxs" style="padding-top:0;padding-bottom:0">
      <p class="clearfix cms-title"  v-show="!loading">
        <span class="left">
          数据统计
        </span>
        <span class="right">单位：个</span>
      </p>
      <template v-if="!loading">

        <div class="base-data-wrap inner relative">
          <flexbox :gutter="0" wrap="wrap" style="background:white">
            <flexbox-item :span="dataList.length>1?1/3:0" v-for="(item,index) in dataList" :key="index">
                <div class="text_center links" style="padding:10px 0">
                  <span style="color:#999">{{item.name}} </span><br>
                  <span style="font-size:1.2rem;position:relative;top:2px;color:#3079D5">{{item.value}}</span>
                </div>
            </flexbox-item>
          </flexbox>
        </div>

      </template>
      <template v-else>
        <div class="text_center" style="padding:40px 0;">
          <inline-loading></inline-loading>
          <span style="color:#9d9d9d">数据加载中</span>
        </div>
      </template>
    </div>
    <div class="tab-boxs">
      <tab11 :year="year[0]" :area="area[0]"></tab11>
    </div>
    <div class="tab-boxs">
      <tab12 :year="year[0]" :area="area[0]"></tab12>
    </div>
    <div class="tab-boxs">
      <tab13 :year="year[0]" :area="area[0]"></tab13>
    </div>


  </div>

</template>

<script>
import { InlineLoading,numberComma,PopupPicker,Flexbox, FlexboxItem } from 'vux'
import tab11 from './tab11'
import tab12 from './tab12'
import tab13 from './tab13'
export default {
  name: '',
  created(){
    this.getArea();
  },
  components:{
   InlineLoading,numberComma,tab11,tab12,tab13,PopupPicker,Flexbox, FlexboxItem
  },
  data(){
    return{
      loading:true,
      area:[],
      choseYear:[['2015', '2016','2017', '2018','2019', '2020']],
      year:[(new Date()).getFullYear().toString()],
      areaList:[],
      dataList:[{
          name:"集团客户",
          value:0
      },{
          name:"联系人",
          value:0
      },{
          name:"实有/应有CXO",
          value:0
      },{
          name:"非集团客户",
          value:0
      },{
          name:"注册客户",
          value:0
      },{
          name:"覆盖CXO",
          value:0
      }]
    }
  },
  computed:{
    // ...mapState({
    //   area: state => state.area,
    //   areaList: state => state.areaList
    // })
  },
  methods:{
    getArea(){
      this.$http.get("/api/EnergizaSaleKHInfoController/GetUserKhRight")
      .then((res)=>{
        // console.log(res)
        // this.$store.commit("setArea",res.data)
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
      this.loading=true;
      // console.log(this.area[0])
      this.$http.post("/api/EnergizeSaleBulletin/BaseDataStaticsAreaYear",{
          AreaName:this.area[0],
          Year:this.year[0],
          Month:""
      })
      .then((res)=>{
        this.loading=false;
        // console.log(res);
        this.dataList=[{
            name:"集团客户",
            value:0
        },{
            name:"联系人",
            value:0
        },{
            name:"实有/应有CXO",
            value:0
        },{
            name:"非集团客户",
            value:0
        },{
            name:"注册客户",
            value:0
        },{
            name:"覆盖CXO",
            value:0
        }];
        this.dataList[0].value=res.Data.GroupCustomer;
        this.dataList[1].value=res.Data.LXrMenmber;
        this.dataList[2].value=res.Data.SYCXO+'/'+res.Data.YYCXO;
        this.dataList[3].value=res.Data.NonGroupCustomer;
        this.dataList[4].value=res.Data.RegisterMenmber;
        this.dataList[5].value=res.Data.FGCXO;
      })
    },
    changeDateType(val){ //切换日期之后
      this.getData();
    },
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
.tab-boxs .inner:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 50%;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
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
.tab-boxs{
  // border-radius: 5px;
  // box-shadow: 1px 1px 10px #dcdcdc,-1px -1px 10px #dcdcdc;
  padding: 10px;
  // margin-bottom: 1rem;
  border-bottom: 1rem solid #eaeaea
}
</style>
