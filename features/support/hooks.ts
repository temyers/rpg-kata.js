import { EventBus } from "../../lib/eventSourcing/eventBus";
import { InMemoryEventBus } from "../../lib/eventSourcing/eventBus-memory";
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
    this.factory = eventSourceClient(eventBus, logger)
    new GameServer({eventBus,logger})
  }else{
    this.factory = standardClient()
  }
});