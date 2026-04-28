import { Inngest } from "inngest";

//create a client to send and recieve events:
export const inngest = new Inngest({
  id:"versal",
  name:"Versal",
  eventKey: process.env.INNGEST_EVENT_KEY || "local"
});
