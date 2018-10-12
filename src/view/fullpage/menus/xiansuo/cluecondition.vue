<template>
  <div id="shangjicondition">
    <template v-if="!loading">
      <div class="condition overflow-touch">
        <div class="condition-box">
          <div class="condition-box-item">
            <p class="title">线索指派人</p>
            <ul class="data-list">
              <li v-if="people.length>0" class="active relative" v-for="(item,index) in people" :key="index">
                {{item.name}}
                <i class="iconfont icon-guanbi absolute deletpople" @click="deletPople(index)"></i>
              </li>
              <li @click="chosepeople=true">
                <i class="iconfont icon-xinzengchengyuan"></i>
              </li>
            </ul>
          </div>
          <div class="condition-box-item" v-if="indexTab==0||indexTab==1">
            <p class="title">线索预警</p>
            <ul class="data-list">
              <li v-for="(item,index) in warnTypeList" style="padding:10px 30px;" :class="item.id==warnType.id?'active':''" :key="index" @click="chosewarnType('warnTypeList',item)">{{item.name}}</li>
            </ul>
          </div>

          <div class="condition-box-item">
            <p class="title">线索类型</p>
            <ul class="data-list">
              <li v-for="(item,index) in clueTypeList" v-if="item.id" :class="item.chose?'active':''" :key="index" @click="choseFinishItem('clueType',item)">{{item.name}}</li>
            </ul>
          </div>

          <div class="condition-box-item">
            <p class="title">需求产品</p>
            <ul class="data-list" v-if="productList.length>0">
              <li v-for="(item,index) in productList" v-if="item.id" :class="item.chose?'active':''" :key="index" @click="choseFinishItem('product',item)">{{item.name}}</li>
            </ul>
            <div class="text_center" style="padding:10px 0;color:#666;font-size:12px" v-else>请先选择线索类型</div>
          </div>


          <div class="condition-box-item">
            <p class="title">所属区域</p>
            <ul class="data-list">
              <li v-for="(item,index) in areaList" v-if="item.id" :class="item.chose?'active':''" :key="index" @click="choseFinishItem('area',item)">{{item.name}}</li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <p class="text_center" style="padding:40px 0">
        <inline-loading></inline-loading>
        <span style="color:#9d9d9d">数据加载中</span>
      </p>
    </template>

    <div class="clearfix btn-group absolute text_center">
      <div class="left" @click="resets">重置</div>
      <div class="left" @click="confirmChose">确定</div>
    </div>

<!--     <div v-transfer-dom>
      <popup v-if="chosepeople" :popup-style="{background:'white'}" position="right" width="80%"> -->
        <checkpeople v-if="chosepeople" :people="people" @choseFinish="chosePeopleFinish"></checkpeople>
      <!-- </popup> -->
    <!-- </div> -->
  </div>
</template>

