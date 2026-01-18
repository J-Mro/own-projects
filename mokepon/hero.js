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
  isBroken() {
    return this.courage === 0;
  }
}

class Encounter {
  constructor(description, challengeLevel) {
    this.description = description;
    this.challengeLevel = challengeLevel;
  }
  resolve(hero) {
    hero.test(this.challengeLevel);
    return `${hero.name} encounters: ${this.description}`;
  }
}

class Quest {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.encounters = [];
  }
  addEncounter(encounter) {
    this.encounters.push(encounter);
  }
  describe() {
    const descriptions = [];
    for (const encounter of this.encounters) {
      descriptions.push(encounter.description);
    }
    return descriptions;
  }
}

class ExplorationEncounter extends Encounter {
  constructor(description, challengeLevel) {
    super(description, challengeLevel);
  }
  resolve(hero) {
    hero.test(this.challengeLevel);
    return `${hero.name} explores: ${this.description}`;
  }
}

class TreasureEncounter extends Encounter {
  constructor(description) {
    super(description);
    this.challengeLevel = 0;
  }
  resolve(hero, courageGained = 3) {
    hero.gainCourage(courageGained);
    return `${hero.name} discovers: ${this.description} and feels braver!`;
  }
}

class CombatEncounter extends Encounter {
  constructor(description, challengeLevel) {
    super(description, challengeLevel);
  }
  resolve(hero) {
    hero.test(this.challengeLevel);
    return `${hero.name} battles: ${this.description}`;
  }
}

module.exports = {
  Hero,
  Encounter,
  Quest,
  ExplorationEncounter,
  TreasureEncounter,
  CombatEncounter,
};
