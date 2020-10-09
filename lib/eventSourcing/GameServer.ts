import { sleep } from "../../test/eventSourcing/WaitObserver";
import { Logger } from "../Logger";
import { CreateCharacterCommandHandler } from "./createCharacter/CreateCharacterCommandHandler";
import { createEvent } from "./event";
import { EventBus } from "./eventBus";
import { EventStore } from "./eventStore";

export interface GameServerParams {
  eventBus: EventBus,
  logger: Logger,
  eventStore: EventStore
}
export class GameServer {
  private eventBus: EventBus;
  constructor(params: GameServerParams) {
    const {eventBus, logger, eventStore} = params
    this.eventBus = eventBus

    // this.eventBus.register(new CreateCharacterCommandHandler(params))
    new CreateCharacterCommandHandler(params)
  }
}