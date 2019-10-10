<template>
  <div class="border-yellow-400 mt-8 p-3 border-solid border-2 rounded"> 
    <p class="text-2xl text-center text-yellow-400 mb-3">Store</p>
    <div class="flex flex-wrap justify-center items-center">

      <button class="p-4 m-2 bg-blue-600 text-white rounded" @click="buyPotion()">
        <svg class="w-6 h-6 m-auto block" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="medkit"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M96 480h320V128h-32V80c0-26.51-21.49-48-48-48H176c-26.51 0-48 21.49-48 48v48H96v352zm96-384h128v32H192V96zm320 80v256c0 26.51-21.49 48-48 48h-16V128h16c26.51 0 48 21.49 48 48zM64 480H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v352zm288-208v32c0 8.837-7.163 16-16 16h-48v48c0 8.837-7.163 16-16 16h-32c-8.837 0-16-7.163-16-16v-48h-48c-8.837 0-16-7.163-16-16v-32c0-8.837 7.163-16 16-16h48v-48c0-8.837 7.163-16 16-16h32c8.837 0 16 7.163 16 16v48h48c8.837 0 16 7.163 16 16z"></path>
        </svg>
        Buy ( {{ potionCount }} )
        <br> {{ potionCost }}
      </button>

      <button class="p-4 m-2 bg-green-600 text-white rounded" @click="buyManaPotion()">
        <svg class="w-6 h-6 m-auto block" aria-hidden="true" data-prefix="fas" data-icon="mug-hot" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M127.1 146.5c1.3 7.7 8 13.5 16 13.5h16.5c9.8 0 17.6-8.5 16.3-18-3.8-28.2-16.4-54.2-36.6-74.7-14.4-14.7-23.6-33.3-26.4-53.5C111.8 5.9 105 0 96.8 0H80.4C70.6 0 63 8.5 64.1 18c3.9 31.9 18 61.3 40.6 84.4 12 12.2 19.7 27.5 22.4 44.1zm112 0c1.3 7.7 8 13.5 16 13.5h16.5c9.8 0 17.6-8.5 16.3-18-3.8-28.2-16.4-54.2-36.6-74.7-14.4-14.7-23.6-33.3-26.4-53.5C223.8 5.9 217 0 208.8 0h-16.4c-9.8 0-17.5 8.5-16.3 18 3.9 31.9 18 61.3 40.6 84.4 12 12.2 19.7 27.5 22.4 44.1zM400 192H32c-17.7 0-32 14.3-32 32v192c0 53 43 96 96 96h192c53 0 96-43 96-96h16c61.8 0 112-50.2 112-112s-50.2-112-112-112zm0 160h-16v-96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48z"/>
        </svg>
        Buy ( {{ manaPotion }} )
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