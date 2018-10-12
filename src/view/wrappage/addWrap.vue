<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>

export default {
  name: '',
  created(){
  },
  data () {
    return {
      
    }
  }
}
</script>

<style lang="less">

</style>
