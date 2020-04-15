import { NowRequest, NowResponse } from "@now/node";

/**
 * Basic health check endpoint to ensure that the lambda is up and
 * running.
 */
export default (req: NowRequest, res: NowResponse): void => {
  res.json({ response: "Pong!" });
};
