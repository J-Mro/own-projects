class Hero {
  constructor(name, maxCourage = 50) {
    this.name = name;
    this.maxCourage = maxCourage;
    this.courage = maxCourage;
  }
  test(courage) {
    if (this.courage - courage <= 0) {
      this.courage = 0;
    } else {
      this.courage -= courage;
    }
  }
  gainCourage(courage) {
    if (this.courage + courage >= this.maxCourage) {
      this.courage = this.maxCourage;
    } else {
      this.courage += courage;
    }
  }
  hasFainted() {
    return this.courage === 0;
  }
}

class Encounter {
  constructor(description, damage) {
    this.description = description;
    this.damage = damage;
  }
  resolve(hero) {
    hero.test(this.damage);
    return `${hero.name} encounters: ${this.description}`;
  }
}

class Quest {}

module.exports = { Hero, Encounter, Quest };
