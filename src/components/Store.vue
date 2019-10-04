<template>
<div class="border-yellow-400 mt-8 p-3 border-solid border-2"> 
  <p class="text-2xl text-center text-yellow-400 mb-3">Store</p>
  <div class="flex flex-wrap justify-center items-center">
    <button class="p-4 m-2 bg-blue-600 text-white rounded" @click="buyPotion()">Buy Medkit ( {{ potionCount }} )</button>
    <button class="p-4 m-2 bg-green-600 text-white rounded" @click="buyManaPotion()">Buy Energy Drink ( {{ manaPotion }} )</button>
  </div>
  </div>
</template>

<script>
  export default {
    props: [
      'manaPotion',
      'potionCount',
      'gold'
    ],
    methods: {
      buyPotion: function () {
        if (this.gold <= 49) {
          return;
        } else {
          this.potionCount += 1;
          this.gold -= 50;
        }
      },
      buyManaPotion: function () {
        if (this.gold <= 49) {
          return;
        } else {
          this.manaPotion += 1;
          this.gold -= 50;
        }
      }
    }
  }
</script>