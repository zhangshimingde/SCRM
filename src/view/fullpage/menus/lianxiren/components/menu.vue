<template>
  <div class="menus fixed" @click.self="cl">
    <ul class="menus-list absolute">
      <div class="absolute trig"></div>
      <li @click="opens('addlxr',true)">
        <span href="" class="menus-link">
          <i class="iconfont icon-guanlianlianxiren"></i>名片扫描
        </span>
      </li>
      <li @click="opens('addlxr',false)">
        <span class="menus-link">
          <i class="iconfont icon-xinzenglianxiren"></i>新增联系人
        </span>
      </li>
      
    </ul>
  </div>
    
</template>

<script>
export default {
  name: '',
  components:{

  },
  data () {
    return {
      addLxr:false,
      connectLxr:false,
    }
  },
  methods:{
   cl(){
    this.$emit("closeMenu",'',false)
   },
   opens(type,isScan){
    this.$emit("closeMenu",type,isScan)
   }
  },
  watch:{
  }
}
</script>

<style lang="less">
.menus{
  width: 100%;
  height: 100%;
  left:0;
  top: 0;
  z-index:3;
  background: rgba(0,0,0,0.6);
  .trig{
    height: 0;
    width: 0;
    border: 5px solid transparent;
    border-bottom-color:white;
    top:-10px;
    right: 6%;
    transform:translateX(-50%)
  }
  .menus-list{
    width: 40%;
    background: white;
    padding: 0 10px;
    border-radius: 5px;
    top: 44px;
    right:2%;
    li{
      .menus-link{
        display: block;
        color: #888;
        padding:10px 5px;
        i{
          color: #888;
          margin-right: 10px;
        }
      }
      border-bottom: 1px solid #eaeaea;
      &:last-child{
        border-bottom: none;
      }
      
    }
  }
}
</style>
