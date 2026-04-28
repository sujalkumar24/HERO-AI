import { serve } from "inngest/next";

import { inngest } from "@/lib/inngest/client";
import { helloworld } from "@/lib/inngest/functions";

// create an api that serves zero function

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloworld],
});




  
  