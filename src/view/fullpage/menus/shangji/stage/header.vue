<template>
    <div class="stage-header-wrap" id="stage-header">
      <div class="clearfix stage-header" id="stage-header-inner">
        <div class="stage-header-item relative left" :class="{'status0':item.status=='status0','status1':item.status=='status1','status2':item.status=='status2','pr':prIndex==index2&&index!=prIndex}" v-if="!(index2<2&&isSanyun)"  v-for="(item,index2) in tabList" :key="index2" @click="preview(index2)">
            <div class="status-icon">
              <div class="inner"></div>
            </div>
            <p class="text" v-html="item.text"></p>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: '',
  props:['index','oppType'],
  mounted(){

    this.tabList.map((el,index2)=>{
      if(index2<this.index){
        el.status="status2"
      }else if(index2==this.index){
        el.status="status1"
      }else if(index2>this.index){
        el.status="status0"
      }
    })

    this.setLeft(this.index);
    if(this.oppType=="a314f97a-2720-4cfe-b3d2-0d8ad7df8c34"||this.oppType=="fc40dbbe-94a7-44fd-936f-50f831eb6943"||this.oppType=="bfbd2e01-2226-42ca-8a89-e435bccadbcb"){
      this.isSanyun=true;
      setTimeout(()=>{
        document.getElementById("stage-header-inner").style.width="28rem";
      },100)
    }
  },
  data () {
    return {
      prIndex:0,
      isSanyun:false,
      tabList:[
        {
          status:"status0",
          text:"需求引导 <br>(赢率10%)"
        },
        {
          status:"status0",
          text:"价值呈现 <br>(赢率30%)"
        },
        {
          status:"status0",
          text:"方案竞争 <br>(赢率50%)"
        },
        {
          status:"status0",
          text:"商务谈判 <br>(赢率70%)"
        },
        {
          status:"status0",
          text:"合同审批 <br>(赢率90%)"
        },
        {
          status:"status0",
          text:"成交关闭 <br>(赢率100%)"
        }
      ]
    }
  },
  methods:{
    preview(index){
      this.prIndex=index;
      this.$emit("preview",index);
    },
    setLeft(index){
      // setTimeout(()=>{
        this.prIndex=index;
        var header=document.getElementById('stage-header');
        header.scrollLeft=index*100;
      // }, 100)

    }
  },
  watch:{
    index(val){
      this.setLeft(val);
      this.prIndex=val;
      this.tabList.map((el,index2)=>{
        if(index2<val){
          el.status="status2"
        }else if(index2==val){
          el.status="status1"
        }else if(index2>val){
          el.status="status0"
        }
      })
    }
  }
}
</script>

<style lang="less">
.stage-header-wrap{
  padding: 1.5rem 0 2rem;
  overflow-x: auto;
  background-color: white;
  -webkit-overflow-scrolling: touch;
  .stage-header{
    @w:7rem;
    width: 6*@w;
    .stage-header-item{

      font-size: 0.9rem;
      text-align: center;
      width: @w;
      &.status2{
        color: #3079D5;

        .status-icon{
          border: 2px solid #3079D5;
          background-color: white;
          .inner{
            width: 70%;
            background-color: #3079D5;
            padding-top: 70%;
          }
        }
      };
      &.status1{
        color: #82AEE5;

        .status-icon{
          background-color: #CDDEF5;
          .inner{

            background-color: #3079D5;

          }
        }
      }
      &.status0{
        color: #BEBEBE;

        .status-icon{
          background-color: #ECECEC;
          .inner{
            background-color: #BEBEBE;
          }
        }
      }
      &.pr{
          color: rgba(246, 134, 44, 1);

          .status-icon{
            border: 2px solid #FBCFAB;
            background-color:  #FBCFAB;
            .inner{
              background-color: rgba(246, 134, 44, 1);
            }
          }
        }

      .status-icon{
        box-sizing: border-box;
        border-radius: 100%;
        @width:2rem;
        height: @width;
        width: @width;
        margin:0.5rem auto;
        position: relative;
        z-index: 1;
        .inner{
          width: 60%;
          border-radius: 100%;
          padding-top: 60%;
          position: absolute;
          left: 50%;
          top:50%;
          transform:translate(-50%,-50%);
        }
      }
      &:first-child{
        &:before{
          display: none
        }
      }
      &:last-child{
        &:after{
          display: none
        }
      }
      &:before{
        content: "";
        display: block;
        position: absolute;
        width: 50%;
        height:1px;
        background-color: #ccc;
        top:1.5rem;
        z-index: 0;
      }
      &:after{
        content: "";
        display: block;
        position: absolute;
        width: 50%;
        height:1px;
        right: 0;
        background-color: #ccc;
        top:1.5rem;
        z-index: 0;
      }
    }
  }
}
</style>
