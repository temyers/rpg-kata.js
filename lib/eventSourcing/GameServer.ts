import { sleep } from "../../test/eventSourcing/WaitObserver";
import { Logger } from "../Logger";
import { createEvent } from "./event";
import { EventBus } from "./eventBus";

export interface GameServerParams {
  eventBus: EventBus,
  logger: Logger
}
export class GameServer {
  private eventBus: EventBus;
  private logger: Logger;
  constructor({eventBus, logger}: GameServerParams) {
    this.eventBus = eventBus
    this.logger = logger

    // TODO - extract to CommandHandler
    this.eventBus.register({
      async onEvent(event){
        if("CreateCharacterRequest" === event.type){
          // simulate time to process a request
          await sleep(10)
          logger.log({message:"publishing CharacterCreatedEvent"})
          eventBus.publish(createEvent({
            type: "CharacterCreatedEvent",
            data: {},
            source: "EventSourceGameServer",
            id: event.id
          }))
        }
        Promise.resolve()
      }
    })

  }
}