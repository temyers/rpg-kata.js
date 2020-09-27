import { EventStore } from "./eventStore";
import { byAggregate, Event } from "./event";

export class InMemoryEventStore implements EventStore {
  private events:Event[]=[]

  getAll(): Promise<IterableIterator<Event>> {
    return Promise.resolve(this.events.values());
  }

  getAllByAggregate(aggregate: string): Promise<IterableIterator<Event>> {
    // const result = this.events.values()
    const result = this.events.filter(byAggregate(aggregate)).values()
    return Promise.resolve(result);
  }
  getAllByAggregateFromPoint(
    _aggregate: string,
    _sortKey: string
  ): Promise<IterableIterator<Event>> {
    const events: Event[] = [];
    return Promise.resolve(events.values());
  }

  put(event: Event): Promise<void> {
    this.events.push(event)
    return Promise.resolve();
  }
}
