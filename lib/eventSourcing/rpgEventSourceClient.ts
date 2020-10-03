import { Client } from "../client";
import { EventBus } from "./eventBus";
import { EventProps, Event, createEvent as baseEvent } from "./event";
import { EventSourceCharacter } from "./EventSourceCharacter";
import { CharacterClass } from "../Character";
export function eventSourceClient(eventBus: EventBus): Client {
  return {
    character: (charClass: string) => {
      console.warn(
        "Synchronous operations are deprecated.  This method shall be removed"
      );
      return EventSourceCharacter.builderSync(eventBus, charClass);
    },
    characterAsync: async (charClass: CharacterClass) => {
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
