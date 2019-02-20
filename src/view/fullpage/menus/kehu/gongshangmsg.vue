<template>
  <div class="gongshangmsg">
    <template v-if="!loading">
        <template v-if="detailData.Name">
            <group style="">
            <cell-box style="margin-top:">
                <ul  class="gs_title clearfix" style="width: 100%;">
                    <li class="gs_name text-over" >{{detailData.Name}}</li>
                    <li class="gs_person" >
                        <span>法定代表人：</span>
                        <span >{{detailData.OperName}}</span>
                        <span class="gs_satus">{{detailData.Status?detailData.Status.substring(0,2):" "}}</span>
                    </li>
                    <li class="text_center" style="color:#b5b5b5;margin-bottom:0.5rem">数据来源：全国企业信用信息公示系统</li>
                    <li class="text_center" style="color:#666;margin-bottom:0.5rem"><i class="iconfont icon-shuaxin"></i><span style="margin:0 8px">{{detailData.updated_date?detailData.updated_date:updatetime}}</span> 更新</li>
                </ul>
            </cell-box>
            <cell-box >
                <div class="form-title">联系方式</div>
            </cell-box>
            <cell title="联系电话" value="hello" >
                <span style="">{{detailData.PhoneNumber}}</span>
            </cell>
            <!-- <cell title="邮箱地址" value="hello" >
                <span style="">{{detailData.email}}</span>
            </cell> -->
            <cell title="官网地址" value="hello" >
                <span style="">{{detailData.WebsiteUrl?detailData.WebsiteUrl:"暂无官网信息"}}</span>
            </cell>
            <cell-box >
                <div class="form-title">工商信息</div>
            </cell-box>
            <cell-box  class="gs_detail">
                <ul class="clearfix">
                    <li style="fontWeight:bold;" class="left">客户简称</li>
                    <li class="clearfix right" style="font-size:0.9rem;padding:0.3rem 0">
                        <span style="padding:0 0.2rem;width:100%;box-sizing:border-box">{{detailData.ShortName}}</span >
                    </li>
                </ul>

            </cell-box>
            <cell-box  class="gs_detail">
              <ul class="clearfix">
                    <li style="fontWeight:bold;" class="left">注册城市</li>
                    <li class="clearfix right" style="font-size:0.9rem;padding:0.3rem 0">
                        <span style="padding:0 0.2rem;width:100%;box-sizing:border-box">{{detailData.City?detailData.City:'--'}}</span >
                    </li>
              </ul>
            </cell-box>
            <cell-box  class="gs_detail">
                <ul class="clearfix gs">
                    <li style="fontWeight:bold">成立日期</li>
                    <li style="fontWeight:bold">企业状态</li>
                    <li style="fontSize:0.9rem;color:#b6b6b6;margin:2px 0 8px 0;">{{detailData.StartDate?detailData.StartDate.substring(0,10):"--"}}</li>
                    <li style="fontSize:0.9rem;color:#b6b6b6;margin:2px 0 8px 0;">{{detailData.Status}}</li>
                    <li style="fontWeight:bold">注册资本</li>
                    <li style="fontWeight:bold;">企业类型</li>
                    <li style="fontSize:0.9rem;color:#b6b6b6;margin:2px 0 8px 0;">{{detailData.RegistCapi}}</li>
                    <li style="fontSize:0.9rem;color:#b6b6b6;margin:2px 0 8px 0;">{{detailData.EconKind}}</li>
                </ul>
            </cell-box>
            <cell-box    class="gs_detail" >
                <ul class="clearfix ">
                        <li style="fontWeight:bold;">纳税人识别号</li>
                        <li style="fontSize:0.9rem;color:#b6b6b6;margin:2px 0 8px 0;">{{detailData.CreditCode}}</li>
                        <li style="fontWeight:bold">营业执照号</li>
                        <li style="fontSize:0.9rem;color:#b6b6b6;margin:2px 0 8px 0;">{{detailData.RegNum}}</li>
                        <li style="fontWeight:bold">组织机构代码证号</li>
                        <li style="fontSize:0.9rem;color:#b6b6b6;margin:2px 0 8px 0;">{{detailData.OrgCode?detailData.OrgCode:'--'}}</li>
                    </ul>
            </cell-box>

            <cell-box  class="gs_detail">
                <ul class="clearfix">
                    <li style="fontWeight:bold;">经营范围</li>
                    <li style="fontSize:0.9rem;color:#b6b6b6;;margin:0.5rem 0">{{detailData.Scope}}</li>
                    <!-- <li style="fontWeight:bold;">经营方式</li>
                    <li  style="fontSize:0.9rem;color:#b6b6b6;margin:0.3rem 0;">{{detailData.business_model?detailData.business_model:"- -"}}</li> -->
                </ul>
            </cell-box>
            <cell-box  class="gs_detail">
                <ul class="clearfix">
                    <li style="fontWeight:bold;">公司地址</li>
                    <li class="clearfix" style="font-size:0.9rem;padding:0.3rem 0">
                        <span  class="left" style="padding:0 0.2rem;width:100%;box-sizing:border-box"><i class="iconfont icon-dilizuobiao" style="color:#0992ff;"></i>{{detailData.Address}}</span >
                    </li>
                </ul>
            </cell-box>
            <cell-box  class="gs_detail">
                <ul class="clearfix" style="width: 100%;padding-bottom:3rem">
                    <li style="fontWeight:bold;">营业期限</li>
                    <li style="fontSize:0.9rem;color:#b6b6b6;margin:0.2rem 0 0.5rem 0;;">
                        <span>{{detailData.TermStart}}</span>至
                        <span>{{detailData.TermEnd?detailData.TermEnd:"- -"}}</span>
                    </li>
                    <!-- <li style="fontWeight:bold;">登记机关</li>
                    <li style="fontSize:0.9rem;color:#b6b6b6;">
                        {{detailData.belong_org}}
                    </li> -->
                </ul>
            </cell-box>
                <div class="getData " @click="backData" >
                    <!-- <div class="gengxinData">更新数据</div> -->
                    写回至客户详细资料
                </div>
            </group>
        </template>
        <template v-else >
          <p class="text_center" style="padding:40px 0">
            <span style="color:#9d9d9d">没有找到对应的工商信息..</span>
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
import { Group, Cell, CellBox,InlineLoading } from 'vux'

