<template>
<div>
    <div class="flex flex-wrap justify-center mt-4">
        <div class="w-96 mt-2 mb-4 mx-4 block">
            <img class="m-auto h-48 border-gray-700 border-2 rounded-full bg-blue-800 block" src="/assets/humans.png">
            <p class="text-2xl text-center">
                Human :
            </p>
            <div class="w-full border-blue-400 border-solid border-2 rounded">
                <div class="text-center text-white py-3 bg-blue-400 " 
                    :style="{ width:playerHealth + '%' }">
                    {{ playerHealth }}
                </div>
            </div>
        </div>
        <div class="w-96 mx-4 block">
            <RoboHash></RoboHash>
        </div>
    </div>
    <div class="flex flex-wrap justify-center mt-4">
        <div class="w-96 justify-center mx-4 block">
            <p class="text-2xl mb-1 text-center">
                Energy :
            </p>
            <div class="border-green-500 border-solid border-2 rounded">
                <div class="text-center text-white py-3 bg-green-500" 
                    :style="{ width: playerMana + '%' }">
                    {{ playerMana }}
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import RoboHash from './RoboHash'

    export default {
        computed: {
            playerHealth() {
                return this.$store.state.playerHealth;
            },
            playerMana(){
                return this.$store.state.playerMana;
            }
        },
        components: {
            RoboHash
        }
    }
</script>