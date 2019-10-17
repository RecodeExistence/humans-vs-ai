<template>
  <div>
    <template v-if="modalOpen">
      <div class="fixed bg-black opacity-75 right-0 left-0 top-0 bottom-0 z-10"></div>
      <div class="absolute inset-0 flex justify-center items-center z-20">
        <div class="fixed bg-blue-900 border-white text-white rounded-lg w-5/6 py-8 h-48 shadow">
          <p class="text-center">{{ modalText }}</p>
          <div class="flex block mt-8 items-center justify-center">
            <button
              class="p-4 m-2 w-40 rounded text-white bg-red-500 focus:outline-none"
              @click="closeModal"
            >Go back to base</button>
          </div>
        </div>
      </div>
    </template>

    <div v-if="!started">
      <button class="p-4 m-2 bg-red-600 text-white rounded" @click="startGame()">Start Battle</button>
    </div>

    <div
      v-else
      class="m-2 p-4 w-full max-w-lg justify-center border-yellow-400 border-solid border-2 rounded"
    >
      <p class="text-2xl text-center text-yellow-400 mb-3">Abilities :</p>

      <div class="flex flex-wrap justify-center">
        <button
          class="p-4 m-2 w-40 rounded text-white bg-red-500 focus:outline-none"
          @click="attack()"
        >Attack</button>

        <button
          class="p-4 m-2 w-40 rounded text-white bg-orange-500 focus:outline-none"
          @click="specialAttack()"
        >Special Attack</button>

        <button
          class="p-4 m-2 w-40 rounded text-white bg-blue-500 focus:outline-none"
          @click="heal()"
        >Heal</button>

        <button
          class="p-4 m-2 w-40 rounded text-black bg-gray-500 focus:outline-none"
          @click="giveUp()"
        >Run Away</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalText: ""
    };
  },
  computed: {
    started() {
      return this.$store.state.started;
    },
    currentTurn() {
      return this.$store.state.currentTurn;
    },
    playerHealth() {
      return this.$store.state.playerHealth;
    },
    aiHealth() {
      return this.$store.state.aiHealth;
    },
    playerMana() {
      return this.$store.state.playerMana;
    },
    potionCount() {
      return this.$store.state.potionCount;
    },
    manaPotion() {
      return this.$store.state.manaPotion;
    },
    turns() {
      return this.$store.state.turns;
    },
    modalOpen() {
      return this.$store.state.modalOpen;
    },
    playerDamage() {
      return this.$store.state.playerDamage;
    }
  },
  methods: {
    startGame() {
      this.$store.state.playerHealth = 100;
      this.$store.state.aiHealth = 100;
      this.$store.state.playerMana = 100;
      this.$store.state.started = true;
      this.$store.state.turns = [];
      this.$store.state.critChance = 15;
      this.modalText = "";
      this.$store.state.currentTurn = 0;
      this.$store.state.totalDamage = 0;
      this.$store.state.playerDamage = 0;
    },
    closeModal() {
      this.$store.state.modalOpen = !this.$store.state.modalOpen;
    },
    doDamage(min, max) {
      return Math.max(Math.floor(Math.random() * max), min);
    },
    aiAttacks() {
      var crit = Math.floor(Math.random() * 100) < 10; // AI crit chance 10 out of 100
      var damage = crit ? this.doDamage(7, 14) : this.doDamage(0, 7);
      this.$store.state.playerHealth -= damage;
      this.$store.state.playerDamage = damage;
      if (damage > 0) {
        this.$store.state.turns.unshift({
          isPlayer: false,
          text:
            "Turn " +
            this.$store.state.currentTurn +
            ": AI " +
            this.attackName() +
            " you for " +
            damage +
            (crit ? " critical hit." : " normal hit.")
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
      var crit = Math.floor(Math.random() * 100) < this.$store.state.critChance;
      this.$store.state.currentTurn += 1;
      this.$store.state.usedSpecial = false;
      this.$store.state.usedHeal = false;
      var damage = crit ? this.doDamage(5, 10) : this.doDamage(0, 5);
      this.$store.state.aiHealth -= damage;
      this.$store.state.totalDamage += damage;
      if (damage > 0) {
        this.$store.state.turns.unshift({
          isPlayer: true,
          text:
            "Turn " +
            this.$store.state.currentTurn +
            ": You hit the AI for " +
            damage +
            (crit ? " critical hit." : " normal hit.")
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
        var crit =
          Math.floor(Math.random() * 100) < this.$store.state.critChance;
        this.$store.state.currentTurn += 1;
        this.$store.state.playerMana -= 20;
        var damage = crit ? this.doDamage(10, 20) : this.doDamage(5, 10);
        this.$store.state.aiHealth -= damage;
        this.$store.state.totalDamage += damage;
        this.$store.state.playerDamage = damage;
        this.$store.state.turns.unshift({
          isPlayer: true,
          text:
            "Turn " +
            this.$store.state.currentTurn +
            ": You hit the AI with your special attack for " +
            damage +
            (crit ? " critical hit" : " normal hit")
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
          text:
            "Turn " +
            this.$store.state.currentTurn +
            ": You heal for " +
            heals +
            "."
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
        this.modalText = "You Won!";
        this.setWin();
      } else if (this.$store.state.playerHealth <= 0) {
        this.modalText = "You Lost...";
        this.setWin();
        this.deathPenality();
      }
      return false;
    },
    setWin() {
      this.$store.state.modalOpen = true;
      this.$store.state.started = false;
      this.rewardGold();
      return true;
    }
  }
};
</script>