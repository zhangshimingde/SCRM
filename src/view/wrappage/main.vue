<template>
  <div id="main" class=''>

    <transition name='fade' mode="out-in">
    	<keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <foot></foot>

    <floatBtn :list="list" v-show="list.length>0"></floatBtn>
  </div>
</template>
<style>


</style>
<script>
import foot from '../../components/footer'
import router from '../../router/index'
import floatBtn from '../../components/floatBtn'
export default {
  name: 'mains',
  created(){
    this.getMenu();
  },
  data(){
    return{
      list: []
    }
  },
  components: {
    foot,floatBtn
  },
  methods:{
    getMenu() {
      this.$http.post("/api/EnergizeSaleCommon/GetUserNavigation").then(res => {
        // console.log(res);

        if (res.Data) {
          this.list = res.Data.map(el => {
            return el.Chn;
          });
        }
      });
    }
  }
}
</script>
