<template>
        <div class="charts" :id="id" :style="styles"></div>
</template>

<script>
export default {
  name: 'category',
  mounted (){

      this.inits(this.option);
  },
  props:['id','option','styles'],
  data () {
    return {
    	chart:""
    }
  },
  computed:{
  },
  methods:{
    inits(op){
      var _this=this;
      _this.chart=_this.$echarts.init(document.getElementById(_this.id))
      _this.chart.setOption(op);


      if(op.series[0].name=='销售漏斗')
      {
        // 默认高亮第一组数据
        _this.chart.dispatchAction({
            type: 'highlight',
            dataIndex: 0,
        });

        // 点击数据区
        _this.chart.on('click', function (params) {
            // console.log(params);
            _this.$emit("changeFunnel",params);

            // 高亮状态切换
             _this.chart.dispatchAction({
                type: 'downplay',
                dataIndex:[0,1,2,3,4],
            });
            _this.chart.dispatchAction({
                type: 'highlight',
                dataIndex: params.dataIndex,
            });
        });


      }else if(op.series[0].name=='非成交关闭商机分布'){

        _this.chart.on('click', function (params) {
            _this.$emit("changePie",params);

        });
      }else if(op.series[0].name=='异常预警'){

        // _this.chart.on('click', function (params) {
        //     _this.$emit("changeBar",params);

        // });
      }else if(op.series[0].stack=='季度成交'){

        // _this.chart.on('click', function (params) {
        //     _this.$emit("changeSaleYC",params);
        // });

        // 柱状图非图形区域点击交互
        _this.chart.getZr().on('click',params=>{

            const pointInPixel= [params.offsetX, params.offsetY];
            if (_this.chart.containPixel('grid',pointInPixel)) {
                let xIndex=_this.chart.convertFromPixel({seriesIndex:0},[params.offsetX, params.offsetY])[0];
                /*事件处理代码书写位置*/
                var op=_this.chart.getOption();
                var name=op.xAxis[0].data[xIndex];
                // console.log(name);
                _this.$emit("changeSaleYC",{name:name});
            }
        });

      }

    },
  	change(value){
  		console.log(value)
  	}
  },
  watch:{ //监听数据变化，重新绘制图形
	  option:{
        handler:function(val,oldval){
             this.inits(val);
        },
        deep:true//对象内部的属性监听，也叫深度监听
    }
  }
}
</script>

<style scoped>

</style>
