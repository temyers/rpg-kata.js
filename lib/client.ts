import {character, Character} from './Character'
import { eventSourceClient as client } from './eventSourceClient'
export interface Client {
  character: (charClass: string) => Character

}

export function eventSourceClient(): Client {
  // console.log("Using EventSourced client")
  return client();
}

export function standardClient(): Client {
  // console.log("Using Standard client")
  return {
    character
  };
}
