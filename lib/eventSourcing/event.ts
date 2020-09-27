import { CloudEventV1, CloudEvent } from "cloudevents";
const ksuid = require('ksuid')
export interface Event extends CloudEventV1 {

}

export function byAggregate(aggregateId: string): (event: Event) => boolean {
  return (event: Event) => event.type === aggregateId;
}

export interface EventProps {
  /**
   * The type of event - based on the domain.
   */
  type: string,
  /**
   * The source of the event
   */
  source: string,
  /**
   * Specfic payload data for the event type
   */
  data: any
}

export function createEvent(payload: EventProps): Event {
  const {type,source, data} = payload
  return new CloudEvent({
    id: ksuid.randomSync().string,
    type,
    source,
    specversion: '1.0',
    data
  })
}