<template>
      <ul id="res-list" class="shangjilist">
        <template  v-if="data.length>0">
          <group class="sj" id="kehu-list-wrap">
            <swipeout v-for="(listdata,index2) in data" :key="index2" >
              <swipeout-item  transition-mode="follow"  >
                <div slot="right-menu">
                  <swipeout-button  type="warn" @click.native="deleteItem(listdata,index2)">删除</swipeout-button>
                </div>
                <div slot="content" class="demo-content vux-1px-t">
                  <cell-box>
                    <div class="wraps"  @click="goDetail(listdata)">
                        <div class="clearfix header bigger">
                          <!-- <span class="left stage" v-if="listdata.IsTopCustomer==1" style="background:#0fcbaf">头</span> -->
                          <i class="iconfont icon-toubukehu left" style="color:#FEB711;font-size:1.2rem;margin-right:0.3rem"  v-if="listdata.IsTopCustomer==1"></i>
                          <p class="left title " style="width:63%">{{listdata.FullName}}</p>

                          <p class="right text_center xian" v-if="listdata.CompanyLevel">
                            <i class="iconfont icon-gongsi" style=""></i><span style="color:#666">{{listdata.CompanyLevel}}</span>
                          </p>

                        </div>
                        <div class="people clearfix">
                          <p class="left" style="width:45%" v-if="listdata.UserName_Chn">
                            <i class="iconfont icon-ren"></i><span>{{listdata.UserName_Chn}}</span>
                          </p>

                          <span class="right guanzhu" v-if="listdata.ConcernGUID" @click.stop.prevent="guanzhu('qg',listdata)"><i class="iconfont icon-shixin"></i>已关注</span>
                          <span class="right guanzhu" v-else @click.stop.prevent="guanzhu('gz',listdata)"><i class="iconfont icon-kongxin"></i>关注</span>


                          <div class="right" style="color:#3079D5;margin-right:1rem" v-if="listdata.IsRight==1" @click.stop="fenpei(listdata,index2)">
                            <i class="iconfont icon-fenpeianniu" style="margin:0"></i>分配
                          </div>
                        </div>
                    </div>
                  </cell-box>
                </div>
              </swipeout-item>
            </swipeout>
          </group>
        </template>
        <template v-else >
          <p class="text_center" style="padding:40px 0">
            <span style="color:#9d9d9d">暂无数据..</span>
          </p>
        </template>


        <div v-transfer-dom>
          <popup v-model="chosepeople" :popup-style="{background:'white'}" position="right" width="80%">
            <checkpeople @choseFinish="chosePeopleFinish"></checkpeople>
          </popup>
        </div>
      </ul>
</template>

<script>
import {Swipeout, SwipeoutItem, SwipeoutButton,TransferDom,Popup, Cell,CellBox,Group ,InlineLoading  } from 'vux'
import checkpeople from '../../../../components/common/checkpeople';
export default {
  name: '',
  components:{
    Cell,CellBox,Group,Popup ,InlineLoading,checkpeople,Swipeout, SwipeoutItem, SwipeoutButton
  },
  directives: {
    TransferDom
  },
  filters:{
    subst(value){
      if(value){
          return value.substring(0,1);
      }else{
        return value;
      }
    },
    formate(value){
      if(value){
          return value.substring(0,10);
      }else{
        return value;
      }
    }
  },
  props:["data"],
  data () {
    return {
      chosepeople:false,
      id:"",
      inde:0
    }
  },
  methods:{
    deleteItem(listdata,index2){
      var _this=this;
      this.$vux.confirm.show({
        title: '友情提示',
        content: '确定要此客户？',
        onConfirm () {

          _this.$http.post("/api/EnergizaSaleKHInfoController/DelModelMulti",{KHGUIDs:listdata.KHGUID})
          .then((res)=>{
            _this.$vux.loading.hide()
            if(res.Success){
                _this.$vux.alert.show({
                  title: '友情提示',
                  content: '删除成功！'
                });
                _this.data.splice(index2,1);
            }else{
                _this.$vux.alert.show({
                  title: '友情提示',
                  content: res.Message
                })
            }
          })

        }
      })


    },
    chosePeopleFinish(params){ //选择主责人完毕

      this.chosepeople=false;
      if (!params) {return ;};
      this.$vux.loading.show({
         text: '正在分配..'
        })
        // 隐藏

      this.$http.post("/api/EnergizaSaleKHInfoController/SaveDistribution",{
        KHGUID:this.id,
        TrustPeople:params.id
      })
      .then((res)=>{
        this.$vux.loading.hide()
        if(res.Success){
            this.$vux.alert.show({
              title: '友情提示',
              content: '分配成功！'
            });
            this.data[this.inde].UserName_Chn=params.name;
        }else{
          this.$vux.alert.show({
              title: '友情提示',
              content: res.Message
            })
        }
      })
    },
    guanzhu(type,item){
      var url;
      type=='gz'?url="/api/EnergizaSaleMyConcern/AddMyconcernKh":url="/api/EnergizaSaleMyConcern/DelMyConcern";
      this.$http.post(url,{
        KHGUID:item.KHGUID
      }).then((res)=>{
        console.log(res)
        item.ConcernGUID=res.Data;
        if(type=='gz'){
            this.$vux.alert.show({
              title: '友情提示',
              content: '关注成功！'
            });

        }else{
            this.$vux.alert.show({
              title: '友情提示',
              content: '已取消关注！'
            })
        }
      })
    },
    fenpei(item,index){ //分配
      this.id=item.KHGUID;
      this.inde=index;

      this.$http.post("/api/EnergizaSaleKHInfoController/PowerDistribution",{
        KHGUID:this.id
      })
      .then((res)=>{
        if(res.Success){
          this.chosepeople=true;
        }else{
          this.$vux.alert.show({
              title: '友情提示',
              content: res.Message
            });
        }
      })

    },
    goDetail(item){
      this.$router.push({
        name:"kehudetail",
        params:{
          id:item.KHGUID
        }
      })
    }
  }
}
</script>

<style lang="less">

.shangjilist{
  .weui-cells{
    margin-top: 0;
    &:before{
      border: none
    }
    &:after{
      border:none
    }
  }
}
.guanzhu{
  // border: 1px solid #3079D5;
  border-radius: 3px;
  background-color: white;
  color: #3079D5;
  width:5.4rem;
  text-align: left;
  i{
    margin-right: 0 !important;
  }
}

#kehu-list-wrap{
  .xian{
        position: relative;
        width: 5.4rem;
        i{
            margin-right: 0 !important;
          }
        // &:before{
        //   display: block;
        //   content: "";
        //   position: absolute;
        //   left: 0;
        //   height: 70%;
        //   top:15%;
        //   width: 1px;
        //   background-color: #eaeaea;
        // }

        // &:after{
        //         display: block;
        //         content: "";
        //         position: absolute;
        //         right: 0;
        //         height: 70%;
        //         top:15%;
        //         width: 1px;
        //         background-color: #eaeaea;
        // }
      }
  .people{

    &>p{
      width: 30%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      i{
        margin-right: 0.3rem
      }
      span{
        color: #666
      }
    }
  }
}
</style>
