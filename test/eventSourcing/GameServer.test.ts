import { EventLog } from "./EventLog";
import { createEvent } from "../../lib/eventSourcing/event";
import { InMemoryEventBus } from "../../lib/eventSourcing/eventBus-memory";
import { GameServer } from "../../lib/eventSourcing/GameServer";
import { expect } from "chai";
describe("GameServer", () => {
  it("should handle CreateCharacterRequest events", async function () {
    const bus = new InMemoryEventBus();
    const server = new GameServer(bus);

    const eventLog = new EventLog(bus);

    const id = "MyCreatedCharacter";
    bus.publish(
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
