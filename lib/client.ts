import {character, Character, AttackParams, HealParams} from './Character'
import { eventSourceClient as client } from './eventSourcing/rpgEventSourceClient'
export interface Client {
  character: (charClass: string) => Character
  characterAsync: (charClass: string) => Promise<AsyncCharacter>

}

export function eventSourceClient(): Client {
  // console.log("Using EventSourced client")
  return client();
}

export function standardClient(): Client {
  // console.log("Using Standard client")
  return {
    character,
    characterAsync

  };
}

function characterAsync(characterClass: string): Promise<AsyncCharacter> {
  const newChar = new AsyncCharacterDelegate(character(characterClass))
  return Promise.resolve(newChar)
}

class AsyncCharacterDelegate implements AsyncCharacter{
  health: number;
  level: number;
  isAlive: boolean;
  characterClass: string;
  constructor(private character: Character){
    const {health,level,isAlive,characterClass} = character
    this.health = health
    this.level = level
    this.isAlive = isAlive
    this.characterClass = characterClass
  }

  get _factions(): Set<string>{
    return this.character._factions
  }

  get _location(): any {
    return this.character._location
  }
  

  async joinFaction (name: string) : Promise<void>{
    this.character.joinFaction(name)
    Promise.resolve()
  };
  
  async leaveFaction (name: string) : Promise<void>{
    this.character.leaveFaction(name)
    Promise.resolve()
  };
  
  isAlly (other: Character) : boolean{
    return this.character.isAlly(other);
  };
  
  factions () : Set<string>{
    return this.character.factions()
  };
  async attack (params: AttackParams) : Promise<void>{
    this.character.attack(params)
    Promise.resolve()
    
  };
  async kill () : Promise<void>{
    this.character.kill()
    Promise.resolve()
  };
  
  async heal (params: HealParams) : Promise<void>{
    this.character.heal(params)
    Promise.resolve()  
  };
  
  async location (x: number, y: number) : Promise<void>{
    this.character._location(x,y)
    Promise.resolve()  
  };

}

export interface AsyncCharacter extends Character {
  // _location?: any;
  // health: number;
  // level: number;
  // isAlive: boolean;
  // characterClass: string;
  // _factions: Set<string>;
  joinFactionAsync: (name: string) => Promise<void>;
  leaveFactionAsync: (name: string) => Promise<void>;
  // isAllyAsync: (other: Character) => boolean;
  // factionsAsync: () => Set<string>;
  attackAsync: (params: AttackParams) => Promise<void>;
  killAsync: () => Promise<void>;
  healAsync: (params: HealParams) => Promise<void>;
  locationAsync: (x: number, y: number) => Promise<void>;
}
