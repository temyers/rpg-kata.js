const { setWorldConstructor } = require('cucumber')

function CustomWorld() {
  this.characters = {};
}

setWorldConstructor(CustomWorld)
