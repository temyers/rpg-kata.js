import { createEvent, Event } from "../../lib/eventSourcing/event";
import { EventBus } from "../../lib/eventSourcing/eventBus";
import { InMemoryEventBus } from "../../lib/eventSourcing/eventBus-memory";
import { EventSourceCharacter } from "../../lib/eventSourcing/EventSourceCharacter";
import { NullLogger } from "../../lib/Logger";
import { EventLog, givenAnEventLog } from "./EventLog";
const { expect } = require("chai");

const logger=NullLogger()

describe("EventSourceCharacter", function () {
  describe("builder", function () {
    beforeEach(function () {
      this.bus = new InMemoryEventBus();
      this.log = givenAnEventLog(this.bus);
    });
    it("should produce a CreateCharacterRequest", async function () {
      // no need to wait for the character to be created
      whenIBuildANewCharacter(this.bus);

      const asyncWait = this.log.waitFor({
        type: "CreateCharacterRequest",
      });
      await expect(asyncWait).to.eventually.be.fulfilled;
    });

    it("should fail when no CharacterCreated event is received", async function () {
      const createRequest = whenIBuildANewCharacter(this.bus);

      await expect(createRequest).to.eventually.be.rejected;
    });

    it("should fail when a CharacterCreated event is received for a different create request", async function () {
      const createRequest = whenIBuildANewCharacter(this.bus);
      whenACharacterCreatedEventIsPublished({
        bus: this.bus,
        log: this.log,
        id: "ThisIsNotTheCharacterYouAreLookingFor",
      });
      await expect(createRequest).to.eventually.be.rejected;
    });
    it("should return a character when a CharacterCreated event is received", async function () {
      const createRequest = whenIBuildANewCharacter(this.bus);

      whenACharacterCreatedEventIsPublished({ bus: this.bus, log: this.log });

      await expect(createRequest).to.eventually.be.fulfilled;
    });

    async function whenIBuildANewCharacter(bus: EventBus) {
      return await EventSourceCharacter.builder({eventBus: bus, characterClass: "melee", logger});
    }

    interface CharacterCreatedParams {
      bus: EventBus;
      log: EventLog;
      id?: string;
    }
    async function whenACharacterCreatedEventIsPublished(
      params: CharacterCreatedParams
    ) {
      const createRequest:Event = await params.log.waitFor({
        type: "CreateCharacterRequest"
      })

      await params.bus.publish(
        createEvent({
          type: "CharacterCreatedEvent",
          data: {
            characterClass: "melee",
          },
          source: "EventSourceCharacterTest",
          id: params.id || createRequest.id,
        })
      );
    }
  });
});
