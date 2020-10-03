import { EventLog, sleep } from "./EventLog";
const { expect } = require("chai");
import { EventBus } from "../../lib/eventSourcing/eventBus";
import { InMemoryEventBus } from "../../lib/eventSourcing/eventBus-memory";
import { createEvent } from "../../lib/eventSourcing/event";


const bus: EventBus = new InMemoryEventBus();
const expectedEventType = "EventLog#waitFor";
describe("EventLog", function () {
  beforeEach(function () {
    this.eventLog = new EventLog(bus);
  });
  describe("#waitFor", function () {
    it("should resolve if an event is received in time", async function () {
      const asyncWait = this.eventLog.waitFor({
        type: expectedEventType,
      });

      this.eventLog.onEvent(
        createEvent({
          type: expectedEventType,
          data: {},
          source: "EventLog.test.ts",
        })
      );

      await expect(asyncWait).to.be.eventually.fulfilled;

      return Promise.resolve()
    });
    it("should fail if the event is not received within the required time", async function () {
      const asyncWait = (this.eventLog as EventLog).waitFor(
        {
          type: expectedEventType,
        },
        10
        );
        
        await expect(asyncWait).to.eventually.be.rejected;
      });

    it("should fail if only non-matching events are received", async function () {
      const asyncWait = (this.eventLog as EventLog).waitFor(
        {
          type: expectedEventType,
        },
        10
        );

        this.eventLog.onEvent(
          createEvent({
            type: "aDifferentEvent",
            data: {},
            source: "EventLog.test.ts",
          })
        );
        this.eventLog.onEvent(
          createEvent({
            type: "alsoDifferentEvent",
            data: {},
            source: "EventLog.test.ts",
          })
        );
        
        await expect(asyncWait).to.eventually.be.rejected;
      });
      
      it("should timeout in 10ms second by default", async function () {
        const asyncWait = (this.eventLog as EventLog).waitFor({
          type: expectedEventType,
        });
        
        await sleep(10);
        this.eventLog.onEvent(
          createEvent({
            type: expectedEventType,
            data: {},
            source: "EventLog.test.ts",
          })
          );
          
          await expect(asyncWait).to.eventually.be.rejected;
    });
  });
});