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
  ): Promise<Event> {

    await sleep(timeoutMs)

    const partialEvent = (e:Event) => {
      const nonMatchingKey = Object.keys(event).find(key => event[key] !== e[key])
      const matchingEvent = nonMatchingKey === undefined
      return matchingEvent
    }
    const found = this.recordedEvents.find(partialEvent)
    
    return found ? Promise.resolve(found) : Promise.reject()
    
  }
}
export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


export function givenAnEventLog(bus:EventBus): EventLog {
  return new EventLog(bus)
}