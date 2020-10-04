import { EventLog } from "./EventLog";
import { createEvent } from "../../lib/eventSourcing/event";
import { InMemoryEventBus } from "../../lib/eventSourcing/eventBus-memory";
import { GameServer } from "../../lib/eventSourcing/GameServer";
import { expect } from "chai";
import { NullLogger } from "../../lib/Logger";
import { InMemoryEventStore } from "../../lib/eventSourcing/eventStore-memory";
describe("GameServer", () => {
  it("should handle CreateCharacterRequest events", async function () {
    const eventBus = new InMemoryEventBus();
    const eventStore = new InMemoryEventStore()
    const logger = NullLogger()
    new GameServer({eventBus, eventStore, logger});

    const eventLog = new EventLog(eventBus);

    const id = "MyCreatedCharacter";
    eventBus.publish(
      createEvent({
        type: "CreateCharacterRequest",
        data: {},
        source: "GameServer.test",
        id
      })
    );

    const asyncWait = eventLog.waitFor({
      type: "CharacterCreatedEvent",
      id,
    }, 20);

    await expect(asyncWait).to.eventually.be.fulfilled;
  });
});
