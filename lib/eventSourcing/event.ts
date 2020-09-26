import { CloudEventV1 } from "cloudevents";

export interface Event extends CloudEventV1 {

}

export function byAggregate(aggregateId: string): (event: Event) => boolean {
  return (event: Event) => event.type === aggregateId;
}