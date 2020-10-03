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
  data: any,

  /**
   * <optional> Specific ID for the event
   */
  id?: string
}

export function createEvent(payload: EventProps): Event {
  return new CloudEvent({
    id: payload.id || ksuid.randomSync().string,
    specversion: '1.0',
    ...payload
  })
}