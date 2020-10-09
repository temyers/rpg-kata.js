import { InMemoryEventBus } from "../../lib/eventSourcing/eventBus-memory";
import { InMemoryEventStore } from "../../lib/eventSourcing/eventStore-memory";
import { EventStoreForwarder } from "../../lib/eventSourcing/EventStoreForwarder";
import { eventStoreSpec } from "./eventStore-memory.test";
import { createEvent } from "./mockEvent";
import { fake } from "sinon";
import { EventBus } from "../../lib/eventSourcing/eventBus";
import { EventStore } from "../../lib/eventSourcing/eventStore";
import { expect } from "chai";

describe("EventStoreForwarder", function () {
  eventStoreSpec(
    () =>
      new EventStoreForwarder(new InMemoryEventStore(), new InMemoryEventBus())
  );

  beforeEach(function () {
    const delegateStore: EventStore = {
      getAll: fake(),
      getAllByAggregate: fake(),
      getAllByAggregateFromPoint: fake(),
      put: fake(),
    };
    const eventBus: EventBus = {
      publish: fake(),
      register: fake(),
    };
    this.mockEventBus = eventBus;
    this.mockDelegateStore = delegateStore;
    this.eventStore = new EventStoreForwarder(delegateStore, eventBus);
  });

  it("should publish new events to the EventBus", async function () {
    const event1 = createEvent();
    await this.eventStore.put(event1);
    
    expect(this.mockDelegateStore.put).to.have.been.calledWith(event1);
  });
  it("should publish new events to the EventBus in order", async function () {
    const event1 = createEvent();
    const event2 = createEvent();
    await this.eventStore.put(event1);
    await this.eventStore.put(event2);
    
    expect(this.mockDelegateStore.put)
      .to.have.been.calledWith(event1)
      .subsequently.calledWith(event2);
  });
});
