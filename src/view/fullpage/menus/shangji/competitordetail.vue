<template>
  <div class="detail"  >
    <template v-if="!loading" >
      <template v-if="detailDataList">
        <div class="detailTitle">
            <group class="titleGroup">
              <cell-box class="titleContent">
                <ul class="titleUl">
                  <li style="margin-bottom:1rem;font-size:1.2rem;">{{detailDataList.CompetitorName}}</li>
                </ul>
              </cell-box>
            </group>
        </div>
        <!-- <tab class="detail_tabs">
          <tab-item selected @on-item-click="hander" class="detailRight">详细资料</tab-item>
          <tab-item badge-background="#38C972" badge-color="#fff" @on-item-click="hander">相关文档</tab-item>
        </tab> -->
        <div class="content">
          <group class="ca_msg">
              <cell title="基本信息" class="ca_title" style="font-weight:bold">
              </cell>
              <x-input title="主跟人"   ref="follwUser" placeholder="未填写"   placeholder-align="right" text-align="right" v-model="follwUser" @on-change='changemsg("follwUser",follwUser)'></x-input>
              <x-input title="报价"    placeholder="未填写" placeholder-align="right" text-align="right" v-model="offer" @on-change='changemsg("offer",offer)'></x-input>
              <x-input title="公司地址"  placeholder="未填写" placeholder-align="right" text-align="right" v-model="Address" @on-change='changemsg("Address",Address)'></x-input>
              <x-input title="总人数"    placeholder="未填写" placeholder-align="right" text-align="right" v-model="PeopleCount" @on-change='changemsg("PeopleCount",PeopleCount)'></x-input>
              <x-input title="公司网址"  placeholder="未填写" placeholder-align="right" text-align="right" v-model="CompetitorUrl" @on-change='changemsg("CompetitorUrl",CompetitorUrl)'></x-input>
          </group>
          <group class="ca_desc">
              <cell title="竞争对手描述（SWOT）" class="desc" style="font-weight:bold">
              </cell>
              <x-textarea :max="200" :list="advantage" name="description" placeholder="优势" class="advantage"  v-model="advantage" @on-change='changemsg("advantage",advantage)'></x-textarea>
              <x-textarea :max="200" :list="inferior" name="description" placeholder="劣势"  v-model="inferior" @on-change='changemsg("inferior",inferior)'></x-textarea>
              <!-- <x-textarea :max="200" name="description" placeholder="机会" ></x-textarea>
              <x-textarea :max="200" name="description" placeholder="威胁" ></x-textarea> -->
          </group>
          <!-- <group class="ca_celue">
              <cell title="竞争策略" class="ca_title" style="font-weight:bold">
                  <span class="line"></span>
              </cell>
          </group>
          <group class="ca_celueMsg">
              <x-textarea :max="200" name="description" ></x-textarea>
          </group> -->

        </div>
        <!-- <div v-else>
          相关文档页面
        </div> -->
      </template>
      <template v-else >
          <p class="text_center" style="padding:40px 0">
            <span style="color:#9d9d9d">暂无数据..</span>
          </p>
      </template>
    </template>
    <template v-else>
            <div class="text_center" style="height:54px;line-height:54px;width:100vw">
            <inline-loading></inline-loading>
            <span style="color:#9d9d9d">数据加载中</span>
            </div>
        </template>
  </div>
</template>
<script>
import {InlineLoading,CellBox,Cell,Group,Tab, TabItem,XTextarea,XInput } from 'vux'
export default {
  components:{
    InlineLoading,
    CellBox,
    Cell,
    Group,
    Tab,
    TabItem,
    XTextarea,
    XInput,
    
  },
  data(){
    return {
      isFirstTime:true,
      loading:true,
      dataTab:true,
      CompetitorGUID:this.$route.query.id,
      OpportunitiesGUID:this.$route.query.GUID,
      detailDataList:[],
      advantage:"",
      inferior:"",
      follwUser:"",
      offer:"",
      Address:"",
      PeopleCount:"",
      CompetitorUrl:""

    }
  },
  created(){
    this.$http.post("api/EnergizaSaleCompetitor/GetCompetitor",{
          CompetitorGUID:this.CompetitorGUID,
          OpportunitiesGUID: this.OpportunitiesGUID
        }).then((res)=>{
          this.detailDataList=res.Data
          this.loading=false;
          this.advantage=this.detailDataList.advantage;
          this.inferior=this.detailDataList.inferior;
          this.follwUser=this.detailDataList.follwUser?this.detailDataList.follwUser:"暂无主跟人信息";
          this.offer=this.detailDataList.offer;
          this.Address=this.detailDataList.Address;
          this.PeopleCount=this.detailDataList.PeopleCount;
          this.CompetitorUrl=this.detailDataList.CompetitorUrl;
           setTimeout(()=>{
            this.isFirstTime=false;
          }, 500)
        })
    
  },
  methods:{
    hander(){
      this.dataTab=!this.dataTab;
    },
    changemsg(FieldName,FieldValue){
        if(this.isFirstTime){ return;} ;
        this.$http.post("api/EnergizaSaleCompetitor/UpdateCompetitorInfo",{
          CompetitorGUID:this.CompetitorGUID,
          OpportunitiesGUID:this.OpportunitiesGUID,
          FieldName:FieldName,
          FieldValue:FieldValue
        }).then((res)=>{
            if(res.Success){
              this.$vux.toast.text('修改成功！', 'top');
            }else{
              this.$vux.alert.show({
                  title: '友情提示',
                  content: res.Message
                })
            }
        })
      
    },



  }
}
</script>
<style lang="less">
  .detail{
    width:100%;
    height:100%;
    
    .weui-cells{
        margin-top:0;
        
    }
    .detailTitle{
      width:92%;
      padding:4%;
      background-color: #3079D5;
      .titleGroup{
        width:100%;
        .weui-cells:after{
          border-bottom: 0;
        }
        .titleContent{
          width:90%;
          background-color: #3079D5;
          padding: 5%;
          color:#fff;
          .titleUl{
            margin-left:50%;
            transform: translate(-50%);
            li{
              text-align:center;
              margin-bottom:0.5rem;
              font-size: 1rem;
            }
          }
          
        }

      }
    
    }
    .detail_tabs{
      .vux-tab-selected {
        color:#3079D5 !important;
        border-bottom:3px solid#3079D5 !important; 
      }
      .vux-tab-ink-bar{
        background-color:#3079D5 !important;
      }
      .vux-tab-item{
        border-right:1px solid #f0f0f0;
      }
      .detailRight{
        border-right:1px solid #f0f0f0;
      }
    }
    .weui-cell__ft{
        .line{
            display: inline-block;
            width:0.2rem;
            height:1.6rem;
            background-color: #3079D5;
            position: absolute;
            left: 0.6rem;
            top: 0.6rem;
        }
    }
     .vux-x-textarea.weui-cell{
            margin:3% 4%;
            border:1px solid #f0f0f0;
            border-radius: 0.3rem;
      }

      .content{
        .ca_msg{
          margin-bottom: 1rem;
          .ca_title{
            .vux-label{
              border-left:0.3rem solid #3079D5;
              padding-left:0.3rem;
            }
          }
        }
        .ca_desc{
          .desc{
            .vux-label{
              border-left:0.3rem solid #3079D5;
              padding-left:0.3rem;
            }
          
          }
          .weui-cell:before{
            border-top:0 !important;
          }
        }
      }
     
  }
</style>
