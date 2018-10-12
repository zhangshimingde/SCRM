<template>
    <div>
      <template v-if="!loading">

          <div class="follow-wrap" style="padding-bottom:15px">
            <template v-if="dataList.length>0">
              <div class="follow-item"  v-for="(list,index) in dataList" :key="index">
                <p class="time-title text-over" style="font-size:1.1rem">
                  <span class="job-status in" v-if="list.IsInJob==1">在职</span>
                  <span class="job-status off" v-else>离职</span>
                  {{list.CustomerName}}
                </p>
                <ul class="item-content">
                  <li class="cm-padding relative ">
                      <div class="cir absolute"></div>
                      <div class="content-type1 clearfix">
                        <div class="clearfix ">
                          <p class=" "  style="color:#000">职务：<span style="color:#666">{{list.JobTitle}}</span></p>
                          <p class=" "  style="color:#000">负责业务：<span style="color:#666">{{list.Business}}</span></p>
                        </div>
                      </div>
                  </li>
                </ul>
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
import { Search,Checklist,Group,InlineLoading,TransferDom ,XInput ,Popup } from 'vux'

export default {
  name: '',
  components:{
    Group ,InlineLoading,XInput ,Popup
  },
  beforeCreate () {
    document.querySelector('html').setAttribute('style', 'background:#fff')
  },
  beforeDestroy () {
    document.querySelector('html').setAttribute('style', 'background:#F6F6F6')
  },
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
    getInit(){  //获取联系人信息
      this.loading=true;
      this.$http.post("/api/AjaxLXRinfoController/GetLxrDetail",{
        SortGUID:this.$route.params.id
      })
      .then((res)=>{
        this.loading=false;
        this.dataList=res.Data.ListRelation;

      })
    }
  },
  watch:{
  }
}
</script>

<style lang="less">
.job-status{
  font-size: 12px;
  border-radius: 10px;
  border: 1px solid #9E9E9E;
  color: #9E9E9E;
  padding: 0 6px;
  &.in{
    color: #3079D5;
    border-color:#3079D5;
  }
}
.follow-wrap{
  background: white;
  padding:0 10px;
  // padding-bottom: 55px;
  .follow-item{
    margin:0 0 10px;
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
        .cir{
          border-radius: 100%;
          width: 10px;
          height: 10px;
          background-color: #3079D5;
          top:0;
          bottom:0;
          margin:auto;
          left:-19px;
          border:4px solid white
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

  .write{
    background-color: #F0EFF5;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    bottom: 0;
    left:0;
    z-index: 1;
    .yuyin{
      i{
        font-size: 2rem;
        color: #666;
      }

    }
    .input-box{
      width: 87%;
    }
    .vux-x-input{
      padding:0 !important;
      background-color: white;
      border-radius: 5px;
      input{
        padding: 5px 3%;
        width: 94%

      }
    }
  }
}
</style>
