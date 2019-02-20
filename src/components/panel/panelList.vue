<template>
      <div id="panel-list">
        <group>
          <template v-if="!loading" >
            <div  v-if="panelList.length>0">
              <cell is-link  v-for="(item,index) in panelList" :link="'/panelWrap/'+item.Type" :key="index" >
                <p slot="title"><span >{{item.Name}}</span></p>
                <img slot="icon" width="18" style="display:block;margin-right:15px;" :src="'static/img/'+item.ICO+'.png'">
              </cell>
            </div>
            <p  v-else class="text_center" style="width: 100%;padding:20px 0;">暂无数据..</p>
          </template>
          <template v-else>
            <div style="padding:40px 0; text-align:center">
              <inline-loading></inline-loading>
              <span style="color:#9d9d9d">数据加载中</span>
            </div>
          </template>
        </group>
      </div>
</template>

<script>
import { Cell,Group,Badge,InlineLoading  } from 'vux'
import { mapState } from "vuex";
export default {
  name: 'overview',
  components:{
    Cell,Group,Badge,InlineLoading
  },
  created(){
    // this.getData();
    if(this.panelList===null){this.loading=true}
  },
  data () {
    return {
      loading:false,
    }
  },
  computed:{
      ...mapState(["panelList"]),
  },
  methods:{

    // getData(){
      // console.log(this.rootList)
      // this.loading=true;
      // this.$http.post("/api/EnergizeSaleMenu/GetReportMenu")
      // .then((res)=>{
      //   this.loading=false;
      //   this.listData=res.Data;
      //   console.log(this.listData)
      // })
    // },
  },
  watch:{
    panelList(val){
      // console.log(val)
      if(val!==null){this.loading=false;}
    }
  }
}
</script>

<style lang="less">
@import '../../assets/less/exports.less';
#overview{
  background: #dcdcdc;
  margin:0rem auto 1rem;
  width:95%;
  .border-box;
  padding: 0.5rem;
}
</style>
