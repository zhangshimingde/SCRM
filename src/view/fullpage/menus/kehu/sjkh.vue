<template>
  <div id="kehu" class="fixed">
    <div class="header clearfix">
      <search ref="search" v-model="key" @on-submit="sub" :autoFixed="false"  placeholder="搜索客户"></search>
    </div>
    <div class="contents" style="padding:0">
      <template v-if="!loading">
          <ul id="res-list" class="shangjilist"   v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading2" infinite-scroll-distance="40">
            <template  v-if="data.length>0">
              <group class="sj">
                <cell-box v-for="(listdata,index2) in data" :key="index2" >
                  <div class="wraps" @click="chose(listdata)">
                    <div class="clearfix header bigger">
                      <p class="left title " v-html="listdata.FullName"></p>
                      <span class="right date" >{{listdata.CreateDate | formate}}</span>
                    </div>
                    <div class="people">
                      <i class="iconfont icon-ren"></i><span v-html="listdata.UserName"></span>
                    </div>
                  </div>
                </cell-box>
              </group>
              <p class="text_center" style="padding:10px 0" v-show="loading2">
                <inline-loading></inline-loading>
                <span style="color:#9d9d9d">数据加载中</span>
              </p>
            </template>
            <template v-else >
              <p class="text_center" style="padding:40px 0">
                <span style="color:#9d9d9d">暂无数据..</span>
              </p>
            </template>
          </ul>
      </template>
      <template v-else >
        <p class="text_center" style="padding:40px 0">
          <inline-loading></inline-loading>
          <span style="color:#9d9d9d">数据加载中</span>
        </p>
      </template>
    </div>

    <div class="cancel-btn" @click="cancel">取消</div>
  </div>

</template>

<script>
import {Search,Popup, Cell,CellBox,Group ,InlineLoading  } from 'vux'
export default {
  name: '',
  props:['id'],
  components:{
    Search,Cell,CellBox,Group,Popup ,InlineLoading
  },
  filters:{
    subst(value){
      if(value){
          return value.substring(0,1);
      }else{
        return value;
      }
    },
    formate(value){
      if(value){
          return value.substring(0,10);
      }else{
        return value;
      }
    }
  },
  created(){
    this.getData(true);
  },
  data () {
    return {
      loading:false,
      loading2:false,
      page:0,
      PageSize:20,
      totalPage:0,
      key:"",
      data:[]
    }
  },
  methods:{
    getData(isEmpty){
      if(isEmpty){this.loading = true;}
      this.$http.post("/api/EnergizaSaleKHInfoController/GetKhExcludeLowerLevel",{
        FullName:this.key,
        PageIndex:this.page,
        PageSize:this.PageSize,
        KHGUID:this.id
      })
      .then((res)=>{
        // console.log(res.Data);
        this.loading = false;
        this.loading2 = false;
        if(isEmpty){
          this.data=[];
        }
        this.totalPage=(res.Total/this.PageSize).toFixed(0);
        res.Data.map((el)=>{
           this.data.push(el);
        })

      })
    },
    loadMore() {
      this.loading2 = true;
      this.page++;
      if(this.page>this.totalPage) return;
      // console.log(this.page);
      this.getData(false);
    },
    sub(){ //搜索
      if(!this.key) return;

      this.page=0;
      this.getData(true);
    },
    cancel(){
      this.$emit('choseSJKehuFinish',"")
    },
    chose(item){
      var params={
        name:item.FullName,
        id:item.KHGUID
      }
      this.$emit('choseSJKehuFinish',params)
    }
  },
  watch:{
    key(val){

      if (!val) {
        this.page=0;
        this.getData(true);
      };
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

#kehu{
  width: 100%;
  height:100%;
  display: flex;
  flex-direction:column;
  left: 0;
  top:0;
  color: #666;
  z-index:4;
  .contents{
    flex-grow:1;
    background-color: white;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 3rem;
  }

  .cancel-btn{
    width: 100%;
    bottom: 0;
    left: 0;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    background-color: #ccc;
    color: white;
  }
}
</style>
