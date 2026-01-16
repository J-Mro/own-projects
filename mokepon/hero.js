class Trainer {
  constructor(name, maxHP = 50) {
    this.name = name;
    this.maxHP = maxHP;
    this.hp = maxHP;
  }
  challenge(hp) {
    if (this.hp - hp <= 0) {
      this.hp = 0;
    } else {
      this.hp -= hp;
    }
  }
  gainHP(hp) {
    if (this.hp + hp >= this.maxHP) {
      this.hp = this.maxHP;
    } else {
      this.hp += hp;
    }
  }
  hasFainted() {
    return this.hp === 0;
  }
}

class Encounter {
  constructor(description, damage) {
    this.description = description;
    this.damage = damage;
  }
  resolve(trainer) {
    trainer.challenge(this.damage);
    return `${trainer.name} encounters: ${this.description}`;
  }
}

module.exports = { Trainer, Encounter };
