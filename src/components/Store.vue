<template>
  <div class="border-yellow-400 mt-8 p-3 border-solid border-2"> 
    <p class="text-2xl text-center text-yellow-400 mb-3">Store</p>
    <div class="flex flex-wrap justify-center items-center">

      <button class="p-4 m-2 bg-blue-600 text-white rounded" @click="buyPotion()">
        Buy Medkit ( {{ potionCount }} )
        <br> {{ potionCost }}
      </button>

      <button class="p-4 m-2 bg-green-600 text-white rounded" @click="buyManaPotion()">
        Buy Energy Drink ( {{ manaPotion }} )
        <br> {{ potionCost }} 
      </button>

    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      potionCount(){
        return this.$store.state.potionCount;
      },
      manaPotion(){
        return this.$store.state.manaPotion;
      },
      potionCost(){
        return this.$store.state.potionCost 
          + ' ' + 
          this.$store.state.currency;
      },
      currency() {
        return this.$store.state.currency;
      }
    },
    methods: {
      buyPotion() {
        if (this.$store.state.gold <= 49) {
          return;
        } else {
          this.$store.state.potionCount += 1;
          this.$store.state.gold -= 50;
        }
      },
      buyManaPotion() {
        if (this.$store.state.gold <= 49) {
          return;
        } else {
          this.$store.state.manaPotion += 1;
          this.$store.state.gold -= 50;
        }
      }
    }
  }
</script>