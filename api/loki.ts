import "reflect-metadata";
import { NowRequest, NowResponse } from "@now/node";
import { container } from "tsyringe";
import { isLeft } from "fp-ts/lib/Either";

import RootHandler from "../src/handlers/RootHandler";
import { GroupMeInfo } from "../src/groupMe";

/**
 * The main lambda for the Loki GroupMe bot. It is the callback that GroupMe will
 * hit with data in the form of GroupeMeInfo. Endpoint is BASE_URL/api/loki
 */
export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  const groupMeInfo = req.body as GroupMeInfo;
  console.log(`GroupMeInfo: ${JSON.stringify(groupMeInfo)}`);

  const handlerRegistry = container.resolve(RootHandler);
  const results = await handlerRegistry.handle(groupMeInfo);
  results.forEach(r => {
    if (isLeft(r)) {
      console.error(r.left.stack);
    }
  });

  console.log("in the final block");
  res.json({ response: "done" });
};
