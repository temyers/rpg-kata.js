import { EventBus, Observer } from "../../lib/eventSourcing/eventBus"
import { InMemoryEventBus } from "../../lib/eventSourcing/eventBus-memory"
import * as sinon from "sinon"
import { CloudEvent } from "cloudevents"
const { use, expect } = require("chai")
var sinonChai = require("sinon-chai");
use(sinonChai)


describe("InMemoryEventBus", () => {
  let eventBus: EventBus

  beforeEach(() => {
    eventBus = new InMemoryEventBus()
  })

  it("should publishes an event to a single observer", async () => {
    const onEventMock = sinon.fake()
    const observer:Observer = {
      onEvent: onEventMock
    }

    eventBus.register(observer);

    const event = new CloudEvent({
      id: "1",
      source:"test",
      specversion: "1.0",
      type: "example",
      data: {
        message: "hello world"
      }
    })
    await eventBus.publish(event)

    expect(onEventMock).to.have.been.called
  })
})