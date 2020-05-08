import "reflect-metadata";
import { NowRequest, NowResponse } from "@now/node";
import GroupMeService from "../src/services/GroupMeService";
import { container } from "tsyringe";

/**
 * Basic health check endpoint to ensure that the lambda is up and
 * running.
 */
export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  res.json({ response: "Pong!" });
};
