<template>
  <div class="">
      <group v-if="this.$route.params.type=='close'">
        <cell-box style="margin-top:0">
          <div class="form-item clearfix sh readw changestatus" style="padding:0;width:100%" >
            <popup-radio title="关闭类型" :options="typeList" v-model="closeType" placeholder="请选择"></popup-radio>
          </div>
        </cell-box>
      </group>
      <group>
        
        <cell-box >
          <div class="form-item clearfix reado changestatus" style="" >
            <x-textarea title="变更原因" v-model="reason" placeholder="请简要说明"  text-align="right"></x-textarea>
          </div>
        </cell-box>
      </group>


      <div class="text_center" style="color:white;border-radius:5px;width:80%;margin:1rem auto;background-color:#3079D5;padding:10px 0" @click="confirms">提交</div>

  </div>
    
</template>

<script>
import {XTextarea  ,Popup ,PopupRadio, CellBox ,Group ,InlineLoading  } from 'vux'
export default {
  name: '',
  components:{
    Popup ,PopupRadio , CellBox ,Group ,InlineLoading,XTextarea
  },
  directives: {

  },
  created(){
    this.getType();
  },
  data () {
    return {
      closeType:"",
      reason:"",
      typeList:[],
    }
  },
  methods:{
    getType(){
      this.$http.get("/api/EnergizaSaleClueController/GetCloseTypeList")
      .then((res)=>{
        console.log(res)
        res.Data.map((el)=>{
          this.typeList.push({
            key:el.CloseTypeID,
            value:el.CloseTypeName
          })
        })
      })
    },
    confirms(){
      
      if(this.$route.params.type=="close"){
        if(!this.closeType||!this.reason){
          this.$vux.alert.show({
              title: '友情提示',
              content: '必填项请填写完整！'
          });
          return;
        }
        
      }else{
        if(!this.reason){
          this.$vux.alert.show({
                title: '友情提示',
                content: '请填写变更状态的原因！'
            });
          return;
        }
      }
      

      this.$vux.loading.show({
       text: '正在提交..'
      });
      var status;
      this.$route.params.type=="close"?status=3:status=1;
      this.$http.post("/api/EnergizaSaleClueController/ChangeStatus",{
        OpportunityGUID:this.$route.params.id,
        ToStatus:status,
        CloseReason:this.reason,
        CloseTypeID:this.closeType
      })
      .then((res)=>{
        this.$vux.loading.hide();
        if(res.Success){
            this.$vux.alert.show({
              title: '友情提示',
              content: '状态变更成功！'
            })

            this.$router.go(-1);
        }else{
          this.$vux.alert.show({
              title: '提交失败！',
              content: res.Message
            })
        }
      })          
    }
  },
  watch:{
  }
}
</script>

<style lang="less">
.changestatus{
  .weui-cell{
    padding: 0 !important;
  }
}
</style>
