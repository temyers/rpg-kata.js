import { Client } from "./client";
import {character} from './Character'


export function eventSourceClient(): Client {
  return {
    character
  }
}