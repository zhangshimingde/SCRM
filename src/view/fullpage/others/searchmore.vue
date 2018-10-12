<template>
      <div id="res-list" class='mores'>
        <template v-if="listRes.length>0">
            <group class="lxr" v-if="$route.params.type=='lxr'">
              <cell title="联系人"></cell>
              <cell-box v-for="(listdata,index2) in listRes" :key="index2">
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
                  <div class="kehu ov"  v-if="listdata.FullName"><i class="iconfont icon-gongsi"></i><span v-html="listdata.FullName"></span></div>
                </div>
              </cell-box>
            </group>

            <group class="sj" v-else-if="$route.params.type=='sj'">
              <cell title="商机"></cell>
              <cell-box v-for="(listdata,index2) in listRes" :key="index2" >
                <div class="wraps" @click="openDetail('shangjidetail',listdata.Id)">
                  <div class="clearfix header bigger" v-if="listdata.StageName">
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
            </group>

            <group class="" v-else-if="$route.params.type=='xs'">
              <cell title="线索"></cell>
              <cell-box v-for="(listdata,index2) in listRes" :key="index2">

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
            </group>

            <group class="" v-else-if="$route.params.type=='kh'" >
              <cell title="客户"></cell>
              <cell-box v-for="(listdata,index2) in listRes" :key="index2" >
                <div class="wraps" @click="openDetail('kehudetail',listdata.Id)">
                  <div class="clearfix header bigger">
                    <i class="iconfont icon-toubukehu " v-if="listdata.IsTopCustomer" style="font-size:1.3rem;color:#FEB711"></i>
                    <span class=" title" v-html="listdata.Title"></span>
                  </div>
                  <div class="people"><i class="iconfont icon-ren"></i><span v-html="listdata.ZZR"></span></div>
                </div>
              </cell-box>
            </group>
        </template>
        <template v-else>
          <div class="text_center" style="padding:80px 0;">
              <inline-loading></inline-loading>
              <span style="color:#9d9d9d">数据加载中</span>
          </div>
        </template>
      </div>
</template>

<script>
import { Cell,CellBox,Group ,InlineLoading  } from 'vux'
export default {
  name: '',
  components:{
    Cell,CellBox,Group ,InlineLoading
  },
  activated(){
    this.getData();
    switch(this.$route.params.type){
      case "lxr":document.title="联系人";break;
      case "kh":document.title="客户";break;
      case "sj":document.title="商机";break;
      case "xs":document.title="线索";break;
    }
  },
  data () {
    return {
      src:this.$src,
      listRes:[]
    }
  },
  filters:{
    subst(value){
      if(!value) return value;
      return value.substring(0,1);
    },
    formate(value){
      if(!value) return value;
      return value.substring(0,10)
    }
  },
  methods:{
    getData(){
      // alert(1)
      var _this=this;
      this.listRes=[];
       this.$http.post('/api/EnergizeSaleSearch/GetSearchMore', {
          key:this.$route.params.key,
          type:this.$route.params.type
        })
        .then((response) =>{
          this.listRes=response.Data
        })
    },
    openDetail(path,id){
      this.$router.push({name:path,params:{id:id}})
    }
  }
}
</script>

<style lang="less">
#res-list.mores{
  .weui-cells{
    margin-top: 0;
  }
}
</style>
