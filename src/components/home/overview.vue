<template>
      <div class="overview">
        <div class="title clear">
          <div class="header clearfix cm-padding">
            <img src="static/img/paper.png" alt="" style="position:relative;top:-0.15rem;">
            <span id="title" style="font-size:1.07rem">本月{{type}}简报</span>
            <div class="right" @click="sw" v-if="canChange">
              <img src="static/img/switch.png" alt="" class="switch " id="switch">
              <span class="">{{banner}}</span>
            </div>

          </div>
          <div class="content text_center">
            <template v-if="!loading">
              <div class="inner relative"  v-if="dataList.length>0">
                <flexbox :gutter="0" wrap="wrap" style="background:white">
                  <flexbox-item :span="dataList.length>1?1/3:0" v-for="(item,index) in dataList" :key="index">
                      <div class="text_center links" @click="jump(item)">
                        <span style="color:#999">{{item.title}} </span><br>
                        <span style="font-size:16px;position:relative;top:2px">{{item.value | fix}} <span style="font-size:0.7rem;color:rgb(153, 153, 153)">{{item.unit}}</span></span>
                      </div>
                  </flexbox-item>
                </flexbox>
              </div>
              <p  v-else class="text_center" style="width: 100%;padding:20px 0;">暂无数据..</p>
            </template>
            <div v-else style="height:132px;line-height:132px">
              <inline-loading></inline-loading>
              <span style="color:#9d9d9d">数据加载中</span>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import {Flexbox, FlexboxItem,InlineLoading,numberComma  } from 'vux'
export default {
  name: 'overview',
  components:{
    Flexbox, FlexboxItem,InlineLoading,numberComma
  },
  data () {
    return {
      loading:false,
      canChange:false,
      banner:"",
      type:"",
      dataList:[]
    }
  },
  created(){
    this.getData();
  },
  filters:{
    fix(val){
        return numberComma(val.toFixed(0))
    }
  },
  methods:{
    getData(){
      this.dataList=[];
      this.loading=true;
      this.$http.get("/api/EnergizeSaleBulletin/GetSaleBulletFinance",{
        params:{
          Type:this.type
        }
      })
      .then((res)=>{
        // console.log(res);
        this.loading=false;
        if(!res) return;
        this.type=res.ReportType;
        this.canChange=res.IsChange;
        this.type=="销售"?this.banner="市场":this.banner="销售";
        this.dataList=res.Data;
      })

    },
    sw(){

      if(this.banner=="销售"){
        this.banner="市场";
        this.type="销售";
      }else{
        this.banner="销售";
        this.type="市场";
      }
      this.getData();
    },
    jump(item){
      if(item.title=="累计签约金额"){
        this.$router.push({name:'getachive',params:{index:0,date:"year"}})
      }else if(item.title=="本月签约金额"){
        this.$router.push({name:'getachive',params:{index:0,date:"month"}})
      }else if(item.title=="累计回款金额"){
        this.$router.push({name:'getachive',params:{index:1,date:"year"}})
      }else if(item.title=="本月实际回款"){
        this.$router.push({name:'getachive',params:{index:1,date:"month"}})
      }else if(item.title=="本月应收目标"){
        this.$router.push({name:'getachive',params:{index:2,date:"month"}})
      }else if(item.title=="本月剩余应收"){
        this.$router.push({name:'getachive',params:{index:2,date:"month"}})
      }else if(item.title=="目标应收回款"){
        this.$router.push({name:'getachive',params:{index:2,date:"month"}})
      }else if(item.title=="新增商机数"){//这里开始是进入销售员权限可以访问的页面
        this.$router.push({name:'analysiseffect',params:{index:0,date:"month"}})
      }else if(item.title=="待签约商机数"){
        this.$router.push({name:'analysiseffect',params:{index:1,date:"month"}})
      }else if(item.title=="关闭商机数"){
        this.$router.push({name:'analysiseffect',params:{index:1,date:"month"}})
      }else if(item.title=="签约金额"){
        this.$router.push({name:'getachive',params:{index:0,date:"month"}})
      }else if(item.title=="应收金额"){
        this.$router.push({name:'getachive',params:{index:2,date:"month"}})
      }else if(item.title=="回款金额"){
        this.$router.push({name:'getachive',params:{index:1,date:"month"}})
      }

    }
  }
}
</script>

<style lang="less">
@import '../../assets/less/exports.less';
.overview{
  margin:@cmmg 0;
  background: white;
  .line1px;
  .line1pxt;
  .header{
    img{
      vertical-align: middle;
      height:1rem;
      // margin-right: 10px
    }
    .line1px;
  }
  .content{
    padding: 0 15px;
    .inner{
      &:after{
        content: " ";
        position: absolute;
        left: 0;
        bottom: 50%;
        right: 0;
        height: 1px;
        border-bottom: 1px solid @gray;
        color: @gray;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
      .links{
        padding: 13px 0;
        font-size:14px;
      }

    }

  }
}
</style>
