<template>
  <div id="app" class="h-full">
    <p class="text-4xl text-center">Humans vs AI</p>

    <ClassStats 
      :playerHealth="playerHealth"
      :aiHealth="aiHealth" 
      :playerMana="playerMana">
    </ClassStats>

    <div class="flex flex-wrap justify-center">
      <p class="text-yellow-400 mx-2 text-2xl text-center mt-12"> Gold :  {{ this.gold }}</p>
      <p class="text-red-400 mx-2 text-2xl text-center mt-12"> Damage :  {{ this.totalDamage }}</p>
    </div>

    <div @gameWasStarted="started = $event" v-show="!started" >
      <Store 
        :manaPotion="manaPotion"
        :potionCount="potionCount"
        :gold="gold">
      </Store>
    </div>

    <Actions
      :started="started"
      :currentTurn="currentTurn"
      :playerHealth="playerHealth"
      :aiHealth="aiHealth"
      :playerMana="playerMana"
      :potionCount="potionCount"
      :manaPotion="manaPotion"
      :turns="turns"
      >
    </Actions>

    <Backpack
      :potionCount="potionCount"
      :manaPotion="manaPotion">
    </Backpack>

    <Log></Log>

    <Footer></Footer>

  </div>
</template>

<script>
  import Actions from './components/Actions'
  import Backpack from './components/Backpack'
  import ClassStats from './components/ClassStats'
  import Footer from './components/Footer'
  import Log from './components/Log'
  import Store from './components/Store.vue'

  export default {
    name: 'app',
    data: function() {
      return {
        started: false,
        currentTurn: 0,
        playerHealth: 100,
        aiHealth: 100,
        playerMana: 100,
        gold: 300,
        potionCount: 0,
        manaPotion: 0,
        totalDamage: 0,
        turns: []
      };
    },
    methods : {

    },
    components: {
      Actions,
      Backpack,
      ClassStats,
      Footer,
      Log,
      Store,
    },
  }
</script>