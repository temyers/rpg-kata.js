import { Observer } from "../../lib/eventSourcing/eventBus";
import { Event } from "../../lib/eventSourcing/event";
const equal = require('fast-deep-equal/es6');


export interface WaitObserverParams {
  event: Partial<Event>;
  timeout?: number;
}

export class WaitObserver implements Observer {
  private received = false;
  constructor(private params: WaitObserverParams) { }

  async onEvent(event: Event): Promise<void> {
    console.log("Event Recieved")
    this.received = partialEvent(this.params.event)(event);
    return Promise.resolve();
  }

  async wait() {
    await sleep(this.params.timeout || 10);

    if (this.received) {
      return Promise.resolve();
    }
    return Promise.reject();
  }
}
export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const partialEvent = (event: Partial<Event>) => {
  return (e: Event) => {
    const nonMatchingKey = Object.keys(event).find(
      (key) => !equal(event[key], e[key])
    );
    const matchingEvent = nonMatchingKey === undefined;
    return matchingEvent;
  };
};
