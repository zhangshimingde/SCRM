<template>
    <div>
      <template v-if="!loading">

          <div class="follow-wrap" style="padding-bottom:55px">
            <template v-if="dataList.length>0">
              <div class="follow-item"  v-for="(list,index) in dataList">
                <p class="time-title">{{list.date}}</p>
                <ul class="item-content">
                  <li class="cm-padding relative " v-for="(item,index2) in list.data">
                    <div class="cir absolute"></div>
                    
                      <div class="content-type1 clearfix">
                        <div class="clearfix contents">
                          <span class="left ">{{item.time}}</span>
                          <span class="left "  style="margin-left:10px;color:#000">{{item.LastEditorName}}</span>
                        </div>
                        <p class="wordbreak" style="padding-left:46px;color:#666">{{item.RealContent}}</p>
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
import { InlineLoading   } from 'vux'
export default {
  name: '',
  components:{
     InlineLoading 
  },
  mounted(){
    // this.getData();
    this.test();
  },
  props:['id','ProType'],
  data () {
    return {
      pubType:"",
      loading:true,
      isPublish:false,
      openYy:false,
      myCode:"",
      recordId:"",
      dataList:[]
    }
  },
  filters:{
    timesub(val){
      return val.replace("T"," ").substring(0,19)
    }
  },
  methods:{
    getData(){ //获取跟进记录
      this.loading=true;

      this.$http.post("/api/AjaxLXRinfoController/GetLxrtrack ",{
        SortGUID:this.$route.params.id,
        PageSize:50,
        PageIndex:1
      }).then((res)=>{
        // this.tabInfo.xwCount=res.Data.data.total;

        this.loading=false;
        console.log(res)
        var temp=res.Data.data.items;
        // this.sort(res.Data);
      })
    },
    test(){
      var temp=[
      {"years":"2017","months":"03","dates":"2017-03-15","times":"16:21","type":"活动签到","content":"3.15深圳站","product":null},
      {"years":"2017","months":"03","dates":"2017-03-15","times":"03:05","type":"报名活动","content":"3.15深圳站","product":null},
      {"years":"2016","months":"12","dates":"2016-12-08","times":"16:19","type":"活动签到","content":"供需对接会-中山站","product":null},
      {"years":"2016","months":"12","dates":"2016-12-07","times":"23:07","type":"报名活动","content":"供需对接会-中山站","product":null},
      {"years":"2016","months":"05","dates":"2016-05-26","times":"16:26","type":"活动签到","content":"供需对接会深圳站","product":null},
      {"years":"2016","months":"05","dates":"2016-05-26","times":"06:03","type":"报名活动","content":"供需对接会深圳站","product":null},
      {"years":"2016","months":"05","dates":"2016-05-25","times":"17:03","type":"活动签到","content":"供需对接会深圳站公开课","product":null},
      {"years":"2016","months":"05","dates":"2016-05-25","times":"16:12","type":"报名活动","content":"供需对接会深圳站公开课","product":null},
      {"years":"2016","months":"05","dates":"2016-05-24","times":"06:02","type":"报名活动","content":"深圳站供应商勾选开发商","product":null},
      {"years":"2016","months":"05","dates":"2016-05-10","times":"23:01","type":"报名活动","content":"1980产业园论坛活动","product":null},
      {"years":"2016","months":"04","dates":"2016-04-26","times":"22:33","type":"报名活动","content":"云采购供需对接会——广州站","product":null}];

      this.sort(temp);
    },
    sort(arr){ //数据重排
        var map = {},
            dest = [];
        for(var i = 0; i < arr.length; i++){
            var ai = arr[i];
            if(!map[ai.years]){
                dest.push({
                    years: ai.years,
                    data: [ai]
                });
                map[ai.years] = ai;
            }else{
                for(var j = 0; j < dest.length; j++){
                    var dj = dest[j];
                    if(dj.years == ai.years){
                        dj.data.push(ai);
                        break;
                    }
                }
            }
        }

        // console.log(dest);
        dest.map((el)=>{
          el.data=this.sort2(el.data)
        })
        
        dest.map((el)=>{
          // console.log(el.data.data);
          el.data.map((el2)=>{
            el2.data=this.sort3(el2.data)
          })
          
        })
        console.log(dest);
    },
    sort2(arr){ //数据重排
        var map = {},
            dest = [];
        for(var i = 0; i < arr.length; i++){
            var ai = arr[i];
            if(!map[ai.months]){
                dest.push({
                    months: ai.months,
                    data: [ai]
                });
                map[ai.months] = ai;
            }else{
                for(var j = 0; j < dest.length; j++){
                    var dj = dest[j];
                    if(dj.months == ai.months){
                        dj.data.push(ai);
                        break;
                    }
                }
            }
        }
        return dest;
    },
    sort3(arr){ //数据重排
      // console.log(arr);
      // return;
        var map = {},
            dest = [];
        for(var i = 0; i < arr.length; i++){
            var ai = arr[i];
            if(!map[ai.dates]){
                dest.push({
                    dates: ai.dates,
                    data: [ai]
                });
                map[ai.dates] = ai;
            }else{
                for(var j = 0; j < dest.length; j++){
                    var dj = dest[j];
                    if(dj.dates == ai.dates){
                        dj.data.push(ai);
                        break;
                    }
                }
            }
        }
        // console.log(dest)
        return dest;
    },
  },
  watch:{
  }
}
</script>

<style lang="less">
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
