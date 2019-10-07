<template>
<div>
    <div class="flex flex-wrap justify-center mt-4">
        <div class="w-1/3 mt-2 max-w-sm mb-4 mx-4 block">
            <img class="m-auto w-1/2 max-w-xl border-gray-700 border-2 rounded-full bg-blue-800 block" src="/assets/humans.png">
            <p class="text-2xl mb-2 text-center">
                Human :
            </p>
            <div class="w-full border-blue-400 border-solid border-2 rounded">
                <div class="text-center text-white py-3 bg-blue-400 " 
                    :style="{ width:playerHealth + '%' }">
                    {{ playerHealth }}
                </div>
            </div>
        </div>
        <div class="w-1/3 max-w-sm mt-2 mb-4 mx-4 block">
            <img class="m-auto w-1/2  border-gray-700 border-2 rounded-full bg-red-800 block" :src="randomRobo()"/>
            <p class="text-2xl mb-2 text-center">
                AI : {{this.roboIndex}}
            </p>
            <div class="border-red-400 border-solid border-2 w-full rounded">
                <div class="text-center text-white py-3 bg-red-400" 
                    :style="{ width: aiHealth + '%' }">
                    {{ aiHealth }}
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-wrap justify-center mt-4">
        <div class="w-1/3 mt-2 mb-4 mx-4 block">
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
        computed: {
            playerHealth() {
                return this.$store.state.playerHealth;
            },
            playerMana(){
                return this.$store.state.playerMana;
            },
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
    }
</script>