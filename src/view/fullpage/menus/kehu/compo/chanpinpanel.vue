<template>
  <div>
    <div class="overview">
        <div class="title clear">
          <div class="header clearfix cm-padding">
            <img src="static/img/paper.png" alt="" style="position:relative;top:-0.15rem;">
            <span id="title" style="font-size:1.07rem">产品简报</span>
          </div>
          <div class="content text_center">
            <template v-if="!loading">
              <div class="inner relative" id="cp"  v-if="panelDataList.length>0">
                <flexbox :gutter="0" wrap="wrap" style="background:white">
                  <flexbox-item :span="panelDataList.length>1?1/3:0" v-for="(item,index) in panelDataList" :key="index">
                      <div class="text_center links">
                        <span style="color:#999">{{item.name}} </span><br>
                        <span style="font-size:16px;position:relative;top:2px">{{item.val | fix}}{{item.dw}}</span>
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
              <router-link :to="{name:'khchanpindetail',params:{id:item.ProductGUID}}" class="block">
                  <p class="title clearfix">
                    <span class="left name text-over">{{item.khFullName}}</span>
                    <span class="right status" v-if="item.DeliveryStatus=='未出库'">未出库</span>
                    <span class="right status active" v-else>已出库</span>
                  </p>
                  <div class="content text_center">
                    <div class="list-items clearfix">
                      <span class="left name">产品名称：</span>
                      <span class="left value">{{item.ProductName}}</span>
                    </div>
                    <div class="list-items clearfix">
                      <span class="left name">产品大类：</span>
                      <span class="left value">{{item.ProductCategoriesName}}</span>
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
        name:"ERP产品数",
        val:"",
        dw:"个"
      },{
        name:"SAAS产品数",
        val:"",
        dw:"个"
      },{
        name:"ERP签约运维数",
        val:"",
        dw:"个"
      }],
      khList:[]
    }
  },
  created(){
    this.getListData();
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
    getListData(){
      this.loading2=true;
      this.loading=true;
      this.$http.post("/api/EnergizeContract/GetKhContractProductPageList",{
        KHGUID:this.$route.params.id,
        pageIndex:0,
        PageSize:500
      })
      .then((res)=>{
        this.loading2=false;
        this.loading=false;
        console.log(res);
        this.khList=res.Data.List;
        this.panelDataList[0].val=res.Data.CountData[0].ERPCount||0;
        this.panelDataList[1].val=res.Data.CountData[0].SAASCount||0;
        this.panelDataList[2].val=res.Data.CountData[0].YwCount||0;
      })
    }
  }
}
</script>

<style lang="less">
@import '../../../../../assets/less/exports.less';
#cp.inner{
      &:after{
        content: " ";
        position: absolute;
        display: none;
      }
}
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
        .name{
          width: 70%;
        }
        .status{
          border: 1px solid #888;
          color: #888;
          border-radius: 5px;
          padding: 0 9px;
          &.active{
            color: #3079D5;
            border-color:#3079D5;
          }
        }
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
        .list-items{
          padding: 6px 0;
          .name{
            color: #888;
            width: 25%;
            text-align: left;
          };
          .value{
            width: 75%;
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
