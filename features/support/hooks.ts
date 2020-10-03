import { EventBus } from "../../lib/eventSourcing/eventBus";
import { InMemoryEventBus } from "../../lib/eventSourcing/eventBus-memory";
import { GameServer } from "../../lib/eventSourcing/GameServer";
import { MyWorld } from "./world";

var { eventSourceClient, standardClient } = require('../../lib/client')
var {Before} = require('cucumber');

Before(function (this: MyWorld) {
  const eventSource = "true" === process.env.FF_EVENTSOURCE

  if(eventSource){
    const eventBus: EventBus = new InMemoryEventBus();
    this.factory = eventSourceClient(eventBus)
    new GameServer(eventBus)
  }else{
    this.factory = standardClient()
  }
});