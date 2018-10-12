<template>
  <div id="shangjicondition">
      <template v-if="!loading">
      <div class="condition overflow-touch">
        <div class="condition-box">

          <div class="condition-box-item">
            <p class="title">负责业务</p>
            <ul class="data-list">
              <li v-for="(item,index) in businesslist" v-if="item.name" :class="item.chose?'active':''" :key="index" @click="choseFinishItem('business',item)">{{item.name}}</li>
            </ul>
          </div>


          <div class="condition-box-item">
            <p class="title">是否决策人</p>
            <ul class="data-list">
              <li v-for="(item,index) in jcrlist" v-if="item.name" :class="item.chose?'active':''" :key="index" @click="choseFinishItem('jcr',item)">{{item.name}}</li>     
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

  </div>
</template>

<script>
import { Popup,Search,PopupRadio , Group,InlineLoading  } from 'vux'
export default {
  name: '',
  components:{
    Popup,Search ,PopupRadio , Group,InlineLoading
  },
  mounted () {
    this.getInfoData();
  },
  data () {
    return {
      loading:false,
      business:[{
          name:"",
          id:""
      }],
      businesslist:[],
      jcr:[{
          name:"",
          id:""
      }],
      jcrlist:[],

    }
  },
  props:['khName'],
  methods:{
    inits(){
    },
    getInfoData(){
      // this.loading=true;
      this.$http.get("/api/EnergizaSalesOpportunities/GetBussinessLine")
      .then((res)=>{
        // console.log(res)
        this.loading=false;

        res.Data.map((el)=>{
          this.businesslist.push({
            name:el.Name,
            id:el.Name,
            chose:false
          })
          this.jcrlist.push({
            name:el.Name,
            id:el.Name,
            chose:false
          })
        })
      })

    },
    choseFinishItem(type,item){ //多选
      if(item.chose){
        item.chose=false;
      }else{
        item.chose=true;
      }
      this[type]=[];
      this[type+'list'].map((el)=>{
        if(el.chose){
           this[type].push({
              name:el.name,
              id:el.id
            })
        }
      });
    },
    confirmChose(){  //提交筛选条件
        var businessId=[],jcrId=[];
        this.business.map((el)=>{
          businessId.push(el.id);
        });
        this.jcr.map((el)=>{
          jcrId.push(el.id);
        });
        var params={
          businessId:businessId.join(','),
          jcrId:jcrId.join(',')
        }
        // console.log(params)
        this.$emit("finish",params);    
    },
    resets(){ //重置
      this.business=[{
          name:"",
          id:""
      }];
      this.jcr=[{
          name:"",
          id:""
      }];

      this.jcrlist.map((el)=>{
            el.chose=false;
      });
      this.businesslist.map((el)=>{
            el.chose=false;
      });
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
