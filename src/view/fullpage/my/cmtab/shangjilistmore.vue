<template>
      <ul id="res-list" class="shangjilist">
        <template  v-if="data.length>0">
          <group class="sj">
            <cell-box v-for="(listdata,index2) in data" :key="index2">
              <div class="wraps"  @click="goDetail(listdata)">
                <!-- {{listdata.StageName}} -->
                <div class="clearfix header bigger">
                  <span class="left stage" v-if="listdata.StageName&&listdata.StageName=='确认中'" style="background:#0fcbaf">确</span>
                  <span class="left stage" v-else-if="listdata.StageName&&listdata.StageName=='需求引导'" style="background:#0FCBAF">需</span>
                  <span class="left stage" v-else-if="listdata.StageName&&listdata.StageName=='待确认'" style="background:#666">待</span>
                  <span class="left stage" v-else-if="listdata.StageName&&listdata.StageName.indexOf('非成交关闭')>-1" style="background:#b2b2b2">非</span>
                  <span class="left stage" v-else-if="listdata.StageName&&listdata.StageName.indexOf('商机激活')>-1" style="background:#b2b2b2">商</span>
                  <span class="left stage" v-else-if="listdata.StageName&&listdata.StageName=='成交关闭'" style="background:#71C671">成</span>
                  <span class="left stage" v-else-if="listdata.StageName&&listdata.StageName=='价值呈现'" style="background:#0F8EE9">价</span>
                  <span class="left stage" v-else-if="listdata.StageName&&listdata.StageName=='方案竞争'" style="background:#FFB415">竞</span>
                  <span class="left stage" v-else-if="listdata.StageName&&listdata.StageName=='商务谈判'" style="background:#FD8933">谈</span>
                  <span class="left stage" v-else-if="listdata.StageName&&listdata.StageName=='赢取承诺'" style="background:#FD8933">赢</span>
                  <span class="left stage" v-else-if="listdata.StageName&&listdata.StageName=='合同审批'" style="background:#E75647">审</span>
                  <p class="left title " v-html="listdata.OpportunitiesName"></p>
                  <span class="right date" >{{listdata.PredictTradeTime | formate}}</span>
                </div>
                <div class="clearfix">
                    <div class="money left" style="padding-right:0.8rem;width:30%;box-sizing:border-box">
                      <i class="iconfont icon-nsiconmy" style="margin-right:0rem"></i>
                      <span style="color:#666" v-html="listdata.PredictTradeMoney+'万'"></span>
                    </div>
                    <div class="kehu left text-over fgx" style="width:70%;box-sizing:border-box;padding-left:0.8rem;" v-if="listdata.SortName">
                        <i class="iconfont icon-gongsi" style="margin-right:0.2rem"></i><span v-html="listdata.SortName"></span>
                    </div>
                </div>
                
                <div class="people">
                  <i class="iconfont icon-ren"></i><span v-html="listdata.ResponsibleName"></span>

                  <span class="right guanzhu" style="width:5rem;color:#3079D5;" v-if="listdata.ConcernGUID" @click.stop.prevent="guanzhu('qg',listdata)"><i class="iconfont icon-shixin"></i>已关注</span>
                  <span class="right guanzhu" style="width:5rem;color:#3079D5;" v-else @click.stop.prevent="guanzhu('gz',listdata)"><i class="iconfont icon-kongxin"></i>关注</span>
                  <span class="right guanzhu" style="width:5rem;color:#3079D5;"  @click.stop="fenpei(listdata,index2)">
                    <i class="iconfont icon-fenpeianniu" style="margin:0"></i>分配
                  </span>

                </div>
                <!-- <div class="kehu" v-if="listdata.SortName">
                  <p style="display:inline-block;width:90%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                    <i class="iconfont icon-gongsi"></i><span v-html="listdata.SortName"></span>
                  </p>
                </div> -->
              </div>
            </cell-box>
          </group>
        </template>
        <template v-else >
          <p class="text_center" style="padding:40px 0">
            <span style="color:#9d9d9d">暂无数据..</span>
          </p>
        </template>


        <div v-transfer-dom>
          <popup v-model="chosepeople" :popup-style="{background:'white'}" position="right" width="80%">
            <checkpeople @choseFinish="chosePeopleFinish"></checkpeople>
          </popup>
        </div>
      </ul>
</template>

<script>
import {TransferDom,Popup, Cell,CellBox,Group ,InlineLoading  } from 'vux'
import checkpeople from '../../../../components/common/checkpeople';
export default {
  name: '',
  components:{
    Cell,CellBox,Group,Popup ,InlineLoading,checkpeople
  },
  directives: {
    TransferDom
  },
  filters:{
    subst(value){
      if(!value) return value;
      return value.substring(0,1);
    },
    formate(value){
      if(!value) return value;
      return value.substring(0,10)
    }
  },
  props:["data"],
  data () {
    return {
      chosepeople:false,
      id:"",
      inde:0
    }
  },
  methods:{
    chosePeopleFinish(params){ //选择主责人完毕
      this.chosepeople=false;
      if (!params) {return ;};
      this.$vux.loading.show({
         text: '正在分配..'
        })
        // 隐藏

      this.$http.post("/api/EnergizaSalesOpportunities/DisOppReponsible",{
        OpportunitiesGUID:this.id,
        ResponsibleGUID:params.id
      })
      .then((res)=>{
        this.$vux.loading.hide()
        if(res.Success){
            this.$vux.alert.show({
              title: '友情提示',
              content: '分配成功！'
            })
            this.data[this.inde].ResponsibleName=params.name;
        }else{
          this.$vux.alert.show({
              title: '友情提示',
              content: res.Message
            })
        }
      })
    },
    fenpei(item,index){ //分配
      this.inde=index;
      this.id=item.OpportunitiesGUID;
      this.chosepeople=true;
    },
    guanzhu(type,item){


      if(type=="gz"){
        this.$http.post("/api/EnergizaSaleMyConcern/AddMyConcernDiffType",{
          OpportunitiesGUID:item.OpportunitiesGUID,
          type:1
        }).then((res)=>{
          item.ConcernGUID=res.Data;
          this.$vux.alert.show({
              title: '友情提示',
              content: '关注成功！'
            });
        })
      }else{
        this.$http.post("/api/EnergizaSaleMyConcern/DelMyConcern",{
          KHGUID:item.OpportunitiesGUID
        }).then((res)=>{
          item.ConcernGUID=res.Data;
          this.$vux.alert.show({
              title: '友情提示',
              content: '已取消关注！'
            });
        })
      }
    },
    goDetail(item){
      // console.log(item.OpportunitiesGUID);
      this.$router.push({
        name:"shangjidetail",
        params:{
          id:item.OpportunitiesGUID
        }
      })
    }
  }
}
</script>

<style lang="less">
.shangjilist{
  .weui-cells{
    margin-top: 0;
    &:before{
      border: none
    }
    &:after{
      border:none
    }
  }
}
.fgx{
  position: relative;
  &:before{
    content: "";
    display: block;
    position: absolute;
    width: 1px;
    height: 60%;
    left:0;
    background-color: #eaeaea;
    top:20%;
  }
}
</style>
