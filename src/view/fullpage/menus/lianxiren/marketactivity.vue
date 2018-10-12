<template>
    <div>
      <template v-if="!loading">

          <div class="market-list-wrap" style="padding-bottom:5px">
            <template v-if="dataList.length>0">
              <ul class="market-list cm-padding">
                <li v-for="(item,index) in dataList" :key="index">
                  <div class="clearfix header">
                    <div class="left text-over">
                      <i class="iconfont icon-hongqi" style="color:rgb(126, 211, 33)"></i>
                      <span>{{item.ActivityName}}</span>
                    </div>

                    <div class="status right unbegin" v-if="item.SignStatus=='未开始'">未开始</div>
                    <div class="status right signed" v-else-if="item.SignStatus=='未签到'">未签到</div>
                    <div class="status right unsign" v-else-if="item.SignStatus=='已签到'">未签到</div>
                  </div>
                  <div class="clearfix content">
                    <div class="left text-over">
                      {{item.Location}}
                    </div>
                    <div class="right" style="color:#888">{{item.StartTime?item.StartTime.substring(0,10):item.StartTime}}</div>
                  </div>
                </li>
              </ul>
            </template>
            <p  v-else class="text_center" style="width: 100%;padding:30px 0 0;">暂无数据..</p>
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
import {InlineLoading} from 'vux'

export default {
  name: '',
  components:{
    InlineLoading
  },
  // beforeCreate () {
  //   document.querySelector('html').setAttribute('style', 'background:#fff')
  // },
  // beforeDestroy () {
  //   document.querySelector('html').setAttribute('style', 'background:#F6F6F6')
  // },
  created(){
    this.getInit();
  },
  data () {
    return {
      loading:false,
      dataList:[]
    }
  },
  methods:{
    getInit(){  //获取市场活动
      this.loading=true;
      this.$http.post("/api/AjaxLXRinfoController/GetMemberActivityInfo",{
        SortGUID:this.$route.params.id
      })
      .then((res)=>{
        this.loading=false;
        console.log(res);
        this.dataList=res.Data;

      })
    }
  },
  watch:{
  }
}
</script>

<style lang="less">
.market-list-wrap{
  .market-list{
    li{
      background-color: white;
      padding: 0 10px;
      border-radius: 5px;
      margin:10px 0;
      &>div{
        padding: 10px 0;
      }
      .header{
        border-bottom: 1px solid #eaeaea;
        .status{
          &.unbegin{color: #eaeaea;}
          &.unsign{color: rgb(45, 166, 247);}
          &.signed{color: rgb(126, 211, 33);}
        }
      }
      .text-over{
        max-width: 66%;
        color: #666;
      }
    }
  }
}
</style>
