<template>
  <div class="cm-detail-wrap cm-padding">
    <p class="title1">{{fullName}}</p>
    <div class="detail-list">
      <p class="title2">合同基本信息</p>
      <ul>
        <li class="clearfix">
          <span class="banner">客户简称：</span>
          <span class=" content">{{sortName}}</span>
        </li>
        <li class="clearfix">
          <span class="banner">合同编号：</span>
          <span class=" content">{{code}}</span>
        </li>
        <li class="clearfix">
          <span class="banner">签约时间：</span>
          <span class=" content">{{date}}</span>
        </li>
        <li class="clearfix">
          <span class="banner">签约金额：</span>
          <span class=" content">{{money/10000 | fix}} 万</span>
        </li>
        <li class="clearfix">
          <span class="banner">签约人：</span>
          <span class=" content">{{people}}</span>
        </li>
        <li class="clearfix">
          <span class="banner">合同主责人：</span>
          <span class=" content">{{zzr}} </span>
        </li>
        <li class="clearfix">
          <span class="banner" >合同所属部门：</span>
          <span class=" content">{{department}}</span>
        </li>
        <li class="clearfix">
          <span class="banner">顶级客户全称：</span>
          <span class=" content">{{topName}}</span>
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
      sortName:"",
      code:"",
      date:"",
      money:0,
      people:"",
      topName:"",
      department:"",
      zzr:""
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
      this.$http.post("/api/EnergizaSaleKHInfoController/GetKHContractDetail",{
        ContractGuid:this.$route.params.id
      })
      .then((res)=>{
        console.log(res)
        this.fullName=res.Data.FullName;
        this.sortName=res.Data.FullName;
        this.code=res.Data.ContractCode;
        this.date=res.Data.SignDate?res.Data.SignDate.substring(0,10):res.Data.SignDate;
        this.money=res.Data.SignMoney;
        this.people=res.Data.UserName;
        this.topName=res.Data.TopCustomer;
        this.department=res.Data.Department;
        this.zzr=res.Data.ContractZzrName;
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
