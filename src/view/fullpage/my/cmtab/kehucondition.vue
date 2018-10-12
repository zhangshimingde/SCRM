<template>
  <div id="shangjicondition">
    <template v-if="!loading">
      <div class="condition overflow-touch">
        <div class="condition-box">
          <div class="condition-box-item">
            <p class="title">客户主责人</p>
            <ul class="data-list">
              <li v-if="people.length>0" class="active relative" v-for="(item,index) in people">
                {{item.name}}
                <i class="iconfont icon-guanbi absolute deletpople" @click="deletPople(index)"></i>
              </li>
              <li @click="chosepeople=true">
                <i class="iconfont icon-xinzengchengyuan"></i>
              </li>
            </ul>
          </div>

          <div class="condition-box-item">
            <p class="title">客户层级</p>
            <ul class="data-list">
              <li v-for="(item,index) in khLevelList" v-if="item.id" :class="item.chose?'active':''" :key="index" @click="choseFinishItem('khLevel',item)">{{item.name}}</li>
            </ul>
          </div>

          <div class="condition-box-item">
            <p class="title">一级分类</p>
            <ul class="data-list">
              <li v-for="(item,index) in levelOneList" v-if="item.id" :class="item.chose?'active':''" :key="index" @click="choseFinishItem('levelOne',item)">{{item.name}}</li>
            </ul>
          </div>


          <div class="condition-box-item">
            <p class="title">二级分类</p>
            <ul class="data-list">
              <li v-for="(item,index) in levelTwoList" v-if="item.id" :class="item.chose?'active':''" :key="index" @click="choseFinishItem('levelTwo',item)">{{item.name}}</li>     
            </ul>
          </div>

          <div class="condition-box-item">
            <p class="title">是否为头部客户</p>
            <ul class="data-list">
              <li v-for="(item,index) in isTouList" style="padding:10px 30px;" :class="item.id==isTou.id?'active':''" :key="index" @click="choseIsTou('isTouList',item)">{{item.name}}</li>
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
      khLevel:[{
          name:"",
          id:""
      }],
      levelOne:[{
          name:"",
          id:""
      }],
      levelTwo:[{
          name:"",
          id:""
      }],
      isTou:{
          name:"否",
          id:0
      },
      khLevelList:[],
      levelOneList:[],
      levelTwoList:[],
      isTouList:[{
        name:"否",
        id:0
      },{
        name:"是",
        id:1
      }]

    }
  },
  props:['areaId'],
  methods:{
    inits(){
      this.khLevelList=[];
      this.levelOneList=[];
      this.levelTwoList=[];

      this.people=[];
      this.khLevel=[{
          name:"",
          id:""
      }];
      this.levelOne=[{
          name:"",
          id:""
      }];
      this.levelTwo=[{
          name:"",
          id:""
      }];
      this.isTou={
          name:"否",
          id:0
      };
    },
    deletPople(index){
      this.people.splice(index,1)
    },
    getInfoData(){

      // alert(this.areaId)
      // return;
      var id;
      this.areaId==1?id=1:id="";
      this.loading=true;
      this.$http.get("/api/EnergizaSaleKHInfoController/GetKHConditionFilter",{
        params:{
          CustomerAreaGUID:id
        }
      })
      .then((res)=>{
        // console.log(res);
        // return;
        this.inits();
        this.loading=false;
        res.Data.CompanyLevel.map((el)=>{
          this.khLevelList.push({
            name:el.Text,
            id:el.Value,
            chose:false
          })
        })
        res.Data.ListZbMartSortItem.map((el)=>{
          this.levelOneList.push({
            name:el.KindSort+el.ItemName,
            id:el.ItemGUID,
            chose:false
          })
        })
        res.Data.ListQyMartSortItem.map((el)=>{
          this.levelTwoList.push({
            name:el.KindSort+el.ItemName,
            id:el.ItemGUID,
            chose:false
          })
        })
          
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
    choseIsTou(type,item){ //选择是否为头部客户

      this.isTou={
          name:item.name,
          id:item.id
      };
    },
    choseFinishItem(type,item){ //多选
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
     // console.log(this[type])
    },
    confirmChose(){  //提交筛选条件
        var khLevelId=[],LevelOneId=[],LevelTwoId=[],peopleId=[];
        this.levelOne.map((el)=>{
          LevelOneId.push(el.id);
        })
        this.levelTwo.map((el)=>{
          LevelTwoId.push(el.id);
        })
        this.khLevel.map((el)=>{
          khLevelId.push(el.id);
        })
        this.people.map((el)=>{
          peopleId.push(el.id);
        })
        var params={
          peopleId:peopleId.join(','),
          khLevelId:khLevelId.join(','),
          levelOneId:LevelOneId.join(','),
          levelTwoId:LevelTwoId.join(','),
          isTou:this.isTou.id
        }
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
      this.khLevel=[{
          name:"",
          id:"",
      }];
      this.levelOne=[{
          name:"",
          id:"",
      }];
      this.levelTwo=[{
          name:"",
          id:"",
      }];
      this.isTou={
          name:"否",
          id:0
      };

      this.khLevelList.map((el)=>{
            el.chose=false;
      });
      this.levelOneList.map((el)=>{
            el.chose=false;
      });
      this.levelTwoList.map((el)=>{
            el.chose=false;
      });
    }
  },
  watch:{
    areaId(val){
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