<script>
import { TransferDom,Popup,Search,PopupRadio , Group,InlineLoading  } from 'vux'
import checkpeople from '../../../../components/common/checkpeoplemultiple';
export default {
  name: '',
  components:{
    Popup,Search ,PopupRadio , Group,InlineLoading,checkpeople
  },
   directives: {
    TransferDom
  },
  props:["indexTab"],
  mounted () {
    // this.getdefaultzzr();
    this.getInfoData();
  },
  data () {
    return {
      loading:false,
      chosepeople:false,
      people:[],
      clueType:[{
          name:"",
          id:""
      }],
      product:[{
          name:"",
          id:""
      }],
      area:[{
          name:"",
          id:""
      }],
      warnType:{
          name:"",
          id:""
      },
      clueTypeList:[],
      productList:[],
      areaList:[],
      productlistAll:[],
      warnTypeList:[],
      warnTypeListAll:[],

    }
  },
  methods:{
    inits(){
      this.clueTypeList=[];
      this.productList=[];
      this.areaList=[];

      this.people=[];
      this.clueType=[{
          name:"",
          id:""
      }];
      this.product=[{
          name:"",
          id:""
      }];
      this.area=[{
          name:"",
          id:""
      }];
      this.warnType={
          name:"",
          id:""
      };
    },
    chosewarnType(type,item){
      if(item.id==this.warnType.id){
        this.warnType={
            name:"",
            id:""
        };
      }else{
        this.warnType={
            name:item.name,
            id:item.id
        };
      }

    },
    deletPople(index){
      this.people.splice(index,1)
    },
    getInfoData(){
      this.$http.get("/api/EnergizaSaleClueController/GetCluebCondition")
      .then((res)=>{
        // console.log(res);
        // return;
        this.inits();
        this.loading=false;

        // 需求产品
        res.Data.ListProduct.map((el)=>{
          if(!el.IsDisable){
            this.productlistAll.push({
              name:el.ProductName,
              id:el.ProductCode,
              type:el.QP_OpportunitiesType,
              chose:false
            })
          }
        })

        // this.productlistAll.map(el=>{
        //   if(el.type=='13'){
        //     this.productList.push(el)
        //   }
        // })



        //线索类型
        res.Data.ListType.map((el)=>{
          if(el.IsValid){
            this.clueTypeList.push({
              name:el.OpportunityTypeName,
              id:el.OpportunityTypeID,
              // chose:el.OpportunityTypeName=='ERP'?true:false
              chose:false
            })
          }
        });

        //线索预警
        res.Data.WarningChoice.map((el)=>{
            this.warnTypeListAll.push({
              name:el.Text,
              id:el.Value,
            })
        });
        this.warnList();

        //所属区域
        res.Data.ListOrg.map((el)=>{

          if(el.IsValid){
            this.areaList.push({
              name:el.AreaName,
              id:el.AreaID,
              chose:false
            })
          }
        })

      })
    },
    warnList(){
      this.warnTypeList=[];
      this.warnType={
            name:"",
            id:""
      };
      if(this.indexTab==0){

        this.warnTypeListAll.map((el)=>{
          if(el.name.indexOf('未指派')>-1){
            this.warnTypeList.push(el)
          }
        });

      }else if(this.indexTab==1){

        this.warnTypeListAll.map((el)=>{
          if(el.name.indexOf('未跟进')>-1||el.name.indexOf('一个月未判断有效性')>-1||el.name.indexOf('两周未判断有效性')>-1){
            this.warnTypeList.push(el)
          }
        });
      }

    },
    chosePeopleFinish(params){ //选择主责人完毕
      this.chosepeople=false;
      if (!params) {return ;};



      var arr=this.people;
      params.map((el)=>{
        this.people.push({
          id:el.id,
          name:el.name,
          avater:""
        })
      })



      // 去重
      var hash={},arr=[];
      this.people.map((el)=>{
        if(!hash[el.id]){
          hash[el.id]=true;
          arr.push(el)
        }
      })
      this.people=arr;

    },
    choseFinishItem(type,item){ //多选
    // console.log(type)
      if(item.chose){
        item.chose=false;
      }else{
        item.chose=true;
      }
      this[type]=[];
      this[type+'List'].map((el)=>{
        if(el.chose){
           this[type].push({
              name:el.name,
              id:el.id
            })
        }
      });

      if(type=='clueType'){
        this.product=[];
        this.productList=[];

        this.clueType.map(el=>{
          this.productlistAll.map(el2=>{
            if(el.id==parseInt(el2.type)){
              this.productList.push({
                name:el2.name,
                id:el2.id,
                chose:false
              })
            }
          })
        })
      }
     // console.log(this[type])
    },
    confirmChose(){  //提交筛选条件
        var clueTypeId=[],productId=[],areaId=[],peopleId=[];
        this.product.map((el)=>{
          productId.push(el.id);
        })
        this.area.map((el)=>{
          areaId.push(el.id);
        })
        this.clueType.map((el)=>{
          clueTypeId.push(el.id);
        })
        this.people.map((el)=>{
          peopleId.push(el.id);
        })
        var params={
          peopleId:peopleId.join(','),
          clueTypeId:clueTypeId.join(','),
          productId:productId.join(','),
          areaId:areaId.join(','),
          warnType:this.warnType.id
        }
        // console.log(params);
        this.$emit("finish",params);
    },
    getdefaultzzr(){  //获取默认主责人
      this.$http.get("/api/EnergizeSaleUser/WeiXinUserInfo")
      .then((res)=>{
         this.people=[{
            name:res.Data.UserName_Chn,
            avater:res.Data.UserIcon,
            id:res.Data.UserGUID,
         }]

      })
    },
    resets(){ //重置
      this.people=[];
      this.clueType=[{
          name:"",
          id:"",
      }];
      this.product=[{
          name:"",
          id:"",
      }];
      this.area=[{
          name:"",
          id:"",
      }];
      this.warnType={
          name:"",
          id:""
      };
      this.productList=[];
      this.clueTypeList.map((el)=>{
            el.chose=false;
      });
      this.productList.map((el)=>{
            el.chose=false;
      });
      this.areaList.map((el)=>{
            el.chose=false;
      });
    }
  },
  watch:{
    indexTab(val){
      // alert(val);
      this.warnList();
    }
  }
}
</script>

<style lang="less">

#shangjicondition{
  @h:3rem;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  .condition{
    height: 100%;
  }
  .vux-popup-dialog.vux-popup-right{
    overflow: unset
  };
  .condition-box{
    padding:0 0 @h 0;
    .condition-box-item{
      padding: 10px 8px;
      border-bottom: 1px solid #eaeaea;
      .title{
        color: #666;
        margin: 0 0 5px 5px;
      }
      .data-list{
        display: flex;
        flex-wrap:wrap;
        li{
          box-sizing: border-box;
          padding: 10px 9px;
          text-align: center;
          background-color: #F0F0F0;
          border-radius: 5px;
          margin: 1.5%;
          font-size: 0.95rem;
          &.active{
            color: white;
            background-color: #5195F8;
          }
        }
      }
    }
  }
  .btn-group{
    width: 100%;

    right: 0;
    bottom: 0;
    height: @h;
    line-height: @h;
    &>div{
      width: 50%;
      color: white;
      background-color: #5195F8;
      &:last-child{
        background-color: #2D75D8
      }
    }
  }

}
</style>
