<template>
      <ul id="res-list" class="shangjilist">
        <template  v-if="data.length>0">
          <group class="sj">


            <swipeout v-for="(listdata,index2) in data" :key="index2" >
              <swipeout-item  transition-mode="follow"  >
                <div slot="right-menu">
                  <swipeout-button  type="warn" @click.native="deleteClue(listdata,index2)">删除</swipeout-button>
                </div>
                <div slot="content" class="demo-content vux-1px-t">
                      <cell-box>
                        <div class="wraps"  @click.prevent="goDetail(listdata)">
                          <!-- {{listdata.StageName}} -->
                          <div class="clearfix header bigger">
                            <div class="left" style="width:60%">
                              <span class="left stage" v-if="listdata.IsNew" style="background:#E75647">新</span>
                              <p class="left title " style="width:50%">
                                {{listdata.ContactName}}
                                <template v-if="listdata.Sex">
                                    <i class="iconfont icon-xingbienan" style="color:#5EB7E8" v-if="listdata.Sex=='男'"></i>
                                    <i class="iconfont icon-xingbienv" v-else style="color:#F7867B"></i>
                                </template>
                              </p>
                            </div>
                            <span class="CreateTime left">{{listdata.CreateTime.substring(0,10)}}</span>

                          </div>
                          <div class="people text-over">
                            需求描述：{{listdata.RequirementDesc}}
                          </div>
                          <div class="clearfix">
                              <!-- <div class="money left text-over" style="padding-right:0.8rem;width:40%;box-sizing:border-box">
                                <i class="iconfont icon-dianhua" style="margin-right:0rem"></i>
                                <span style="color:#666">{{listdata.Opportunity.Telephone}}</span>
                              </div> -->
                              <div class="kehu left text-over relative" style="width:60%;box-sizing:border-box;" v-if="listdata.CustomerName">
                                  <i class="iconfont icon-gongsi" style="margin-right:0.2rem"></i><span v-html="listdata.CustomerName"></span>
                              </div>
                              <div class="right" style="width:40%;">
                                <a class="right guanzhu" @click.stop style="color:#3079D5;width:auto" :href="'tel:'+listdata.Telephone"><i class="iconfont icon-dianhua" style="margin-right:0"></i>呼叫</a>
                                <span class="right guanzhu" style="color:#3079D5;margin-right:1rem;width:auto"  @click.stop="fenpei(listdata,index2)">
                                  <i class="iconfont icon-fenpeianniu" style="margin:0"></i>指派
                                </span>
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


        <div v-transfer-dom >
          <popup v-model="chosepeoplemutiple" :popup-style="{background:'white'}" position="right" width="80%">
            <checkpeoplemultiple :isClue="true" :id="id" @choseFinish="chosePeopleFinish"></checkpeoplemultiple>
          </popup>
        </div>
      </ul>
</template>

<script>
import {Swipeout, SwipeoutItem, SwipeoutButton,TransferDom,Popup, Cell,CellBox,Group ,InlineLoading  } from 'vux'
import checkpeoplemultiple from './compo/checkpeoplemultiple';
export default {
  name: '',
  components:{
    Cell,CellBox,Group,Popup ,InlineLoading,checkpeoplemultiple,Swipeout, SwipeoutItem, SwipeoutButton
  },
  directives: {
    TransferDom
  },
  filters:{
    subst(value){
      if(!value) return value;
      return value.substring(0,1);
    },
    formate(value){
      if(!value) return value;
      return value.substring(0,10)
    }
  },
  props:["data"],
  data () {
    return {
      chosepeoplemutiple:false,
      id:"",
      inde:0
    }
  },
  methods:{
    chosePeopleFinish(params){ //选择主责人完毕
      this.chosepeoplemutiple=false;
      if (!params) {return ;};


      this.$vux.loading.show({
         text: '正在指派..'
        })

      var zpList=[],idList=[];
      params.map((el)=>{
        zpList.push({
          OpportunityGUID:this.id,
          FollowerGUID:el.id,
          FollowerCode:el.code,
          FollowerName:el.name
        })
        idList.push(el.id);
      })
      // this.$http.post("/api/EnergizaSaleClueController/SaveFollowerArrange",{
      //   StrFollowers:JSON.stringify(zpList)
      // })
      this.$http.post("/api/EnergizaSaleClueController/SetClueFollower",{
          oppGuidStr:this.id,
          followerGuid:idList.join(",")
      })
      .then((res)=>{
        this.$vux.loading.hide()
        if(res.Success){
            this.$vux.alert.show({
              title: '友情提示',
              content: '指派成功！'
            })
        }else{
          this.$vux.alert.show({
              title: '友情提示',
              content: res.Message
            })
        }
      })
    },
    fenpei(item,index){ //指派
      this.inde=index;
      this.id=item.OpportunityGUID;
      this.chosepeoplemutiple=true;
    },
    deleteClue(item,index2){  //删除线索

        var _this=this;
        this.$vux.confirm.show({
          title: '友情提示',
          content: '确定删除要此线索？',
          onConfirm () {

            _this.$http.post("/api/EnergizaSaleClueController/DeleteOpportunity",{
              OpportunityGUID:item.OpportunityGUID
            })
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
    goDetail(item){
      // console.log(item.OpportunitiesGUID);
      this.$router.push({
        name:"xiansuodetail",
        params:{
          id:item.OpportunityGUID
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
  .CreateTime{
    display: inline-block;
    width:40%;
    text-align: right;
  }
}
// .fgx{
//   position: relative;
//   &:before{
//     content: "";
//     display: block;
//     position: absolute;
//     width: 1px;
//     height: 60%;
//     left:0;
//     background-color: #eaeaea;
//     top:20%;
//   }
// }

.vux-swipeout{
  position: relative;
}
.vux-swipeout:after {
    content: " ";
    position: absolute;
    width:95%;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
</style>
