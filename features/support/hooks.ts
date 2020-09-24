var { eventSourceClient, standardClient } = require('../../lib/client')
var {Before} = require('cucumber');

// export interface MyWorld {
//   characters: {
//     [key:string]: Character,
//   },
//   factory: Client
// }


Before(function () {
  const eventSource = "true" === process.env.FF_EVENTSOURCE

  if(eventSource){
    this.factory = eventSourceClient()
  }else{
    this.factory = standardClient()
  }
});