<template>
    <div class="m-4 sm:w-full md:w-1/3 border-yellow-400 p-3 border-solid border-2" v-if="showBackPack()">
        <p class="text-2xl text-center text-yellow-400 mb-3">Backpack :</p>
        <div class="flex flex-wrap justify-center">

            <button class="p-4 m-2 w-40 rounded text-white bg-green-500" v-if="potionCount > 0" @click="usePotion()">
                Health Potion <br>( {{ potionCount }} )
            </button>

            <button class="p-4 m-2 w-40 rounded text-white bg-blue-500" v-if="manaPotion > 0" @click="useManaPotion()"> 
                Mana Potion <br>( {{ manaPotion }} )
            </button>
            
        </div>
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