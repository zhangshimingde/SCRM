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
                      <div class="clearfix header bigger" style="height:auto">
                        <p class="left title text-over" style="max-width:70%;width:auto;font-weight:500" v-html="listdata.LxrName?listdata.LxrName:'--'"></p>
                        <template v-if="listdata.Gender">
                            <i class="iconfont icon-xingbienan" style="color:#5EB7E8" v-if="listdata.Gender=='男'"></i>
                            <i class="iconfont icon-xingbienv" v-else style="color:#F7867B"></i>
                        </template>
                      </div>

                      <div class="info" style="color:#888"><span v-html="listdata.JobTitle?listdata.JobTitle:'--'"></span> | <span v-html="listdata.Mobile1?listdata.Mobile1:'--'"></span></div>
                      <div class="kehu ov text-over"><i class="iconfont icon-gongsi"></i><span style="color:#666" v-html="listdata.FullName?listdata.FullName:'--'"></span></div>
                    </div>

                    <a :href="'tel:'+listdata.Mobile1" class="absolute tel" style="right:15px;width:3rem;height:3rem;line-height:3rem" v-if="listdata.Mobile1"><img src="static/img/tel.png" style="width: 1.5rem;;" alt=""></a>
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

      </ul>
</template>

<script>
import {Swipeout, SwipeoutItem, SwipeoutButton,Popup, Cell,CellBox ,Group,InlineLoading  } from 'vux'
export default {
  name: '',
  components:{
    Cell,CellBox,Group ,InlineLoading,Swipeout, SwipeoutItem, SwipeoutButton
  },
  filters:{
    subst(value){
      return value.substring(0,1);
    },
    formate(value){
      return value.substring(0,10)
    }
  },
  props:["data"],
  data () {
    return {
    }
  },
  methods:{
    deleteItem(listdata,index2){
      var _this=this;
      this.$vux.confirm.show({
        title: '友情提示',
        content: '确定要此联系人？',
        onConfirm () {

          _this.$http.post("/api/AjaxLXRinfoController/BatchDeleteLxr",{
            SortGUIDs:listdata.SortGUID
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
      this.$router.push({
        name:"lianxirendetail",
        params:{
          id:item.SortGUID
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

</style>
