const { coordinate } = require("./Coordinate");

/**
 *
 * @param {
 *   target: character,
 *   damage: number
 * } attackParams
 */
function attack(attackParams) {

  const target = attackParams.target;
  if(this === target || outOfRange(this,target) || this.isAlly(target)){
    // do nothing
    return;
  }

  const damage = modifyDamageBasedOnLevels(this,target, attackParams.damage)

  target.health -= damage;

  if (target.health < 0) {
    target.health = 0;
    target.isAlive = false;
  }
}

function outOfRange(self, other){
  if(self.characterClass === 'melee') {
    return self.location.distanceFrom(other.location) > 2
  }

  if(self.characterClass === 'ranged') {
    return self.location.distanceFrom(other.location) > 20
  }
}

function modifyDamageBasedOnLevels(subject,target,damage){
  if(target.level >= subject.level + 5 ){
    return damage / 2
  }
  if(subject.level >= target.level + 5 ){
    return damage * 1.5
  }
  return damage
}

function kill() {
  this.health = 0
  this.isAlive = false
}

/**
 * 
 * @param {
 *   heal: number
 *   target?: character
 * } healParams 
 */
function heal(healParams){
  var target = this
  if(healParams.target){
    target = healParams.target
    if(!this.isAlly(target)){
      //do nothing
      // console.log("cannot heal enemies")
      return
    }

  }

  if(target.isAlive){
    target.health += healParams.heal

    if(target.health > 1000){
      target.health = 1000
    }
  }
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 */
function location(x, y) {
  this.location=coordinate(x,y)
}

function factions(){
  return this._factions
}

function joinFaction(name){
  this._factions.add(name)
  // this._factions.push(name)
}

function leaveFaction(name){
  // this._factions = this._factions.filter(x => x !== name)
  this._factions.delete(name)
}

function isAlly(other) {
  const myFactions = this._factions
  const theirFactions = other._factions
  var foundAlly = false
  myFactions.forEach(entry => {
    if(theirFactions.has(entry)){
      foundAlly = true
    }
  })
  return foundAlly

}

/**
 * 
 * @param {string} characterClass melee | ranged
 */
function character(characterClass) {

  const me = {
    health: 1000,
    level: 1,
    isAlive: true,
    characterClass,
    _factions: new Set(),
    joinFaction,
    leaveFaction,
    isAlly,
    factions,
    attack,
    kill,
    heal,
    location
  }
  return me;
}

module.exports = {
  character,
};
