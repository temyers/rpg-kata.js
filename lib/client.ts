import {
  character,
  Character,
  AttackParams,
  HealParams,
  CharacterClass,
} from "./Character";
import { EventBus } from "./eventSourcing/eventBus";
import { eventSourceClient as client } from "./eventSourcing/rpgEventSourceClient";
import { Logger } from "./Logger";

export interface Client {
  character: (charClass: string) => Character;
  characterAsync: (charClass: CharacterClass) => Promise<AsyncCharacter>;
}

export function eventSourceClient(bus: EventBus, logger: Logger): Client {
  // console.log("Using EventSourced client")
  return client(bus, logger);
}

export function standardClient(): Client {
  // console.log("Using Standard client")
  return {
    character,
    characterAsync,
  };
}

function characterAsync(characterClass: string): Promise<AsyncCharacter> {
  const newChar = new AsyncCharacterDelegate(character(characterClass));
  return Promise.resolve(newChar);
}

class AsyncCharacterDelegate implements AsyncCharacter {
  constructor(private character: Character) {}

  set health(newHealth: number) {
    this.character.health = newHealth;
  }

  get health(): number {
    return this.character.health;
  }

  get level(): number {
    return this.character.level;
  }
  set level(newLevel: number) {
    this.character.level = newLevel;
  }

  get isAlive(): boolean {
    return this.character.isAlive;
  }

  get characterClass(): string {
    return this.character.characterClass;
  }

  get _factions(): Set<string> {
    return this.character._factions;
  }

  get _location(): any {
    return this.character._location;
  }

  joinFaction(name: string): void {
    this.character.joinFaction(name);
  }
  async joinFactionAsync(name: string): Promise<void> {
    this.joinFaction(name);
    Promise.resolve();
  }

  leaveFaction(name: string): void {
    this.character.leaveFaction(name);
  }
  async leaveFactionAsync(name: string): Promise<void> {
    this.leaveFaction(name);
    Promise.resolve();
  }

  isAlly(other: Character): boolean {
    return this.character.isAlly(other);
  }

  factions(): Set<string> {
    return this.character.factions();
  }
  attack(params: AttackParams): void {
    const target = this.unwrapCharacter(params);

    this.character.attack({ ...params, target });
  }
  async attackAsync(params: AttackParams): Promise<void> {
    this.attack(params);
    Promise.resolve();
  }
  kill(): void {
    this.character.kill();
  }
  async killAsync(): Promise<void> {
    this.kill();
    Promise.resolve();
  }

  heal(params: HealParams): void {
    let target = undefined;
    if (params.target) {
      target = this.unwrapCharacter(params as HasTarget);
    }

    this.character.heal({ ...params, target });
  }
  async healAsync(params: HealParams): Promise<void> {
    this.heal(params);
    Promise.resolve();
  }

  location(x: number, y: number): void {
    this.character.location(x, y);
  }

  async locationAsync(x: number, y: number): Promise<void> {
    this.location(x, y);
    Promise.resolve();
  }

  private unwrapCharacter(params: HasTarget) {
    if (params.target instanceof AsyncCharacterDelegate) {
      return (params.target as AsyncCharacterDelegate).character;
    } else {
      return params.target;
    }
  }
}

interface HasTarget {
  target: Character;
}

export interface AsyncCharacter extends Character {
  joinFactionAsync: (name: string) => Promise<void>;
  leaveFactionAsync: (name: string) => Promise<void>;
  attackAsync: (params: AttackParams) => Promise<void>;
  killAsync: () => Promise<void>;
  healAsync: (params: HealParams) => Promise<void>;
  locationAsync: (x: number, y: number) => Promise<void>;
}
