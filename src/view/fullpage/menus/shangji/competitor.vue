<template>
  <div class="competitor">
      <div class="header clearfix">
          <div class="left" style="width: 85%;">
            <search ref="search" v-model="searchWord" :autoFixed="false"  placeholder="竞争对手名称"></search>
          </div>
          <router-link :to="{name:'competitoradd',params:{id:$route.params.id}}" class="left text_center addsj" style="width:15%">
            <i class="iconfont icon-tianjia" style="font-size:1.5rem;color:#999"></i>
          </router-link>
      </div>
      <div  class="content">
        <template v-if="!loading">
            <template v-if="dataList.length>0">
                <group v-for="(datas,index) in dataList" :key="index" v-show="datas.CompetitorName.indexOf(searchWord)>-1">
                    <cell-box link class="ct_cell"  >
                        <ul class="ct_ul"  @click="competitordetail(datas)" >
                            <li class="ct_name">{{datas.CompetitorName}}</li>
                            <li class="ct_person">主跟人：<span>{{datas.follwUser?datas.follwUser:"暂无主跟人信息"}}</span></li>
                        </ul>
                    </cell-box>
                </group>
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
     
     
  </div>
</template>
<script>
import {Search,InlineLoading,CellBox,Cell,Group  } from 'vux'
export default {
    components:{
       Search,
       InlineLoading,
       CellBox,
       Group

    },
    data(){
        return {
            searchWord:"",
             OpportunitiesGUID:"",
             loading:true,
             dataList:[]
        }
    },
    methods:{
        competitordetail(datas){
            // console.log(this.$route.params.id)
            this.$router.push({path:"/shangjiWrap/competitordetail",query:{id:datas.CompetitorGUID,GUID:this.$route.params.id}})
            // this.$router.push(`/shangjiWrap/competitordetail?id=${datas.CompetitorGUID}&GUID=${this.$route.params.id}`)
            // window.location.href=`/#/competitordetail?id=${datas.CompetitorGUID}&GUID=${this.$route.params.id}`
        }
    },
    created(){
         this.OpportunitiesGUID=this.$route.params.id
        //  console.log(this.OpportunitiesGUID)
         this.$http.post("api/EnergizaSaleCompetitor/GetCompetitorList",{
          OpportunitiesGUID:this.OpportunitiesGUID
        }).then((res)=>{
            console.log(res)
          this.loading=false;
          this.dataList=res.Data
          console.log(this.dataList)
        })
    }
  
}
</script>

<style lang="less" >
.competitor{
    width:100%;
    height:100%;
    border-bottom:1px solid #f0f0f0;
    .header{
        .weui-search-bar{
        padding-right: 0;
        border:0;
        }
       
        .weui-search-bar:before{
            border-top:0;
        }
        .weui-search-bar:after{
            border-bottom: 0;
        }
    }
    .content{
        width:100%;
        .weui-cells{
            margin-top:0;
        }
        .ct_cell{
            width:93%;
            background-color: #fff;
            margin-bottom: 1%;
            .ct_ul{
                width:100%;
                margin:2% 0;
                li{
                    width:100%;
                    margin:0 0 2% 0;
                }
                .ct_name{
                font-size:1.2rem;
                font-weight: bold;
                }
                .ct_person{
                    font-size:1rem;
                }
            
            }
            
           
        }

    }
    .addsj{
        height: 44px;
        line-height: 44px;
    }

}
</style>
