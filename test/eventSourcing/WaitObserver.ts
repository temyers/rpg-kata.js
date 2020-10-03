import { Observer } from "../../lib/eventSourcing/eventBus";
import { Event } from "../../lib/eventSourcing/event";
import { Logger } from "../../lib/Logger";
const equal = require("fast-deep-equal/es6");

export interface WaitObserverParams {
  event: Partial<Event>;
  timeout?: number;
  logger: Logger;
}

export class WaitObserver implements Observer {
  private received = false;
  private logger: Logger;
  private event: Partial<Event>;
  private timeout: number;
  private timeWaited = 0;
  private waitIncrement = 1;
  constructor({ event, logger, timeout }: WaitObserverParams) {
    this.event = event;
    this.timeout = timeout || 10;
    this.logger = logger;
  }

  async onEvent(event: Event): Promise<void> {
    this.logger.log({ message: "Event Received" });
    this.received = partialEvent(this.event)(event);
    return Promise.resolve();
  }

  async wait() {
    if (this.timeWaited >= this.timeout) {
      return Promise.reject();
    }

    if (this.received) {
      return Promise.resolve();
    }

    return this.backOff();
  }

  private async backOff(): Promise<void> {

    await sleep(this.waitIncrement);
    this.timeWaited += this.waitIncrement;
    this.waitIncrement *= 2;
    return this.wait();
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
