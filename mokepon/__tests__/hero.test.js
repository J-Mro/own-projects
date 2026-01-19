const {
  Hero,
  Encounter,
  Quest,
  ExplorationEncounter,
  TreasureEncounter,
  CombatEncounter,
} = require("../hero.js");

describe("Hero class", () => {
  test("has a name property", () => {
    const hero = new Hero();
    expect(hero).toHaveProperty("name");
  });
  test("has a maxCourage property", () => {
    const hero = new Hero();
    expect(hero).toHaveProperty("maxCourage");
  });
  test("maxCourage has a default value of 50", () => {
    const hero = new Hero();
    expect(hero.maxCourage).toBe(50);
  });
  test("has an courage property", () => {
    const hero = new Hero();
    expect(hero).toHaveProperty("courage");
  });
  test("courage property is set to the value of the maxCourage", () => {
    const hero = new Hero();
    expect(hero.courage).toBe(50);
  });
  describe("Methods: test", () => {
    test("has a test method", () => {
      const hero = new Hero();
      expect(hero).toHaveProperty("test");
    });
    test("does not change the value of Hero's courage when passed an courage value of 0", () => {
      const hero = new Hero();
      hero.test(0);
      expect(hero.courage).toBe(50);
    });
    test("decreases the value of Hero's courage when passed a non-zero value", () => {
      const hero = new Hero();
      hero.test(10);
      expect(hero.courage).toBe(40);
    });
    test("does not decrease the Hero's courage past 0", () => {
      const hero = new Hero();
      hero.test(60);
      expect(hero.courage).toBe(0);
    });
  });
  describe("Methods: gainCourage", () => {
    test("has a gainCourage method", () => {
      const hero = new Hero();
      expect(hero).toHaveProperty("gainCourage");
    });
    test("does not change Hero courage value when passed a value of 0", () => {
      const hero = new Hero();
      hero.gainCourage(0);
      expect(hero.courage).toBe(50);
    });
    test("increases Hero courage value when passed a non-zero value", () => {
      const hero = new Hero();
      hero.courage = 20;
      hero.gainCourage(10);
      expect(hero.courage).toBe(30);
    });
    test("does not increase Hero courage value above max value", () => {
      const hero = new Hero();
      hero.gainCourage(10);
      expect(hero.courage).toBe(50);
    });
  });
  describe("Methods: isBroken", () => {
    test("has a isBroken method", () => {
      const hero = new Hero();
      expect(hero).toHaveProperty("isBroken");
    });
    test("returns a boolean", () => {
      const hero = new Hero();
      expect(typeof hero.isBroken()).toBe("boolean");
    });
    test("returns true if Hero has an courage value of 0", () => {
      const hero = new Hero();
      hero.courage = 0;
      expect(hero.isBroken()).toBe(true);
    });
    test("returns false if Hero has an courage value above 0", () => {
      const hero = new Hero();
      expect(hero.isBroken()).toBe(false);
    });
  });
});
describe("Encounter class", () => {
  test("has a description property", () => {
    const encounter = new Encounter();
    expect(encounter).toHaveProperty("description");
  });
  test("has a challengeLevel property", () => {
    const encounter = new Encounter();
    expect(encounter).toHaveProperty("challengeLevel");
  });
  describe("Methods: resolve", () => {
    test("has a resolve method", () => {
      const encounter = new Encounter();
      expect(encounter).toHaveProperty("resolve");
    });
    test("returns a string", () => {
      const hero = new Hero("Red");
      const encounter = new Encounter();
      expect(typeof encounter.resolve(hero)).toBe("string");
    });
    test('returns a string with the output "hero.name encounters: this.description"', () => {
      const hero = new Hero("Red");
      const encounter = new Encounter("a wild Chikapu", 3);
      expect(encounter.resolve(hero)).toBe("Red encounters: a wild Chikapu");
    });
    test("returns a dynamic string with the desired output", () => {
      const red = new Hero("Red");
      const blue = new Hero("Blue");
      const chikapu = new Encounter("a wild Chikapu", 3);
      const marchander = new Encounter("a wild Marchander", 5);
      expect(chikapu.resolve(red)).toBe("Red encounters: a wild Chikapu");
      expect(marchander.resolve(blue)).toBe(
        "Blue encounters: a wild Marchander"
      );
    });
    test("tests the hero and reduces Hero courage value", () => {
      const red = new Hero("Red");
      const chikapu = new Encounter("a wild Chikapu", 3);
      chikapu.resolve(red);
      expect(red.courage).toBe(47);
    });
  });
});
describe("Quest class", () => {
  test("has a title property", () => {
    const testQuest = new Quest();
    expect(testQuest).toHaveProperty("title");
  });
  test("has a description property", () => {
    const testQuest = new Quest();
    expect(testQuest).toHaveProperty("description");
  });
  test("has a encounters property", () => {
    const testQuest = new Quest();
    expect(testQuest).toHaveProperty("encounters");
  });
  test("encounters property has a value of an empty array by default", () => {
    const testQuest = new Quest();
    expect(testQuest.encounters).toEqual([]);
  });
  describe("Method: addEncounter", () => {
    test("Quest has an addEncounter method", () => {
      const testQuest = new Quest();
      expect(testQuest).toHaveProperty("addEncounter");
    });
    test("adds a single encounter to encounters array when a single encounter is passed", () => {
      const testQuest = new Quest();
      const gandalf = new Encounter("An unexpected visit from Gandalf", 1);
      testQuest.addEncounter(gandalf);
      const expected = [
        { description: "An unexpected visit from Gandalf", challengeLevel: 1 },
      ];
      expect(testQuest.encounters).toEqual(expected);
    });
    test("adds multiple encounters to encounters array when multiple encounters are passed", () => {
      const testQuest = new Quest();
      const gandalf = new Encounter("An unexpected visit from Gandalf", 1);
      const dwarves = new Encounter(
        "A Dwarven company comes round for supper",
        3
      );
      testQuest.addEncounter(gandalf);
      testQuest.addEncounter(dwarves);
      const expected = [
        { description: "An unexpected visit from Gandalf", challengeLevel: 1 },
        {
          description: "A Dwarven company comes round for supper",
          challengeLevel: 3,
        },
      ];
      expect(testQuest.encounters).toEqual(expected);
    });
  });
  describe("Method: describe", () => {
    test("has a describe method", () => {
      const testQuest = new Quest();
      expect(testQuest).toHaveProperty("describe");
    });
    test("returns an array", () => {
      const testQuest = new Quest();
      expect(Array.isArray(testQuest.describe())).toBe(true);
    });
    test("returns an array of the encounter description when the encounter array has one encounter", () => {
      const testQuest = new Quest();
      const gandalf = new Encounter("An unexpected visit from Gandalf", 1);
      testQuest.addEncounter(gandalf);
      expect(testQuest.describe()).toEqual([
        "An unexpected visit from Gandalf",
      ]);
    });
    test("returns an array of the encounter descriptions when the encounter array has multiple encounter", () => {
      const testQuest = new Quest();
      const gandalf = new Encounter("An unexpected visit from Gandalf", 1);
      const dwarves = new Encounter(
        "A Dwarven company comes round for supper",
        3
      );
      testQuest.addEncounter(gandalf);
      testQuest.addEncounter(dwarves);
      const expected = [
        "An unexpected visit from Gandalf",
        "A Dwarven company comes round for supper",
      ];
      expect(testQuest.describe()).toEqual(expected);
    });
  });
});
describe("ExplorationEncounter Class", () => {
  describe("Method: resolve", () => {
    test("returns a string", () => {
      const bilbo = new Hero("Bilbo");
      const testExploration = new ExplorationEncounter(
        "Escaping goblin tunnels",
        3
      );
      expect(typeof testExploration.resolve(bilbo)).toBe("string");
    });
    test("returns a string with the format (hero name) explores: (description)", () => {
      const bilbo = new Hero("Bilbo");
      const testExploration = new ExplorationEncounter(
        "Escaping goblin tunnels",
        3
      );
      expect(testExploration.resolve(bilbo)).toBe(
        "Bilbo explores: Escaping goblin tunnels"
      );
    });
    test("reduces Hero courage via the Hero test method when resolve is invoked with the Hero once", () => {
      const bilbo = new Hero("Bilbo");
      const testExploration = new ExplorationEncounter(
        "Escaping goblin tunnels",
        3
      );
      testExploration.resolve(bilbo);
      expect(bilbo.courage).toBe(47);
    });
    test("reduces Hero courage via the Hero test method when resolve is invoked with the Hero multiple times", () => {
      const bilbo = new Hero("Bilbo");
      const testExploration = new ExplorationEncounter(
        "Escaping goblin tunnels",
        3
      );
      const moreGoblins = new ExplorationEncounter("Taking the wrong exit", 40);
      const evenMoreGoblines = new ExplorationEncounter("The true exit", 6);
      testExploration.resolve(bilbo);
      moreGoblins.resolve(bilbo);
      evenMoreGoblines.resolve(bilbo);
      expect(bilbo.courage).toBe(1);
    });
    test("does not reduce the Hero's courage beneath 0", () => {
      const bilbo = new Hero("Bilbo");
      const testExploration = new ExplorationEncounter(
        "Escaping goblin tunnels",
        3
      );
      const moreGoblins = new ExplorationEncounter("Taking the wrong exit", 40);
      const evenMoreGoblines = new ExplorationEncounter("The true exit", 8);
      testExploration.resolve(bilbo);
      moreGoblins.resolve(bilbo);
      evenMoreGoblines.resolve(bilbo);
      expect(bilbo.courage).toBe(0);
    });
  });
});
describe("TreasureEncounter Class", () => {
  test("has a description property", () => {
    const testTreasure = new TreasureEncounter();
    expect(testTreasure).toHaveProperty("description");
  });
  test("has a challengeLevel property", () => {
    const testTreasure = new TreasureEncounter();
    expect(testTreasure).toHaveProperty("challengeLevel");
  });
  test("has a challengeLevel property that is set to 0", () => {
    const testTreasure = new TreasureEncounter();
    expect(testTreasure.challengeLevel).toBe(0);
  });
  describe("Method: resolve", () => {
    test("has a resolve method", () => {
      const testTreasure = new TreasureEncounter();
      expect(testTreasure).toHaveProperty("resolve");
    });
    test("returns a string", () => {
      const bilbo = new Hero("Bilbo");
      const testTreasure = new TreasureEncounter();
      expect(typeof testTreasure.resolve(bilbo)).toBe("string");
    });
    test("returns a string with the format (hero name) discovers: (description) and feels braver!", () => {
      const bilbo = new Hero("Bilbo");
      const ring = new TreasureEncounter("A Magic Ring");
      expect(ring.resolve(bilbo)).toBe(
        "Bilbo discovers: A Magic Ring and feels braver!"
      );
    });
    test("increases Hero courage value by default value of 3", () => {
      const bilbo = new Hero("Bilbo");
      const testEncounter = new Encounter("test", 5);
      const ring = new TreasureEncounter("A Magic Ring");
      testEncounter.resolve(bilbo);
      ring.resolve(bilbo);
      expect(bilbo.courage).toBe(48);
    });
  });
});
describe("CombatEncounter Class", () => {
  test("has a description property", () => {
    const testCombat = new CombatEncounter();
    expect(testCombat).toHaveProperty("description");
  });
  test("has a challengeLevel property", () => {
    const testCombat = new CombatEncounter();
    expect(testCombat).toHaveProperty("challengeLevel");
  });
  describe("Method: resolve", () => {
    test("has a resolve method", () => {
      const testCombat = new CombatEncounter();
      expect(testCombat).toHaveProperty("resolve");
    });
    test("returns a string", () => {
      const bilbo = new Hero("Bilbo");
      const battle = new CombatEncounter("Three Trolls", 4);
      expect(typeof battle.resolve(bilbo)).toBe("string");
    });
    test("returns a string with the format (Hero name) battles: (description)", () => {
      const bilbo = new Hero("Bilbo");
      const gandalf = new Hero("Gandalf");
      const battle = new CombatEncounter("Three Trolls", 4);
      const battle2 = new CombatEncounter("Five Ogres", 8);
      expect(battle.resolve(bilbo)).toBe("Bilbo battles: Three Trolls");
      expect(battle2.resolve(gandalf)).toBe("Gandalf battles: Five Ogres");
    });
    test("does not change the Hero's courage if a challenge level of 0 is passed", () => {
      const bilbo = new Hero("Bilbo");
      const battle = new CombatEncounter("Three Trolls", 0);
      battle.resolve(bilbo);
      expect(bilbo.courage).toBe(50);
    });
    test("reduces the Hero's courage by the challenge level passed into a single instance of CombatEncounter", () => {
      const bilbo = new Hero("Bilbo");
      const battle = new CombatEncounter("Three Trolls", 4);
      battle.resolve(bilbo);
      expect(bilbo.courage).toBe(46);
    });
    test("reduces the Hero's courage for multiple instances of a CombatEncounter", () => {
      const bilbo = new Hero("Bilbo");
      const battle = new CombatEncounter("Three Trolls", 4);
      const battle2 = new CombatEncounter("Five Ogres", 8);
      const battle3 = new CombatEncounter("A Great Big Thing", 10);
      battle.resolve(bilbo);
      battle2.resolve(bilbo);
      battle3.resolve(bilbo);
      expect(bilbo.courage).toBe(28);
    });
    test("Hero's courage is not reduced below 0", () => {
      const bilbo = new Hero("Bilbo");
      const battle = new CombatEncounter("Three Trolls", 10);
      const battle2 = new CombatEncounter("Five Ogres", 30);
      const battle3 = new CombatEncounter("A Great Big Thing", 15);
      battle.resolve(bilbo);
      battle2.resolve(bilbo);
      battle3.resolve(bilbo);
      expect(bilbo.courage).toBe(0);
    });
  });
});
describe("Quest: Method: attempt", () => {
  test("has an attempt method", () => {
    const testQuest = new Quest();
    expect(testQuest).toHaveProperty("attempt");
  });
  test("returns an array", () => {
    const bilbo = new Hero("Bilbo");
    const testQuest = new Quest();
    expect(Array.isArray(testQuest.attempt(bilbo))).toBe(true);
  });
  test("first element of array is of the format (hero name) attempts the quest: (description)", () => {
    const bilbo = new Hero("Bilbo");
    const testQuest = new Quest(
      "Through the Wild",
      "The hero faces dangers outside the Shire"
    );
    expect(testQuest.attempt(bilbo)[0]).toBe(
      "Bilbo attempts the quest: Through the Wild"
    );
  });
  test("adds one encounter resolve when Hero has has a single Encounter", () => {
    const bilbo = new Hero("Bilbo");
    const testQuest = new Quest(
      "Through the Wild",
      "The hero faces dangers outside the Shire"
    );
    testQuest.addEncounter(new CombatEncounter("Three Trolls", 4));
    expect(testQuest.attempt(bilbo)).toEqual([
      "Bilbo attempts the quest: Through the Wild",
      "Bilbo battles: Three Trolls",
      "Bilbo completes the quest: Through the Wild!",
    ]);
  });
  test("adds multiple encounter resolves when Hero has multiple Encounters", () => {
    const bilbo = new Hero("Bilbo");
    const testQuest = new Quest(
      "Through the Wild",
      "The hero faces dangers outside the Shire",
      "Bilbo completes the quest: Through the Wild!"
    );
    testQuest.addEncounter(new CombatEncounter("Three Trolls", 4));
    testQuest.addEncounter(
      new ExplorationEncounter("Escaping goblin tunnels", 3)
    );
    testQuest.addEncounter(new TreasureEncounter("a Magic Ring"));
    expect(testQuest.attempt(bilbo)).toEqual([
      "Bilbo attempts the quest: Through the Wild",
      "Bilbo battles: Three Trolls",
      "Bilbo explores: Escaping goblin tunnels",
      "Bilbo discovers: a Magic Ring and feels braver!",
      "Bilbo completes the quest: Through the Wild!",
    ]);
  });
  test("returns an array where the last element is a completion message when Hero isBroken is false", () => {
    const bilbo = new Hero("Bilbo");
    const testQuest = new Quest(
      "Through the Wild",
      "The hero faces dangers outside the Shire",
      "Bilbo completes the quest: Through the Wild!"
    );
    testQuest.addEncounter(new CombatEncounter("Three Trolls", 4));
    testQuest.addEncounter(
      new ExplorationEncounter("Escaping goblin tunnels", 3)
    );
    testQuest.addEncounter(new TreasureEncounter("a Magic Ring"));
    expect(testQuest.attempt(bilbo)).toEqual([
      "Bilbo attempts the quest: Through the Wild",
      "Bilbo battles: Three Trolls",
      "Bilbo explores: Escaping goblin tunnels",
      "Bilbo discovers: a Magic Ring and feels braver!",
      "Bilbo completes the quest: Through the Wild!",
    ]);
  });
  test("returns an array where the last element is a failure message when Hero isBroken is true", () => {
    const bilbo = new Hero("Bilbo");
    const testQuest = new Quest(
      "Through the Wild",
      "The hero faces dangers outside the Shire",
      "Bilbo completes the quest: Through the Wild!"
    );
    testQuest.addEncounter(new CombatEncounter("Three Trolls", 47));
    testQuest.addEncounter(
      new ExplorationEncounter("Escaping goblin tunnels", 30)
    );
    testQuest.addEncounter(new TreasureEncounter("a Magic Ring"));
    expect(testQuest.attempt(bilbo)).toEqual([
      "Bilbo attempts the quest: Through the Wild",
      "Bilbo battles: Three Trolls",
      "Bilbo explores: Escaping goblin tunnels",
      "Bilbo fails the quest: Through the Wild!",
    ]);
  });
});
describe("Hero Class Update: currentQuest property", () => {
  test("has a currentQuest property", () => {
    const testHero = new Hero();
    expect(testHero).toHaveProperty("currentQuest");
  });
  test("Hero.currentQuest > has a default value of null", () => {
    const testHero = new Hero();
    expect(testHero.currentQuest).toBe(null);
  });
});
