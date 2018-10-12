<template>
      <ul class="eggs-wrap" >
        	<input type="text" v-model="code" placeholder="输入要测试的用户code">
          <button @click="sw">确定</button>
      </ul>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
    	code:""
    }
  },
  methods:{
    sw(){
      if(!this.code) return;
      this.$http.get("/api/AppUser/getTokenForGod?appUserCode="+this.code)
      .then((res)=>{
        console.log(res)
        if(res.Success){
          localStorage.setItem("token",res.Token)
          this.$http.defaults.headers.common['Authorization'] =localStorage.getItem("token");
          this.$router.go(-1)
        }else{
          alert(res.Message)
        }
        
      })

      // this.$http.headers.common['Authorization'] =localStorage.getItem("token");
    }
  }
}
</script>

<style scoped lang="less">
.eggs-wrap{
  padding: 15px;
  input{
    padding: 10px;
  }
  button{
    padding: 8px 15px;
  }
}
</style>
