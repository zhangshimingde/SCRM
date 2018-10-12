<template>
  <div class="searchhetong clearfix fixed">
    <div class="header clearfix">
        <search ref="search"  :autoFixed="false"   placeholder="搜索客户简称/客户全称/合同编号"   style="color:#666;fontSize:16px;"></search>
    </div>
    <div class="container overflow-touch">
      <template  v-if="!loading" >
        <template  v-if="true" >
          <div class="content clearfix"  >
            <div class="contentLeft left">
                <div class="hetongName clearfix">
                    <span class="hNspan1">深圳香江</span>
                    <span class="hNspan">【szxj-fw-2017-01-0072】</span> </div>
                <div class="hetongTip">试点验收报告款</div>
                <div class="hetongTime">
                    应收日期：<span>2017-11-30</span>
                </div>
            </div>
            <div class="contentRight left">5.8万元</div>
          </div>
        </template>
        <template  v-else>
          <p class="text_center" style="padding:40px 0">
            <span style="color:#9d9d9d">暂无数据..</span>
          </p>
        </template>
      </template>
      <template v-else>
        <div class="text_center" style="height:54px;line-height:54px;width:100vw">
          <inline-loading></inline-loading>
          <span style="color:#9d9d9d">数据加载中</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {Search,InlineLoading  } from 'vux'
export default {

  components:{
    Search,
    InlineLoading,
    
  },
 
  data(){
      return {
          loading:false,
      }
  },
  created(){
    // 自定义返回事件
    //  window.history.pushState(null, null, ""); 
    //  window.addEventListener("popstate", ()=> { 
    //     // this.finish('');
    //     this.$emit("checkfinish","");
    //   }, false); 
    //   this.getData(this.fullName);
  },
    methods:{
        
    }
}
</script>

<style lang="less">
    .fixed{
        position: fixed;
        left:0;
        top:0;
    }
    .searchhetong{
        width:100%;
        height:100%;
        background-color: #fff;
        .header{
            background-color: #f6f6f6;
            // position:absolute;
            // left:0;
            // top:0; 
            width: 100%;
           .searchbgc{
               position: relative;
               .weui-search-bar:before{
                   border-top:0 !important;
               }
               .weui-search-bar:after{
                   border-bottom:0 !important;
               }
               .weui-search-bar{
                //    background-color: #f6f6f6!important;
                   .weui-search-bar__cancel-btn{
                       color:#3079D5!important;
                   }
                   .weui-search-bar__label{
                       border-radius: 0.5rem;
                   }
               }
               .searchWord{
                   display: inline-block;
                   width:3rem;
                   position: absolute;
                   left:100%;
                   top:0.7rem;
                   font-size: 16px;
                   color: #3079D5;
               }
           }
        }
        .container{
            width:100%;
            .content{
                width:100%;
                padding:2%;
                box-sizing: border-box;
                border-top:1px solid #d0d0d0;
                border-bottom: 1px solid #d0d0d0;
                .contentLeft{
                    width:70%;
                    .hetongName{
                        width:100%;
                        color:#0992ff;
                        .hNspan1{
                            width:30%;
                            display: inline-block;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            float: left;
                        }
                        .hNspan{
                            width:70%;
                            display: inline-block;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            float: left;
                        }
                    }
                    .hetongTip{
                        width:100%;
                        font-weight: bold;
                    }
                    .hehongTime{
                        width:100%;
                        
                    }
                }
                .contentRight{
                    width:30%;
                    text-align: right;
                    font-size: 1.2rem;
                    font-weight: bold;
                    color:#0992ff;
                }
            }
        }
    }
</style>
