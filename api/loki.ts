import "reflect-metadata";
import { NowRequest, NowResponse } from "@now/node";
import { container } from "tsyringe";

import HandlerRegistry from "../src/HandlerRegistry";
import { GroupMeInfo } from "../src/handlers/BaseHandler";

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  const groupMeInfo = req.body as GroupMeInfo;
  const handlerRegistry = container.resolve(HandlerRegistry);

  const actions = handlerRegistry.delegate(groupMeInfo);

  await Promise.all(actions);
  console.log("in the final block");
  res.json({ response: "done" });
};
