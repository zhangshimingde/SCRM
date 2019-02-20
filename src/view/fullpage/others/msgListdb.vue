<template>
      <div id="msg-list">

        <div class="content scroll-content-wrap" id="scroll-wrap">
          <template v-if="!loading2">
            <div id="scroll-box">
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
            </div>
          </template>
          <template v-else>
            <p class="text_center" style="padding:40px 0">
              <inline-loading></inline-loading>
              <span style="color:#9d9d9d">数据加载中</span>
            </p>
          </template>
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
  mounted(){
    var inner=document.getElementById('scroll-box');
    var outer=document.getElementById('scroll-wrap');
    var _this=this;
    if(outer){
      outer.onscroll=function(){
          //  if(_this.loading) return;
          //  console.log(this.scrollTop +outer.offsetHeight,document.getElementById('scroll-box').clientHeight)
           if(this.scrollTop +outer.offsetHeight+10>=document.getElementById('scroll-box').clientHeight){
             _this.loadMore();
           }
      }
    }
    this.getData(true)
  },
  data () {
    return {
      loading:false,
      loading2:false,
      page:0,
      pageSize:25,
      indexList:[]
    }
  },
  methods:{
    loadMore() {

      this.page++;
      if(this.page>this.totalPage-1&&this.totalPage!=0) return;
      this.getData(false);
    },
    getData(reset){
        this.loading=true;
        if(reset){
          this.page=0;
          this.loading2=true;
        }
        var url='/api/EnergizaSalesOpportunities/GetOppSaleMessageList';

        this.$http.post(url,{
            pageSize:this.pageSize,
            pageIndex:this.page,
            Type:2 //1是通知2是待办
        })
        .then((res)=>{
          this.loading=false;
          this.loading2=false;
          this.totalPage=Math.ceil(res.Total/this.pageSize);
            // return;
            res.Data.map(el=>{
              this.indexList.push(el)
            });
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
.scroll-content-wrap{
    height: 100vh;
    background-color: white;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}
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
