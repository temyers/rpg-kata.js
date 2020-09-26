import { CloudEventV1 } from 'cloudevents'
import { Event } from './event';

export interface Observer {
  onEvent: (event:Event) => Promise<void>
}

export interface EventBus {
  register: (observer: Observer) => void
  publish: (event: Event) => Promise<void>
}


