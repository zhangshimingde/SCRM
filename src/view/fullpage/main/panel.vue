<template>
  <div id="panel" class=''>
    <div class="fixed" style="width:100%;top: 0;left: 0;z-index:2">
        <search ref="search" @on-focus="sear" placeholder="搜索"></search>
        <!-- <i class="iconfont icon-yuyin1 absolute global-yy" @click="yy"></i> -->
    </div>
    <div style="height: 45px;"></div>
      <template v-if="!loading">
        <ul class=" panel-home-box" v-if="dataList">
          <li class=' panel-item'>
            <div class="panel-inner clearfix">
              <div class="left relative circle-wrap">
                <x-circle :percent="dataList.QYMB!=0?Number((dataList.QYJE/dataList.QYMB*100).toFixed(0)):0" :stroke-width="10" style="position:absolute;top:0;left:0" stroke-color="#3079D5" :trail-width="10" trail-color="#eeeeee">
                  <span >{{dataList.QYMB!=0?(dataList.QYJE/dataList.QYMB*100).toFixed(0):0}}%</span>
                </x-circle>
              </div>

              <div class="left hope-wrap cm-wrap">
                <span class="digtal">{{dataList.QYMB | fix}}</span> <br>
                <span class="title">预算目标(万)</span>
              </div>
              <div class="left infact-wrap  cm-wrap">
                <div class="line absolute"></div>
                <span class="digtal">{{dataList.QYJE | fix}}</span> <br>
                <span class="title">实际签约(万)</span>
              </div>
            </div>
          </li>
          <li class=' panel-item'>
            <div class="panel-inner clearfix">
              <div class="left relative circle-wrap">
                <x-circle :percent="dataList.HKMB!=0?Number((dataList.HKJE/dataList.HKMB*100).toFixed(0)):0" :stroke-width="10" style="position:absolute;top:0;left:0" stroke-color="#3079D5" :trail-width="10" trail-color="#eeeeee">
                  <span >{{dataList.HKMB!=0?(dataList.HKJE/dataList.HKMB*100).toFixed(0):0}}%</span>
                </x-circle>
              </div>

              <div class="left hope-wrap cm-wrap">
                <span class="digtal">{{dataList.HKMB | fix}}</span> <br>
                <span class="title">回款目标(万)</span>
              </div>
              <div class="left infact-wrap  cm-wrap">
                <div class="line absolute"></div>
                <span class="digtal">{{dataList.HKJE | fix}}</span> <br>
                <span class="title">实际回款(万)</span>
              </div>
            </div>
          </li>
        </ul>
        <p  v-else class="text_center" style="width: 100%;padding:20px 0;background:white">暂无数据..</p>
      </template>
      <template v-else >
        <p class="text_center" style="padding:16.5% 0;margin-bottom:15px;background:white;height:4rem;line-height:4rem">
          <inline-loading></inline-loading>
          <span style="color:#9d9d9d">数据加载中</span>
        </p>

      </template>
      <panelList></panelList>
  </div>
</template>

<script>
import panelList from "../../../components/panel/panelList"
import { Search,InlineLoading,numberComma } from 'vux'
import { XCircle  } from 'vux'
export default {
  name: 'panel',
  components: {
    panelList,XCircle,Search,InlineLoading,numberComma
  },
  created(){
    this.getData();
  },
  data(){
    return {
      loading:false,
      dataList:{},
    }
  },
  filters:{
    fix(val){
      if(val){
        return numberComma(val.toFixed(2))
      }else{
        return 0;
      }
    }
  },
  methods:{
    sear(){
      this.$router.push({name:"search",params:{yy:false}})
    },
    yy(){
      this.$router.push({name:"search",params:{yy:true}})
    },
    getData(){
      this.loading=true;
      this.$http.post("/api/EnergizeSaleBulletin/GetQYHKDashBoard")
      .then((res)=>{

        if(!res) return;
        this.loading=false;
        this.dataList=res.Data;
      })
    }
  }
}
</script>
<style lang="less">
@import '../../../assets/less/exports.less';
.panel-home-box{
  background-color: white;
  margin-bottom: @cmmg;
  .panel-item{
    .line1px(@gray);
    padding: 1rem 0.8rem;
    .panel-inner{
      .circle-wrap{
        width:17%;
        padding-top:17%;
      }
    }
    .hope-wrap{
      .border-box;
      width: 45%;
    }
    .infact-wrap{
      .border-box;
      width:37%
    }
    .cm-wrap{
      padding: 1.7% 0;
      .digtal{
        color: #F4333C;
        font-size: 1.3rem;
      }
      .title{
        color: #999;
        font-size: 0.9rem;
      }
      &.hope-wrap{
        padding-left: 10%;
      }
      &.infact-wrap{
        padding-left: 5%;
        position: relative;
        .line{
          left: 0;
          top:20%;
          height: 60%;
          background-color: #d9d9d9;
          width: 1px;
        }

      }
    }
  }

}
</style>
