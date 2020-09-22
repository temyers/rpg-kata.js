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
  if(this === target){
    // do nothing
    return;
  }

  checkRange(this,target)

  const damage = modifyDamageBasedOnLevels(this,target, attackParams.damage)

  target.health -= damage;

  if (target.health < 0) {
    target.health = 0;
    target.isAlive = false;
  }
}

function checkRange(self, other){
  if(self.characterClass === 'melee' && self.location.distanceFrom(other.location) > 2) {
    throw new Error("Character out of range")
  }
  if(self.characterClass === 'ranged' && self.location.distanceFrom(other.location) > 20) {
    throw new Error("Character out of range")
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
 * } healParams 
 */
function heal(healParams){
  const target = this
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
