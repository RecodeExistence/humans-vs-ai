<template>
  <div id="app" class="h-full">
    <p class="text-4xl text-center">Humans vs AI</p>

    <ClassStats></ClassStats>

    <Counters></Counters>

    <div v-show="!started" >
      <Store></Store>
    </div>

    <Actions></Actions>

    <Backpack></Backpack>

    <Log></Log>

    <Footer></Footer>

  </div>
</template>

<script>
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