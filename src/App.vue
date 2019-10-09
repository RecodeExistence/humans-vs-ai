<template>
  <div id="app" class="h-screen px-20 pt-8">

    <img class="m-auto h-56 block border-gray-500 border-4 rounded-full" src="/assets/huvai_800.png" alt="Humans vs AI">

    <Battle v-if="started"></Battle>

    <Counters></Counters>

    <Store v-show="!started"></Store>

    <div class="flex flex-wrap justify-center mt-12">
      <Actions></Actions>
      <Backpack></Backpack>
    </div>

    <Log></Log>

    <Footer class="mb-8"></Footer>
  </div>
</template>

<script>
  import Actions from './components/Actions'
  import Backpack from './components/Backpack'
  import Battle from './components/Battle'
  import Counters from './components/Counters'
  import Footer from './components/Footer'
  import Log from './components/Log'
  import Register from './components/Register'
  import Store from './components/Store.vue'

  export default {
    name: 'app',
    computed:{
      started(){
        return this.$store.state.started;
      },
    },
    components: {
      Actions,
      Backpack,
      Battle,
      Counters,
      Footer,
      Log,
      Register,
      Store,
    },
  }
</script>
