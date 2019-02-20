<template>
  <div id="shangjicondition">
    <template v-if="!loading">
      <div class="condition overflow-touch">
        <div class="condition-box">
          <div class="condition-box-item">
            <p class="title">商机主责人</p>
            <ul class="data-list">
              <li @click="chosepeople=true" v-if="people.id">{{people.name}}</li>
              <li @click="chosepeople=true" v-else>
                <i class="iconfont icon-xinzengchengyuan"></i>
              </li>
            </ul>
          </div>
          <div class="condition-box-item">
            <p class="title">商机预警</p>
            <ul class="data-list">
              <li v-for="(item,index) in warnTypeList" style="padding:10px 30px;" :class="item.id==warnType.id?'active':''" :key="index" @click="chosewarnType('warnTypeList',item)">{{item.name}}</li>
            </ul>
          </div>
          <div class="condition-box-item">
            <p class="title">商机阶段</p>
            <ul class="data-list">
              <li v-for="(item,index) in status" v-if="item.id" :class="item.id==statusValue.id?'active':''" :key="index" @click="choseFinishItem('statusValue',item)">{{item.name}}</li>
            </ul>
          </div>

          <div class="condition-box-item">
            <p class="title">商机类型</p>
            <ul class="data-list">
              <li v-for="(item,index) in types" v-if="item.id" :class="item.id==typesValue.id?'active':''" :key="index" @click="choseFinishItem('typesValue',item)">{{item.name}}</li>
            </ul>
          </div>


          <div class="condition-box-item">
            <p class="title">需求产品</p>
            <ul class="data-list">
              <li v-for="(item,index) in products" v-if="item.id" :class="item.chose?'active':''" :key="index" @click="chosepd(item,index)" >{{item.name}}</li>
            </ul>
          </div>

          <div class="condition-box-item">
            <p class="title">所属区域</p>
            <ul class="data-list">
              <li v-for="(item,index) in areas" v-if="item.id" :class="item.id==areasValue.id?'active':''" :key="index" @click="choseFinishItem('areasValue',item)">{{item.name}}</li>
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
        <checkpeople v-if="chosepeople" @choseFinish="chosePeopleFinish"></checkpeople>
      <!-- </popup> -->
    <!-- </div> -->
  </div>
</template>

