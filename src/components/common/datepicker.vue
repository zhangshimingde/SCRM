<template>
  <popup-picker :data="paramList" class="inline_block" @on-change="changeDateType" :display-format="formatMonth" v-model="date"><i class="iconfont icon-rili" slot="title" style="margin-right:4px"></i></popup-picker>
</template>

<script>
import { PopupPicker  } from 'vux'
export default {
    data () {
      return {
        date:[(new Date()).getFullYear().toString(),'全年'],
        paramList:[this.setYearList(),['全年','1', '2','3', '4','5', '6','7', '8','9', '10','11','12']],
      }
    },
    components:{PopupPicker
    },
    methods:{
      changeDateType(){ //切换日期之后
        this.$emit('changeDates',this.date)
      },
      formatMonth(value) {
          return `${value[0]} - ${value[1]}`
      },
      setYearList(){
        let yearList=[];
        let now=(new Date()).getFullYear();
        for(let i=0;i<10;i++){
          yearList.push((now-i).toString());
        };
        return yearList;
      }
    }
}
</script>

<style lang="less" scoped>

</style>
