import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    started: false,
    modalOpen: false,
    modalText: "Modal Text",
    loginModal: false,
    currentTurn: 0,
    playerHealth: 100,
    aiHealth: 100,
    playerMana: 100,
    gold: 300,
    potionCount: 0,
    manaPotion: 0,
    aiDamage: 0,
    playerDamage: 0,
    totalAiDamage: 0,
    critChance: 15,
    turns: [],
    potionCost: 50,
    currency: "dollars",
    usingPotion: false,
  },
  mutations: {},
  actions: {},
  aiAttacks() {
    var crit = Math.floor(Math.random() * 100) < 10; // AI crit chance 10 out of 100
    var damage = crit ? this.doDamage(7, 14) : this.doDamage(0, 7);
    if (this.$store.state.usingPotion === "false") {
      console.log("no potion used, normal damage.");
      this.$store.state.playerHealth -= damage;
      this.$store.state.playerDamage = damage;
      this.$store.state.totalAiDamage += damage;
    } else {
      console.log(
        `Using potion no damage. (Store usingPotionVariable: ${$store.state.usingPotion})`,
      );
      damage = 0;
    }

    if (damage > 0) {
      this.$store.state.turns.unshift({
        isPlayer: false,
        text: "Turn " +
          this.$store.state.currentTurn +
          ": AI " +
          this.attackName() +
          " you for " +
          damage +
          (crit ? " critical hit." : " normal hit."),
      });
      this.$store.state.usingPotion = false;
    } else {
      this.$store.state.turns.unshift({
        isPlayer: false,
        text: "Turn " + this.$store.state.currentTurn + ": AI missed!",
      });
    }
    this.checkWin();
  },
});
