<template>
  <ul id="res-list">
    <template v-if="hasData">
      <div class="module-wrap" v-for="(item,index) in listRes" v-if="item.list.length>0" :key="index" >
        <group class="lxr" v-if="item.type=='lxr'">
          <cell title="联系人"></cell>
          <cell-box v-for="(listdata,index2) in item.list" v-if="index2<3" :key="index2" >
            <div class="wraps" @click="openDetail('lianxirendetail',listdata.Id)">
              <div class="clearfix header bigger">
                <p class="left title " v-html="listdata.Title"></p>
                <template v-if="listdata.Sex">
                    <i class="iconfont icon-xingbienan" style="color:#5EB7E8" v-if="listdata.Sex=='男'"></i>
                    <i class="iconfont icon-xingbienv" v-else style="color:#F7867B"></i>
                </template>
              </div>
              <a :href="'tel:'+listdata.Mobile" class="absolute tel" v-if="listdata.Mobile"><img src="static/img/tel.png" style="width: 1.3rem;;" alt=""></a>
              <div class="info" ><span v-if="listdata.Role" v-html="listdata.Role+' |'"></span> <span v-html="listdata.Mobile"></span></div>
              <div class="kehu ov" v-if="listdata.FullName"><i class="iconfont icon-gongsi"></i><span v-html="listdata.FullName"></span></div>
            </div>
          </cell-box>
          <cell-box is-link :link="'/searchwrap/searchmore/'+item.type+'/'+keyWord" v-if="item.list.length>=3">
            <p class="look-more" style="color:#83A7D5">
                <i class="iconfont icon-sousuo relative" style="width: auto;top:0px"></i> <span>查看更多联系人</span>
            </p>
          </cell-box>
        </group>

        <group class="sj" v-else-if="item.type=='sj'">
          <cell title="商机"></cell>
          <cell-box v-for="(listdata,index2) in item.list" v-if="index2<3" :key="index2" >
            <div class="wraps" @click="openDetail('shangjidetail',listdata.Id)">
              <div class="clearfix header bigger">
                <span class="left stage" v-if="listdata.StageName&&(listdata.StageName).substring(0,1)=='确'" style="background:#87CEFA">{{listdata.StageName | subst}}</span>
                <span class="left stage" v-else-if="listdata.StageName&&(listdata.StageName).substring(0,1)=='需'" style="background:#0FCBAF">{{listdata.StageName | subst}}</span>
                <span class="left stage" v-else-if="listdata.StageName&&(listdata.StageName).substring(0,1)=='非'" style="background:#DDA0DD">{{listdata.StageName | subst}}</span>
                <span class="left stage" v-else-if="listdata.StageName&&(listdata.StageName).substring(0,1)=='成'" style="background:#71C671">{{listdata.StageName | subst}}</span>
                <span class="left stage" v-else-if="listdata.StageName&&(listdata.StageName).substring(0,1)=='价'" style="background:#0F8EE9">{{listdata.StageName | subst}}</span>
                <span class="left stage" v-else-if="listdata.StageName&&(listdata.StageName).substring(0,1)=='竞'" style="background:#FFB415">{{listdata.StageName | subst}}</span>
                <span class="left stage" v-else-if="listdata.StageName&&(listdata.StageName).substring(0,1)=='赢'" style="background:#FD8933">{{listdata.StageName | subst}}</span>
                <span class="left stage" v-else-if="listdata.StageName&&(listdata.StageName).substring(0,1)=='审'" style="background:#E75647">{{listdata.StageName | subst}}</span>
                <p class="left title " v-html="listdata.Title"></p>
                <span class="right date" >{{listdata.PredictTradeTime | formate}}</span>
              </div>
              <div class="money" ><i class="iconfont icon-nsiconmy"></i><span style="color:#666" v-html="listdata.PredictTradeMoney+'万元'"></span></div>
              <div class="people"><i class="iconfont icon-ren"></i><span v-html="listdata.ResponsibleName"></span></div>
              <div class="kehu" v-if="listdata.KhFullName"><i class="iconfont icon-gongsi"></i><span v-html="listdata.KhFullName"></span></div>
            </div>
            
          </cell-box>
          <cell-box is-link :link="'/searchwrap/searchmore/'+item.type+'/'+keyWord" v-if="item.list.length>=3">
            <p class="look-more" style="color:#83A7D5">
                <i class="iconfont icon-sousuo relative" style="width: auto;top:0px"></i> <span>查看更多商机</span>
            </p>
          </cell-box>
        </group>

        <group class="" v-else-if="item.type=='xs'">
          <cell title="线索"></cell>
          <cell-box v-for="(listdata,index2) in item.list" v-if="index2<3" :key="index2" >
      
            <div class="wraps"  @click="openDetail('xiansuodetail',listdata.Id)">
              <div class="clearfix header bigger">
                <p class="title " >
                    <span v-html="listdata.ContactName"></span>
                    <template v-if="listdata.Sex">
                      <i class="iconfont icon-xingbienan" style="color:#5EB7E8" v-if="listdata.Sex=='男'"></i>
                      <i class="iconfont icon-xingbienv" v-else style="color:#F7867B"></i>
                    </template>
                </p>
              </div>
              <a :href="'tel:'+listdata.Telephone" class="absolute tel" v-if="listdata.Telephone"><img src="static/img/tel.png" style="width: 1.3rem;;" alt=""></a>
              <div class="info" ><i class="iconfont icon-dianhua"></i><span v-html="listdata.Telephone"></span></div>
              <div class="kehu ov" v-if="listdata.CustomerName"><i class="iconfont icon-gongsi"></i><span v-html="listdata.CustomerName"></span></div>
            </div>
          </cell-box>
          <cell-box is-link :link="'/searchwrap/searchmore/'+item.type+'/'+keyWord" v-if="item.list.length>=3">
            <p class="look-more" style="color:#83A7D5">
                <i class="iconfont icon-sousuo relative" style="width: auto;top:0px"></i> <span>查看更多线索</span>
            </p>
          </cell-box>
        </group>

        <group class="" v-else-if="item.type=='kh'">
          <cell title="客户"></cell>
          <cell-box v-for="(listdata,index2) in item.list" v-if="index2<3" :key="index2">
            <div class="wraps" @click="openDetail('kehudetail',listdata.Id)">
              <div class="clearfix header bigger">
                <i class="iconfont icon-toubukehu " v-if="listdata.IsTopCustomer" style="font-size:1.3rem;color:#FEB711"></i>
                <span class=" title" v-html="listdata.Title"></span>
              </div>
              <div class="people"><i class="iconfont icon-ren"></i><span v-html="listdata.ZZR"></span></div>
            </div>
          </cell-box>
          <cell-box is-link :link="'/searchwrap/searchmore/'+item.type+'/'+keyWord" v-if="item.list.length>=3">
            <p class="look-more" style="color:#83A7D5">
                <i class="iconfont icon-sousuo relative" style="width: auto;top:0px"></i> <span>查看更多客户</span>
            </p>
          </cell-box>
        </group>

        <group class="" v-else-if="item.type=='menu'">
          <cell title="功能"></cell>
          <cell-box v-for="(listdata,index2) in item.list" :key="index2">
            <!-- {{listdata.ZZR}},{{listdata.Title}},{{listdata.IsTopCustomer}} -->
            <div class="clearfix menu-inner" style="width:100%"  @click="goMenu(listdata)">
              <div class="left relative menu-icon">
                <img :src="'static/img/'+listdata.DetailICO+'.png'" alt="">
              </div>

              <span class="left title" v-html="listdata.Title" ></span>
            </div>
          </cell-box>
        </group>
        
      </div>
      <div class="module-wrap search-more" v-if="listRes.length>0">
        <group class="" >
          <cell-box is-link>
            <div class="clearfix">
              <img src="static/img/search.png" alt="" class="inline_block" style="height:2rem;margin-right:0.5rem;">
              <div class="inline_block">
                <p class='title' style="font-size:1rem;color:#666">搜一搜 <span style="color:#83A7D5">{{keyWord}}</span></p>
                <p>应收款、合同、工商信息等</p>
              </div>
            </div>
          </cell-box>
        </group>
      </div>
    </template>
    <template v-else>
      <div class="text_center" style="padding-top:40px">
        <img src="static/img/nodata.png" alt="" style="width: 40%;">
        <p>没有搜到相关的内容...</p>
      </div>
    </template>
  </ul>