<script>
import { TransferDom,Popup,Search,PopupRadio , Group,InlineLoading  } from 'vux'
import checkpeople from '../../../../components/common/checkpeople';
export default {
  name: '',
  components:{
    Popup,Search ,PopupRadio , Group,InlineLoading,checkpeople
  },
   directives: {
    TransferDom
  },
  mounted () {
    // this.getdefaultzzr();
    this.getInfoData();
  },
  data () {
    return {
      loading:false,
      chosepeople:false,
      people:{
          name:"",
          avater:"",
          id:""
      },
      statusValue:{
          name:"",
          id:""
      },
      typesValue:{
          name:"",
          id:""
      },
      productsValue:[{
          name:"",
          id:""
      }],
      areasValue:{
          name:"",
          id:""
      },
      status:[],
      types:[],
      products:[],
      areas:[],
      productsALL:[],
      warnType:{
          name:"",
          id:""
      },
      warnTypeList:[],

    }
  },
  props:['oppName','sjType'],
  methods:{
    inits(){
      this.status=[];
      this.types=[];
      this.products=[];
      this.areas=[];
      this.warnTypeList=[];
      this.productsALL=[];

      this.people={
          name:"",
          avater:"",
          id:""
      };
      this.statusValue={
          name:"",
          id:""
      };
      this.typesValue={
          name:"",
          id:""
      };
      this.productsValue=[{
          name:"",
          id:""
      }];
      this.areasValue={
          name:"",
          id:""
      };
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
    getInfoData(){
      var xsId,type;
      if(this.sjType==2){
          xsId='ff0d1cd6-94d3-458c-afd2-8bc477756cb4';type=0
      }else{
        xsId='';type=this.sjType;
      }

      this.loading=true;
      this.$http.post("api/EnergizaSalesOpportunities/GetConditionListParam",{
        OpportunitiesName:this.oppName,
        SearchFlag:-1,
        IsIndex:type,
        StageGUIDMultipleChoice:"",
        ResponsibleGUID:"",
        IndexGUID:xsId
      })
      .then((res)=>{
        console.log(res);
        this.inits();
        this.loading=false;
        res.Data.ListStage.map((el)=>{
          this.status.push({
            name:el.StageName,
            id:el.StageGUID
          })
        })
        res.Data.ListType.map((el)=>{
          this.types.push({
            name:el.TypeName,
            id:el.TypeGUID
          })
        })
        res.Data.ListOrganization.map((el)=>{
          this.areas.push({
            name:el.CompanyName,
            id:el.CompanyGUID
          })
        })
        res.Data.ListWarningType.map((el)=>{
          this.warnTypeList.push({
            name:el.Text,
            id:el.Value,
            chose:false
          })
        })
        // 所有产品
        res.Data.ListProduct.map((el)=>{
          this.productsALL.push({
            name:el.ProductName,
            id:el.ProductCode ,
            pid:el.OpportunitiesType,
            chose:false
          })
        })


        // 默认选中第一个商机类型
        // this.typesValue={
        //     name:this.types[0].name,
        //     id:this.types[0].id
        // };
        // 产品初始筛选
        this.productsALL.map((el)=>{
          if(el.pid==this.types[0].id){
            this.products.push(el)
          }
        });


      })
    },
    chosePeopleFinish(params){ //选择主责人完毕
      this.chosepeople=false;
      if (!params) {return ;};
      this.people={
        id:params.id,
        name:params.name
      };
    },
    choseFinishItem(type,item){ //选择列表项


      if(item.id==this[type].id){
        this[type]={
          name:"",
          id:""
        }
      }else{
          this[type]=item;
          if(type=="typesValue"){
              this.products=[];
              this.productsValue=[{
                  name:"",
                  id:""
              }];
              this.productsALL.map((el)=>{
                if(el.pid==item.id){
                  el.chose=false;
                  this.products.push(el)
                }
              })
          }
      }
    },
    chosepd(item,index){ //需求产品多选
      if(item.chose){
        item.chose=false;
      }else{
        item.chose=true;
      }
      this.productsValue=[];
      this.products.map((el)=>{
        if(el.chose){
           this.productsValue.push({
              name:el.name,
              id:el.id
            })
        }
      });
     // console.log(this.productsValue)
    },
    confirmChose(){  //提交筛选条件
      // if(this.people.id||this.statusValue.id||this.typesValue.id||this.productsValue[0].id||this.areasValue.id){
        var pdid=[];
        this.productsValue.map((el)=>{
          pdid.push(el.id);
        })
        var params={
          people:this.people.id,
          status:this.statusValue.id,
          types:this.typesValue.id,
          products:pdid.join(','),
          areas:this.areasValue.id,
          warnType:this.warnType.id
        }
        // alert(pdid.join(','))
        this.$emit("finish",params)
      // }else{
      //   alert('请选择筛选条件')
      // }
    },
    getdefaultzzr(){  //获取默认主责人
      this.$http.get("/api/EnergizeSaleUser/WeiXinUserInfo")
      .then((res)=>{
         this.people={
            name:res.Data.UserName_Chn,
            avater:res.Data.UserIcon,
            id:res.Data.UserGUID,
         }

      })
    },
    resets(){ //重置
       this.people={
        name:"",
        id:""
       };
       this.statusValue={
        name:"",
        id:""
       };
       this.warnType={
            name:"",
            id:""
        };
       // this.typesValue={
       //  name:this.types[0].name,
       //  id:this.types[0].id
       // };
       this.typesValue={
        name:"",
        id:""
       };
       this.productsValue=[{
        name:"",
        id:""
       }];
       this.warnTypeList.map((el)=>{
          el.chose=false;
        });
        // 产品初始筛选
        this.products=[];
        this.productsALL.map((el)=>{
          if(el.pid==this.types[0].id){
            el.chose=false;
            this.products.push(el)
          }
        });
       this.areasValue={
        name:"",
        id:""
       };
    }
  },
  watch:{
    oppName(val){
      this.getInfoData();
    },
    sjType(val){
      this.getInfoData();
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
