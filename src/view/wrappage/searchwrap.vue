<template>
  <div id="search-wraps" class=''>

    <transition name='fade' mode="out-in">
    	<keep-alive>
          	<router-view></router-view> 
      </keep-alive>
    </transition>
  </div>
</template>
<style>


</style>
<script>
export default {
  created(){
  },
  components: {
  }
}
</script>
