<template>
  <div id="app" class="h-full">
    <p class="text-4xl text-center">Humans vs AI</p>

    <ClassStats 
      :playerHealth="playerHealth"
      :aiHealth="aiHealth" 
      :playerMana="playerMana">
    </ClassStats>

    <template v-show="!started">
      <Store 
        :manaPotion="manaPotion"
        :potionCount="potionCount"
        :gold="gold">
      </Store>
    </template>

    <Buttons
      :started="started"
      :potionCount="potionCount"
      :manaPotion="manaPotion"
      :aiHealth="aiHealth"
      :playerHealth="playerHealth"
      :playerMana="playerMana"
      >
    </Buttons>

  </div>
</template>

<script>
  import Store from './components/Store.vue'
  import ClassStats from './components/ClassStats'
  import Buttons from './components/Buttons'

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
    components: {
      Store,
      ClassStats,
      Buttons
    },
    methods: {
      startGame: function () {
        this.playerHealth = 100;
        this.aiHealth = 100;
        this.playerMana = 100;
        this.started = true;
        this.turns = [];
        this.currentTurn = 0;
        this.totalDamage = 0;
      },
    }
  }
</script>