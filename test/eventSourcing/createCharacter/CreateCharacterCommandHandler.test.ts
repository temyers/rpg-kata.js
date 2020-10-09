import { CreateCharacterCommandHandler } from "../../../lib/eventSourcing/createCharacter/CreateCharacterCommandHandler";
import { createEvent, Event } from "../../../lib/eventSourcing/event";
import { EventBus } from "../../../lib/eventSourcing/eventBus";
import { InMemoryEventBus } from "../../../lib/eventSourcing/eventBus-memory";
import { EventStore } from "../../../lib/eventSourcing/eventStore";
import { InMemoryEventStore } from "../../../lib/eventSourcing/eventStore-memory";
import { NullLogger } from "../../../lib/Logger";
import { EventLog } from "../EventLog";
import { expect } from "chai";

describe("CreateCharacterCommandHandler", function () {
  beforeEach(function () {
    const eventStore: EventStore = new InMemoryEventStore();
    const eventBus: EventBus = new InMemoryEventBus();
    const log: EventLog = new EventLog(eventBus);
    this.eventStore = eventStore;
    this.eventBus = eventBus;
    this.log = log;
    
    new CreateCharacterCommandHandler({
      eventBus,
      eventStore,
      logger: NullLogger(),
    });
  });
  it("should process CreateCharacterRequest events", async function () {
    const asyncWait = givenIExpectACharacterCreatedEvent(this.log)

    whenACreateCharacterRequestIsPublished(this.eventBus);

    await thenACharacterCreatedEventShouldBeReceived(asyncWait)
  });

  it("should store the event in the event store", async function () {
    const asyncWait = givenIExpectACharacterCreatedEvent(this.log)

    whenACreateCharacterRequestIsPublished(this.eventBus);

    await thenACharacterCreatedEventShouldBeReceived(asyncWait)

    await thenTheCharacterCreatedEventShouldBeStoredInTheEventStore(this.eventStore);
  });

  function givenIExpectACharacterCreatedEvent(log: EventLog){
    return log.waitFor({
      type: "CharacterCreatedEvent",
      id: "createRequestId",
    });
  }

  async function thenACharacterCreatedEventShouldBeReceived(asyncWait: Promise<Event>){
    return expect(asyncWait).to.eventually.be.fulfilled;
  }
});
async function thenTheCharacterCreatedEventShouldBeStoredInTheEventStore(eventStore: EventStore) {
  const actual = await eventStore.getAllByAggregate("createRequestId");
  const expectedEvent = createEvent({
    type: "CharacterCreatedEvent",
    id: "createRequestId",
    source: "EventSourceGameServer",
    data: {
      id: "createRequestId",
    },
  });

  expect(actual).to.deep.iterate.over([expectedEvent]);
}

function whenACreateCharacterRequestIsPublished(eventBus: any) {
  eventBus.publish(
    createEvent({
      type: "CreateCharacterRequest",
      id: "createRequestId",
      data: {},
      source: "CreateCharacterCommandHandler.test",
    })
  );
}

