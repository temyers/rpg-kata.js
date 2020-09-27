import { EventBus, Observer } from "./eventBus";
import { Event } from "./event";

export class InMemoryEventBus implements EventBus {
  private observers: Observer[]
  constructor(){
    this.observers = []
  }

  register(observer: Observer): void{
    this.observers.push(observer)
  };
  async publish(event: Event): Promise<void>{

    const requests = this.observers.map(o => o.onEvent(event))
    await Promise.all(requests)
  };
  
}