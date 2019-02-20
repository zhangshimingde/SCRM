<template>
      <div class="contract-box hmax">

          <Search
            v-model="searchName"
            :auto-fixed="false"
            @on-submit="resetData"
            ref="search">
          </Search>
          <div class="data-box scroll-tab">
            <div class="scroll-inner">
                <template v-if="!loading">
                    <ul class="_ydkx-list" v-if="tableData.length>0">
                      <li  v-for="(item,index) in tableData" :key="index">
                        <div class="header clearfix relative">
                          <p class="clearfix">
                            <span class="left title">{{item.CustomFullName?item.CustomFullName:'--'}}</span>
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
                      <p class="text_center" v-if="loadMoreFlag" style="padding:9px 0">
                        <inline-loading></inline-loading>
                        <span style="color:#9d9d9d">数据加载中</span>
                      </p>
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
            </div>
          </div>

          <div class="footer clearfix">
            <div class="change-time" @click="back">取消</div>
            <div class="change-people" @click="changeData('people')">确定</div>
          </div>

      </div>
</template>

<script>
import {InlineLoading ,numberComma ,CheckIcon,PopupPicker,Search } from 'vux'
export default {
  name: '',
  components:{
    InlineLoading,numberComma,CheckIcon,PopupPicker,Search
  },
  mounted(){
    document.getElementsByClassName('scroll-tab')[0].style.height=document.documentElement.clientHeight-45+'px';
    let _this=this;
    document.getElementsByClassName('scroll-tab')[0].onscroll=function(){
          if(_this.loading) return;
          if(_this.currentPage>=_this.pageTotal&&_this.pageTotal!=0) return;
          // console.log(this.scrollTop ,this.offsetHeight,document.getElementsByClassName('scroll-inner')[0].offsetHeight)
          if(this.scrollTop + this.offsetHeight>=document.getElementsByClassName('scroll-inner')[0].offsetHeight){
            _this.loadMore();
          }
    }
  },
  created(){
    this.getData();
  },
  data () {
    return {
      loading:true,
      month:[(new Date()).getFullYear().toString(),(new Date().getMonth()+1).toString()],
      choseMonth:[['2015', '2016','2017', '2018','2019', '2020'],['1', '2','3', '4','5', '6','7', '8','9', '10','11','12']],
      tableData:[],
      idList:[],
      currentPage:0,
      PageSize:30,
      pageTotal:0,
      searchName:"",
      loadMoreFlag:false,
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
    loadMore() {
      this.currentPage++;
      console.log(this.currentPage+","+this.pageTotal);
      if(this.currentPage>=this.pageTotal&&this.pageTotal!=0) return;
      this.loadMoreFlag=true;
      this.getData();
    },
    getData(){

      this.$http.post("/api/EnergizaSalesOpportunities/OppRelationContractList",{
          OpportunitiesGUID:this.$route.params.id,
          pageSize:this.PageSize,
          pageIndex:this.currentPage,
          SearchKey:this.searchName
      })
      .then((res)=>{
        console.log(res)
        this.loading=false;
        this.loadMoreFlag=false;
        res.Data.map((el)=>{
          el.SignMoney=Number(el.SignMoney/10000).toFixed(2);
          el.SignDate=el.SignDate?el.SignDate.substring(0,10):"";
          this.tableData.push(el);
        })
        // this.tableData=res.Data;
        this.pageTotal=Math.ceil(res.TotalCount/this.PageSize);
      })
    },
    changeData(){  //提交
      this.idList=[];
      this.tableData.map((el,index)=>{
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
      // console.log(this.idList.join(','));

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
    },
    resetData(){
        this.pageTotal=0;
        this.currentPage=0;
        this.idList=[];
        this.tableData=[];
        this.loading=true;
        this.getData();
    }
  },
  watch:{
    searchName(val){
      if(!val){
        this.resetData();
      }
    }
  }
}
</script>

<style lang="less">
@import "../../../../../assets/less/exports.less";
.contract-box{
  display: flex;
  flex-direction: column;
  .data-box{
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  ._ydkx-list{
    background-color: #f6f6f6;

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
  .footer{
    width: 100%;
    background-color: white;
    bottom: 0;
    left: 0;
    @h:3rem;
    height: @h;
    line-height: @h;
    font-size: 0.8rem;
    text-align: center;
    border-top: 1px solid #d9d9d9;
    &>div{
      float: left;
      width:50%;
      height:@h;
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


</style>
