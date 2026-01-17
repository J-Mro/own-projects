const { Hero, Encounter, Quest, ExplorationEncounter } = require("../hero.js");
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
  describe("Methods: hasFainted", () => {
    test("has a hasFainted method", () => {
      const hero = new Hero();
      expect(hero).toHaveProperty("hasFainted");
    });
    test("returns a boolean", () => {
      const hero = new Hero();
      expect(typeof hero.hasFainted()).toBe("boolean");
    });
    test("returns true if Hero has an courage value of 0", () => {
      const hero = new Hero();
      hero.courage = 0;
      expect(hero.hasFainted()).toBe(true);
    });
    test("returns false if Hero has an courage value above 0", () => {
      const hero = new Hero();
      expect(hero.hasFainted()).toBe(false);
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
  });
});
