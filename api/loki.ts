import "reflect-metadata";
import { NowRequest, NowResponse } from "@now/node";
import { container } from "tsyringe";

import HandlerRegistry from "../src/HandlerRegistry";
import { GroupMeInfo } from "../src/services/GroupMeService";
import { EnvService } from "../src/services/EnvService";

/**
 * The main lambda for the Loki GroupMe bot. It is the callback that GroupMe will
 * hit with data in the form of GroupeMeInfo. Endpoint is BASE_URL/api/loki
 */
export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  const groupMeInfo = req.body as GroupMeInfo;

  container.register(EnvService, { useValue: new EnvService({ groupID: groupMeInfo.group_id }) });

  const handlerRegistry = container.resolve(HandlerRegistry);
  const actions = handlerRegistry.delegate(groupMeInfo);

  await Promise.all(actions);
  console.log("in the final block");
  res.json({ response: "done" });
};
