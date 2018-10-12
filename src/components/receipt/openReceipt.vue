<template v-if="htlistShow">
  <div class="openReceipt" >
    <group title="" class="oR_code ">
        <Cell title="合同编号" is-link class="hetongCode marginTops" >
            <span class="hetongCodeSpan" @click="sousuo">点击选择（必填)</span> 
        </Cell>
         <x-input title='客户名称' placeholder="中海投资有限公司" text-align="right"></x-input>
         <x-input title='签约金额' placeholder="75000" text-align="right"></x-input>
         <x-input title='合同签署日期' placeholder="2014-12-19" text-align="right"></x-input>
         <x-input title='账套公司（合同盖章乙方）' placeholder="明源股份" text-align="right" class="zhangtaogongsi"></x-input>
         <x-input title='收入项' placeholder="基础运维" text-align="right"></x-input>
         
    </group>
    <group class="oR_type ">
        <Cell-box class="fapiaoType">
            <span>发票类型</span>
            <i class="iconfont icon-wenhao"></i>
        </Cell-box>
         <cell-box class="fapiaoRadio">
            <input type="radio" name="radio"  class="radio1" checked>
            <span class="span1">增值税专用发票</span>
            <input type="radio" name="radio" class="radio2">
            <span class="span2">增值税普通发票</span>
        </cell-box>
    </group>
       
    <group class="kaipiaomsgs">
        <x-input title="开票金额"  placeholder="必填"  text-align="right"></x-input>
        <x-input title="发票抬头"  placeholder="必填"  text-align="right"></x-input>
        <x-input title="纳税人识别码"  placeholder="必填"  text-align="right"></x-input>
        <x-input title="注册地址"  placeholder="必填"  text-align="right"></x-input>
        <x-input title="联系电话"  placeholder="必填"  text-align="right"></x-input>
        <x-input title="开户行"  placeholder="必填"  text-align="right"></x-input>
        <x-input title="开户行账号"  placeholder="必填"  text-align="right"></x-input>
        <x-input title="开票备注"  placeholder="选填"  text-align="right"></x-input>
    </group>
    <group class="oR_time ">
        <cell-box class="guidangtime">
            <span>合同预计归档时间</span>
            <i class="iconfont icon-wenhao"></i>
            <i class="iconfont icon-rili1"></i>
        </cell-box>
    </group>
    <group class="oR_zhifu ">
        <cell class="zhifufangshi clearfix">
            <span class="left">交付方式</span>
            <i class="iconfont icon-wenhao left"></i>
        </cell>
        <cell-box class="quhuofangshi">
            <input type="radio" name="quhuo" class="raios1" checked>
            <span class="span1">邮寄</span>
            <input type="radio" name="quhuo" class="span2">
            <span >自取</span>
        </cell-box>
    </group>
    <group class="oR_msg ">
        <x-input title="姓名" name="username" placeholder="必填" is-type="china-name" text-align="right"></x-input>
        <x-input title="手机号码" name="mobile" placeholder="必填" keyboard="number" is-type="china-mobile" text-align="right"></x-input>
        <x-input title="地址"  placeholder="选填"  text-align="right"></x-input>
    </group>
    <div class="submitBtn">提交</div>
    <!-- 搜索合同 -->
    <htlist  v-if="htlistShow"></htlist>
   
  </div>
</template>
<script>
import {Group, Cell, CellBox,XInput,XButton,Calendar } from "vux"
import htlist from './searchhetong';
export default {
   components: {
    Group,
    Cell,
    CellBox,
    XInput,
    XButton,
    htlist,
    Calendar
    
  },

  data(){
      return {
          htlistShow:false,
          
          
          }
  },

  methods:{
    sousuo(){
        this.htlistShow=true;
    }
  }
}
</script>
<style lang="less">
.openReceipt{
    width:100%;
    position: relative;
    .oR_code{
        width:100%;
        .weui-cells{
            margin-top:0;
            border-top:0;
        }
        .hetongCode{
            font-weight: bold;
            .hetongCodeSpan{
                color:#000
            }
        }
        .zhangtaogongsi{
            .weui-cell__hd{
                .weui-label{
                    width:100%;
                }
            }
        }
    }
    .oR_type{
        width:100%;
        .weui-cells{
            margin-top:0;
        }
        .fapiaoType{
            color:#666;
            i{
                margin-left:2%;
            }
        }
        .fapiaoRadio{
            font-size:1.1rem;
            .span1,.span2{
                margin:0 0.8rem
            }
        }
    }
    .kaipiaomsgs{
        width:100%;
        .weui-cells{
            margin-top:0;
        }
    }
    .oR_time{
        width:100%;
        .weui-cells{
            margin-top:0;
        }
        .guidangtime{
            color:#666;
            .icon-wenhao{
                margin-left:0.8rem
            }
            .icon-rili1{
                margin-left:46%;
                font-size: 2rem;
            }
        }
    }
    .oR_zhifu{
        width:100%;
        .weui-cells{
            margin-top:0;
        }
        .zhifufangshi{
           .weui-cell__ft{
               width:100%;
               i{
                   margin-left: 0.8rem;
               }
           }
        }
        .quhuofangshi{
            font-size: 1.1rem;
            .span1{
                margin:0 0.8rem
            }
            .span2{
                margin:0 0.8rem 0 20%; 
            }
        }
        
    }
    .oR_msg{
        margin-bottom:2rem;
        .weui-cells{
            margin-top:0;
        }
    }
    .submitBtn{
        width:100%;
        height:2.2rem;
        text-align: center;
        line-height: 2rem;
        background-color:#0992ff;
        color:#fff;
        font-size: 1.1rem;
    }

    .marginTops{
        margin-top:0 !important;
    }
   
}
</style>
