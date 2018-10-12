<template>
  <div class="cm-detail-wrap cm-padding">
    <p class="title1">{{fullName}}</p>
    <div class="detail-list">
      <p class="title2">产品基本信息</p>
      <ul>
        <li class="clearfix">
          <span class="banner">出库状态：</span>
          <span class=" content">{{status}}</span>
        </li>
        <li class="clearfix">
          <span class="banner">产品大类：</span>
          <span class=" content">{{bigKind}}</span>
        </li>
        <li class="clearfix">
          <span class="banner">产品小类：</span>
          <span class=" content">{{smallKind}} </span>
        </li>
        <li class="clearfix">
          <span class="banner">所属子系统：</span>
          <span class=" content">{{system}}</span>
        </li>
        <li class="clearfix">
          <span class="banner">标准配置：</span>
          <span class=" content">{{peizhi}}</span>
        </li>
        <li class="clearfix">
          <span class="banner">合同编号：</span>
          <span class=" content">{{code}} </span>
        </li>
        <li class="clearfix">
          <span class="banner">对应加密狗编号：</span>
          <span class=" content">{{dogCode}}</span>
        </li>
        <li class="clearfix">
          <span class="banner">租户名称：</span>
          <span class=" content">{{zuhu}} </span>
        </li>
        <li class="clearfix">
          <span class="banner" >租户编码：</span>
          <span class=" content">{{zuhuCode}}</span>
        </li>
        <li class="clearfix">
          <span class="banner">账号开通时间：</span>
          <span class=" content">{{time}}</span>
        </li>
        <li class="clearfix">
          <span class="banner">租期：</span>
          <span class=" content">{{duringTime}}</span>
        </li>
      </ul>
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
      fullName:"",
      bigKind:"",
      smallKind:"",
      status:"",
      system:"",
      peizhi:"",
      code:"",
      dogCode:"",
      zuhu:"",
      zuhuCode:"",
      time:"",
      duringTime:""
    }
  },
  created () {
    document.querySelector('html').setAttribute('style', 'background:#fff');
    this.getData();
  },
  destroyed () {
    document.querySelector('html').setAttribute('style', 'background:#F6F6F6')
  },
  filters:{
    fix(val){
        return numberComma(Number(val).toFixed(0))
    },
    subst(val){
      if(val){
        return val.substring(0,10)
      }else{
        return val;
      }

    }
  },
  methods:{
    getData(){
      this.loading=true;
      this.$http.post("/api/EnergizaSaleKHInfoController/GetKHProductDetail",{
        ProductGUID:this.$route.params.id
      })
      .then((res)=>{
        // console.log(res)
        // return;
        this.fullName=res.Data.ListData.FullName;
        this.status=res.Data.ListData.IsOutput;
        this.bigKind=res.Data.ListData.ProductCategoriesName;
        this.smallKind=res.Data.ListData.ProductSmallCategoriesName;
        this.system=res.Data.ListData.SystemName;
        this.peizhi=res.Data.ListData.StandardConfiguration;
        this.code=res.Data.ListData.ContractCode;
        this.dogCode=res.Data.ListData.DongleCode;
        this.zuhu=res.Data.ListData.Enterprise_Name;
        this.zuhuCode=res.Data.ListData.Enterprise_Code;
        this.time=res.Data.ListData.rent_startdate;
        this.duringTime=res.Data.ListData.rent_time;

      })
    }
  }
}
</script>

<style lang="less">
.cm-detail-wrap{
  .title1{
    font-size: 1.3rem;
    margin-bottom: 2rem;
  }
  .detail-list{
    .title2{
      font-size: 1.3rem;
      color: #3079D5;
      padding: 5px 0;
      border-bottom: 1px solid #eaeaea;
    }
    li{
      line-height: 1.3rem;
      padding: 8px 0;
      display: flex;
      &>span{
        display: block;
      }
      .banner{
        max-width: 50%;
        min-width: 40%;
        color: #666;
      };
      .content{
        // max-width: 50%;
        flex-grow:1
      }
    }
  }
}
</style>
