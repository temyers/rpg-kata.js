import { Client } from "../client";
import { EventBus } from "./eventBus";
import { EventProps, Event, createEvent as baseEvent } from "./event";
import { EventSourceCharacter } from "./EventSourceCharacter";
import { CharacterClass } from "../Character";
import { Logger } from "../Logger";
export function eventSourceClient(eventBus: EventBus, logger:Logger): Client {
  return {
    characterAsync: async (characterClass: CharacterClass) => {
      const character = await EventSourceCharacter.builder({eventBus, characterClass, logger});
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
