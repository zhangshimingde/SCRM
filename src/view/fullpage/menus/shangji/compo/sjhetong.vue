<template>
  <div class="cm-detail-wrap">
    <template v-if="!loading">
      <template v-if="htList.length>0"> 
        <div class="detail-list cm-padding" v-for="(item,index) in htList" :key="index" style="background:white;margin-bottom:1rem" >
        <ul>
          <li class="clearfix">
            <span class="banner">客户简称：</span>
            <span class=" content">{{item.CustomSortName}}</span>
          </li>
          <li class="clearfix">
            <span class="banner">合同编号：</span>
            <span class=" content">{{item.ContractCode}}</span>
          </li>
          <li class="clearfix">
            <span class="banner">签约时间：</span>
            <span class=" content">{{item.SignDate}}</span>
          </li>
          <li class="clearfix">
            <span class="banner">签约金额：</span>
            <span class=" content">{{item.SignMoney/10000 | fix}} 万</span>
          </li>
          <li class="clearfix">
            <span class="banner">签约人：</span>
            <span class=" content">{{item.SignUserName}}</span>
          </li>
          <li class="clearfix">
            <span class="banner">合同主责人：</span>
            <span class=" content">{{item.ZZRUserName}} </span>
          </li>
          <li class="clearfix">
            <span class="banner" >合同所属部门：</span>
            <span class=" content">{{item.Department}}</span>
          </li>
          <li class="clearfix">
            <span class="banner">顶级客户全称：</span>
            <span class=" content">{{item.CustomFullName}}</span>
          </li>
        </ul>
      </div>
      </template>
      <div v-else class="text_center" style="padding:70px 0">
            暂无数据..
      </div>
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
import {Flexbox, FlexboxItem,InlineLoading,numberComma  } from 'vux'
export default {
  name: 'overview',
  components:{
    Flexbox, FlexboxItem,InlineLoading,numberComma  
  },
  data () {
    return {
      loading:false,
      htList:[]
    }
  },
  beforeCreate () {
    // document.querySelector('html').setAttribute('style', 'background:#fff')
  },
  beforeDestroy () {
    document.querySelector('html').setAttribute('style', 'background:#F6F6F6')
  },
  created(){
    this.getData();
  },
  filters:{
    fix(val){
      if(!val) return val;
        return numberComma(Number(val).toFixed(2))
    },
    subst(val){
      if(!val) return val;
        return val.substring(0,10)
    }
  },
  methods:{
    getData(){
      this.loading=true;
      this.$http.get("/api/EnergizaSalesOpportunities/OppRelationContractListHas?OppGUID="+this.$route.params.id)
      .then((res)=>{
        console.log(res);
        this.loading=false;
        res.Data.map((el)=>{
          el.SignDate=el.SignDate?el.SignDate.substring(0,10):el.SignDate;
          el.SignMoney=Number(el.SignMoney).toFixed(2);
        })
        this.htList=res.Data;
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
