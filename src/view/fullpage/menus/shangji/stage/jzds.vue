<template>
  <ul class="jzds">
    <!-- {{list}} -->
    <li class="clearfix" v-for="(list,index) in followList" :key="index">
      <span class="name ">{{list.entity_flr.LxrName}}:</span>
      <span class="content ">{{list.entity_flr.RealContent}}</span>
    </li>
  </ul>
    
</template>

<script>
import {CellBox,Group ,XTextarea ,XInput } from 'vux';
export default {
  name: '',
  components:{
    CellBox,Group,XTextarea,XInput 
  },
  props:['list'],
  mounted(){
    // this.sort(this.list);
    this.followList=this.list;
    // console.log(this.list)
  },
  data () {
    return {
      people:"",
      content:"",
      followList:[]
    }
  },
  methods:{
    sort(arr){ //数据重排
      arr.map((el)=>{
        // el.list_fry.avater=""; //给默认空头像
        el.entity_flr.comments=el.list_fry||[];
        if(el.entity_flr.LastEditTime){
          el.entity_flr.date=el.entity_flr.LastEditTime.substring(0,10);
          el.entity_flr.time=el.entity_flr.LastEditTime.substring(11,16);
        }
        // el.entity_flr.avater="" //给默认空头像
        delete el["list_fry"];
      })

        var map = {},
            dest = [];
        for(var i = 0; i < arr.length; i++){
            var ai = arr[i].entity_flr;
            if(!map[ai.date]){
                dest.push({
                    date: ai.date,
                    data: [ai]
                });
                map[ai.date] = ai;
            }else{
                for(var j = 0; j < dest.length; j++){
                    var dj = dest[j];
                    if(dj.date == ai.date){
                        dj.data.push(ai);
                        break;
                    }
                }
            }
        }

        console.log(dest);
        this.followList=dest;

        // this.getAvater(this.followList);//取头像
    },
  }
}
</script>

<style lang="less">
.jzds{
  margin: 10px;
  margin-left: 40px;
  padding: 10px;
  border-radius: 5px;
  background-color: #f6f6f6;
  li{
    margin: 10px 0;
    &:first-child{
      margin-top: 0;
    }
    &:last-child{
      margin-bottom: 0;
    }
    .name{
      width: 25%;
      color: #333;
    }
    .content{
      width: 75%;
      color: #888;
    }
  }
}
</style>
