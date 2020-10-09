import { Event } from "./event";
import { EventBus } from "./eventBus";
import { EventStore } from "./eventStore";

export class EventStoreForwarder implements EventStore {

  constructor(private eventStore:EventStore, private eventBus:EventBus){}
  
  async put(event:Event) {
    await this.eventStore.put(event)
  }

  getAll(): Promise<IterableIterator<Event>> {
    return this.eventStore.getAll()
  }
  getAllByAggregate(aggregate: string): Promise<IterableIterator<Event>> {
    return this.eventStore.getAllByAggregate(aggregate)
  }
  getAllByAggregateFromPoint(aggregate: string, sortKey: string): Promise<IterableIterator<Event>> {
    return this.eventStore.getAllByAggregateFromPoint(aggregate,sortKey)
  }
}