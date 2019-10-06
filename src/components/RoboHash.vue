<template>
  <div v-if="started">

    <img class="m-auto h-48 border-gray-700 border-2 rounded-full bg-red-800 block" :src="randomRobo()"/>
    <p class="text-2xl mb-2 text-center">
        AI : {{this.roboIndex}}
    </p>
    <div class="border-red-400 border-solid border-2 ai rounded">
        <div class="text-center text-white py-3 bg-red-400" 
            :style="{ width: aiHealth + '%' }">
            {{ aiHealth }}
        </div>
    </div>
  </div>
</template>

<script>
const roboHashnames = [
  "Bruggy",
  "Buggy",
  "Semicolon",
  "Pi",
  "Wrecker",
  "Null",
  "Scraps",
  "Scrappy",
  "Beta",
  "Overload",
  "Internal Error",
  "Err",
  "Spikes",
  "Prototype",
  "Virtual Villian",
  "Lambada"
];

export default {
  data() {
    return {
      roboIndex: this.randomizer(roboHashnames)
    };
  },
  computed:{
    started(){
      return this.$store.state.started;
    },
    aiHealth(){
      return this.$store.state.aiHealth;
    }
  },
  methods: {
    randomRobo: function() {
      return `https://robohash.org/${this.roboIndex}?50x50`;
    },
    randomizer: function(arr) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    }
  }
};
</script>