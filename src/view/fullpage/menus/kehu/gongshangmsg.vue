<template>
  <div class="gongshangmsg">
    <template v-if="!loading">
        <template v-if="detailData.name">
            <group style="">
            <cell-box style="margin-top:">
                <ul  class="gs_title clearfix" style="width: 100%;">
                    <li class="gs_name text-over" >{{detailData.name}}</li>
                    <li class="gs_person" >
                        <span>法定代表人：</span> 
                        <span >{{detailData.oper_name}}</span>
                        <span class="gs_satus">{{detailData.status?detailData.status.substring(0,2):" "}}</span>
                    </li>
                    <li class="text_center" style="color:#b5b5b5;margin-bottom:0.5rem">数据来源：全国企业信用信息公示系统</li>
                    <li class="text_center" style="color:#666;margin-bottom:0.5rem"><i class="iconfont icon-shuaxin"></i><span style="margin:0 8px">{{detailData.updated_date?detailData.updated_date:updatetime}}</span> 更新</li>
                </ul>
            </cell-box>
            <cell-box >
                <div class="form-title">联系方式</div>
            </cell-box>
            <cell title="联系电话" value="hello" >
                <span style="">{{detailData.phone_number}}</span>
            </cell>
            <cell title="邮箱地址" value="hello" >
                <span style="">{{detailData.email}}</span>
            </cell>
            <cell title="官网地址" value="hello" >
                <span style="">{{detailData.website_url?detailData.website_url:"暂无官网信息"}}</span>
            </cell>
            <cell-box >
                <div class="form-title">工商信息</div>
            </cell-box>
            <cell-box  class="gs_detail">
                <ul class="clearfix gs">
                    <li style="fontWeight:bold">成立日期</li>
                    <li style="fontWeight:bold">登记状态</li>
                    <li style="fontSize:0.9rem;color:#b6b6b6;margin:2px 0 8px 0;">{{detailData.start_date}}</li>
                    <li style="fontSize:0.9rem;color:#b6b6b6;margin:2px 0 8px 0;">{{detailData.status}}</li>
                    <li style="fontWeight:bold">注册资本</li>
                    <li style="fontWeight:bold;">企业类型</li>
                    <!-- <li style="fontWeight:bold">实缴资本</li> -->
                    <li style="fontSize:0.9rem;color:#b6b6b6;margin:2px 0 8px 0;">{{detailData.regist_capi}}</li>
                    <!-- <li style="fontSize:0.9rem;color:#b6b6b6;margin:2px 0 8px 0;">47892.608万元</li> -->
                    <li style="fontSize:0.9rem;color:#b6b6b6;margin:2px 0 8px 0;">{{detailData.econ_kind}}</li>
                </ul>
            </cell-box>
            <cell-box    class="gs_detail" >
                <ul class="clearfix ">
                        <li style="fontWeight:bold;">统一社会信用代码</li>
                        <li style="fontSize:0.9rem;color:#b6b6b6;margin:2px 0 8px 0;">{{detailData.credit_code}}</li>
                        <li style="fontWeight:bold">工商注册号</li>
                        <!-- <li style="fontWeight:bold">组织机构代码</li> -->
                        <li style="fontSize:0.9rem;color:#b6b6b6;margin:2px 0 8px 0;">{{detailData.reg_num}}</li>
                        <!-- <li style="fontSize:0.9rem;color:#b6b6b6;margin:2px 0 8px 0;">{{detailData.no}}</li> -->
                    </ul>
            </cell-box>
            
            <cell-box  class="gs_detail" >
                <ul class="clearfix">
                    <!-- <li style="fontWeight:bold;">英文名</li>
                    <li style="fontSize:0.9rem;color:#b6b6b6;margin:2px 0 8px 0;;">scccsjkb jgjn hkjn nlk</li> -->
                    <!-- <li style="fontWeight:bold;">曾用名</li>
                    <li style="fontSize:0.9rem;color:#b6b6b6;margin:2px 0 8px 0;;">深圳市长城投资控股股份有限公司</li>
                    <li style="fontSize:0.9rem;color:#b6b6b6;margin:2px 0 8px 0;;">深圳市长城地产控股股份有限公司</li>
                    <li style="fontSize:0.9rem;color:#b6b6b6;margin:2px 0 8px 0;;">深圳市工程开发股份有限公司</li> -->
                    <li style="fontWeight:bold;">所属行业</li>
                    <li style="fontSize:0.9rem;color:#b6b6b6;margin:0.3rem 0;">{{detailData.main_industry?detailData.main_industry:"- -"}}</li>
                </ul>
            </cell-box>
            <cell-box  class="gs_detail">
                <ul class="clearfix">
                    <li style="fontWeight:bold;">经营范围</li>
                    <li style="fontSize:0.9rem;color:#b6b6b6;;margin:0.5rem 0">{{detailData.scope}}</li>
                    <li style="fontWeight:bold;">经营方式</li>
                    <li  style="fontSize:0.9rem;color:#b6b6b6;margin:0.3rem 0;">{{detailData.business_model?detailData.business_model:"- -"}}</li>
                </ul>
            </cell-box>
            <cell-box  class="gs_detail">
                <ul class="clearfix">
                    <li style="fontWeight:bold;">公司地址</li>
                    <!-- <li style="fontSize:0.9rem;color:#b6b6b6;margin:2px 0 8px 0;;lineHeight:12px;position:relative">
                        <i class="iconfont icon-dilizuobiao left" style="color:#0992ff;margin:5px 5px 10px 0;"></i>
                        <span  class="left" style="margin:0 0.2rem;">{{detailData.address}}</span >
                        <i class="iconfont icon-xiayibu left" style=" position:absolute;left:90%;top:5px;"></i>
                    </li> -->
                    <li class="clearfix" style="font-size:0.9rem;padding:0.3rem 0">
                        <i class="iconfont icon-dilizuobiao left" style="color:#0992ff;"></i>
                        <span  class="left" style="margin:0 0.2rem;width:88%">{{detailData.address}}</span >
                        <!-- <i class="iconfont icon-xiayibu right" style=""></i> -->
                    </li>
                </ul>
            </cell-box>
            <cell-box  class="gs_detail">
                <ul class="clearfix" style="width: 100%;padding-bottom:3rem">
                    <li style="fontWeight:bold;">营业期限</li>
                    <li style="fontSize:0.9rem;color:#b6b6b6;margin:0.2rem 0 0.5rem 0;;">
                        <span>{{detailData.term_start}}</span>至
                        <span>{{detailData.term_end?detailData.term_end:"- -"}}</span>
                    </li>
                    <li style="fontWeight:bold;">核准日期</li>
                    <li style="fontSize:0.9rem;color:#b6b6b6;margin:0.2rem 0 0.5rem 0;;">
                        {{detailData.check_date}}
                    </li>
                    <li style="fontWeight:bold;">登记机关</li>
                    <li style="fontSize:0.9rem;color:#b6b6b6;">
                        {{detailData.belong_org}} 
                    </li>
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
                FullName:this.fullName
            }).then((res)=>{
                this.loading=false;
                this.detailData=res.Data.data 
                console.log(this.detailData)
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
          var creditCode= this.detailData.credit_code?this.detailData.credit_code:"";
          var address= this.detailData.address?this.detailData.address:"";
          var phone= this.detailData.phone_number?this.detailData.phone_number:"";
          var email= this.detailData.email?this.detailData.email:"";
          var webSite= this.detailData.website_url?this.detailData.website_url:"";
          var fullName= this.detailData.name?this.detailData.name:"";
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
