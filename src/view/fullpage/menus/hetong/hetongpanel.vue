<template>
  <div>
    <div class="overview">
        <div class="title clear">
          <div class="header clearfix cm-padding">
            <img src="static/img/paper.png" alt="" style="position:relative;top:-0.15rem;">
            <span id="title" style="font-size:1.07rem">签约简报</span>
          </div>
          <div class="content text_center">
            <template v-if="!loading">
              <div class="inner relative"  v-if="panelDataList.length>0">
                <flexbox :gutter="0" wrap="wrap" style="background:white">
                  <flexbox-item :span="panelDataList.length>1?1/3:0" v-for="(item,index) in panelDataList" :key="index">
                      <div class="text_center links">
                        <span style="color:#999">{{item.name}} </span><br>
                        <span style="font-size:16px;position:relative;top:2px" v-if="item.dw=='个'">{{item.val}}{{item.dw}}</span>
                        <span style="font-size:16px;position:relative;top:2px" v-else>{{item.val | fix}}{{item.dw}}</span>
                      </div>
                  </flexbox-item>
                </flexbox>
              </div>
              <p  v-else class="text_center" style="width: 100%;padding:20px 0;">暂无数据..</p>
            </template>
            <div v-else class="text_center" style="height:132px;line-height:132px">
              <inline-loading></inline-loading>
              <span style="color:#9d9d9d">数据加载中</span>
            </div>
          </div>
        </div>
    </div>

    <ul class="kh-hetong-list-wrap">
        <template v-if="!loading2">
          <template v-if="khList.length>0">
            <li class="cm-padding" v-for="(item,index) in khList" :key="index">
              <router-link :to="{name:'khhetongdetail',params:{id:item.ContractGUID}}" class="block">
                  <p class="title text-over">
                    {{item.KhFullName}}
                  </p>
                  <div class="content clearfix text_center">
                    <div class="left content-item">
                      <p class="val" style="color:#F4333C">{{item.SignMoney/10000 | fix}} 万元</p>
                      <span>签约金额</span>
                    </div>
                    <div class="left content-item">
                      <p class="val">{{item.ContractZzrName}}</p>
                      <span>签约人</span>
                    </div>
                    <div class="left content-item">
                      <p class="val">{{item.SignDate | subst}}</p>
                      <span>签约日期</span>
                    </div>
                  </div>
              </router-link>
            </li>
          </template>
          <template v-else>
            <div class="text_center" style="padding:20px 0;color:#ccc">暂无数据...</div>
          </template>
        </template>
        <div v-else style="height:132px;line-height:132px;text-align:center">
          <inline-loading></inline-loading>
          <span style="color:#9d9d9d">数据加载中</span>
        </div>

    </ul>
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
      loading2:false,
      panelDataList:[{
        name:"年度签约金额",
        val:"",
        dw:"万元"
      },{
        name:"年度合同数",
        val:"",
        dw:"个"
      },{
        name:"累计签约金额",
        val:"",
        dw:"万元"
      },{
        name:"累计合同数",
        val:"",
        dw:"个"
      }],
      khList:[]
    }
  },
  created(){
    this.getPanelData();
    this.getListData();
  },
  filters:{
    fix(val){
        return numberComma(Number(val).toFixed(2))
    },
    subst(val){
      if(val){
         return val.substring(0,10)
      }else{
        return val
      }

    }
  },
  methods:{
    getPanelData(){
      this.loading=true;
      this.$http.post("/api/EnergizeContract/GetKhContractLjData",{
        KHGUID:this.$route.params.id
      })
      .then((res)=>{
        this.loading=false;
        if(!res.Data[0]) return;
        this.panelDataList[0].val=res.Data[0].YearQyAmount/10000;
        this.panelDataList[1].val=res.Data[0].YearContractNum;
        this.panelDataList[2].val=res.Data[0].LjQyAmount/10000;
        this.panelDataList[3].val=res.Data[0].LjContractNum;
      })
    },
    getListData(){
      this.loading2=true;
      this.$http.post("/api/EnergizeContract/GetKhContractPageList",{
        KHGuid:this.$route.params.id,
        PageSize:500,
        pageIndex:0,
        searchKey:"",
      })
      .then((res)=>{
        this.loading2=false;
        // console.log(res);
        this.khList=res.Data.List;
      })
    }
  }
}
</script>

<style lang="less">
@import '../../../../assets/less/exports.less';
.overview{
  margin:0 0 @cmmg;
  background: white;
  .line1px;
  .line1pxt;
  .header{
    img{
      vertical-align: middle;
      height:1rem;
      // margin-right: 10px
    }
    .line1px;
  }
  .content{
    padding: 0 15px;
    .inner{
      &:after{
        content: " ";
        position: absolute;
        left: 0;
        bottom: 50%;
        right: 0;
        height: 1px;
        border-bottom: 1px solid @gray;
        color: @gray;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
      .links{
        padding: 13px 0;
        font-size:14px;
      }

    }

  }
}
.kh-hetong-list-wrap{
  background-color: white;
  li{
    border-bottom: 1px solid #eaeaea;
    &:last-child{
      border-bottom: none;
    }
    a{
      color: black;
      font-size:0.9rem;
      .title{
        font-size:1.1rem;
      }
      .content{
        .content-item{
          width: 33.3%;
          box-sizing: border-box;
          color:#ccc;
          margin-top: 10px;
          border-right: 1px solid #eaeaea;
          &:last-child{
            border-right: none;
          }
          .val{
            color:black;
            padding-bottom:6px;
          }
        }
      }
    }
  }
}
</style>
