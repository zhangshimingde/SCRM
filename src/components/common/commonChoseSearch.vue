<template>
    <div class="people-box">
      <template v-if="!loading">
        <div class="search-content">
          <search ref="search" :autoFixed="false"  v-model="key" placeholder="搜索"></search>
        </div>
        <div class="res-list">
          <group  v-if="searchR.length>0">
            <checklist :options="searchR" label-position="left" v-if="count=='multiple'" v-model="value"></checklist>
            <checklist :options="searchR" label-position="left" v-else :max=1 v-model="value"></checklist>
          </group>
          <div v-else class="text_center" style="padding:20px 0">
            暂无数据..
          </div>
        </div>

      </template>
      <template v-else>
        <div class="text_center" style="padding:40px 0;">
          <inline-loading></inline-loading>
          <span style="color:#9d9d9d">数据加载中</span>
        </div>
      </template>
      <div class="absolute com text_center clearfix">
        <!-- <div class="left" id="no" @click="cancel" style="background-color:#ccc">取消</div> -->
        <div class="left" id="yes" @click="comfirm" style="width:100%">确定</div>

      </div>
    </div>
</template>

<script>
import { Search,Checklist ,Group,InlineLoading  } from 'vux'
export default {
  name: '',
  components:{
    Search,Checklist ,Group ,InlineLoading
  },
  props:['prama','count','canEmpty'],
  created(){
    // console.log(this.prama)
  },

  data () {
    return {
      loading:true,
      key:"",
      value:[],
      options:[]
    }
  },
  computed:{
      searchR: function () {
        var _this=this,brr=[];
        this.options.map(function(el) {
          if(el.value.indexOf(_this.key)>-1){
            brr.push(el);
          }
        })
        return brr;
      }
  },
  methods:{
    getInitData(){  //获取默认联系人
      // console.log(this.prama);
       this.options=[];
       this.value=[];
      this.prama.map((el)=>{
        this.options.push({
            key:el.id,
            value:el.name
        })
      })

    },
    comfirm(){
      if(this.value.length<1&&!this.canEmpty) return;

      var params=[];
      this.value.map((el)=>{
        this.options.map((vl)=>{
          if (el==vl.key) {
            params.push({
                name:vl.value,
                id:vl.key
            })
          };
        })

      });

      var data;
      this.count=="multiple"?data=params:data=params[0];
      this.$emit('choseFinish',data)
    }
  },
  watch:{
    prama(val){
      if(val){
        this.loading=false;
        this.getInitData();
      }
    },
    key(val){

    }
  }
}
</script>

<style lang="less">
.people-box{
  left: 0;
  top:0;
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction:column;
  background-color: white;
  .header{
    display: flex;
    @h:3rem;
    height: @h;
    line-height: @h;
    text-align: center;
    .btn{
      width: 4rem;
      color: rgb(9, 146, 255)
    }
    .title{
      flex-grow:1
    }
  }
  .res-list{
    flex-grow:1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 3rem;
  }
  .weui-cells{
    margin-top: 0;
    &:before{
      border: none
    }
  }
}
.com{
  color: white;
  width: 100%;
  @h:3rem;
  height: @h;
  line-height: @h;
  left: 0;
  bottom: 0;
  background-color: rgb(9, 146, 255);
  div{
    width: 100%;
  }
}
</style>
