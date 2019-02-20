<template>
    <div>
      <template v-if="!loading">

          <div class="xw-wrap" style="padding-bottom:0px">
            <template v-if="dataList.length>0">
              <div class="follow-item"  v-for="(list,index) in dataList" :key="index">
                <div class="xw-year-wrap text_center">-{{list.Year}}年-</div>
                <div style="padding-bottom:15px;background:white">
                  <div class=" bg-white" style="padding:0 15px;" v-for="(list2,index2) in list.Children" :key="index2">
                    <div class="xw-month-wrap relative last" v-if="list2.last" :class="index2==0?'ot':'fi'" @click="changeFold(list2,index2,list.Children.length)">
                        <div class="cir absolute"></div>
                        <div class="relative text">
                          <div  :class="list2.fold?'':'ro'" class="inline_block i"><i class="icon-down iconfont"></i></div>
                          {{list2.Month}}月
                        </div>
                    </div>
                    <div class="xw-month-wrap relative " v-else :class="index2==0?'ot':'fi'" @click="changeFold(list2,index2,list.Children.length)">
                        <div class="cir absolute"></div>
                        <div class="relative text">
                          <div  :class="list2.fold?'':'ro'" class="inline_block i"><i class="icon-down iconfont"></i></div>
                          {{list2.Month}}月
                        </div>
                    </div>
                    <div class="data-inner" v-show="list2.fold" v-for="(list3,index3) in list2.ChildrenTwo" :key="index3">
                      <div class="time-title relative xw-date">
                        <div class="cir absolute"></div>
                        {{list.Year+"-"+list2.Month+"-"+list3.Day}}
                      </div>
                      <ul class="item-content">
                        <li class="cm-padding relative " v-for="(item4,index4) in list3.ChildrenThree" :key="index4">
                          <div class="cir absolute"></div>

                            <div class="content-type1 clearfix">
                                <span class="left xw-time">{{item4.times}}</span>
                                <div class="left xw-content"  style="color:#000">
                                  <span>{{item4.type}}</span>
                                  <span v-if="item4.content">—— {{item4.content}}</span>
                                  <span v-if="item4.product">—— [{{item4.product}}]</span>
                                </div>
                            </div>

                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
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
import { InlineLoading   } from 'vux'
export default {
  name: '',
  components:{
     InlineLoading
  },
  mounted(){
    this.getData();
  },
  data () {
    return {
      loading:true,
      dataList:[]
    }
  },
  filters:{
    timesub(val){
      return val?val.replace("T"," ").substring(0,19):val;
    }
  },
  methods:{
    getData(){ //获取跟进记录
      this.loading=true;

      this.$http.post("/api/AjaxLXRinfoController/GetLxrtrack ",{
        SortGUID:this.$route.params.id,
        PageSize:5000,
        PageIndex:1
      }).then((res)=>{
        this.loading=false;



        res.List.map((el)=>{
          el.Children.map((el2,index2)=>{
              el2.fold=false;
              if(index2==el.Children.length-1){
                 el2.last=true;
              }else{
                el2.last=false;
              }
          })
        })
        this.dataList=res.List;
        console.log(this.dataList);
      })
    },
    changeFold(item,index,length){
      // item.Month="66666"
      item.fold?item.fold=false:item.fold=true;
      // item.fold=true;
      console.log(item.fold,index,length)
      if(!item.fold&&(index==length-1)){
        item.last=true;
      }else{
        item.last=false;
      }
    }
  },
  watch:{
  }
}
</script>

<style lang="less" scoped>
.xw-wrap{
  // background: white;
  .xw-year-wrap{
    background-color: #F6F6F6;
    padding: 15px;
    font-size: 1.2rem;
  }
  .xw-month-wrap{
    padding-left:10px !important;
    margin-left: 10px;
    font-size: 1.2rem;
    padding-top: 16px !important;
    &.last{
      // border: none !important;
      &:before{
        display: block;
        position: absolute;
        content: "";
        width: 1px;
        background-color: #fff !important;
        left:-1px;
        bottom: 0;
        height: 40%;
      }
    }
    .text{
      // top:-7px;
      color: #333;
      .i{
        margin: 0 5px;
        color: #C7C7CC;
        transition:all 0.3s ease;
        &.ro{
          transform:rotateZ(-90deg)
        }
      }
    }

    &.fi{
      border-left:1px solid #D8D8D8;
    }
    &.ot{
      &:before{
        display: block;
        position: absolute;
        content: "";
        width: 1px;
        background-color: #D8D8D8;
        left:0;
        bottom: 0;
        height: 40%
      }
    }

    .cir{
        border-radius: 100%;
        width: 10px;
        height: 10px;
        background-color: #3079D5;
        top:0;
        bottom:0;
        margin:auto;
        left:-5px;
        transform:translateY(8px)
    }
  }
  .xw-time{
    width:20%;
  }
  .xw-content{
    width: 80%;
  }
  .xw-date{
    padding-left:10px !important;
    margin-left: 10px;
    border-left:1px solid #D8D8D8;
    color: #3079D5;
    .cir{
        border-radius: 100%;
        width: 10px;
        height: 10px;
        background-color: #fff;
        top:0;
        bottom:0;
        margin:auto;
        left:-5px;
        border:1px solid #3079D5;
        box-sizing: border-box;
    }
  }
  // padding:0 10px;
  // padding-bottom: 55px;
  .follow-item{
    // margin:0 0 10px;
    .time-title{
      padding: 10px 0;
      background-color: white;
    }
    .item-content{
      margin-left: 10px;
      border-left:1px solid #D8D8D8;
      padding-left: 10px;
      li{
        background-color: #F6F6F6;
        border-radius: 3px;
        margin-bottom:10px;
        &:last-child{
          margin-bottom: 0;
        }
        .cir{
          border-radius: 100%;
          width: 10px;
          height: 10px;
          background-color: #fff;
          top:0;
          bottom:0;
          margin:auto;
          left:-10.5px;
          transform:translateX(-50%);
          box-sizing: border-box;
          border:1px solid #D8D8D8;
        }
        .time,.contents{
          color: #666;
          word-break:break-all;
        }
        .content-type1{
          .time{
            width: 20%;
          }
          .name{
            width: 20%
          }
          .contents{
            width: 60%;

          }
        }
        .content-type2{
          .user-info{
            @h:2.6rem;
            height: @h;
            line-height: @h;
            margin:0px 0 5px;
            .people-pic{
              height: @h;
              width: @h;
              border-radius: 4px;
              margin-right: 10px;
            }
          }
          .extra-info{
            padding: 10px 0 0;
            border-top: 1px solid #eaeaea;
            margin:10px 0;
            &>div{
              border: 1px solid #666;
              border-radius: 20px;
              color: #666;
              padding: 5px 15px;
              font-size: 0.9rem;
            }
          }
          .comments-wrap{
            position: relative;
            padding-top: 10px;
            margin-top:10px;
            &:before{
              content: '';
              display: block;
              height: 0;
              position: absolute;
              width: 100%;
              border-top: 1px dashed #eaeaea;
              left: 0;
              top:0;
            };
            li{
              margin:6px 0;
              &:last-child{
                margin-bottom: 0;
              };
              &:first-child{
                margin-top: 0;
              };
              border-radius: 3px;
              font-size: 0.9rem;
              .user-info{
                line-height: normal;
                height: auto;
              }
              .user-name{
                width: 25%;
                color: #333;
                line-height: normal;
              }
              .replays{
                width: 75%;
                color:#888;
                line-height: normal;
                word-break:break-all;
              }
            }
          }
        }
      }
    }
  }

}
</style>
