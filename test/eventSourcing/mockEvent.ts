import { CloudEvent } from "cloudevents";
import { Event } from "../../lib/eventSourcing/event";
export function createEvent(aggregateId?: string): Event {
  const aggregate = aggregateId || "example"
  return new CloudEvent({
    id: Math.random().toString(),
    source: "test",
    specversion: "1.0",
    type: aggregate,
    data: {
      message: "hello world",
    },
  });
}

export function createEvents(n: number, aggregateId: string): Event[] {
  const events = [];
  for (var i = 0; i < n; i++) {
    events.push(createEvent(aggregateId));
  }

  return events;
}
