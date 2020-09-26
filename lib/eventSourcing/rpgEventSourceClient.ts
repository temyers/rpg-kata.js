import { Client } from "../client";
import { EventBus } from "./eventBus";
import { InMemoryEventBus } from "./eventBus-memory";
import { EventProps, Event, createEvent as baseEvent } from "./event";
import { EventSourceCharacter } from "./EventSourceCharacter";
export function eventSourceClient(): Client {
  const eventBus: EventBus = new InMemoryEventBus();
  return {
    character: (charClass: string) => {
      console.warn(
        "Synchronous operations are deprecated.  This method shall be removed"
      );
      return EventSourceCharacter.builderSync(eventBus, charClass);
    },
    characterAsync: async (charClass: string) => {
      const character = await EventSourceCharacter.builder(eventBus, charClass);
      return character;
    },
  };
}

export type RpgCombatEventProps = Omit<EventProps, "source">;

export function createEvent(props: RpgCombatEventProps): Event {
  return baseEvent({
    source: "rpg-kata",
    ...props,
  });
}
