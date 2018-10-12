<template>
      <tabbar style="position:fixed">
        <tabbar-item link="/home"  v-if="this.$route.name=='home'" selected>
          <i class="iconfont icon-shouye" slot="icon"></i>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item link="/home"  v-else >
          <i class="iconfont icon-shouye" slot="icon"></i>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item link='/panel' v-if="this.$route.name=='panel'" selected>
          <i class="iconfont icon-yibiaopan" slot="icon"></i>
          <span slot="label">仪表盘</span>
        </tabbar-item>
        <tabbar-item link='/panel' v-else>
          <i class="iconfont icon-yibiaopan" slot="icon"></i>
          <span slot="label">仪表盘</span>
        </tabbar-item>
        <tabbar-item link='/mine' v-if="this.$route.name=='mine'" selected>
          <i class="iconfont icon-wode" slot="icon"></i>
          <span slot="label">我的</span>
        </tabbar-item>
        <tabbar-item link='/mine' v-else>
          <i class="iconfont icon-wode" slot="icon"></i>
          <span slot="label">我的</span>
        </tabbar-item>

       <!--  <tabbar-item link='/test'>
          <i class="iconfont icon-wode" slot="icon"></i>
          <span slot="label">切换</span>
        </tabbar-item> -->
      </tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
  name: 'hello',
  components:{
    Tabbar, TabbarItem
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="less">
@import "../assets/less/exports.less";
.weui-tabbar{
  background: white;
  z-index: 2 !important;
  .iconfont{
    font-size: 1.5rem;
    position: relative;
    top:2px;
  }
}
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
  color: @blue !important
}
</style>
