<template>
      <div class="voice-wrap fixed">
        <textarea name="" id="" v-model="val" cols="30" placeholder="请说话.." rows="10"></textarea>
        <div class=" opbar absolute">
        	<div class="absolute bo-wrap" v-if="bo" :class="bo?'':'opacity'">
        		<div class='circle circle--1'></div>
				<div class='circle circle--2'></div>
				<div class='circle circle--3'></div>
				<div class='circle circle--4'></div>
				<div class='circle circle--5'></div>
				<div class='circle circle--6'></div>
        	</div>
        	<div class="clearfix relative" style="z-index:2">
        		<div class="left btn text_center" @click="comfirm" style="background:#4CC5F1">确定</div>
	        	<div class="absolute voice" id="voice" @touchstart.prevent="start" @touchend="end">
	        		<p><i class="iconfont icon-yuyin1 yy"></i></p>
	        		{{text}}
	        	</div>
	        	<div class="right btn text_center" @click="cancel" style="background:#F9C269">取消</div>
        	</div>

        </div>
      </div>
</template>

<script>
export default {
  created(){
        // 自定义返回事件
     window.history.pushState(null, null, "");
     window.addEventListener("popstate", ()=> {
        this.backLast();
      }, false);

		  	function getRandomNumber() {
			  return Math.floor(Math.random() * 255);
			}

			// function getBrightness(r, b, g) {
			//   // brightness calculation from http://alienryderflex.com/hsp.html
			//   return Math.sqrt(
			//     0.299 * (r * r) +
			//     0.587 * (g * g) +
			//     0.114 * (b * b)
			//   );
			// }

			setInterval(()=> {
			  const r = getRandomNumber(),
			        g = getRandomNumber(),
			        b = getRandomNumber();
			        // brightness = getBrightness(r,g,b);

			  for(var i=0;i<document.querySelectorAll(".circle").length;i++){
			  	document.querySelectorAll(".circle")[i].style.background= `rgb(${r},${g},${b})`;
			  }

			}, 2000);
  },
  data () {
    return {
    	bo:false,
    	text:"长按输入",
    	val:""
    }
  },
  methods:{
  	start(){
  		this.text="正在输入...";
  		document.getElementById("voice").style.color="#3079D5";
  		this.bo=true;
  		this.$wx.startRecord({
  			cancel: function () {
        		alert('用户拒绝授权录音！');
	      	}
      	});
  	},
  	end(){
  		this.text="长按输入";
  		document.getElementById("voice").style.color="#666";
  		this.bo=false;
  		this.$wx.stopRecord({
		    success:  (res)=> {
		        var localId = res.localId;
		        this.$wx.translateVoice({
    				    localId: localId, // 需要识别的音频的本地Id，由录音相关接口获得
    				    isShowProgressTips: 1, // 默认为1，显示进度提示
    				    success: (res2)=> {
    				    	this.val+=res2.translateResult;
    				    },
                fail: function (res) {
                    alert("无法识别！");
                }
    				});
		    },
		    fail: function (res) {
		        alert("当前版本暂不支持语音识别！");
      	}
		});


  	},
  	comfirm(){
      if(!this.val) return ;
      this.$router.go(-1);
  		this.$emit("comfirm",this.val)
  	},
  	cancel(){
      this.$router.go(-1);
  		this.$emit("cancel",this.val)
  	},
    backLast(){
      this.$emit("cancel",this.val);
    }
  }
}
</script>

