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
  target.health -= attackParams.damage;

  if (target.health < 0) {
    target.health = 0;
    target.isAlive = false;
  }
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
