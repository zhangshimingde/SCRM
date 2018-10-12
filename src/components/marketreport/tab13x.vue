<template>
  <div>
    <template v-if="!loading">
      <ul class="detail-list">
          <!-- {{$route.params.type}} -->
          <li v-for="(list,index) in tableData" v-if="!($route.params.year==currentYear&&list.month>currentMonth)" :key="index" @click="list.show=!list.show" :class="list.show?'':'bg'">
            <div class="title cm-padding clearfix" style="background-color:#fff;">
              <i class="iconfont icon-jianbao left" style="margin-right: 0.5rem"></i>
              <span>{{list.title}}</span>
              <i class="iconfont icon-down right" :class="list.show?'rotate':''"></i>
            </div>
            <group v-show="list.show">
              <template v-if="list.detail.length">
                <cell-box v-for="(item,index2) in list.detail" :key="index2" >
                  <div class="clearfix text_center" style="width:100%">
                    <span class="left de">{{item.name}}</span>
                    <span class="right de">{{item.dig}}</span>
                  </div>
                </cell-box>
              </template>
              <template v-else>
                <div class="text_center" style="padding:20px 0">暂无本月数据...</div>
              </template>
            </group>
          </li>
      </ul>
    </template>
    <template v-else >
      <p class="text_center" style="padding:40px 0;">
        <inline-loading></inline-loading>
        <span style="color:#9d9d9d">数据加载中</span>
      </p>

    </template>
  </div>

</template>

<script>
import { CellBox,Group,InlineLoading,numberComma } from 'vux'
export default {
  name: '',
  created(){
    this.filDate();
    this.getData();
  },
  components:{
    CellBox,Group,InlineLoading,numberComma
  },
  data(){
    return{
      loading:true,
      currentMonth:0,
      currentYear:0,
      tableData:[],
    }
  },
  filters:{
    fix(val){
        return numberComma(val.toFixed(2))
    }
  },
  methods:{
    getData(){
      var _this=this;
      this.loading=true;
      this.$http.post("/api/EnergizeSaleBulletin/CXOInPlaceDetail",{
         Year:this.$route.params.year,
         Month:"",
         AreaName:this.$route.params.area,
         Type:this.$route.params.type
      })
      .then((res)=>{
        // console.log(res.Data);
        this.tableData=[];
        var temp;
        this.$route.params.type=='1'?temp="到位":temp="新增";
        for(var i=1;i<13;i++){
          this.tableData.push({
            show:false,
            title:i+"月份"+temp+"CXO明细",
            month:i,
            detail:[]
          });
        }
        // console.log(this.tableData);
        this.loading=false;
        res.Data.map((el)=>{
            for(var i=1;i<13;i++){
              if(el.month==i){
                // console.log(el.month)
                _this.tableData[i-1].detail.push({
                  name:el.name,
                  dig:el.Num
                })
              }
            }
        })
        this.tableData.reverse();
      })
    },
    filDate(){
       var date=new Date;
       this.currentYear=date.getFullYear();
       this.currentMonth=date.getMonth()+1;
    }
  }
}
</script>

<style lang="less">
.detail-list{
  .weui-cells{
    background-color: transparent;
    margin-top:0;
  }
  i{
    color:#C7C7CC;
    position: relative;
    top:0.1rem;

  }
  .rotate{
    transform:rotateZ(180deg)
  }
}
.bg{
  border-bottom: 1px solid #dcdcdc
}
.de{
  min-width: 30%
}
</style>
