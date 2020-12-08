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
    const found = this.find(event)
    
    return found ? Promise.resolve(found) : Promise.reject()
    
  }

  private find(event: Partial<Event>): Event | undefined{
    const findNonMatchingKeys = (sourceObject: any, expectedMatch: any): string | undefined => {
      return Object.keys(expectedMatch).find(key => {
        if(sourceObject[key] instanceof Object){
          return findNonMatchingKeys(sourceObject[key], expectedMatch[key]) !== undefined
        }
        return sourceObject[key] !== expectedMatch[key]
      })
    }

    const partialEvent = (e:Event) => {
      const nonMatchingKey = findNonMatchingKeys(e, event);
      const matchingEvent = nonMatchingKey === undefined
      return matchingEvent
    }
    return this.recordedEvents.find(partialEvent)
  }

  contains(event: Partial<Event>):boolean {
    const findNonMatchingKey = (sourceObject: any, expectedMatch: any): any | undefined => {
      return Object.keys(expectedMatch).find(key => {
        if(sourceObject[key] instanceof Object){
          return findNonMatchingKey(sourceObject[key], expectedMatch[key]) !== undefined
        }
        return sourceObject[key] !== expectedMatch[key]
      })
    }

    const partialEvent = (e:Event) => {
      const nonMatchingKey = findNonMatchingKey(e, event);
      const matchingEvent = nonMatchingKey === undefined
      return matchingEvent
    }
    return this.recordedEvents.find(partialEvent) !== undefined

  }
}
export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


export function givenAnEventLog(bus:EventBus): EventLog {
  return new EventLog(bus)
}