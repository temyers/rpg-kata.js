import { sleep } from "../../../test/eventSourcing/WaitObserver";
import { Logger } from "../../Logger";
import { Event, createEvent } from "../event";
import { EventBus, Observer } from "../eventBus";
import { EventStore } from "../eventStore";

export interface CommandHandlerParams {
  eventBus: EventBus;
  eventStore: EventStore;
  logger: Logger;
}

export class CreateCharacterCommandHandler implements Observer {
  private eventBus: EventBus;
  private eventStore: EventStore;
  private logger: Logger;
  constructor({ eventBus, eventStore, logger }: CommandHandlerParams) {
    this.eventBus = eventBus;
    this.eventStore = eventStore;
    this.logger = logger;
  }

  async onEvent(event: Event) {
    if ("CreateCharacterRequest" === event.type) {
      // simulate time to process a request
      await sleep(5);
      this.logger.log({ message: "publishing CharacterCreatedEvent" });
      this.eventBus.publish(
        createEvent({
          type: "CharacterCreatedEvent",
          data: {},
          source: "EventSourceGameServer",
          id: event.id,
        })
      );
    }
    Promise.resolve();
  }
}
