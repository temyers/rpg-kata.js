const { coordinate } = require("./Coordinate");

export interface Character {
  _location?: any;
  health: number;
  level: number;
  isAlive: boolean;
  characterClass: string;
  _factions: Set<string>;
  joinFaction: (name: string) => void;
  leaveFaction: (name: string) => void;
  isAlly: (other: Character) => boolean;
  factions: () => Set<string>;
  attack: (params: AttackParams) => void;
  kill: () => void;
  heal: (params: HealParams) => void;
  location: (x: number, y: number) => void;
}

export interface HealParams {
  heal: number;
  target?: Character;
}

export interface AttackParams {
  target: Character;
  damage: number;
}

/**
 *
 * @param {
 *   target: character,
 *   damage: number
 * } attackParams
 */
function attack(this: Character, attackParams: AttackParams) {
  const target = attackParams.target;
  if (this === target || outOfRange(this, target) || this.isAlly(target)) {
    // do nothing
    return;
  }

  const damage = modifyDamageBasedOnLevels(this, target, attackParams.damage);

  target.health -= damage;

  if (target.health < 0) {
    target.health = 0;
    target.isAlive = false;
  }
}

function outOfRange(self: Character, other: Character) {
  if (self.characterClass === "melee") {
    return self._location.distanceFrom(other._location) > 2;
  }

  if (self.characterClass === "ranged") {
    return self._location.distanceFrom(other._location) > 20;
  } else {
    // unknown
    return true;
  }
}

function modifyDamageBasedOnLevels(subject: Character, target: Character, damage: number) {
  if (target.level >= subject.level + 5) {
    return damage / 2;
  }
  if (subject.level >= target.level + 5) {
    return damage * 1.5;
  }
  return damage;
}

function kill(this:Character) {
  this.health = 0;
  this.isAlive = false;
}

/**
 *
 * @param {
 *   heal: number
 *   target?: character
 * } healParams
 */
function heal(this:Character, healParams: HealParams) {
  var target = this;
  if (healParams.target) {
    target = healParams.target;
    if (!this.isAlly(target)) {
      //do nothing
      // console.log("cannot heal enemies")
      return;
    }
  }

  if (target.isAlive) {
    target.health += healParams.heal;

    if (target.health > 1000) {
      target.health = 1000;
    }
  }
}

/**
 *
 * @param {number} x
 * @param {number} y
 */
function location(this:Character, x: any, y: any) {
  this._location = coordinate(x, y);
}

function factions(this:Character) {
  return this._factions;
}

function joinFaction(this:Character,name: string) {
  this._factions.add(name);
  // this._factions.push(name)
}

function leaveFaction(this:Character, name:string) {
  // this._factions = this._factions.filter(x => x !== name)
  this._factions.delete(name);
}

function isAlly(this:Character, other: Character) {
  const myFactions = this._factions;
  const theirFactions = other._factions;
  var foundAlly = false;
  myFactions.forEach((entry) => {
    if (theirFactions.has(entry)) {
      foundAlly = true;
    }
  });
  return foundAlly;
}

/**
 *
 * @param {string} characterClass melee | ranged
 */
export function character(characterClass: string): Character {
  const me = {
    health: 1000,
    level: 1,
    isAlive: true,
    characterClass,
    _factions: new Set<string>(),
    joinFaction,
    leaveFaction,
    isAlly,
    factions,
    attack,
    kill,
    heal,
    location,
  };
  return me;
}