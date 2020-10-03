import { EventBus, Observer } from "./eventBus";
import {
  Character,
  AttackParams,
  HealParams,
  character as tempCharacter,
  CharacterClass
} from "../Character";
import { Event } from "./event";
import {
  RpgCombatEventProps,
  createEvent as baseEvent,
} from "./rpgEventSourceClient";
import { AsyncCharacter } from "../client";
import { WaitObserver } from "../../test/eventSourcing/WaitObserver";
import { Logger, NullLogger } from "../Logger";

export interface BuilderParams{
  eventBus: EventBus,
  logger: Logger,
  characterClass: CharacterClass
}

export class EventSourceCharacter implements AsyncCharacter, Observer {
  private character: Character;
  private waiters:WaitObserver[]  = []
  private constructor(eventBus: EventBus, characterClass: CharacterClass, private logger: Logger) {
    eventBus.register(this);
    this.character = tempCharacter(characterClass);
  }

  // TEMPORARY - for backward compatibility whilst implementing event sourcing
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

  // END_TEMPORARY - for backward compatibility whilst implementing event sourcing
  public static builderSync(
    eventBus:EventBus, characterClass: string
  ): Character{
    if("melee" !== characterClass && "ranged" !== characterClass){
      throw new Error("illegal character class")
    }
    const character = new EventSourceCharacter(eventBus, characterClass, NullLogger());
    return character
  }

  public static async builder(
    params: BuilderParams
  ): Promise<AsyncCharacter> {
    const {eventBus, characterClass, logger} = params
    const character = new EventSourceCharacter(eventBus, characterClass, logger);
    
    const createCharacterCommand = character.createEvent({ characterClass });
    // Start the wait process before publishing the create request to avoid race conditions
    const characterCreatedEvent = character.characterCreated(createCharacterCommand.id)
    eventBus.publish(createCharacterCommand);
    logger.log({message: "Published CreateCharacterRequest"})
    
    await characterCreatedEvent
    logger.log({message:"Received CharacterCreatedEvent response"})
    
    logger.log({message:"Returning Character"})
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
      // unwrap the target character to maintain backward compatibility
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
    this.waiters.forEach(w => w.onEvent(event))
    return Promise.resolve();
  }

  private createEvent(data: CharacterRequestData): Event {
    const props: RpgCombatEventProps = {
      type: "CreateCharacterRequest",
      data,
    };

    return baseEvent(props);
  }

  private async characterCreated(id: string){
    const logger = this.logger;
    const waiter = new WaitObserver({
      timeout: 1000,
      event: {
        type: "CharacterCreatedEvent",
        id
      },
      logger
    })
    this.waiters.push(waiter)
    logger.log({message: "Waiting for character to be created"})
    return waiter.wait()
  }


}
interface CharacterRequestData {
  characterClass: string;
}
