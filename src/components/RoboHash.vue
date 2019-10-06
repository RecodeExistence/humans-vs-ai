<template>
  <div>
    <h1>{{this.roboIndex}}</h1>
    <img :src="randomRobo()" />
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