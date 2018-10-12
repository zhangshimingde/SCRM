<template>
      <div id="msg-list">
        <template v-if="!loading">
          <group>
            <template v-if="indexList.length>0">
            <cell-box v-for="(item,index) in indexList" :key="index">
              <span @click="detail('shangjidetail',item)" class="block-link clearfix relative"  v-if="item.DataType=='商机'">
                  <div class=" icon-wrap text_center relative sj" >
                    <div class="absolute point" v-if="item.IsRead==0"></div>
                    <i class="iconfont icon-shangji"></i>
                  </div>
                  <div class=" content">
                    <p class="title"><span class="inline_block text-over" style="width:50%">{{item.Title}}</span><span class="right date">{{item.CreataOn?item.CreataOn.replace("T"," ").substring(0,19):""}}</span></p>
                    <p class="msg">{{item.Content}}</p>
                  </div>
              </span>
              <span @click="detail('kehudetail',item)" class="block-link clearfix relative"  v-else-if="item.DataType=='客户'">
                    <div class=" icon-wrap text_center relative sj" >
                      <div class="absolute point" v-if="item.IsRead==0"></div>
                      <i class="iconfont icon-shangji"></i>
                    </div>
                    <div class=" content">
                      <p class="title"><span class="inline_block text-over" style="width:50%">{{item.Title}}</span><span class="right date">{{item.CreataOn?item.CreataOn.replace("T"," ").substring(0,19):""}}</span></p>
                      <p class="msg">{{item.Content}}</p>
                    </div>
                </span>
            </cell-box>
            </template>
            <template v-else>
              <div class="text_center" style="padding:20px 0;color:#ccc">暂无数据...</div>
            </template>
          </group>
        </template>
        <div v-else style="padding:40px 0;" class="text_center">
          <inline-loading></inline-loading>
          <span style="color:#9d9d9d">数据加载中</span>
        </div>
      </div>
</template>

<script>
import { CellBox,Group,Badge,InlineLoading  } from 'vux'
export default {
  name: '',
  components:{
    CellBox,Group,Badge ,InlineLoading
  },
  beforeCreate () {

  },
  beforeDestroy () {
  },
  created(){

    this.getData()
  },
  data () {
    return {
      loading:false,
      indexList:[]
    }
  },
  methods:{
    getData(type){
        this.loading=true;
        var url='/api/EnergizaSalesOpportunities/GetOppSaleMessageList';

        this.$http.get(url,{
          params:{
            Type:2 //1是通知2是待办
          }
        })
        .then((res)=>{
          this.loading=false;
            console.log(res);
            // return;
            this.indexList=res.Data;
        })
    },
    detail(type,item){

        this.$http.get("/api/EnergizaSalesOpportunities/SetOppSaleMessageHasRead",{
          params:{
            MesssageGUID:item.MessageId
          }
        })
        .then((res)=>{})

       this.$router.push({
        name:type,
        params:{
          id:item.RelationGuid
        }
      })
    }
  }
}
</script>

<style lang="less">
@import '../../../assets/less/exports.less';
#msg-list{
  .weui-cells{
    margin-top: 0;
  }
  .block-link{
    // display: -webkit-box;
    // -webkit-box-algin:center;
    display: flex;
    align-items:center;
    .point{
      .border-radius(100%);
      @w:0.8rem;
      height: @w;
      width: @w;
      top:0;
      right:-@w/2;
      background-color: red;
      transform:translateY(-50%);
      background-color: #EC2E2A
    }
    .icon-wrap{
      @w:3rem;
      width: @w;
      height: @w;
      line-height: @w;
      margin-right: 0.5rem;
      .border-radius;
      i{
        font-size: 1.2rem;
      }
      color: white;
      &.sj{
        background-color: #55C2FA;
      }
      &.xs{
        background-color: #22C6AE;
      }
    }
    .content{
      // -webkit-box-flex:1;
      .border-box;
      width: 100px;
      flex-grow:1;
      .title{
        color: #000;
      }
      .date{
        font-size: 0.8rem;
        color: #888;
        line-height: 1.5rem;
      }
      .msg{
        font-size: 0.8rem;
        color: #888;
        .text-overflow;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 1;
        // overflow: hidden;
      }
    }
  }
}
</style>