<style scoped lang="less">
  .voice-wrap{
  	z-index: 100;
  	background-color: white;
  	width: 100%;
  	height: 100%;
  	left: 0;
  	top: 0;
  	textarea{
  		padding: 15px;
  		font-family: '微软雅黑';
  		color: #666;
  		border: none;
  		width: 100%;
  		box-sizing: border-box;
  		outline: none;
  		resize:none;
  		font-size: 1rem;
  	}
  	.opbar{
  		width: 90%;
  		// box-sizing: border-box;
  		@h:4rem;
  		height: @h;
  		line-height: @h;
  		padding: 3% 5%;
  		bottom: 2rem;
  		left:0;
  		.btn{
  			color: white;
  			border-radius: 100%;
  			width: @h;
  			height: @h;
  		}
  		.voice{
  			width: 40%;
  			line-height: normal;
  			text-align: center;
  			left: 30%;
  			color: #666;
  			-webkit-touch-callout: none; /* iOS Safari */
  			user-select: none;
  			.yy{
  				font-size: 2.5rem;margin-bottom: 4px;
  			}
  		}
  	}
  }
  .bo-wrap{
  	top:50%;
  	left:50%;
  	transform:translate(-50%,-50%);
  	z-index: 0;

  }
  // :root {
  //   --r: 17;
  //   --g: 206;
  //   --b: 142;
  //   --bg: #121212;
  // }
  .circle {
    // --scale: 1;
    position: absolute;
    top: 50%;
    left: 50%;
            transform: translate(-50%, -50%);
    border-radius: 50%;
    // width: var(@size);
    // height: var(@size);

    animation: pulse 3s infinite ease-in-out;
    transition: background 2s ease-in-out;
    /* apparently having using var in rgb breaks sass... */
    background: rgb(17, 206, 142);
    // mix-blend-mode: luminosity;
  }

  .circle--1 {
    opacity: 1;
            animation-delay: 0.12s;
  }
  .circle--2 {
    opacity: 0.5;
            animation-delay: 0.24s;
  }
  .circle--3 {
    opacity: 0.3333;
            animation-delay: 0.36s;
  }
  .circle--4 {
    opacity: 0.25;
            animation-delay: 0.48s;
  }
  .circle--5 {
    opacity: 0.2;
            animation-delay: 0.6s;
  }
  .circle--6 {
    opacity: 0.1666;
            animation-delay: 0.72s;
  }

  .circle--1 {
    width: @size;
    height: @size;
    @size: calc(50px * 1);
    width: @size;
    height: @size;
  }

  @media (min-width: 700px) {

    .circle--1 {
      width: @size;
    height: @size;
      @size: calc(7vw * 1);
    //    width: @size;
  	 // height: @size;
    }
  }

  @media (min-width: 1000px) {

    .circle--1 {
      width: @size;
    height: @size;
      @size: calc(70px * 1);
    }
  }

  .circle--2 {
    width: @size;
    height: @size;
    @size: calc(50px * 2);
  }

  @media (min-width: 700px) {

    .circle--2 {
      width: @size;
    height: @size;
      @size: calc(7vw * 2);
    }
  }

  @media (min-width: 1000px) {

    .circle--2 {
      width: @size;
    height: @size;
      @size: calc(70px * 2);
    }
  }

  .circle--3 {
    width: @size;
    height: @size;
    @size: calc(50px * 3);
  }

  @media (min-width: 700px) {

    .circle--3 {
      width: @size;
    height: @size;
      @size: calc(7vw * 3);
    }
  }

  @media (min-width: 1000px) {

    .circle--3 {
      width: @size;
    height: @size;
      @size: calc(70px * 3);
    }
  }

  .circle--4 {
    width: @size;
    height: @size;
    @size: calc(50px * 4);
  }

  @media (min-width: 700px) {

    .circle--4 {
      width: @size;
    height: @size;
      @size: calc(7vw * 4);
    }
  }

  @media (min-width: 1000px) {

    .circle--4 {
      width: @size;
    height: @size;
      @size: calc(70px * 4);
    }
  }

  .circle--5 {
    width: @size;
    height: @size;
    @size: calc(50px * 5);
  }

  @media (min-width: 700px) {

    .circle--5 {
      width: @size;
    height: @size;
      @size: calc(7vw * 5);
    }
  }

  @media (min-width: 1000px) {

    .circle--5 {
      width: @size;
    height: @size;
      @size: calc(70px * 5);
    }
  }

  .circle--6 {
    width: @size;
    height: @size;
    @size: calc(50px * 6);
  }

  @media (min-width: 700px) {

    .circle--6 {
      width: @size;
    height: @size;
      @size: calc(7vw * 6);
    }
  }

  @media (min-width: 1000px) {

    .circle--6 {
      width: @size;
    height: @size;
      @size: calc(70px * 6);
    }
  }

  @-webkit-keyframes pulse {
    0% {
      -webkit-transform: translate(-50%, -50%) scale(1);
              transform: translate(-50%, -50%) scale(1);
    }

    25% {
      -webkit-transform: translate(-50%, -50%) scale(1.3);
              transform: translate(-50%, -50%) scale(1.3);
    }

    50% {
      -webkit-transform: translate(-50%, -50%) scale(0.70);
              transform: translate(-50%, -50%) scale(0.70);
    }

    75% {
      -webkit-transform: translate(-50%, -50%) scale(1);
              transform: translate(-50%, -50%) scale(1);
    }
  }

  @keyframes pulse {
    0% {
      -webkit-transform: translate(-50%, -50%) scale(1);
              transform: translate(-50%, -50%) scale(1);
    }

    25% {
      -webkit-transform: translate(-50%, -50%) scale(1.3);
              transform: translate(-50%, -50%) scale(1.3);
    }

    50% {
      -webkit-transform: translate(-50%, -50%) scale(0.70);
              transform: translate(-50%, -50%) scale(0.70);
    }

    75% {
      -webkit-transform: translate(-50%, -50%) scale(1);
              transform: translate(-50%, -50%) scale(1);
    }
  }
</style>
