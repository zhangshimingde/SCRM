<template>
      <div id="sp-list">
        <template v-if="!loading">
          <group>
            <template v-if="indexList.length>0">
            <cell-box v-for="(item,index) in indexList" :key="index">
              <span class="block-link clearfix relative"  v-if="item.DataType=='商机'">
                  <div class="check-wrap">
                    <check-icon :value.sync="item.check"></check-icon>
                  </div>
                  <div class=" icon-wrap text_center relative sj" >
                    <div class="absolute point" v-if="item.IsHistory==0"></div>
                    <i class="iconfont icon-shangji"></i>
                  </div>
                  <div class=" content" @click="detail('shangjidetail',item)" >
                    <p class="title"><span class="inline_block text-over" style="width:50%">{{item.OppName}}</span> <span class="right date">{{item.LastDate?item.LastDate.replace("T"," ").substring(0,19):""}}</span></p>
                    <p class="msg">{{item.OpportunitiesName}}</p>
                  </div>
              </span>
            </cell-box>
            </template>
            <template v-else>
              <div class="text_center" style="padding:20px 0;color:#ccc">暂无数据...</div>
            </template>
          </group>
        </template>
        <div v-else style="padding:40px 0;" class="text_center">
          <inline-loading></inline-loading>
          <span style="color:#9d9d9d">数据加载中</span>
        </div>

        <div class="fixed bottom-btn clearfix" v-show="indexList.length>0">
          <div class="left btn" @click="selectAll" style="background:rgb(15, 203, 175)">{{text}}</div>
          <div class="left btn" @click="sp('no')">打回</div>
          <div class="left btn" @click="sp('yes')">同意</div>
        </div>
      </div>
</template>

<script>
import { CellBox,Group,Badge,InlineLoading,CheckIcon   } from 'vux'
export default {
  name: '',
  components:{
    CellBox,Group,Badge ,InlineLoading,CheckIcon
  },
  beforeCreate () {

  },
  beforeDestroy () {
  },
  created(){

    this.getData()
  },
  data () {
    return {
      loading:false,
      showSp:false,
      indexList:[],
      text:'全选'
    }
  },
  methods:{
    getData(type){
        this.loading=true;
        this.indexList=[];
        var url='/api/EnergizaSalesOpportunities/GetOppSaleApproveList';

        this.$http.get(url)
        .then((res)=>{
          this.loading=false;

            // return;
            this.indexList=res.Data.map(el=>{
              el.check=false;
              return el;
            });
        })
    },
    detail(type,item){
        this.$router.push({
          name:type,
          params:{
            id:item.BOGUID,
            sptype:item.OperType  //此参数现在可不要
          }
        })
    },
    spJudge(hasCheck,noCheck){  //判断是否勾选数据
      let count=0,idList=[];
      this.indexList.map(el=>{
        if(el.check){
          count++;
          idList.push(el.BOGUID);
        }
      });
      if(count>0){
        hasCheck(idList);
      }else{
        noCheck();
      }
    },
    sp(type){  //批量审批操作
      this.spJudge((idList)=>{
        // console.log(idList);
        // return;
        let _this = this,content=type=='yes'?'同意':'打回';

        this.$vux.confirm.show({
          title: '操作提示',
          content:`确定要批量${content}所选数据？`,
          onConfirm (msg) {
                _this.$vux.loading.show({
                  text: '正在提交..'
                })
                _this.$http.post("/api/EnergizaSalesOpportunities/OppBatchExamine",{
                  OpportunitiesGUIDs:idList.join(","),
                  OPType:type=='yes'?1:2,
                  SourceRequest:"mobile"
                }).then(res=>{
                    _this.$vux.loading.hide();
                    if(res.Success){
                        _this.$vux.alert.show({
                          title: '友情提示',
                          content: '批量审批成功！'
                        })

                    }else{
                        _this.$vux.alert.show({
                          title: '友情提示',
                          content: res.Message
                        })
                    }
                    _this.getData();
                })
          }
        })




      },()=>{
        this.$vux.alert.show({
          title: '友情提示',
          content: '请至少勾选一条数据！'
        })
      })
    },
    selectAll(){
      let count=0,idList=[];
      this.indexList.map(el=>{
        if(el.check){
          count++;
        }
      });
      if(count==this.indexList.length){
        this.text='反选';
        this.indexList.map(el=>{
          el.check=!el.check;
        });
      }else{
        this.text='全选';
        this.indexList.map(el=>{
          el.check=true;
        });
      }
    }
  },
  watch:{
    indexList:{
      handler(){
        // this.spJudge((idList)=>{this.showSp=true},()=>{this.showSp=false;});

        let count=0;
        this.indexList.map(el=>{
          if(el.check){
            count++;
          }
        });
        count==this.indexList.length?this.text='反选':this.text='全选';

      },
      deep:true
    }
  }
}
</script>

<style lang="less">
@import '../../../assets/less/exports.less';
#sp-list{
  padding-bottom:50px;
  .bottom-btn{
    width:100%;
    bottom:0;
    left:0;
    height:40px;
    line-height: 40px;
    .btn{
      width:33.3333%;
      height:100%;
      text-align: center;
      color:white;
      background:#ccc;
      &:last-child{
        background: rgb(9, 146, 255)
      }
    }
  }
  .weui-cells{
    margin-top: 0;

  }
  .weui-cell{padding:10px 5px 10px 0;}
  .block-link{
    // display: -webkit-box;
    // -webkit-box-algin:center;
    display: flex;
    align-items:center;
    .point{
      .border-radius(100%);
      @w:0.8rem;
      height: @w;
      width: @w;
      top:0;
      right:-@w/2;
      background-color: red;
      transform:translateY(-50%);
      background-color: #EC2E2A
    }
    .icon-wrap{
      @w:3rem;
      width: @w;
      height: @w;
      line-height: @w;
      margin-right: 0.5rem;
      .border-radius;
      i{
        font-size: 1.2rem;
      }
      color: white;
      &.sj{
        background-color: #55C2FA;
      }
      &.xs{
        background-color: #22C6AE;
      }
    }
    .content{
      // -webkit-box-flex:1;
      .border-box;
      width: 100px;
      flex-grow:1;
      .title{
        color: #000;
      }
      .date{
        font-size: 0.8rem;
        color: #888;
        line-height: 1.5rem;
      }
      .msg{
        font-size: 0.8rem;
        color: #888;
        .text-overflow;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 1;
        // overflow: hidden;
      }
    }
  }
}
</style>
