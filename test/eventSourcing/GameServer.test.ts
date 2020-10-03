import { EventLog } from "./EventLog";
import { createEvent } from "../../lib/eventSourcing/event";
import { InMemoryEventBus } from "../../lib/eventSourcing/eventBus-memory";
import { GameServer } from "../../lib/eventSourcing/GameServer";
import { expect } from "chai";
import { NullLogger } from "../../lib/Logger";
describe("GameServer", () => {
  it("should handle CreateCharacterRequest events", async function () {
    const eventBus = new InMemoryEventBus();
    const logger = NullLogger()
    new GameServer({eventBus, logger});

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
