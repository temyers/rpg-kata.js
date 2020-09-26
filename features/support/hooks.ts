import { MyWorld } from "./world";

var { eventSourceClient, standardClient } = require('../../lib/client')
var {Before} = require('cucumber');

Before(function (this: MyWorld) {
  const eventSource = "true" === process.env.FF_EVENTSOURCE

  if(eventSource){
    this.factory = eventSourceClient()
  }else{
    this.factory = standardClient()
  }
});