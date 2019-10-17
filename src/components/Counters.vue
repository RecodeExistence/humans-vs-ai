<template>
  <div class="flex flex-wrap justify-center">
    <p class="text-yellow-400 mx-2 text-2xl text-center mt-12" v-if="!started">
      {{ currency }} :
      {{ gold }}
    </p>
    <p class="text-red-400 mx-2 text-2xl text-center mt-12" v-if="started">
      Human Damage :
      {{ damage }}
    </p>
    <p class="text-red-400 mx-2 text-2xl text-center mt-12" v-if="started">
      AI Damage :
      {{ damage }}
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    started() {
      return this.$store.state.started;
    },
    gold() {
      return this.$store.state.gold;
    },
    damage() {
      return this.$store.state.totalDamage;
    },
    currency() {
      return this.$store.state.currency;
    }
  }
};
</script>