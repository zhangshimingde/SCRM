<template>
    <div class="people-box-large">
      <template v-if="!loading">
        <div class="search-content clearfix" style="background-color:#F6F6F6 !important">
          <div class="left" style="width: 85%;">
            <search ref="search" :autoFixed="false" @on-cancel="can" v-model="key" @on-submit="subs"  placeholder="搜索"></search>
          </div>
          <span class="left text_center addsj" style="width:15%;height:44px;line-height:44px">
            <i class="iconfont icon-tianjia" style="font-size:1.5rem;color:#999;" @click="menus=true"></i>
          </span>
          
        </div>

        <div class="res-list">
          <group  v-if="options.length>0">
            <checklist :options="options" label-position="left"  v-model="value"></checklist>
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
        <div class="left" id="cancel" style="width:50%;background:#ccc" @click="quxiao">取消</div>
        <div class="left" id="yes"  @click="comfirm">确定</div>
      </div>
      <!-- 弹出菜单 -->
      <menus v-show="menus" @closeMenu="closeMenu"></menus>

      <!-- 选择立场 -->
      <peopleset :list="peoples" @peoplesetFinish="peoplesetFinish" @shutoff="peopleset=false" v-if="peopleset"></peopleset>

    </div>
</template>

<script>
import { Search,Checklist,Group,InlineLoading  } from 'vux'
import menus from './menu'
import peopleset from './peopleset'
export default {
  name: '',
  components:{
    Search,Checklist,Group ,InlineLoading,menus,peopleset
  },
  created(){
    // console.log(this.beChosed);
    this.getInitData()

    // 自定义返回事件
     window.history.pushState(null, null, ""); 
     window.addEventListener("popstate", ()=> { 
        this.cancel();
      }, false); 
  },
  props:["deleteId","beChosed","roleType"],
  data () {
    return {
      isScan:false,
      peopleset:false,
      loading:true,
      peoples:[],
      menus:false,
      key:"",
      value:[],
      temp:[],
      options:[]
    }
  },
  methods:{
    quxiao(){
      this.$router.go(-1)
    },
    getInitData(){  //获取默认联系人
      this.loading=true;
      this.$http.post("/api/AjaxLXRinfoController/GetLxrFromKhSearchByUsername",{
        OpportunitiesGUID:this.$route.params.id,
        userName:""
      })
      .then((res)=>{
        // console.log(res);
        this.options=[];
        this.temp=[];
        this.value=[];
        this.loading=false;
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
      // this.value=[];
    },
    subs(val){  //搜索
      if(!val) return ;
      this.loading=true;
      this.$http.post("/api/AjaxLXRinfoController/GetLxrFromKhSearchByUsername",{
        OpportunitiesGUID:this.$route.params.id,
        userName:val
      })
      .then((res)=>{

        this.loading=false;
        this.options=[];
        this.value=[];
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
      if(this.value.length<1) return;
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
     
      // this.value=[];

      // 选完人之后选择立场
      this.peoples=params;
      this.peopleset=true;

      
    },
    cancel(){
      // this.value=[];
      this.$emit('peoplesetFinish','')
    },
    peoplesetFinish(params){
      // this.$router.go(-1);
      this.$emit("peoplesetFinish",params)
    },
    closeMenu(params,isScan){
      this.isScan=isScan;
      this.menus=false;
      if(!params) return;

      this.$router.go(-1);
      this.$router.push({
        name:"sjaddlxr",
        params:{
          scan:isScan,
          id:this.$route.params.id,
          roleType:this.roleType
        }
      })
    },
    setBeChosed(options,beChosed){  //自动勾选已选联系人

      setTimeout(()=>{
        var _this=this;
        options.map((el)=>{
          beChosed.map((el2)=>{
            if(el.key==el2.LxrGUID){
                this.value.push(el.key)
            }
          })
        })
      }, 100)

    }

  },
  watch:{
    key(val){
      if(!val){
        this.options=this.temp;
        // this.value=[];
      }
    },
    options(val){
      this.setBeChosed(val,this.beChosed)
    },
    deleteId(val){  //检测被删除的用户id
      console.log(val)
    }
  }
}
</script>

<style lang="less">
.people-box-large{
  z-index: 2;
  
  .weui-search-bar{
    &:before,&:after{
      display: none;
    }
    padding-right: 0;
  }
  left: 0;
  top:0;
  position: fixed;
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
.addlxr-wrap{
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: white;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  z-index: 5
}
</style>
