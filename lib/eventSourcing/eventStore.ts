import { Event } from "./eventBus";

export interface EventStore {
  /**
   * Get all events in the event store
   */
  getAll(): Promise<IterableIterator<Event>>

  /**
   * Get all events for a given aggregate
   * @param aggregate The aggregate ID
   */
  getAllByAggregate(aggregate: string): Promise<IterableIterator<Event>>

  /**
   * Get all events for a given aggregate, from a given sort key
   * @param aggregate Aggregate ID
   * @param sortKey The aggregate sort key
   */
  getAllByAggregateFromPoint(aggregate: string, sortKey: string): Promise<IterableIterator<Event>>

  put(event: Event): Promise<void>
}