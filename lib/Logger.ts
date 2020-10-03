export interface Message {
  message: string;
}

export interface Logger {
  log(message: Message): void;
  warn(message: Message): void;
  error(message: Message): void;
}

export function NullLogger(): Logger {
  return {
    error(message: Message) {},
    warn(message: Message) {},
    log(message: Message) {},
  };
}

