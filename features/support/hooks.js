var { eventSourceClient, standardClient } = require('../../lib/client')
var {BeforeAll} = require('cucumber');

// export interface MyWorld {
//   characters: {
//     [key:string]: Character,
//   },
//   factory: Client
// }


BeforeAll(function () {
  console.log("before all")
  const eventSource = "true" === process.env.FF_EVENTSOURCE

  if(eventSource){
    this.factory = eventSourceClient()
  }else{
    this.factory = standardClient()
  }
});