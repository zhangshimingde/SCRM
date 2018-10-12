<template>
  <div id="panelWrap" class=''>

    <transition name='fade' >
    	<!-- <keep-alive> -->
          	<router-view></router-view>
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>
<style>


</style>
<script>
export default {
  name: 'panelWrap',
  created(){
  },
  components: {
  }
}
</script>
