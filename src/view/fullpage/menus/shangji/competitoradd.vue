<template>
    <div class="competitoradd">
        <group class="ca_msg">
            <cell title="竞争对手信息" class="ca_title" style="font-weight:bold">
            </cell>
            <x-input title="竞争对手名称"  placeholder="未填写" placeholder-align="right" text-align="right" class="ca_msgName" v-model="CompetitorName"></x-input>
            <x-input title="主跟人"  placeholder="未填写" placeholder-align="right" text-align="right" v-model="follwUser"></x-input>
            <x-input title="报价" placeholder="未填写" placeholder-align="right" text-align="right" v-model="offer"></x-input>
            <x-input title="公司网址" placeholder="未填写" placeholder-align="right" text-align="right" v-model="CompetitorUrl"></x-input>
            <x-input title="公司地址" placeholder="未填写" placeholder-align="right" text-align="right" v-model="Address"></x-input>
            <x-input title="总人数" placeholder="未填写" placeholder-align="right" text-align="right" v-model="PeopleCount"></x-input>
        </group>
        <group class="ca_descTitle ca_desc">
            <cell title="竞争对手策略描述（SWOT）" class="ca_title" style="font-weight:bold">
            </cell>
             <x-textarea :max="200" name="description" placeholder="优势" class="youshi" v-model="advantage"></x-textarea>
             <x-textarea :max="200" name="description" placeholder="劣势" v-model="inferior"></x-textarea>
             <!-- <x-textarea :max="200" name="description" placeholder="机会"></x-textarea>
             <x-textarea :max="200" name="description" placeholder="威胁"></x-textarea> -->
        </group>
        <!-- <group class="ca_celue">
            <cell title="竞争策略" class="ca_title" style="font-weight:bold">
                <span class="line"></span>
            </cell>
        </group>
        <group class="ca_celueMsg">
             <x-textarea :max="200" name="description" ></x-textarea>
        </group> -->
        <box gap="10px 10px" class="ca_box">
            <x-button class="ca_btn" @click.native="confirm">保存</x-button>
        </box>
    </div>
</template>
<script>
import {Search,InlineLoading,CellBox,Group,Cell, XInput,XTextarea,XButton,Box  } from 'vux'
import { log } from 'util';
export default {
  components:{
      Search,
      InlineLoading,
      CellBox,
      Group,
      Cell,
      XInput,
      XTextarea,
      XButton ,
      Box
  },
  data(){
      return{
          CompetitorGUID:"",
          id:"",
          CompetitorName:"",
          CompetitorUrl:"",
          PeopleCount:"",
          Address:"",
          advantage:"",
          inferior:"",
          follwUser:"",
          offer:""
      }
  },
  created(){
    this.id=  this.$route.params.id
  },
  methods:{
      
      confirm(){
          
          if(this.id&&this.CompetitorName){
              this.$http.post("api/EnergizaSaleCompetitor/AddCompetitor",{
               CompetitorGUID:"",
               OpportunitiesGUID:this.$route.params.id,
               CompetitorName:this.CompetitorName,
               CompetitorUrl:this.CompetitorUrl,
               PeopleCount:this.PeopleCount,
               Address:this.Address,
               advantage:this.advantage,
               inferior:this.inferior,
               follwUser:this.follwUser,
               offer:this.offer,

            }).then((res)=>{
                this.loading=false;
                // console.log(res)
                var _this=this
                this.$vux.alert.show({
                    title: '友情提示',
                    content:"新增成功",
                    onHide(){
                        _this.$router.go(-1)
                    }
                })
                
                
            })
          }else{
              this.$vux.alert.show({
                    title: '友情提示',
                    content: '新增失败，请填写竞争对手名称！'
                })
          }



           
      }
  }
}
</script>
<style lang="less"> 
    .competitoradd{
        width:100%;
        height:100%;
        .weui-cells{
            margin-top:0;
        }
        
        .ca_title{
            border-top:0;
            position: relative;
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
            .vux-label{
                border-left:0.3rem solid #3079D5;
                padding-left: 0.3rem;
            }
            
        }
        .ca_msg{
            margin-bottom:1rem;
            .ca_msgName{
                .icon-qianjin{
                    font-size:1.2rem;
                    color:#444
                }
            }
        }
        .ca_desc{
            .weui-cell:before{
                border-top:0;
            }
        }
        .vux-x-textarea.weui-cell{
            margin:3% 4%;
            border:1px solid #f0f0f0;
            border-radius: 0.3rem;
        }
        .ca_box{
            .ca_btn{
                background-color: #3079D5;
                color:#fff;
            }
        }
       
        
    }
</style>
