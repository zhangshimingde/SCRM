<template>
      <div class="personal-kx">
        <template v-if="!loading">
          <div class="clearfix fixed" style="width:100%;padding-bottom:14px;background:white;top:0;z-index:2">
            <span class="left date dw" style="margin-top:9px;padding-left:15px">
                <popup-picker :data="choseMonth" class="inline_block" @on-change="changeDateType" :display-format="formatMonth" v-model="month">
                  <i class="iconfont icon-rili" slot="title" style="margin-right:4px"></i>
                </popup-picker>
            </span>
          </div>
          <!-- ss -->
          <ul class="_ydkx-list" v-if="ygList.length>0" style="padding-top:40px">
            <li  v-for="(item,index) in ygList" :key="index">
              <div class="header clearfix relative">
                <p class="clearfix">
                  <span class="left title">{{item.CustomFullName}}</span> 
                  <span class="right cb">{{item.State}}</span>
                </p>
                <p class="code-ht" style="color:#2D75D8" v-if="item.SignDate">【{{item.ContractCode}}】</p>
              </div>
              
              <div class="content">
                <div class="relative check-icon"><check-icon :value.sync="item.Checked" ></check-icon></div>
                <div>
                  <span class="digital" style="color:#F4333C">{{item.SignMoney?item.SignMoney:0}}万</span><br>
                  <span class="title">签约金额</span>
                </div>
                
                <div>
                  <span class="digital">{{item.SignUserName}}</span><br>
                  <span class="title">签约人</span>
                </div>
                <div>
                  <span class="digital" v-if="item.SignDate">{{item.SignDate | formateDate}}</span><br>
                  <span class="title">签约日期</span>
                </div>
              </div>
            </li>
          </ul>
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

        <div class="footer fixed">
          <div class="change-time" @click="back">取消</div>
          <div class="change-people" @click="changeData('people')">确定</div>
        </div>
      </div>
</template>

<script>
import {InlineLoading ,numberComma ,CheckIcon,PopupPicker} from 'vux'
export default {
  name: '',
  components:{
    InlineLoading,numberComma,CheckIcon,PopupPicker
  },
  created(){
    this.getData();
  },
  data () {
    return {
      loading:false,
      month:[(new Date()).getFullYear().toString(),(new Date().getMonth()+1).toString()],
      choseMonth:[['2015', '2016','2017', '2018','2019', '2020'],['1', '2','3', '4','5', '6','7', '8','9', '10','11','12']],
      ygList:[]
    }
  },
  filters:{
    fix(val){
      if(!val) return val;
        return numberComma(val.toFixed(2))
    },
    fix2(val){
      if(!val) return val;
        return numberComma(val.toFixed(0))
    },
    formateDate(val){
      if(!val) return val;
      var str=(val.substring(0,10)).split('-');
      str=str.join('/');
      return str
    }
  },
  methods:{
    getData(){
      this.loading=true;
      this.ygList=[];
      this.$http.get("/api/EnergizaSalesOpportunities/OppRelationContractList",{
        params:{
          OppGUID:this.$route.params.id,
          year:this.month[0],
          month:this.month[1]
        }
      })
      .then((res)=>{
        console.log(res)
        this.loading=false;
        res.Data.map((el)=>{
          el.SignMoney=Number(el.SignMoney/10000).toFixed(2)
        })
        this.ygList=res.Data;
      })
    },
    changeData(){  //提交
      this.idList=[];
      this.ygList.map((el,index)=>{
         if(el.Checked){
          this.idList.push(el.ContractGUID)
         }
      });
      if(this.idList.length==0){
        this.$vux.alert.show({
            title: '友情提示',
            content: '请至少勾选一项！'
          })
        return;
      }
      // type=="time"?this.changetime=true:this.changepeople=true;
      console.log(this.idList.join(','));

      this.$http.post("/api/EnergizaSalesOpportunities/OppRelationContract",{
        ContractGUIDlist:this.idList.join(','),
        OppGUID:this.$route.params.id,
        Checked:true
      }).then((res)=>{
        this.$vux.alert.show({
            title: '友情提示',
            content: '提交成功！'
          })
        this.$router.go(-1);
        // console.log(res)
      })
    },
    back(){
      this.$router.go(-1)
    },
    changeDateType(val){ //切换日期之后
      // this.dates=="year"?this.date=this.year[0]:this.date=this.formatMonth(this.month);
      this.getData();
    },
    formatMonth(value) {
        return `${value[0]}-${value[1]}`
    }
  },
  watch:{

  }
}
</script>

<style lang="less">
@import "../../../../../assets/less/exports.less";
.personal-kx{
  .footer{
    width: 100%;
    background-color: white;
    bottom: 0;
    left: 0;
    @h:3rem;
    line-height: @h;
    font-size: 0.8rem;
    display: flex;
    text-align: center;
    border-top: 1px solid #d9d9d9;
    &>div{
      flex-grow:1;
    }
    .total-cash{
      color: #999;
    }
    .change-time{
      color: #fff;
      background-color: #ccc;
    }
    .change-people{
      color: #fff;
      background-color: #2D75D8;
    }
  }
}

._ydkx-list{
  background-color: #f6f6f6;
  padding-bottom: 42px;
  li{
    background-color: white;
    margin-bottom: 0.6rem;
    .header{
      padding: 10px 10px 10px 15px;
      overflow: hidden;
      font-size: 0.9rem;
      .border-box;
      @h:1.5rem;
      line-height: @h;
      .title{
        max-width: 75%;
        .text-overflow;
      }
      .cb{
        border:1px solid #3079D5;
        border-radius: 3px;
        padding:0px 10px;
        .border-box;
        height: @h;
        color: #3079D5;
      }
      &:before{
        content: '';
        position: absolute;
        height: 1px;
        background-color: #f6f6f6;
        left: 15px;
        width: 100%;
        bottom: 0;
        right:0
      }
    }
    .content{
      padding: 10px 0;
      display: flex;
      .check-icon{
        // background-color: red;
      }
      &>div{
        flex-grow:1;
        padding: 0 0.5rem;
        font-size: 0.8rem;
        position: relative;
        text-align: center;
        border-right: 1px solid #ccc;
        .vux-check-icon{
          
          height: 1.3rem;
          i{
            font-size: 1.3rem;
            margin: 0;
          }
          [class^="weui-icon-"]:before, [class*=" weui-icon-"]:before{
            margin:0;
          }
          position: relative;
          // top: 50%;
          // bottom: 0;
          // top:50%;
          transform:translateY(35%)
        }
        .border-box;
        &:last-child{
          border: none;
        }
        .digital{
          color: black
        }
        .title{
          color: #999;
        }
      }
    }
  }
}
</style>
