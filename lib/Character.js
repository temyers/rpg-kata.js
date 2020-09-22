/**
 * 
 * @param {
 *   target: character,
 *   damage: number
 * } attackParams 
 */
function attack(attackParams){
  attackParams.target.health -= attackParams.damage
}

function character() {
  return {
    health: 1000,
    level: 1,
    isAlive: true,
    attack
  }
}

module.exports = {
  character
}