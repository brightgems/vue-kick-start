<template>
  <div class='home'>
    <h2>This is a starter kit for vue. Very easy to use.</h2>
    <h3>Feel free to use it.</h3>
    
    <spinner></spinner>
  </div>
</template>

<style lang='less'>
.home {
  text-align: center;
}
</style>

<script>
import Spinner from '../components/Spinner.vue'

export default {
  title: 'Home',
  components:{
    'spinner' :Spinner
  }
}
</script>