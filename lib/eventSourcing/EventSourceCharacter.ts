import { EventBus, Observer } from "./eventBus";
import {
  Character,
  AttackParams,
  HealParams,
  character as tempCharacter,
} from "../Character";
import { Event } from "./event";
import {
  RpgCombatEventProps,
  createEvent as baseEvent,
} from "./rpgEventSourceClient";
import { AsyncCharacter } from "../client";

export class EventSourceCharacter implements AsyncCharacter, Observer {
  // public readonly _location?: any;
  // public readonly health: number = 0;
  // public readonly level: number = 0;
  // public readonly isAlive: boolean = false;
  // public readonly characterClass: string = "";
  // public readonly _factions: Set<string> = new Set();
  private character: Character;
  private constructor(eventBus: EventBus, characterClass: string) {
    eventBus.register(this);
    this.character = tempCharacter(characterClass);
  }

  // TEMPORARY - for backward compatability whilst implementing event sourcing
  set health(newVal) {
    this.character.health = newVal;
  }

  get health() {
    return this.character.health;
  }

  set level(newLevel) {
    this.character.level = newLevel;
  }

  get level() {
    return this.character.level;
  }

  get isAlive() {
    return this.character.isAlive;
  }

  set isAlive(newVal){
    this.character.isAlive = newVal
  }

  get characterClass() {
    return this.character.characterClass;
  }

  get _factions() {
    return this.character.factions();
  }

  get _location() {
    return this.character._location
  }

  // END_TEMPORARY - for backward compatability whilst implementing event sourcing
  public static builderSync(
    eventBus:EventBus, characterClass:string
  ): Character{
    const character = new EventSourceCharacter(eventBus, characterClass);
    return character
  }
  public static async builder(
    eventBus: EventBus,
    characterClass: string
  ): Promise<AsyncCharacter> {
    const character = new EventSourceCharacter(eventBus, characterClass);

    eventBus.publish(character.createEvent({ characterClass }));
    return Promise.resolve(character);
  }

  isAlly(other: Character): boolean {
    return this.character.isAlly(other);
  }
  factions(): Set<string> {
    return this.character.factions();
  }
  joinFaction(name: string) {
    this.character.joinFaction(name);
  }
  leaveFaction(name: string) {
    this.character.leaveFaction(name);
  }
  attack(params: AttackParams) {
    const {target, damage} = params
    if(target instanceof EventSourceCharacter){
      // unwrap the target character to maintain backward compatability
      const wrappedCharacter = (target as EventSourceCharacter).character;
      this.character.attack({
        target: wrappedCharacter,
        damage
      })
    }else{
      this.character.attack(params);
    }
  }
  kill() {
    this.character.kill();
  }
  heal(params: HealParams) {
    this.character.heal(params);
  }
  location(x: number, y: number) {
    this.character.location(x, y);
  }
  async joinFactionAsync(name: string) {
    this.character.joinFaction(name);
  }
  async leaveFactionAsync(name: string) {
    this.character.leaveFaction(name);
  }
  async attackAsync(params: AttackParams) {
    this.character.attack(params);
  }
  async killAsync() {
    this.character.kill();
  }
  async healAsync(params: HealParams) {
    this.character.heal(params);
  }
  async locationAsync(x: number, y: number) {
    this.character.location(x, y);
  }

  onEvent(event: Event): Promise<void> {
    return Promise.resolve();
  }

  private createEvent(data: CharacterRequestData): Event {
    const props: RpgCombatEventProps = {
      type: "CreateCharacterRequest",
      data,
    };

    return baseEvent(props);
  }
}
interface CharacterRequestData {
  characterClass: string;
}
