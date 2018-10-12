<template>
  <div id="popup-btn" class=''>
    <div v-transfer-dom>
    <popup v-model="showPop" height="90%" position="bottom" :show-mask="true" is-transparent>
      <div class="popup-inner overflow">
          <p class="clear title">
            <span class="left txt">在首页显示以下内容</span>
            <span class="right" @click="closePopup"><i class="iconfont icon-guanbi" style="font-size:1.6rem;color:#B2B2B2"></i> </span>
          </p>
          <group class="popup-list" v-if="!loading">
            <template v-if="btnList.length>0">
              <cell-box  v-for="(item,index) in btnList" :key="index"  >
                <div class="clearfix item-inner" style="width: 100%;">

                  <router-link class="left" :to="{name:item.Type}" v-if="item.Type!='hetong'">
                    <img :src="'static/img/'+item.DetailICO+'.png'" alt="" class="vertical_middle" style="height:1.5rem;margin-right:0.6rem">{{item.Name}}
                    <!-- <i class="iconfont left text_center" style="" :class="'icon-'+item.DetailICO"></i>{{item.Name}} -->
                  </router-link>
                  <router-link class="left" :to="{name:'home'}" v-else-if="item.Type!='hetong'">
                    <img :src="'static/img/'+item.DetailICO+'.png'" alt="" class="vertical_middle" style="height:1.5rem;margin-right:0.6rem">{{item.Name}}
                    <!-- <i class="iconfont left text_center" style="" :class="'icon-'+item.DetailICO"></i>{{item.Name}} -->
                  </router-link>
                  <x-switch title="" class="right" v-model="item.Checked" prevent-default @on-click="cl(item,index)" @on-change="sw(item,index)" style="padding:0"></x-switch>
                </div>
              </cell-box>
            </template>
            <p  v-else class="text_center" style="width: 100%;padding:20px 0;">暂无数据..</p>
          </group>
          <div v-else style="padding:40px 0;text-align:center">
              <inline-loading></inline-loading>
              <span style="color:#9d9d9d">数据加载中</span>
          </div>
      </div>

    </popup>
    </div>
    <flexbox :gutter="0" wrap="wrap" class="flexs" style="background:white">
      <flexbox-item :span="1/5" v-for="(item,index) in faList" :key="index" v-if="item.Checked">
          <div class="text_center index-btn-wrap" @click="goTo(item)" >
            <!-- <i class="iconfont icon-shouye" slot="icon"></i> <br> -->
            <div class="text_center icon-mask" :class="'mask'+index" slot="icon">
              <i class="iconfont" :class="'icon-'+item.DesktopICO"></i>
            </div>
            <span class="name">{{item.Name}}</span>
          </div>
      </flexbox-item>
      <flexbox-item :span="1/5">
          <div class="text_center index-btn-wrap" @click="showPop=!showPop">
            <div class="text_center icon-mask" slot="icon" style="border-radius:100%;border:1px dashed #666;box-sizing:border-box">
              <i class="iconfont icon-jiahao" style="color:#666"></i>
            </div>
            <span class="name">更多</span>
          </div>
      </flexbox-item>


    </flexbox>
  </div>
</template>

<script>
import {Group,Cell,CellBox,XSwitch ,Flexbox, FlexboxItem,Popup,InlineLoading,TransferDom} from 'vux'
export default {
  name: 'chosepop',
  created(){
    this.init();
  },
  directives: {
    TransferDom
  },
  components: {
    Group,XSwitch,Flexbox, FlexboxItem,Popup,Cell,CellBox,InlineLoading
  },
  data(){
    return{
      value:"",
      loading:false,
      showPop:false,
      btnList:[]
    }
  },
  computed:{
    faList(){
      var arr=[];
      this.btnList.map(function(el){
        if(el.Checked){
          arr.push(el)
        }
      })
      return arr;
    }
  },
  methods:{
    init(){
      this.loading=true;
      this.$http.get('/api/EnergizeSaleMenu/GetMainMenu')
      .then((response) =>{
        this.loading=false;
        this.btnList=response.Data;
      })
    },
    closePopup(){
        this.showPop=false;
    },
    cl(item,index){

      if(!item.Checked){// 打开
        var count=0;
        this.btnList.map(function(el){
          if(el.Checked){
            count++;
          }
        });
        if(count==4){
          this.$vux.alert.show({
              title: '友情提示',
              content: '最多设置4个快捷入口哦~'
            })
        }else{
          item.Checked=true;
          // post
          this.$http.post('/api/EnergizeSaleMenu/SetMainMenuStatus', {
            MenuGUID:item.GUID,
            Status:1
          })
          .then((response) =>{
            // console.log(response)
          })
        }
      }else{ //关闭
          item.Checked=false;
          // post
          this.$http.post('/api/EnergizeSaleMenu/SetMainMenuStatus', {
            MenuGUID:item.GUID,
            Status:0
          })
          .then((response) =>{
            // console.log(response)
          })
      }

    },
    sw(item,index){
      // console.log(item);
      var count=0;
      this.btnList.map(function(el){
        if(el.Checked){
          count++;
        }
      });
      if(count>4){
        // alert(11)
        this.btnList[index].Checked=false;
      }
    },
    goTo(item){
      if(item.Type=='hetong') return;
      this.$router.push({
        name:item.Type
      })
    }
  }
}
</script>
<style lang="less">
@import '../../assets/less/exports.less';
#popup-btn .vux-popup-dialog{
      overflow-y: unset;
      z-index: 800 !important
}
.flexs{
  .line1px;
}
.vux-no-group-title{
  margin-top: 0 !important;
}
.index-btn-wrap{
  padding:0.7rem 0rem;
  // i{
  //   font-size: 1.5rem;
  //   color: #26a2ff;
  //   background: orange;
  //   padding: 0.5rem;
  //   .border-radius(100%);

  // }
  .icon-mask{
    @w:2.7rem;
    height:@w;
    width: @w;
    line-height: @w;
    .border-radius(100%);
    margin:0 auto 3px;
    color: white;
    i{
      font-size: 1.2rem;
    }
    &.mask0{
      background-color: #F49953;
    }
    &.mask1{
      background-color: #F34D42;
    }
    &.mask2{
      background-color: #1ECCB0;
    }
    &.mask3{
      background-color: #66C9F7;
    }
  }
  span.name{
    font-size: 0.8rem;
    position: relative;
    color: #666
  }
}
.popup-inner{
  background: white;
  width:100%;
  height:100%;
  margin:0 auto 0;
  border-radius: 8px 8px 0 0;
  display: flex;
  flex-direction:column ;
  // box-shadow: -1px -1px 10px #ccc;
  .title{
    padding: 3% 3% 4%;
      .txt{
        color: #888;
      }
  }
  .popup-list{
    .overflow-touch;
    flex-grow:1;
    @w:35px;
    .item-inner{
        a{
          line-height: @w;
          color: #333;
          i{
            font-size: 1.3rem;
            margin-right: 0.5rem;
            display:line-block;

            width:@w;
            height: @w;
            line-height: @w;
          }
        }
    }
  }
}
</style>
