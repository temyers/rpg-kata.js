import { EventBus, Observer } from "../../lib/eventSourcing/eventBus"
import { InMemoryEventBus } from "../../lib/eventSourcing/eventBus-memory"
import * as sinon from "sinon"
import { CloudEvent } from "cloudevents"
const { use, expect } = require("chai")
import * as sinonChai  from "sinon-chai";
import sinonChaiInOrder from 'sinon-chai-in-order';
import { createEvent } from "./mockEvent"

use(sinonChai)
use(sinonChaiInOrder)


describe("InMemoryEventBus", () => {
  let eventBus: EventBus

  beforeEach(() => {
    eventBus = new InMemoryEventBus()
  })

  it("should publish an event to a single observer", async () => {
    const observer = givenAnObserver(eventBus)

    const event = await whenAnEventIsPublished(eventBus)

    thenTheObserverShouldReceiveEventsInOrder(observer, event)
  })
  
  it("should publish an event to a multiple observers", async () => {
    const observer1 = givenAnObserver(eventBus)
    const observer2 = givenAnObserver(eventBus)
    
    const event = await whenAnEventIsPublished(eventBus)
    
    thenTheObserverShouldReceiveEventsInOrder(observer1, event)
    thenTheObserverShouldReceiveEventsInOrder(observer2, event)
  })

  it("should publish events in order", async () => {
    const observer = givenAnObserver(eventBus)
    const event1 = await whenAnEventIsPublished(eventBus)
    const event2 = await whenAnEventIsPublished(eventBus)

    thenTheObserverShouldReceiveEventsInOrder(observer, event1, event2)

  })
})

function thenTheObserverShouldReceiveEventsInOrder(observer: sinon.SinonSpy<any[], any>, ...events: CloudEvent[]){

  const observations = expect(observer).inOrder.to.have.been.calledWith(events[0])
  events.slice(1).map(e => observations.subsequently.calledWith(e))
}

async function whenAnEventIsPublished(eventBus: EventBus) {
  const event = createEvent()
  await eventBus.publish(event)
  return event
}

function givenAnObserver(eventBus: EventBus): sinon.SinonSpy<any[], any> {
  const mock = sinon.fake()
  const observer: Observer = {
    onEvent: mock
  }
  eventBus.register(observer);
  return mock
}
