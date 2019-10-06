<template>
  <div id="app" class="h-full content-center">
    <img class="m-auto h-56 block border-gray-500 border-4 rounded-full" src="/assets/huvai_800.png" alt="Humans vs AI">

    <Battle v-if="started"></Battle>

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

  </div>
</template>

<script>
  import Actions from './components/Actions'
  import Backpack from './components/Backpack'
  import Battle from './components/Battle'
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
      Battle,
      Counters,
      Footer,
      Log,
      Store,
    },
  }
</script>
