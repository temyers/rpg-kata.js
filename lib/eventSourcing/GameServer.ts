import { sleep } from "../../test/eventSourcing/WaitObserver";
import { createEvent } from "./event";
import { EventBus } from "./eventBus";

export class GameServer {
  constructor(private eventBus: EventBus) {

    // TODO - extract to CommandHandler
    this.eventBus.register({
      async onEvent(event){
        if("CreateCharacterRequest" === event.type){
          // simulate time to process a request
          await sleep(10)
          console.log("publishing CharacterCreatedEvent")
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