</template>

<script>
import { Cell,CellBox,Group  } from 'vux'
import route from "../router/index.js"
export default {
  name: '',
  components:{
    CellBox,Group,Cell
  },
  created(){
    // console.log(this)
  },
  data(){
    return {
      src:this.$src,
      hasData:true
    }
  },
  props:['listRes',"keyWord"],
  watch:{
    listRes:{  
            handler:function(val,oldval){  
                var arr=val;
                var temp=false;
                for(var i=0;i<arr.length;i++){
                  if(arr[i].list.length>0){
                    temp=true;
                    break;
                  }
                }
                temp?this.hasData=true:this.hasData=false;
                
            },  
            deep:true//对象内部的属性监听，也叫深度监听  
        }  
  },
  filters:{
    subst(value){
      return value.substring(0,1);
    },
    formate(value){
      return value.substring(0,10)
    }
  },
  methods:{
    goMenu(item){
      // console.log(item)
      if(item.Type=="hetong"||item.Type=="shangjigonggongchi"||item.Type=="yingshoukuan"||item.Type=="gongshangchaxun"||item.Type=="baojiacesuan"||item.Type=="shenqingchugou"||item.Type=="shenqingkaipiao"){
        return;
      }
      route.push({name:item.Type})
    },
    openDetail(path,id){
      route.push({name:path,params:{id:id}})
    }
  }
}
</script>

<style lang="less">
@import '../assets/less/exports.less';

</style>
