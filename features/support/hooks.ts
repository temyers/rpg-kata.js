import { EventBus } from "../../lib/eventSourcing/eventBus";
import { InMemoryEventBus } from "../../lib/eventSourcing/eventBus-memory";
import { EventStore } from "../../lib/eventSourcing/eventStore";
import { InMemoryEventStore } from "../../lib/eventSourcing/eventStore-memory";
import { EventStoreForwarder } from "../../lib/eventSourcing/EventStoreForwarder";
import { GameServer } from "../../lib/eventSourcing/GameServer";
import { NullLogger } from "../../lib/Logger";
import { MyWorld } from "./world";

var { eventSourceClient, standardClient } = require('../../lib/client')
var {Before} = require('cucumber');

Before(function (this: MyWorld) {
  const eventSource = "true" === process.env.FF_EVENTSOURCE

  if(eventSource){
    const eventBus: EventBus = new InMemoryEventBus();
    const logger = NullLogger()
    const eventStore: EventStore = new EventStoreForwarder(new InMemoryEventStore(), eventBus);
    this.factory = eventSourceClient(eventBus, logger)
    new GameServer({eventBus,eventStore,logger})
  }else{
    this.factory = standardClient()
  }
});