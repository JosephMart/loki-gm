import "reflect-metadata";
import { NowRequest, NowResponse } from "@now/node";
import { container } from "tsyringe";
import { isLeft } from "fp-ts/lib/Either";

import RootHandler from "../src/handlers/RootHandler";
import { GroupMeInfo, GroupMeService } from "../src/services/GroupMeService";

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  const groupMeInfo = req.body as GroupMeInfo;

  container.register("MessagingService", { useValue: new GroupMeService() });
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
