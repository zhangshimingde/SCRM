<template>
  <div class="gjjl fixed">
    <group class="textarea-box">
      <x-input title="竞争对手名称" placeholder='必填' v-model="people"></x-input>
      <x-textarea v-model="content" placeholder='竞争优劣势分析' :rows="8"></x-textarea>
    </group>


    <div class="absolute btn-wrap clearfix">
        <!-- <div class="cancel left" @click="closed">取消</div> -->
        <div class="confirm left" style="width:100%" @click="go">保存</div>
    </div>
  </div>
    
</template>

<script>
import {CellBox,Group ,XTextarea ,XInput } from 'vux';
export default {
  name: '',
  components:{
    CellBox,Group,XTextarea,XInput 
  },
  props:[],
  created(){
     // 自定义返回事件
     window.history.pushState(null, null, ""); 
     window.addEventListener("popstate", ()=> { 
        this.closed();
      }, false); 
  },
  data () {
    return {
      people:"",
      content:"",
    }
  },
  methods:{
    closed(){
      // alert(1)
      this.$emit("opComp",false,{})
      // this.$router.go(-1);
    },
    
    go(){
        
      if(this.content&&this.people){
        // ajax
        var params={
          content:this.content,
          people:this.people
        }
        // this.$router.go(-1);
        this.$emit("opComp",true,params);
        // end
      }else{
        this.$vux.alert.show({
          title: '友情提示',
          content: '必填项请填写完整!',
        })
      }
    }
  }
}
</script>

<style lang="less">
.gjjl{
  width: 100%;
  height:100%;
  top:0;
  left:0;
  background-color: #f6f6f6;
  z-index: 2;
  .textarea-box{
    background-color: white;
    textarea{
      font-family: '微软雅黑'
    }
  }
  .btn-group{
    padding: 0 10px;
  }
  .btn-sy{
    font-size: 0.9rem;
    color: #3079D5;
    border:1px solid #3079D5;
    border-radius: 20px;
    margin:10px 0px;
    padding: 5px 15px !important;
    .weui-cell__ft{
      
      .vux-cell-value{
        color: #3079D5;
      }
      padding: 0;
      &:after{
        display: none;

      }
    }
  }
  .form-item{
    padding-right: 0.5rem;
    width: 100%;
    .weui-cell{
      padding: 0 !important;
    }
  }
  .btn-wrap{
    background-color: white;
    width: 100%;
    @h:3rem;
    line-height: @h;
    height: @h;
    text-align: center;
    left: 0;
    bottom: 0;
    border-top: 1px solid #ccc;
    &>div{
      width: 50%;
      color: white;
      &.cancel{
        background-color: rgb(204, 204, 204)
      }
      &.confirm{
        background-color: #0992ff
      }
    }
  }
}

</style>
