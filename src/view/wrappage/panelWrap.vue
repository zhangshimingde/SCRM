<template>
  <div id="panelWrap" class=''>

    <!-- <transition name='fade' > -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- </transition> -->
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
