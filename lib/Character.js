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

function character() {
  return {
    health: 1000,
    level: 1,
    isAlive: true,
    attack,
  };
}

module.exports = {
  character,
};
