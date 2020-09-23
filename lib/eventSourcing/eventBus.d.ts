import { CloudEventV1 } from 'cloudevents'

export interface Observer {
  onEvent: (event:Event) => Promise<void>
}

export interface EventBus {
  register: (observer: Observer) => void
  publish: (event: Event) => Promise<void>
}

export interface Event extends CloudEventV1 {

}
