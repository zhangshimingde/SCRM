<template>
    <div class="people-box">
      <template v-if="!loading">
        <div class="search-content">
          <search ref="search" :autoFixed="false" @on-cancel="can" v-model="key" @on-submit="subs"  placeholder="搜索"></search>
        </div>
        <div class="res-list">
          <group  v-if="options.length>0">
            <checklist :options="options" label-position="left" :max=1 v-model="value"></checklist>
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
        <div class="left" id="no"  @click="cancel" style="background-color:#ccc;width:50%">取消</div>
        <div class="left" id="yes" style="width:50%" @click="comfirm">确定</div>

      </div>
    </div>
</template>

<script>
import { Search,Checklist,Group,InlineLoading  } from 'vux'
export default {
  name: '',
  components:{
    Search,Checklist,Group ,InlineLoading
  },
  created(){
    this.getInitData()
    // alert(this.chosePoepleType)
  },
  props:['chosePoepleType','beChose','swit'],
  data () {
    return {
      loading:true,
      key:"",
      value:[],
      temp:[
      // {
      //   icon: '',
      //   key: '001',
      //   value: 'radio001'
      // }, {
      //   icon: '',
      //   key: '002',
      //   value: 'radio002'
      // }
      ],
      options:[]
    }
  },
  methods:{
    getInitData(){  //获取默认联系人
      this.loading=true;
      this.$http.post("/api/AjaxLXRinfoController/GetLxrFromKhSearchByUsername",{
        OpportunitiesGUID:this.$route.params.id,
        type:this.chosePoepleType?this.chosePoepleType:"", //1：商机 2：客户 3：联系人
        userName:""
      })
      .then((res)=>{
        // console.log(res);
        this.loading=false;
        if(!res.Data)return;
        res.Data.map((el)=>{
          this.temp.push({
              key:el.SortGUID,
              value:el.LxrName
          })
        })

        this.options=this.temp;
      })
    },
    can(){
      this.value=[];
    },
    subs(val){  //搜索
      if(!val) return ;
      this.loading=true;
      this.$http.post("/api/AjaxLXRinfoController/GetLxrFromKhSearchByUsername",{
        OpportunitiesGUID:this.$route.params.id,
        type:this.chosePoepleType?this.chosePoepleType:"", //1：商机 2：客户 3：联系人
        userName:val
      })
      .then((res)=>{
        // console.log(res);
        this.loading=false;
        this.options=[];
        this.value=[];
        if(!res.Data)return;
        res.Data.map((el)=>{
          this.options.push({
            // icon:el.UserCode,
            key:el.SortGUID,
            value:el.LxrName
          })
        })
      })
    },
    comfirm(){
      // if(this.value.length<1) return;
      var params=[],hash={};
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
      this.$emit('choseFinish',params[0])
    },
    cancel(){
      this.$emit('choseFinish','cancel')
    }
  },
  watch:{
    key(val){
      if(!val){
        this.options=this.temp;
        this.value=[];
      }
    },
    swit(val){
      // console.log(this.beChose)
      if(typeof this.beChose == 'object'){
        this.value=[this.beChose.id]
      }else if(typeof this.beChose == 'string'){
        if(!this.beChose){
          this.value=[];
          return;
        }
        this.options.map(el=>{
          if(el.value==this.beChose){
            this.value=[el.key]
          }
        })
      }

    },
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
    width: 50%;
  }
}
</style>
