import { InMemoryEventStore } from "../../lib/eventSourcing/eventStore-memory"
import { EventStore } from "../../lib/eventSourcing/eventStore"
// import {expect, use} from 'chai'
const { use, expect } = require("chai")
var chaiIterator = require( 'chai-iterator')
import { createEvents, createEvent } from "./mockEvent"
import { Event, byAggregate } from "../../lib/eventSourcing/event"
use(chaiIterator)

type EventStoreFactory = () => EventStore

function eventStoreSpec(factory:EventStoreFactory){
  describe("Event Store", () => {
    let eventStore: EventStore 
    beforeEach( () => {
      eventStore= givenAnEventStore(factory)
    })

    describe("When event store is empty", () => {
      describe("#getAll()", () => {
        it("should return an empty iterator", async () => {
          await shouldReturnAnEmptyIterator(() => eventStore.getAll())
        })
      })
      describe("#getAllByAggregate(id)", () => {
        it("should return an empty iterator", async () => {
          await shouldReturnAnEmptyIterator(() => eventStore.getAllByAggregate('foo'))
        })
      })
      describe("#getAllByAggregateFromPoint(id,sortKey)", () => {
        it("should return an empty iterator", async () => {
          await shouldReturnAnEmptyIterator(() => eventStore.getAllByAggregateFromPoint('foo', 'bar'))
        })
      })
    })

    describe('#put', () => {
      it("should store the items", async () => {
        const event = createEvent()
        await eventStore.put(event)
        const actual = await eventStore.getAll()

        expect(actual).to.be.iterable
        expect(actual).to.iterate.over([event])
      })

      it("should store the items in order", async () => {
        const event1 = createEvent()
        const event2 = createEvent()
        await eventStore.put(event1)
        await eventStore.put(event2)
        const actual = await eventStore.getAll()
        
        expect(actual).to.iterate.over([event1,event2])
      })
    })

    describe("When event store contains items", () => {
      let expectedEvents:Event[]=[];
      beforeEach( async () => {
        expectedEvents = expectedEvents.concat(createEvents(10, 'aggregate1'))
        expectedEvents= expectedEvents.concat(createEvents(10, 'aggregate2'))
        const requests = expectedEvents.map(event => eventStore.put(event))
        await Promise.all(requests)
      })
      describe("#getAll()", () => {
        it("should return all the events in order", async () => {

          const actual = await eventStore.getAll()
          expect(actual).to.iterate.over(expectedEvents)
        })
      })
      
      describe("#getAllByAggregate", () => {
        it("should only return items in order for the given aggregate", async () => {
          const expected = expectedEvents.filter(byAggregate('aggregate2'))
          const actual = await eventStore.getAllByAggregate('aggregate2')
          expect(actual).to.iterate.over(expected)
        })
      })
    })
    async function shouldReturnAnEmptyIterator(getAll: () => Promise<Iterator<any>>){
      const iterator = await getAll()
      expect(iterator.next().value).to.be.undefined
      expect(iterator.next().done).to.be.true

    }
  })
}

function givenAnEventStore(factory: EventStoreFactory){
  return factory()
}

eventStoreSpec(() => new InMemoryEventStore());