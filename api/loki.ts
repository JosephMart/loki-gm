import "reflect-metadata";
import { NowRequest, NowResponse } from "@now/node";
import { container } from "tsyringe";
import { isLeft } from "fp-ts/lib/Either";

import RootHandler from "../src/handlers/RootHandler";
import { GroupMeInfo, GroupMeService } from "../src/services/GroupMeService";
import EnvConfigService from "../src/services/EnvConfigService";

/**
 * The main lambda for the Loki GroupMe bot. It is the callback that GroupMe will
 * hit with data in the form of GroupeMeInfo. Endpoint is BASE_URL/api/loki
 */
export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  const groupMeInfo = req.body as GroupMeInfo;

  container.register("MessagingService", { useValue: new GroupMeService(new EnvConfigService()) });
  const handlerRegistry = container.resolve(RootHandler);
  const actions = handlerRegistry.handle(groupMeInfo);
  const results = await Promise.all(actions);
  results.forEach(r => {
    if (isLeft(r)) {
      console.error(r.left.stack);
    }
  });

  console.log("in the final block");
  res.json({ response: "done" });
};
