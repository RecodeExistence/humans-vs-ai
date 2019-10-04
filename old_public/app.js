new Vue({
  el: "#app",

  methods: {
    startGame: function () {
      this.playerHealth = 100;
      this.aiHealth = 100;
      this.playerMana = 100;
      this.started = true;
      this.turns = [];
      this.currentTurn = 0;
      this.totalDamage = 0;
    },
    showBackPack: function() {
      if(this.potionCount || this.manaPotion > 0) {
        if(this.started){
          return true;
        }
      }
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
            "Turn " +
            this.currentTurn +
            ": You hit the AI with your special attack for " +
            damage
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

    //turn into store later?
    buyPotion: function () {
      if (this.gold <= 49) {
        return;
      } else {
        this.potionCount += 1;
        this.gold -= 50;
      }
    },
    rewardGold: function () {
      this.gold += this.totalDamage;
    },
    deathPenality: function () {
      let percent = 0.25 * this.gold;

      this.gold -= Math.floor(percent);
    },

    buyManaPotion: function () {
      if (this.gold <= 49) {
        return;
      } else {
        this.manaPotion += 1;
        this.gold -= 50;
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

    rewardGold: function () {
      this.gold += this.totalDamage;
    },
    deathPenality: function () {
      let percent = 0.25 * this.gold;

      this.gold -= Math.floor(percent);
    },

    doDamage: function (min, max) {
      return Math.max(Math.floor(Math.random() * max), min);
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
});