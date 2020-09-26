import { Character } from "../../lib/Character";
import { AsyncCharacter, Client } from "../../lib/client";

const { setWorldConstructor } = require('cucumber')

function CustomWorld(this: MyWorld) {
  this.characters = {};
}

setWorldConstructor(CustomWorld)

export interface MyWorld {
  factory: Client
  characters: {
    [name: string]: Character | AsyncCharacter,
  }
}