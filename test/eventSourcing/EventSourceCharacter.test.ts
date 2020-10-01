import { fail } from "assert"
import { InMemoryEventBus } from "../../lib/eventSourcing/eventBus-memory"
import { EventSourceCharacter } from "../../lib/eventSourcing/EventSourceCharacter"
import { givenAnEventLog } from "./EventLog"
const {expect} = require('chai')

describe("EventSourceCharacter", function (){
  describe("builder", function (){

    const bus = new InMemoryEventBus()
    it("should produce a CreateCharacterRequest", async function (){
      const log = givenAnEventLog(bus)
      await EventSourceCharacter.builder(bus, "melee")

      const asyncWait = log.waitFor({
        type: "CreateCharacterRequest"
      })
      await expect(asyncWait).to.eventually.be.fulfilled
    })
  })
})