export default {
  components: {
    Group,
    Cell,
    CellBox,
    InlineLoading

  },
  data(){
      return {
          loading:false,
          fullName:'',
          detailData:[],
          CreditCode:"",   //统一社会信用代码
          Address:"",     //公司地址
          Phone:"",      //联系电话
          Email:"",     //邮箱地址
          WebSite:"",   //官网地址
          FullName:"",  //客户名称
          id:"",
          position: 'default',
          showPositionValue: false,
          updatetime:"",
      }
  },
  created(){
      this.fullName=this.$route.params.FullName
       this.loading=true;
      this.$http.post("/api/EnergizaSaleKHInfoController/GetEnterpriseInformationDetail",{
                FullName:this.fullName,
                KHGUID:this.$route.params.id
            }).then((res)=>{
                this.loading=false;
                if(!res.Data) return;
                this.detailData=res.Data;
                // console.log(this.detailData)
      })

      //获取当前的时间作为最新更新时间
     var date =new Date()
     let Y = date.getFullYear() + '-';
     let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
     let D = date.getDate() + ' ';
     this.updatetime=Y+M+D
  },
  methods:{
      showPosition (position) {
        this.position = position;
        this.showPositionValue = true;
      },
      backData(){
          var creditCode= this.detailData.CreditCode?this.detailData.CreditCode:"";
          var address= this.detailData.Address?this.detailData.Address:"";
          var phone= this.detailData.PhoneNumber?this.detailData.PhoneNumber:"";
          var email= this.detailData.Email?this.detailData.Email:"";
          var webSite= this.detailData.WebsiteUrl?this.detailData.WebsiteUrl:"";
          var fullName= this.detailData.Name?this.detailData.Name:"";
          var ID=this.$route.params.id;
           this.$vux.loading.show({
             text: '正在提交..'
            });
          this.$http.post("/api/EnergizaSaleKHInfoController/WriteReturnInfo",{
              CreditCode:creditCode,
              Address: address,
              Phone:phone,
              Email:email,
              WebSite:webSite,
              FullName:fullName,
              KHGUID:ID
            }).then((res)=>{
                // this.detailData=res
                this.$vux.loading.hide();
                if(res.Success){
                    this.$vux.toast.show({
                      text: '操作成功',
                      time:"200"
                     })

                    setTimeout(()=>{
                      this.$router.go(-1)
                    }, 200)

                }else{
                  this.$vux.alert.show({
                      title: '操作失败!',
                      content: res.Message
                    })
                }

          })

      }
  }


}
</script>

<style lang="less">
    .gongshangmsg{
      ul{width:100%}
        .weui-cells{margin-top: 0;&:before{display: none}}
        height: 100%;
        color: #666;
        .vux-cell-box{
            .gs_title{
                padding-top:1rem;
                li{
                    font-size: 0.9rem;
                    margin-bottom:1rem;
                }
                .gs_name{
                    font-size:1.2rem;
                    font-weight:bold;
                    text-align:center;
                    margin-bottom:0.6rem;
                    color: #333;
                }
                .gs_person{
                    text-align: center;
                    .gs_satus{
                        display: inline-block;
                        padding:2px 5px;
                        border:1px solid #0992ff;
                        margin-left:8px;
                        border-radius:5px;
                        text-align:center;
                        color:#0992ff
                    }
                }

            }
        }
        .gs_detail{
            ul.gs{
                li{
                    width:50%;
                    float: left;
                    color:#666;
                }
            }
        }
        .getData{
            height:3rem;
            line-height: 3rem;
            width: 100%;
            position: fixed;
            text-align: center;
            left: 0;
            bottom:0;
            color: white;
            // font-size: 0.9rem;
            background-color: rgb(9, 146, 255);
            border-top:1px solid #dcdbdb;
        }


    }



</style>
