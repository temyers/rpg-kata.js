function distanceFrom(other){
  const dx = other.x - this.x
  const dy = other.y - this.y

  return Math.sqrt(dx ** 2 + dy ** 2)
}

function coordinate(x,y) {
  return {
    x,y,
    distanceFrom
  }
}

module.exports = {
  coordinate
}