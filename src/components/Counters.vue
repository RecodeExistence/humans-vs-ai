<template>
  <div class="flex flex-wrap justify-center">
    <p class="text-yellow-400 mx-2 text-2xl text-center mt-12" v-if="!started">
      {{ currency }} :
      {{ gold }}
    </p>
    <p class="text-red-400 mx-10 text-2xl text-center mt-12" v-if="started">
      Human Attack Damage :
      {{ playerDamage }}
    </p>
    <p class="text-red-400 mx-10 text-2xl text-center mt-12" v-if="started">
      AI Attack Damage :
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
      return this.$store.state.aiDamage;
    },
    currency() {
      return this.$store.state.currency;
    },
    playerDamage() {
      return this.$store.state.playerDamage;
    }
  }
};
</script>