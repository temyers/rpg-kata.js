import { Observer, EventBus } from "../../lib/eventSourcing/eventBus";
import { Event } from "../../lib/eventSourcing/event";
export class EventLog implements Observer {
  private recordedEvents: Event[] = [];
  constructor(bus: EventBus) {
    bus.register(this);
  }
  async onEvent(event: Event): Promise<void> {
    this.recordedEvents.push(event);
    Promise.resolve();
  }

  async waitFor(
    event: Partial<Event>,
    timeoutMs: number = 10
  ): Promise<void> {

    await sleep(timeoutMs)

    const partialEvent = (e:Event) => {
      for( const key in Object.keys(event)){
        if (event[key] !== e.key){
          return false
        }
      }
      return true
    }
    const found = this.recordedEvents.find(partialEvent)

    return found ? Promise.resolve() : Promise.reject()

  }
}
export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
