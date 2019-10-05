<template>
    <div class="flex flex-wrap justify-center">
      <p class="text-yellow-400 mx-2 text-2xl text-center mt-12"> Gold :  {{ gold }}</p>
      <p class="text-red-400 mx-2 text-2xl text-center mt-12"> Damage :  {{ damage }}</p>
    </div>
</template>

<script>
    export default {
        computed: {
            gold(){
                return this.$store.state.gold;
            },
            damage() {
                return this.$store.state.totalDamage;
            }
        }
    }
</script>