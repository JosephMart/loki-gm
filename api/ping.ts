import "reflect-metadata";
import { NowRequest, NowResponse } from "@now/node";
import GroupMeService from "../src/services/GroupMeService";
import EnvConfigService from "../src/services/EnvConfigService";

/**
 * Basic health check endpoint to ensure that the lambda is up and
 * running.
 */
export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  const gmService = new GroupMeService(new EnvConfigService());
  await gmService.sendMessage("@Joseph Martinsen hey", [
    // eslint-disable-next-line @typescript-eslint/camelcase
    { loci: [[0, "@Joseph Martinsen".length]], type: "mentions", user_ids: ["10258869"] },
  ]);
  res.json({ response: "Pong!" });
};
