/**
 *
 * @param {
 *   target: character,
 *   damage: number
 * } attackParams
 */
function attack(attackParams) {

  if(this === attackParams.target){
    // do nothing
    return;
  }

  const target = attackParams.target;
  const damage = modifyDamageBasedOnLevels(this,target, attackParams.damage)

  target.health -= damage;

  if (target.health < 0) {
    target.health = 0;
    target.isAlive = false;
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

function character() {
  const me = {
    health: 1000,
    level: 1,
    isAlive: true,
    attack,
    kill,
    heal
  }
  return me;
}

module.exports = {
  character,
};
