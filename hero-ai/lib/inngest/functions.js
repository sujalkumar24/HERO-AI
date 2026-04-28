// import { inngest } from "./client";

// export const helloworld = inngest.createFunction(
//     { id: "helloworld" },
//     {event:"test/hello.world"},
//     async ({ event, step }) => {
//         await step.sleep("wait-a-moment", "1s");
//         return { message:`hello ${ event.data.email}!` };
    
//       }
// );

import { inngest } from "./client";

export const helloworld = inngest.createFunction(
    { id: "helloworld" },
    {event:"test/hello.world"},
    async function ({ event, step }) {
      await step.sleep("wait-a-moment", "1s");
      return { message: `hello ${event.data.email}!` };

    }
);