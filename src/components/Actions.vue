<template>
<div class="flex flex-wrap justify-center mt-12 items-center">
    <template v-if="!started">
        <button class="p-4 m-2 bg-red-600 text-white rounded" @click="startGame()">Start New Game</button>
    </template>
    <template v-else>
        <div class="flex flex-wrap w-full justify-center content-start">
            <!-- Spells Abilities here-->
            <div class="m-4 sm:w-full md:w-1/3 border-yellow-400 p-3 border-solid border-2">
                <p class="text-2xl text-center text-yellow-400 mb-3">Spells / Abilities : </p>
                <div class="flex flex-wrap justify-center">
                    <button class="p-4 m-2 w-40 rounded text-white bg-red-500" @click="attack()">Attack</button>
                    <button class="p-4 m-2 w-40 rounded text-white bg-orange-500" @click="specialAttack()">Special Attack</button>
                    <button class="p-4 m-2 w-40 rounded text-white bg-blue-500" @click="heal()">Heal</button>
                    <button class="p-4 m-2 w-40 rounded text-black bg-gray-500" @click="giveUp()">Run Away</button>
                </div>
            </div>
            <!-- Backpack here -- refactor this into its own prop -->
            <div class="m-4 sm:w-full md:w-1/3 border-yellow-400 p-3 border-solid border-2" v-if="showBackPack()">
                <p class="text-2xl text-center text-yellow-400 mb-3">Backpack :</p>
                <div class="flex flex-wrap justify-center">
                    <button class="p-4 m-2 w-40 rounded text-white bg-green-500" v-if="potionCount > 0" @click="usePotion()">Health Potion <br>( {{ potionCount }} )</button>
                    <button class="p-4 m-2 w-40 rounded text-white bg-blue-500" v-if="manaPotion > 0" @click="useManaPotion()">Mana Potion <br>( {{ manaPotion }} )</button>
                </div>
            </div>
        </div>
    </template>
</div>
</template>

<script>
    export default {
        props:[
            'started',
            'currentTurn',
            'playerHealth',
            'aiHealth',
            'playerMana',
            'potionCount',
            'manaPotion',
            'totalDamage',
            'turns'
        ],
        methods:{
            startGame: function () {
                this.playerHealth = 100;
                this.aiHealth = 100;
                this.playerMana = 100;
                this.started = true;
                this.turns = [];
                this.currentTurn = 0;
                this.totalDamage = 0;
            },
            doDamage: function (min, max) {
                return Math.max(Math.floor(Math.random() * max), min);
            },
            aiAttacks: function () {
                var damage = this.doDamage(0, 7);
                this.playerHealth -= damage;
                if (damage > 0) {
                    this.turns.unshift({
                    isPlayer: false,
                    text:
                        "Turn " +
                        this.currentTurn +
                        ": AI " +
                        this.attackName() +
                        " you for " +
                        damage
                    });
                } else {
                    this.turns.unshift({
                    isPlayer: false,
                    text: "Turn " + this.currentTurn + ": AI missed!"
                    });
                }
                this.checkWin();
            },
            attack: function () {
                this.currentTurn += 1;
                this.usedSpecial = false;
                this.usedHeal = false;
                var damage = this.doDamage(0, 5);
                this.aiHealth -= damage;
                this.totalDamage += damage;
                if (damage > 0) {
                    this.turns.unshift({
                    isPlayer: true,
                    text: "Turn " + this.currentTurn + ": You hit the AI for " + damage
                    });
                } else {
                    this.turns.unshift({
                    isPlayer: true,
                    text: "Turn " + this.currentTurn + ": You missed!"
                    });
                }
                if (this.checkWin()) {
                    return;
                }
                    this.aiAttacks();
            },
            attackName: function () {
                const attackNames = ["scratches", "bites", "claws"];
                const randomNum = Math.floor(Math.random() * attackNames.length);
                return attackNames[randomNum];
            },
            specialAttack: function () {
                if (this.playerMana >= 20) {
                    this.currentTurn += 1;
                    this.playerMana = this.playerMana - 20;
                    var damage = this.doDamage(5, 10);
                    this.aiHealth -= damage;
                    this.totalDamage += damage;
                    this.turns.unshift({
                    isPlayer: true,
                    text:
                        "Turn " + this.currentTurn +
                        ": You hit the AI with your special attack for " + damage
                    });
                    this.aiAttacks();
                } else {
                    this.turns.unshift({
                    isPlayer: true,
                    text: "You don't have enough mana for that attack."
                    });
                }
                if (this.checkWin()) {
                    return;
                }
            },
            heal: function () {
                if (this.playerMana >= 10) {
                    this.currentTurn += 1;
                    this.playerMana = this.playerMana - 10;
                    var heals = this.doDamage(4, 10);
                    if (this.playerHealth <= 90) {
                    this.playerHealth += heals;
                    } else {
                    this.playerHealth = 100;
                    }
                    this.turns.unshift({
                    isPlayer: true,
                    text:
                        "Turn " +
                        this.currentTurn +
                        ": You heal for " +
                        heals + "."
                    });
                    this.aiAttacks();
                } else {
                    this.turns.unshift({
                    isPlayer: true,
                    text: "You dont have enough mana to heal!"
                    });
                }
            },
            showBackPack: function() {
                if(this.potionCount || this.manaPotion > 0) {
                    if(this.started){
                        return true;
                    }
                }
            },
            usePotion: function () {
                if (this.potionCount > 0) {
                    if (this.playerHealth <= 90) {
                    this.potionCount = this.potionCount - 1;
                    this.playerHealth = this.playerHealth + 10;
                    this.aiAttacks();
                    this.turns.unshift({
                        isPlayer: true,
                        text: "Turn " + this.currentTurn + ": You used a potion."
                    });
                    } else {
                    alert("You have too much health.");
                    }
                } else {
                    alert("You don't have any potions");
                }
            },
            useManaPotion: function () {
                if (this.manaPotion > 0) {
                    if (this.playerMana <= 90) {
                    this.manaPotion = this.manaPotion - 1;
                    this.playerMana = this.playerMana + 30;
                    this.aiAttacks();
                    this.turns.unshift({
                        isPlayer: true,
                        text: "Turn " + this.currentTurn + ": You used a mana potion."
                    });
                    } else {
                    alert("You have too much mana to use a mana potion.");
                    }
                } else {
                    alert("You don't have any mana potions");
                }
            },
            giveUp: function () {
                if (confirm("You Give UP. New Game?")) {
                    this.started = false;
                    this.deathPenality();
                    this.totalDamage = 0;
                } else {
                    this.started = true;
                }
            },
            checkWin: function () {
                if (this.aiHealth <= 0) {
                    if (confirm("You Won! New Game?")) {
                    this.rewardGold();
                    this.startGame();
                    } else {
                    this.rewardGold();
                    this.started = false;
                    }
                    return true;
                } else if (this.playerHealth <= 0) {
                    this.deathPenality();
                    if (confirm("You lost. New Game?")) {
                    this.rewardGold();
                    this.startGame();
                    } else {
                    this.rewardGold();
                    this.started = false;
                    }
                    return true;
                }
                return false;
            }
        }
    }
</script>