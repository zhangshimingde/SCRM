<template>
  <div id="shangjicondition">
    <template v-if="!loading">
      <div class="condition overflow-touch">
        <div class="condition-box">
          <div class="condition-box-item">
            <p class="title">商机主责人</p>
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

          <div class="condition-box-item">
            <p class="title">商机阶段</p>
            <ul class="data-list">
              <li v-for="(item,index) in statusList" v-if="item.id" :class="item.chose?'active':''" :key="index" @click="choseFinishItem('status',item)">{{item.name}}</li>
            </ul>
          </div>

          <div class="condition-box-item">
            <p class="title">商机类型</p>
            <ul class="data-list">
              <li v-for="(item,index) in typeList" v-if="item.id" :class="item.chose?'active':''" :key="index" @click="choseFinishItem('type',item)">{{item.name}}</li>
            </ul>
          </div>


          <div class="condition-box-item">
            <p class="title">需求产品</p>
            <ul class="data-list" v-if="productList.length>0">
              <li v-for="(item,index) in productList" v-if="item.id" :class="item.chose?'active':''" :key="index" @click="choseFinishItem('product',item)" >{{item.name}}</li>
            </ul>
            <div class="text_center" style="padding:10px 0;color:#666;font-size:12px" v-else>请先选择商机类型</div>
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
  mounted () {
    // this.getdefaultzzr();
    this.getInfoData();
  },
  data () {
    return {
      loading:false,
      chosepeople:false,
      people:[],
      status:[{
          name:"",
          id:""
      }],
      type:[{
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
      statusList:[],
      typeList:[],
      productList:[],
      areaList:[],
      productlistALL:[],

    }
  },
  props:['oppName','sjType'],
  methods:{
    inits(){
      this.statusList=[];
      this.typeList=[];
      this.productList=[];
      this.areaList=[];
      this.productlistALL=[];

      this.people=[];
      this.status=[{
          name:"",
          id:""
      }];
      this.type=[{
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
    },
    deletPople(index){
      this.people.splice(index,1)
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
        // IsIndex:type,
        IsIndex:this.sjType,
        StageGUIDMultipleChoice:"",
        ResponsibleGUID:"",
        IndexGUID:xsId
      })
      .then((res)=>{
        console.log(res);
        this.inits();
        this.loading=false;
        res.Data.ListStage.map((el)=>{
          this.statusList.push({
            name:el.StageName,
            id:el.StageGUID,
            chose:false
          })
        })
        res.Data.ListType.map((el)=>{
          this.typeList.push({
            name:el.TypeName,
            id:el.TypeGUID,
            chose:false
          })
        })
        res.Data.ListOrganization.map((el)=>{
          this.areaList.push({
            name:el.CompanyName,
            id:el.CompanyGUID,
            chose:false
          })
        })
        // 所有产品
        res.Data.ListProduct.map((el)=>{
          this.productlistALL.push({
            name:el.ProductName,
            id:el.ProductCode ,
            pid:el.OpportunitiesType,
            chose:false
          })
        })

        // console.log(this.productlistALL)


        // 默认选中第一个商机类型
        // this.type={
        //     name:this.types[0].name,
        //     id:this.types[0].id
        // };
        // 产品初始筛选
        // this.productslistALL.map((el)=>{
        //   if(el.pid==this.types[0].id){
        //     this.products.push(el)
        //   }
        // });


      })
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
    choseFinishItem(type,item){ //选择列表项

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

      if(type=='type'){
        this.product=[];
        this.productList=[];
        // console.log(el.id,el2.pid)
        this.type.map(el=>{
          this.productlistALL.map(el2=>{
            // console.log(el2.name)
            if(el.id==el2.pid){
              this.productList.push({
                name:el2.name,
                id:el2.id,
                chose:false
              })
            }
          })
        })
      }

    },
    confirmChose(){  //提交筛选条件
      // if(this.people.id||this.status.id||this.type.id||this.product[0].id||this.area.id){
        var productsId=[],statusId=[],areasId=[],typesId=[],peoplesId=[];
        this.product.map((el)=>{
          productsId.push(el.id);
        })
        this.status.map((el)=>{
          statusId.push(el.id);
        })
        this.area.map((el)=>{
          areasId.push(el.id);
        })
        this.type.map((el)=>{
          typesId.push(el.id);
        })
        this.people.map((el)=>{
          peoplesId.push(el.id);
        })
        var params={
          people:peoplesId.join(','),
          status:statusId.join(','),
          types:typesId.join(','),
          products:productsId.join(','),
          areas:areasId.join(',')
        }
        // console.log(params);
        // return;
        // alert(pdid.join(','))
        this.$emit("finish",params)
      // }else{
      //   alert('请选择筛选条件')
      // }
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
       this.status=[{
        name:"",
        id:""
       }];
       this.type=[{
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


      this.productList=[];
      this.statusList.map((el)=>{
        el.chose=false;
      });
      this.typeList.map((el)=>{
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
