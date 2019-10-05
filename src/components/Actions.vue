<template>
<div class="flex flex-wrap justify-center mt-12 items-center">
    <template v-if="!started">
        <button class="p-4 m-2 bg-red-600 text-white rounded" @click="startGame()">Start Battle</button>
    </template>
    <template v-else>
        <div class="flex flex-wrap w-full justify-center content-start">

            <div class="m-4 sm:w-full md:w-1/3 border-yellow-400 p-3 border-solid border-2">
                <p class="text-2xl text-center text-yellow-400 mb-3">Spells / Abilities : </p>
                <div class="flex flex-wrap justify-center">
                    <button class="p-4 m-2 w-40 rounded text-white bg-red-500" @click="attack()">Attack</button>
                    <button class="p-4 m-2 w-40 rounded text-white bg-orange-500" @click="specialAttack()">Special Attack</button>
                    <button class="p-4 m-2 w-40 rounded text-white bg-blue-500" @click="heal()">Heal</button>
                    <button class="p-4 m-2 w-40 rounded text-black bg-gray-500" @click="giveUp()">Run Away</button>
                </div>
            </div>

        </div>
    </template>
</div>
</template>

<script>
    export default {
        computed:{
            started() { return this.$store.state.started; },
            currentTurn() { return this.$store.state.currentTurn; },
            playerHealth() { return this.$store.state.playerHealth; },
            aiHealth() { return this.$store.state.aiHealth },
            playerMana() { return this.$store.state.playerMana; },
            potionCount() { return this.$store.state.potionCount; },
            manaPotion() { return this.$store.state.manaPotion; },
            turns() { return this.$store.state.turns; },
        },
        methods:{
            startGame() {
                this.$store.state.playerHealth = 100;
                this.$store.state.aiHealth = 100;
                this.$store.state.playerMana = 100;
                this.$store.state.started = true;
                this.$store.state.turns = [];
                this.$store.state.currentTurn = 0;
                this.$store.state.totalDamage = 0;
            },
            doDamage(min, max) {
                return Math.max(Math.floor(Math.random() * max), min);
            },
            aiAttacks() {
                var damage = this.doDamage(0, 7);
                this.$store.state.playerHealth -= damage;
                if (damage > 0) {
                    this.$store.state.turns.unshift({
                    isPlayer: false,
                    text:
                        "Turn " +
                        this.$store.state.currentTurn +
                        ": AI " +
                        this.attackName() +
                        " you for " +
                        damage
                    });
                } else {
                    this.$store.state.turns.unshift({
                        isPlayer: false,
                        text: "Turn " + this.$store.state.currentTurn + ": AI missed!"
                    });
                }
                this.checkWin();
            },
            attack() {
                this.$store.state.currentTurn += 1;
                this.$store.state.usedSpecial = false;
                this.$store.state.usedHeal = false;
                var damage = this.doDamage(0, 5);
                this.$store.state.aiHealth -= damage;
                this.$store.state.totalDamage += damage;
                if (damage > 0) {
                    this.$store.state.turns.unshift({
                    isPlayer: true,
                    text: "Turn " + this.$store.state.currentTurn + ": You hit the AI for " + damage
                    });
                } else {
                    this.$store.state.turns.unshift({
                    isPlayer: true,
                    text: "Turn " + this.$store.state.currentTurn + ": You missed!"
                    });
                }
                if (this.checkWin()) {
                    return;
                }
                    this.aiAttacks();
            },
            attackName() {
                const attackNames = ["scratches", "bites", "claws"];
                const randomNum = Math.floor(Math.random() * attackNames.length);
                return attackNames[randomNum];
            },
            specialAttack() {
                if (this.$store.state.playerMana >= 20) {
                    this.$store.state.currentTurn += 1;
                    this.$store.state.playerMana -= 20;
                    var damage = this.doDamage(5, 10);
                    this.$store.state.aiHealth -= damage;
                    this.$store.state.totalDamage += damage;
                    this.$store.state.turns.unshift({
                        isPlayer: true,
                        text: "Turn " + this.$store.state.currentTurn +
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
            heal() {
                if (this.$store.state.playerMana >= 10) {
                    this.$store.state.currentTurn += 1;
                    this.$store.state.playerMana -= 10;
                    var heals = this.doDamage(4, 10);
                    if (this.$store.state.playerHealth <= 90) {
                        this.$store.state.playerHealth += heals;
                    } else {
                        this.$store.state.playerHealth = 100;
                    }
                    this.$store.state.turns.unshift({
                        isPlayer: true,
                        text: "Turn " + this.$store.state.currentTurn + ": You heal for "   + heals + "."
                    });
                    this.aiAttacks();
                } else {
                    this.$store.state.turns.unshift({
                        isPlayer: true,
                        text: "You dont have enough mana to heal!"
                    });
                }
            },
            giveUp() {
                if (confirm("You Give UP. New Game?")) {
                    this.$store.state.started = false;
                    this.deathPenality();
                    this.$store.state.totalDamage = 0;
                } else {
                    this.$store.state.started = true;
                }
            },
            rewardGold() {
                this.$store.state.gold += this.$store.state.totalDamage * 2.5;
            },
            deathPenality() {
                let percent = 0.25 * this.$store.state.gold;
                this.$store.state.gold -= Math.floor(percent);
            },
            checkWin() {
                if (this.$store.state.aiHealth <= 0) {
                    if (confirm("You Won! New Game?")) {
                        this.rewardGold();
                        this.startGame();
                    } else {
                        this.rewardGold();
                        this.$store.state.started = false;
                    }
                    return true;
                } else if (this.$store.state.playerHealth <= 0) {
                    this.deathPenality();
                    if (confirm("You lost. New Game?")) {
                        this.rewardGold();
                        this.startGame();
                    } else {
                        this.rewardGold();
                        this.$store.state.started = false;
                    }
                    return true;
                }
                return false;
            }
        }
    }
</script>