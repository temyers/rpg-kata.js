/**
 *
 * @param {
 *   target: character,
 *   damage: number
 * } attackParams
 */
function attack(attackParams) {
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
 *   target: character
 *   heal: number
 * } healParams 
 */
function heal(healParams){
  const target = healParams.target
  if(target.isAlive){
    target.health += healParams.heal
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
