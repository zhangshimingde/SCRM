<template>
  <div id="box" class=''>

    <transition name='fade' mode="out-in">
    	<keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>
<style>


</style>
<script>
export default {
  name: 'box',
  created(){

  },
  components: {
  }
}
</script>
