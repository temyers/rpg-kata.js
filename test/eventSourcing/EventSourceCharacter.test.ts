import { AsyncCharacter } from './../../lib/client';
import { fail } from "assert"
import { AsyncFunc, Context, Func } from "mocha"
import { createEvent } from "../../lib/eventSourcing/event"
import { EventBus } from "../../lib/eventSourcing/eventBus"
import { InMemoryEventBus } from "../../lib/eventSourcing/eventBus-memory"
import { EventSourceCharacter } from "../../lib/eventSourcing/EventSourceCharacter"
import { EventLog, givenAnEventLog } from "./EventLog"
const {expect} = require('chai')

describe("EventSourceCharacter", function (){
  describe("builder", function (){

    beforeEach(function (){
      this.bus = new InMemoryEventBus() 
      this.log = givenAnEventLog(this.bus)
    })
    it("should produce a CreateCharacterRequest", async function (){

      // no need to wait for the character to be created
      whenIBuildANewCharacter(this.bus)

      const asyncWait = this.log.waitFor({
        type: "CreateCharacterRequest"
      })
      await expect(asyncWait).to.eventually.be.fulfilled
    })

    it("should fail when no CharacterCreated event is received", async function() {
      const createRequest = whenIBuildANewCharacter(this.bus)
      
      await expect(createRequest).to.eventually.be.rejected
    })
    it("should return a character when a CharacterCreated event is received", async function() {
      const createRequest = whenIBuildANewCharacter(this.bus)
      
      whenACharacterCreatedEventIsPublished(this.bus)

      await expect(createRequest).to.eventually.be.fulfilled
    })

    async function whenIBuildANewCharacter(bus: EventBus){
      return await EventSourceCharacter.builder(bus, "melee")
    }

    async function whenACharacterCreatedEventIsPublished(bus: EventBus){
      await bus.publish(createEvent({
        type: "CharacterCreatedEvent",
        data: {
          characterClass: "melee"
        },
        source: "EventSourceCharacterTest"
      }))
    }
  })
})