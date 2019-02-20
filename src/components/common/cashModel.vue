<template>
    <div class="cash-box fixed">
      <group>
        <cell-box>
          <div class="form-item clearfix" id="date"  style="padding-right:0" >
            <calendar title="发生日期" class="datecalendar"  placeholder="必填" v-model="date"></calendar>
          </div>
        </cell-box>
      </group>

      <div class="cash-body">
        <group style="margin-bottom:0.8rem;position:relative" v-for="(item,index) in tableData" :key="index">
          <swipeout>
            <swipeout-item  transition-mode="follow"  >
              <div slot="right-menu">
                  <swipeout-button  type="warn" @click.native="deletCash(index)">删除</swipeout-button>
              </div>
              <div slot="content" class="demo-content vux-1px-t">
                <cell-box style="margin-top:0">
                  <div class="form-item clearfix" style="" >
                    <x-input title='费用类型' v-model="item.FeeType" placeholder="请填写" :show-clear="true" text-align="right"></x-input>
                  </div>
                </cell-box>
                <cell-box style="margin-top:0">
                  <div class="form-item clearfix" style="" >
                    <x-input title='金额(元)' placeholder="请填写" type="number" v-model="item.Cost" :show-clear="true" text-align="right"></x-input>
                  </div>
                </cell-box>
              </div>
            </swipeout-item>
          </swipeout>
        </group>
      </div>

      <div class="cash-footer">
        <p>Tips:左滑可删除费用类型哦~</p>
        <div class="clearfix cash-btn">
          <div class="left" style="background:#ccc" @click="addCash">新增费用类型</div>
          <div class="right" @click="comfirm">保存</div>
        </div>
      </div>
    </div>
</template>

<script>
import {Swipeout, SwipeoutItem, SwipeoutButton,Calendar,Group,CellBox,XInput} from 'vux'
import moment from "moment";
import _ from "lodash";
export default {
    components:{
      Swipeout, SwipeoutItem, SwipeoutButton,Calendar,Group,CellBox,XInput
    },
    props:['switchs','followId','cashList','cashDate'],
    created(){
        window.history.pushState(null, null, "");
        window.addEventListener("popstate", ()=> {
          // console.log("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
          this.$emit("closeCash")
        }, false);

        this.setInit();
    },
    data () {
        return {
          show:false,
          loading: false,
          date:moment(new Date()).format("YYYY-MM-DD"),
          tableData:[]
        }
    },
    computed:{
      total(){
        let sum=0;
        this.tableData.map(el=>{
          sum+=Number(el.Cost);
        })
        return sum
      }
    },
    methods:{
      addCash(){
        this.tableData.unshift({FeeType:"",Cost:""})
      },
      deletCash(index){
        this.tableData.splice(index,1);
      },
      setInit(){
        this.date=moment(new Date()).format("YYYY-MM-DD");
        this.tableData=[];

        if(this.followId){ //获取某條記錄的費用
          this.$vux.loading.show({
            text: '获取数据中..'
          })
          this.$http.post("/api/AjaxFollowLogController/GetFeeByFollowGUID",{
            followGUID:this.followId
          })
          .then(res=>{
            // console.log(res.Data.CostDate);
            this.$vux.loading.hide();
            this.date=res.Data.CostDate?moment(res.Data.CostDate).format("YYYY-MM-DD"):moment(new Date()).format("YYYY-MM-DD");
            this.tableData=res.Data.CostList.map(el=>{
              return {Cost:el.Cost,FeeType:el.FeeType}
            });

            // 为空时补一条新建数据
            if(this.tableData.length==0){
              this.addCash();
            }
          })
        }else{ //發佈跟進記錄
          if(this.cashDate){this.date=this.cashDate}
          if(this.cashList.length!=0){
            this.tableData=_.cloneDeep(this.cashList);
          }else{
            this.addCash();
          }
        }
      },
      comfirm(){

        if(this.followId){ //修改某條記錄的費用
          this.$vux.loading.show({
            text: '正在提交..'
          })
          this.$http.post("/api/AjaxFollowLogController/UpdateFeeByFollowGuid",{
            followGUID:this.followId,
            CostDate:this.date,
            CostParamList:this.tableData
          })
          .then(res=>{
            this.$vux.loading.hide()

            if(res.Success){
                this.$vux.alert.show({
                  title: '友情提示',
                  content: "提交成功！"
                })
                this.$emit('cashFinish');
            }else{
              this.$vux.alert.show({
                  title: '提交失败',
                  content: res.Message
                })
            }
          })
        }else{ //發佈跟進記錄
          this.$emit('cashFinish',{total:this.total,tableData:this.tableData,date:this.date})
        }

      },
    }
}
</script>

<style lang="less">
.cash-box{
  background-color: #F6F6F6;
  position:fixed;
  width:100%;
  height:100%;
  background:white;
  top:0;
  left:0;
  z-index:101;
  display:flex;
  flex-direction:column;
  .vux-cell-box:not(:first-child):before{
    left:0px;
  }
  .weui-cells{
    margin-top:0 !important;
    &:after{
      border: none;
    }
  }
  &>div{
    width:100%
  }
  .cash-body{
    flex-grow:1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding:0.5rem;
    box-sizing:border-box;
    background:#F8F7FB;
  }
  .cash-footer{
    @h:4.5rem;
    height: @h;
    line-height: @h;
    // background-color: white;
    color: white;
    width: 100%;
    bottom: 0;
    left: 0;
    p{
      line-height:1.7rem;
      height:1.7rem;
      padding:0 0.3rem;
      font-size:0.8rem;
      color:#ccc;
    }
    .cash-btn{
      height:2.8rem;
      line-height: 2.8rem;
      div{
        width:50%;
        background-color: #3079D5;

        text-align: center;
      }
    }
  }
  .form-item{
    width: 100%;
    padding-right: 5%;
    box-sizing: border-box;

    .vux-calendar:before{
      border-top:0px !important;
    }
    .content{
       color: #757575;
       max-width: 65%;
       text-align: right;
       overflow: hidden;
       text-overflow:ellipsis;
       white-space: nowrap;
    }
    .weui-label{
      width:100%;
    }
    .user-pic{
      padding-top: 10px;
      li{
        width: 18%;
        margin:1%;
        .avater{
          padding-top: 100%;
          border-radius: 5px;
          // background-color: red;
          background-size: cover;
          background-position: center;
        }
        .name{
          overflow: hidden;
           text-overflow:ellipsis;
           white-space: nowrap;
           text-align: center;
           font-size: 0.8rem;
           color: #757575;
           margin-top: 3px;
        }
      }
    }

  }
  .weui-cells:first-child{
    margin-top: 0;
    &:before{
      border: none;
    }
  }
  .vux-x-input{
    padding:0 !important;
  }
  .sub-wrap{
    padding: 20px;
    .sub{
      color: white;
      padding:10px 0;
      background: #3079D5;
      border-radius: 5px;
    }
  }
  #date{
    .weui-cell{
      padding: 0 !important;
      .vux-cell-placeholder{
        color:#757575 !important
      }
    }
  }
  .sh{
    .weui-cell{
      padding:0 !important;
      .vux-x-switch.weui-cell_switch{
        padding: 0;
      }
    }
  }
  .qy{
    .weui-cell{
      padding:0 !important;
    }
  }
}
#date{
  position: relative;
}
#date #dateIcon{
  position: absolute;
  top:0;
  right:17px;
}
</style>
