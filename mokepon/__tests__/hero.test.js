const { Trainer, Encounter } = require("../hero.js");
describe("Trainer class", () => {
  test("has a name property", () => {
    const trainer = new Trainer();
    expect(trainer).toHaveProperty("name");
  });
  test("has a maxHP property", () => {
    const trainer = new Trainer();
    expect(trainer).toHaveProperty("maxHP");
  });
  test("maxHP has a default value of 50", () => {
    const trainer = new Trainer();
    expect(trainer.maxHP).toBe(50);
  });
  test("has an hp property", () => {
    const trainer = new Trainer();
    expect(trainer).toHaveProperty("hp");
  });
  test("hp property is set to the value of the maxHP", () => {
    const trainer = new Trainer();
    expect(trainer.hp).toBe(50);
  });
  describe("Methods: challenge", () => {
    test("has a challenge method", () => {
      const trainer = new Trainer();
      expect(trainer).toHaveProperty("challenge");
    });
    test("does not change the value of Trainer's hp when passed an hp value of 0", () => {
      const trainer = new Trainer();
      trainer.challenge(0);
      expect(trainer.hp).toBe(50);
    });
    test("decreases the value of Trainer's hp when passed a non-zero value", () => {
      const trainer = new Trainer();
      trainer.challenge(10);
      expect(trainer.hp).toBe(40);
    });
    test("does not decrease the Trainer's hp past 0", () => {
      const trainer = new Trainer();
      trainer.challenge(60);
      expect(trainer.hp).toBe(0);
    });
  });
  describe("Methods: gainHP", () => {
    test("has a gainHP method", () => {
      const trainer = new Trainer();
      expect(trainer).toHaveProperty("gainHP");
    });
    test("does not change Trainer hp value when passed a value of 0", () => {
      const trainer = new Trainer();
      trainer.gainHP(0);
      expect(trainer.hp).toBe(50);
    });
    test("increases Trainer hp value when passed a non-zero value", () => {
      const trainer = new Trainer();
      trainer.hp = 20;
      trainer.gainHP(10);
      expect(trainer.hp).toBe(30);
    });
    test("does not increase Trainer hp value above max value", () => {
      const trainer = new Trainer();
      trainer.gainHP(10);
      expect(trainer.hp).toBe(50);
    });
  });
  describe("Methods: hasFainted", () => {
    test("has a hasFainted method", () => {
      const trainer = new Trainer();
      expect(trainer).toHaveProperty("hasFainted");
    });
    test("returns a boolean", () => {
      const trainer = new Trainer();
      expect(typeof trainer.hasFainted()).toBe("boolean");
    });
    test("returns true if Trainer has an hp value of 0", () => {
      const trainer = new Trainer();
      trainer.hp = 0;
      expect(trainer.hasFainted()).toBe(true);
    });
    test("returns false if Trainer has an hp value above 0", () => {
      const trainer = new Trainer();
      expect(trainer.hasFainted()).toBe(false);
    });
  });
});
describe("Encounter class", () => {
  test("has a description property", () => {
    const encounter = new Encounter();
    expect(encounter).toHaveProperty("description");
  });
  test("has a damage property", () => {
    const encounter = new Encounter();
    expect(encounter).toHaveProperty("damage");
  });
  describe("Methods: resolve", () => {
    test("has a resolve method", () => {
      const encounter = new Encounter();
      expect(encounter).toHaveProperty("resolve");
    });
    test("returns a string", () => {
      const trainer = new Trainer("Red");
      const encounter = new Encounter();
      expect(typeof encounter.resolve(trainer)).toBe("string");
    });
  });
});
