<template>
<div>
    <div class="flex flex-wrap justify-center mt-4">
        <div class="w-96 mx-4 block">
            <p class="text-2xl text-center">Human :</p>
            <div class="w-full border-blue-400 border-solid border-2 rounded">
                <div class="text-center text-white py-3 bg-blue-400 " :style="{ width:playerHealth + '%' }">{{ playerHealth }}</div>
            </div>
        </div>
        <div class="w-96 mx-4 block">
            <p class="text-2xl text-center">AI :</p>
            <div class="border-red-400 border-solid border-2 rounded">
                <div class="text-center text-white py-3 bg-red-400" :style="{ width: aiHealth + '%' }">{{ aiHealth }}</div>
            </div>
        </div>
    </div>
    <div class="flex flex-wrap justify-center mt-4">
        <div class="w-96 justify-center mx-4 block">
            <p class="text-2xl text-center">Mana :</p>
            <div class="border-green-400 border-solid border-2 rounded">
                <div class="text-center text-white py-3 bg-green-400" :style="{ width: playerMana + '%' }">{{ playerMana }}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        computed: {
            playerHealth() {
                return this.$store.state.playerHealth;
            },
            aiHealth(){
                return this.$store.state.aiHealth;
            },
            playerMana(){
                return this.$store.state.playerMana;
            }
        }
    }
</script>