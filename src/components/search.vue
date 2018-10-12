<template>
    <div id="search" style="height:45px;">
      <div class="fixed" style="width:100%;top: 0;left: 0;" :style="{zIndex:zIndex}">
        <search ref="search" v-model="key" @on-submit="sub" :autoFixed="false" placeholder="搜索" @on-change="change" @on-cancel="cancel" @on-focus="foc"></search>
      </div>
      <voice v-if="voice" @comfirm="comfirmVoice" @cancel="cancelVoice"></voice>

      <div class="fixed voice-btn text_center" @click="voice=true">
        <i class="iconfont icon-yuyin"></i>
      </div>
      <div class="fixed result-wrap " v-if="wrapShow" @click="connectShow=false">
        <!-- 历史搜索 -->
        <div class="history-wrap module-wrap cm-padding" v-if="historyShow&&listHistory[0]">
            <p class="header">
              历史搜索
            </p>
            <ul class="list-history clearfix">
              <li class="left" v-for="(item,index) in listHistory" v-if="item"  @click="fillInput(item)" :key="index">{{item}}</li>
            </ul>
        </div>

        <!-- 输入联想 -->
        <div class="connect-wrap module-wrap fixed" style="width: 100%;height:100%;z-index:3;box-shadow:2px 2px 15px #ccc" v-if="connectShow&&listConnect[0]">
          <ul class="list-connect">
            <li class="" v-for="(item,index) in listConnect" @click="fillInput(item)" v-if="index<7" :key="index"><p>{{item}}</p></li>
          </ul>
        </div>

        <!-- 搜索结果 -->
        <!-- <searchRes :keyWord="key" :listRes="res"></searchRes> -->
        <searchRes  v-if="resShow" :keyWord="key" :listRes="res"></searchRes>
        
      </div>
    </div>
</template>

<script>
import { Search } from 'vux'
import searchRes from './searchRes'
import voice from './voice'
export default {
  name: '',
  components:{
    Search,searchRes,voice
  },
  mounted(){
    if(!localStorage.getItem("lastSearchKey")){
      this.$refs.search.setFocus();
    }


    this.$route.params.yy?this.voice=true:this.voice=false;
    
    
  },
  data () {
    return {
      key:localStorage.getItem("lastSearchKey")?localStorage.getItem("lastSearchKey"):"",
      voice:false,
      zIndex:6,
      lock:false,
      wrapShow:true,  //搜索mask的显示
      historyShow:false, //历史搜索的显示
      connectShow:false, //输入联想的显示
      resShow:localStorage.getItem("lastSearchRes")?true:false,  //搜索结果的显示
      isTap:false,//是否为点击填充关键词
      listHistory:(localStorage.getItem("history")).split(','),  //历史记录
      listConnect:[],  //联想结果
      res:localStorage.getItem("lastSearchRes")?JSON.parse(localStorage.getItem("lastSearchRes")):{
            
          }//搜索结果
    }
  },
  methods:{
    foc(){
      // this.listRes={};
      this.wrapShow=true;
      this.zIndex=6;
      this.change(this.key);
    },
    cancel(){
      this.$router.go(-1)
    },
    change(val){ //输入过程中

        // console.log(this.isTap)
        if(this.isTap) { //排除点击填充的关键词
          setTimeout(() => {
            this.isTap=false;
          }, 100)
          return false;
        } 
        setTimeout(() => {
            // console.log(val,this.key)
            if(val!==this.key) return;
            this.connectShow=false;
            if(this.key){
              this.historyShow=false;
              this.$http.get('/api/EnergizeSaleSearch/GetSearchAssociate',{
                params:{
                  key:this.key
                }
              })
              .then((result) =>{
                if(this.lock) return false;
                
                if(this.key&&result.Data.length!=0){
                  this.connectShow=true;
                  var arr=[];
                  result.Data.map(function(el){
                     arr.push(el.Title);
                  })
                  this.listConnect=arr;
                }
              })
              // this.listConnect=[val];
            }else{
              this.historyShow=true;
            }
        },500)
        
      
        
    },
    sub(value){ //确认搜索
      var val=value.trim();
      if(!val) return ;
      this.$refs.search.setBlur();
      this.historyShow=false;
      this.connectShow=false;
      this.resShow=true;
      this.setHistory(val);
      this.lock=true;
      this.$store.commit('updateLoadingStatus', {isLoading: true});//设置loading
      // this.res={};
      
      //搜索结果,以下是回调
      this.$http.get('/api/EnergizeSaleSearch/GetSearchPan',{
        params:{
          key:val
        }
      })
      .then((res) =>{
        console.log(res);
        this.$store.commit('updateLoadingStatus', {isLoading: false});
        this.historyShow=false;
        this.connectShow=false;
        this.lock=false;
        var arr=[];
        for(var item in res.Data){
          arr.push({
            type:item,
            index:res.Data[item].index,
            list:res.Data[item].list
          })
        }
        this.sortByKey(arr, 'index');
        this.lineHigh(arr);
        this.res=arr;
        



        // 缓存最近一次的搜索数据
        if(val){

          localStorage.setItem("lastSearchKey",val)
          localStorage.setItem("lastSearchRes",JSON.stringify(arr))
        }
        // end

      })

     

    },
    fillInput(val){
      if(this.key!=val){
        this.isTap=true;
      }
      this.key=val;
      this.sub(this.key);

    },
    sortByKey(array, key) {  //模块排序
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
    },
    lineHigh(arr){ //关键词高亮
      var _this=this;
      arr.map(function(el) {
        el.list.map(function(subel){
           for(var item in subel){
            if(typeof subel[item]=="string"){
              if(_this.key){
                subel[item]=subel[item].replace(_this.key,"<span style='color:#3079D5'>"+_this.key+"</span>");
              }
              // console.log(subel[item])
            }
           }
        })
      })
    },
    setHistory(v){  //设置历史搜索记录
      var arr=(localStorage.getItem("history")).split(',');
      // 历史记录判断是否重复
      var flag=true;
      arr.map(function(el){
        if(el==v){
          flag=false;
          return ;
        }
      })
      if(!flag) return;
      // end
      arr.unshift(v);
      if(arr.length>10){
        arr.pop();
      }
      localStorage.setItem("history",arr);
      this.listHistory=(localStorage.getItem("history")).split(',');
    },
    comfirmVoice(val){
      this.voice=false;
      // console.log(val);
      this.key=val;
      this.$refs.search.setFocus();
    },
    cancelVoice(val){
      this.voice=false;
    }
  }
}
</script>

<style lang="less">
@import '../assets/less/exports.less';
.result-wrap{
  z-index: 5;
  width: 100%;
  height: 100%;
  left:0;
  top:0;
  background-color: #f6f6f6;
  .border-box;
  padding-top: 45px;
  .overflow-touch;
  .history-wrap{
    .line1px;
    .header{
      .line1px;
      padding-bottom:10px 
    }
    .list-history{
      padding: 10px 0 0;
      li{
        // border: 1px solid #dcdcdc;
        background-color: #F5F5F5 ;
        .border-radius(10px);
        padding:5px 15px;
        margin:3px 5px;
        font-size:0.9rem;
      }
    }
  }
  .connect-wrap{
    padding: 0 15px;
    .border-box;

    .list-connect{
      font-size: 0.9rem;
      li{
        padding: 10px 0;
        .line1px;

        p{
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        
      }
    }
  }
}
.voice-btn{
  bottom: 1rem;
  width: 14%;
  left:43%;
  
  z-index: 7;
  text-align: center;
  .iconfont{
    font-size: 3rem;
    color: #3079D5
  }

}
</style>
