<template>
      <div id="home-list">
        <group>
          <cell is-link v-for="(item,index) in indexList" :key="index" :link="'/msgList/'+item.href">
            <p slot="title"><span style="margin:0 15px">{{item.title}}</span><badge :text="item.badge" style="margin-bottom:2px" v-if="item.badge"></badge></p>
            <img slot="icon" width="18" style="display:block;" :src="item.icon">
          </cell>
        </group>
      </div>
</template>

<script>
import { Cell,Group,Badge  } from 'vux'
export default {
  name: 'overview',
  components:{
    Cell,Group,Badge 
  },
  mounted(){
    this.getData();
  },
  data () {
    return {
      indexList:[
        {
          title:"待办",
          badge:0,
          href:'msgListdb',
          icon:"static/img/daiban.png"
        },
        {
          title:"通知",
          badge:0,
          href:'msgListtz',
          icon:"static/img/tongzhi.png"
        },
        {
          title:"预警",
          badge:0,
          href:'msgListyj',
          icon:"static/img/yujing.png"
        },
        {
          title:"审批",
          badge:0,
          href:'msgListsp',
          icon:"static/img/shenpi.png"
        }
      ]
    }
  },
  methods:{
    getData(){
      // 预警
        this.$http.get("/api/EnergizaSalesOpportunities/GetOppSaleAbnormalCount")
        .then((res)=>{
          this.indexList[2].badge=res.Data;
        })


        // 通知
        this.$http.get("/api/EnergizaSalesOpportunities/GetOppSaleMessageCount",{
          params:{
            type:1
          }
        })
        .then((res)=>{
          this.indexList[1].badge=res.Data;
        })

        // 待办
        this.$http.get("/api/EnergizaSalesOpportunities/GetOppSaleMessageCount",{
          params:{
            type:2
          }
        })
        .then((res)=>{
          this.indexList[0].badge=res.Data;
        })

        // 审批
        this.$http.get("/api/EnergizaSalesOpportunities/GetOppSaleApproveCount")
        .then((res)=>{
          this.indexList[3].badge=res.Data;
        })
    }
  }
}
</script>

<style lang="less">
@import '../../assets/less/exports.less';
#overview{
  background: #dcdcdc;
  margin:0rem auto 1rem;
  width:95%;
  .border-box;
  padding: 0.5rem;
}
</style>
