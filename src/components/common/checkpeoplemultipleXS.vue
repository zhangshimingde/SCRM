<template>
    <div class="people-box">
      <template v-if="!loading">
        <div class="search-content">
          <search ref="search" :autoFixed="false" @on-cancel="can" v-model="key" @on-submit="subs"  placeholder="搜索"></search>
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
    // console.log(this.people)
    this.getInitData();
    this.value=this.beChose.map(el=>{
          return el.value
    });
  },
  props:["people","areaId","beChose"],
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
      // this.$http.get("/api/EnergizeSaleUser/SelectDepartmentUser")
      this.temp=[];
      this.$http.post("/api/EnergizaSaleClueController/GetUserFollowerLogByArea",{
          AreaID:this.areaId
        })
      .then((res)=>{
        // console.log(res);
        this.loading=false;
        res.Data.map((el)=>{
          this.temp.push({
              key:el.UserGUID,
              value:el.UserName
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
      this.$http.post("/api/EnergizeAction/SelectUserOrBuUser",
        {
          keyword:val,
          AreaID:this.areaId
        }
      )
      .then((res)=>{
        // console.log(res);
        this.loading=false;
        this.options=[];
        // this.value=[];
        res.Data.map((el)=>{
          this.options.push({
            // icon:el.UserCode,
            key:el.UserGUID,
            value:el.UserName
          })
        })
      })
    },
    comfirm(){
      if(this.value.length<1) return;
      // var params=[],hash={};
      // this.value.map((el)=>{
      //   this.options.map((vl)=>{
      //     if (el==vl.key) {
      //       params.push({
      //           label:vl.value,
      //           value:vl.key
      //       })
      //     };
      //   });
      //   if(this.key){
      //     this.temp.map((vl)=>{
      //       if (el==vl.key) {
      //         params.push({
      //             label:vl.value,
      //             value:vl.key
      //         })
      //       };
      //     });
      //   }


      // });
      // // console.log(params)
      // this.value=[];
      this.$emit('choseFinish',this.value)
    },
    cancel(){
      // this.value=[];
      this.$emit('choseCancel')
    },
    getUserArea(userId,fn){ //获取用户所属区域
        this.$http.post('/api/EnergizeAction/GetUserInfo',{
          UserGuid:userId
        })
        .then(res=>{
          // console.log(res);
          if(fn) fn(res);
        })
      }
  },
  watch:{
    key(val){
      if(!val){
        this.options=this.temp;
        // this.value=[];
      }
    },
    deleteId(val){  //检测被删除的用户id
      // console.log(val)
    },
    beChose(val){
        this.value=val.map(el=>{
          return el.value
        });
    },
    areaId:{
      handler(val,oldVal){
        this.getInitData();
        if(!oldVal||this.value.length==0) return;
        // 判断区域和已选跟进人所属区域是否一致，如果不一致，则进行下面操作清空跟进人 (排除第一次area为空)
        this.getUserArea(this.value[0],res=>{
          if(val!=res.Data.AreaID){
            this.value=[];
            // alert(2)
            this.$emit('choseFinish',this.value)
          }
        })

      },
      deep:true
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
    width: 50%;
  }
}
</style>
