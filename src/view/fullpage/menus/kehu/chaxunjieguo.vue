<template>
  <div class="jieguo clearfix fixed">
    <div class="header clearfix absolute">
        <search ref="search" class="left"  :autoFixed="false"  style="color:#666;fontSize:16px;width:84%"   placeholder="" @on-submit="getData" v-model="keyword" @on-cancel="finish('')" ></search>
        <div class="left text_center search-btn" style=""  @click="getData">搜索</div>
    </div>
    <div class="container overflow-touch">
      <template  v-if="!loading" >
        <template  v-if="searchList.length>0" >
          <div class="content clearfix" v-for="(searchs,i) in searchList" :key="i" @click="finish(searchs.Name)" >
            <div class="FullName  clearfix">
              <p class="text-over left" style="width:80%">
                <i class="iconfont icon-gongsi" style="color:#b2b2b2!important"></i>
                <span class="guanjianci" v-html="searchs.Name"></span>
              </p>

                <span class="cunxu right" >{{searchs.Status?searchs.Status.substring(0,2):searchs.Status}}</span>
            </div>

            <!-- <div class="gupiao clearfix">
                <span class="cunxu left" style="color:#eec6b0;borderColor:#eec6b0;marginLeft:20px">A股</span>
                <p class="left gupiaoming">中洲控股（000042.sz）</p>
            </div> -->
            <ul class="ul clearfix info-lists">
                <li style="color:#a9a9a9">法定代表人</li>
                <!-- <li style="color:#a9a9a9">注册资本</li> -->
                <li style="color:#a9a9a9">成立日期</li>
                <li style="color:#3079D5;">{{searchs.OperName}}</li>
                <!-- <li style="">66483.1139万元</li> -->
                <li style="">{{searchs.StartDate?searchs.StartDate.substring(0,10):searchs.StartDate}}</li>
            </ul>
          </div>
        </template>
        <template v-else >
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
    Search,InlineLoading
  },
  props:["fullName"],
  data(){
      return {
          loading:false,
          keyword:this.fullName,
          searchList:[],
      }
  },
  mounted(){
    // 自定义返回事件
    this.$refs.search.setFocus();
     window.history.pushState(null, null, "");
     window.addEventListener("popstate", ()=> {
        // this.finish('');
        this.$emit("checkfinish","");
      }, false);

     if(this.keyword){
        this.getData();
      }

  },
  methods:{
      getData(){
        this.keyword=this.keyword?this.keyword.replace(new RegExp(" ","gi"),""):"";
        this.keyword=this.keyword.replace(new RegExp("（","gi"),"(");
        this.keyword=this.keyword.replace(new RegExp("）","gi"),")");
        if(!this.keyword){
          this.$vux.alert.show({
            title: '友情提示',
            content: '请输入要查询的关键词！'
          })
          return;
        }
        var reg=/^[(\u4e00-\u9fa5)|(a-z)|(A-Z)|&]+$/ig;
        if(!reg.test(this.keyword)||this.keyword.length<2){
          this.$vux.alert.show({
            title: '友情提示',
            content: '关键字长度必须不少于2个，且必须为中文或者英文!'
          })
          this.loading=false;
          return;
        }

        this.loading=true;
        this.$http.post("/api/EnergizaSaleKHInfoController/GetEnterpriseInformation",{
          FullName:this.keyword
        }).then((res)=>{
          this.loading=false;
          res.Data.data.map((el)=>{
            this.keyword.split("").map((el2)=>{
              // if(el2!="s"&&el2!="p"&&el2!="a"&&el2!="n"&&el2!="t"&&el2!="y"&&el2!="l"&&el2!="e"&&el2!="c"&&el2!="o"&&el2!="r"&&el2!="d"){
              //     el.Name=el.Name.replace(new RegExp(el2,"gi"),"<span style='color:#3079d5'>"+el2+"</span>");
              // }
              if(el2=='('||el2==')'){
                el2="\\"+el2;
              }
              if(el2!="s"&&el2!="p"&&el2!="a"&&el2!="n"&&el2!="t"&&el2!="y"&&el2!="l"&&el2!="e"&&el2!="c"&&el2!="o"&&el2!="r"&&el2!="d"){
                  el.Name=el.Name.replace(new RegExp(el2,"gi"),"<span style='color:#3079d5'>"+el2.replace('\\(','(').replace('\\)',')')+"</span>");
              }
            })
          })
          this.searchList=res.Data.data;
          console.log(this.searchList)
        })
      },
      finish(params){
        // this.$router.go(-1)
        params=params.replace(new RegExp( /<[^>]*>|<\/[^>]*>/gm,"gi"),"");  //去除html标签
        this.$emit("checkfinish",params);
        this.$router.go(-1)
      }
  }

}
</script>

<style lang="less">
    .jieguo{
        .search-btn{
            font-size:16px;line-height:44px;width:16%;color:#3079D5 !important;
        }
        .weui-search-bar:after{
            display: none;
        }
        width: 100%;
        height: 100%;
        font-size: 10px;
        background-color: #f6f6f6;
        z-index: 99;
        left: 0;
        top:0;
        .header{
            background-color: #f6f6f6;
            position:absolute;
            left:0;
            top:0;
            width: 100%;
            z-index: 10;
            .weui-search-bar__form{
                background-color:transparent;
            }
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
            height:100%;
            box-sizing: border-box;
            padding-top:3rem;
            color: #666;
             .content{
                padding:0 0.8rem;
                background-color: #fff;
                margin-bottom: 1rem;
                padding-top:0.5rem;
                .FullName{
                    padding-top: 0.5rem;
                    width:100%;
                    height:1.5rem;
                    font-size: 1rem;
                    // .guanjianci{
                    //     color:#ec6a64;
                    // }
                    i{
                      font-size: 1rem;
                      margin-right: 0.2rem
                    }

                }
                .cunxu{

                        border: 1px solid #3079D5;
                        font-size: 0.8rem;
                        color: #3079D5;
                        border-radius: 0.3rem;
                        text-align: center;
                        padding: 0.1rem 0.3rem;
                    }
                .gupiao{
                    width: 100%;
                    height: 1.5rem;
                    padding-left: 0.2rem;
                    margin-top: 0.5rem;
                    .gupiaoming{
                        font-size: 1rem;
                    }
                }
                .ul{
                    width:100%;
                    li{
                        width: 50%;
                        height: 2rem;
                        font-size: 0.9rem;
                        float: left;
                        // text-align: center;
                        text-indent: 1.5rem;
                        line-height: 2rem;
                        color: #979797;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }

                }
            }
        }


    }
</style>
