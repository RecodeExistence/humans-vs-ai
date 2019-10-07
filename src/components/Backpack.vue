<template>

    <div class="m-2 max-w-lg w-full border-yellow-400 p-4 border-solid border-2" v-if="showBackPack()">
        <p class="text-2xl text-center text-yellow-400 mb-3">Backpack :</p>
        <div class="flex flex-wrap justify-center">
            <button class="p-4 m-2 w-40 rounded text-white bg-blue-500 focus:outline-none"  
                v-if="potionCount > 0" 
                @click="usePotion()">
                <svg class="w-6 h-6 m-auto block" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="medkit"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M96 480h320V128h-32V80c0-26.51-21.49-48-48-48H176c-26.51 0-48 21.49-48 48v48H96v352zm96-384h128v32H192V96zm320 80v256c0 26.51-21.49 48-48 48h-16V128h16c26.51 0 48 21.49 48 48zM64 480H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v352zm288-208v32c0 8.837-7.163 16-16 16h-48v48c0 8.837-7.163 16-16 16h-32c-8.837 0-16-7.163-16-16v-48h-48c-8.837 0-16-7.163-16-16v-32c0-8.837 7.163-16 16-16h48v-48c0-8.837 7.163-16 16-16h32c8.837 0 16 7.163 16 16v48h48c8.837 0 16 7.163 16 16z"></path>
                </svg>
                ( {{ potionCount }} )
            </button>
            <button class="p-4 m-2 w-40 rounded text-white bg-green-500 focus:outline-none" 
                v-if="manaPotion > 0" 
                @click="useManaPotion()"> 
                <svg class="w-6 h-6 m-auto block" aria-hidden="true" data-prefix="fas" data-icon="mug-hot" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M127.1 146.5c1.3 7.7 8 13.5 16 13.5h16.5c9.8 0 17.6-8.5 16.3-18-3.8-28.2-16.4-54.2-36.6-74.7-14.4-14.7-23.6-33.3-26.4-53.5C111.8 5.9 105 0 96.8 0H80.4C70.6 0 63 8.5 64.1 18c3.9 31.9 18 61.3 40.6 84.4 12 12.2 19.7 27.5 22.4 44.1zm112 0c1.3 7.7 8 13.5 16 13.5h16.5c9.8 0 17.6-8.5 16.3-18-3.8-28.2-16.4-54.2-36.6-74.7-14.4-14.7-23.6-33.3-26.4-53.5C223.8 5.9 217 0 208.8 0h-16.4c-9.8 0-17.5 8.5-16.3 18 3.9 31.9 18 61.3 40.6 84.4 12 12.2 19.7 27.5 22.4 44.1zM400 192H32c-17.7 0-32 14.3-32 32v192c0 53 43 96 96 96h192c53 0 96-43 96-96h16c61.8 0 112-50.2 112-112s-50.2-112-112-112zm0 160h-16v-96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48z"/>
                </svg>
                ( {{ manaPotion }} )
            </button>
        </div>
        <p class="text-center mt-12 text-yellow-400">
            {{ currency }} : {{ gold }}
        </p>
    </div>

</template>
    
<script>
    export default {
        computed:{
            potionCount() {
                return this.$store.state.potionCount;
            },
            manaPotion() {
                return this.$store.state.manaPotion;
            },
            gold(){
                return this.$store.state.gold;
            },
            currency(){
                return this.$store.state.currency;
            }
        },
        methods: {
            showBackPack() {
                if(this.$store.state.potionCount || this.$store.state.manaPotion > 0) {
                    if(this.$store.state.started){
                        return true;
                    }
                }
            },
            usePotion() {
                if (this.$store.state.potionCount > 0) {
                    if (this.$store.state.playerHealth <= 90) {
                        this.$store.state.potionCount -= 1;
                        this.$store.state.playerHealth += 10;
                        this.$store.state.currentTurn += 1;
                        this.aiAttacks();
                        this.$store.state.turns.unshift({
                            isPlayer: true,
                            text: "Turn " + this.$store.state.currentTurn + ": You used a potion."
                        });
                    } else {
                        alert("You have too much health.");
                    }
                } else {
                    alert("You don't have any potions");
                }
            },
            useManaPotion() {
                if (this.$store.state.manaPotion > 0) {
                    if (this.$store.state.playerMana <= 90) {
                        this.$store.state.manaPotion -= 1;
                        this.$store.state.playerMana += 30;
                        this.$store.state.currentTurn += 1;
                        this.aiAttacks();
                        this.$store.state.turns.unshift({
                            isPlayer: true,
                            text: "Turn " + this.$store.state.currentTurn + ": You used a mana potion."
                    });
                    } else {
                    alert("You have too much mana to use a mana potion.");
                    }
                } else {
                    alert("You don't have any mana potions");
                }
            },
        }
    }
</script>