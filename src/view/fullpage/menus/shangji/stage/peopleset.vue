<template>
  <div class="fixed peopleset">
    <ul class="list">
      <li v-for="(item,index) in listData" :key="index">
        <group>
          <div class="clearfix list-item">
            <x-input title="姓名：" readonly text-align="right" v-model="item.name"></x-input>
          </div>
          <div class="clearfix list-item">
              <popup-radio title="立场：" :options="lc" v-model="item.position"></popup-radio>
          </div>
          <div class="clearfix list-item">
              <popup-radio title="是否决策人：" :options="jcr" v-model="item.business"></popup-radio>
          </div>
        </group>
      </li>
      
    </ul>
    <div class="confirm">
      <div class=" text_center left" style="background:#ccc" @click="shutoff">取消</div>
      <div class=" text_center left" @click="sub">确定</div>
    </div>
    
  </div>
    
</template>

<script>
import {PopupRadio,Group,XInput     } from 'vux'
export default {
  name: '',
  components:{
    Group ,PopupRadio ,XInput 
  },
  props:["list"],
  mounted(){
    this.list.map((el)=>{
      this.listData.push({
        name:el.name,
        id:el.id,
        position:3,
        business:"是",
        jcr:"",
        lic:""
      })
    })
  },
  filters:{
    toStr(val){
      return val.toString()
    }
  },
  data () {
    return {
        listData:[],
        // lc:[-3,-2,-1,'0',1,2,3],
        lc: [{
        key: 1,
        value: -3
      }, {
        key: 5,
        value: -2
      },{
        key: 6,
        value: -1
      }, {
        key: 3,
        value: "0"
      },{
        key: 2,
        value: 1
      },{
        key: 7,
        value: 2
      },{
        key: 8,
        value: 3
      }],
        jcr:["是","否"]
    }
  },
  methods:{
    shutoff(){
      this.$emit("shutoff")
    },
    sub(){
      
      this.listData.map((el)=>{
        el.business=="是"?el.jcr=true:el.jcr=false;
        // if(el.position=="0") {
        //   el.lic=0;
        // }else{
          el.lic=el.position;
        // }
      })

      console.log(this.listData);
      // this.$router.go(-1);
      this.$emit("peoplesetFinish",this.listData)
    }
  },
  watch:{
  }
}
</script>

<style lang="less">
.peopleset{
  background-color: #f6f6f6;
  width: 100%;
  height: 100%;
  left: 0;
  top:0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  z-index: 5;
  @h:3rem;
  .list{
    padding-bottom: @h;
    li{
      margin:10px;
      background-color: white;
      border-radius: 5px;
      padding:0 5px;
      .list-item{
        position: relative;
        .banner{
          width: 30%;
        }
        .content{
          width: 70%;
        }
        &:before {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            height: 1px;
            border-top: 1px solid #D9D9D9;
            color: #D9D9D9;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
            left: 15px;
        }
        &:first-child{
          &:before{display: none}
        }
      }
      .weui-cell{
        padding:10px 15px !important;
      }
      .weui-cells{
        margin-top: 0 !important;
        &:before,&:after{
          display: none
        }
      }
    }
  }
  .confirm{
    position: fixed;
    width: 100%;
    
    height: @h;
    line-height: @h;
    color: white;
    background-color: #3079D5;
    bottom: 0;
    left:0;
    &>div{
      width: 50%;
    }
  }
}
</style>
