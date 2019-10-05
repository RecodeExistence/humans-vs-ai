<template>
<<<<<<< HEAD
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
=======
  <div id="app" class="h-full content-center">
    <p class="text-4xl text-center">Humans vs AI</p>

    <ClassStats></ClassStats>

    <Counters></Counters>

    <div v-show="!started" >
      <Store></Store>
    </div>

    <div class="flex flex-wrap justify-center mt-12">
      <Actions></Actions>
      <Backpack></Backpack>
    </div>

    <Log></Log>

    <Footer></Footer>

>>>>>>> staging
  </div>
</template>

<script>
<<<<<<< HEAD
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
=======
  import Actions from './components/Actions'
  import Backpack from './components/Backpack'
  import ClassStats from './components/ClassStats'
  import Counters from './components/Counters'
  import Footer from './components/Footer'
  import Log from './components/Log'
  import Store from './components/Store.vue'

  export default {
    name: 'app',
    computed:{
      started(){
        return this.$store.state.started;
      }
    },
    components: {
      Actions,
      Backpack,
      ClassStats,
      Counters,
      Footer,
      Log,
      Store,
    },
  }
</script>
>>>>>>> staging
