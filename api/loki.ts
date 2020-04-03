import { NowRequest, NowResponse } from "@now/node";

import Handlers from "../src/handlers";

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  const groupMeReq = req.body;
  const p = Handlers.map(h => new h(groupMeReq).handle());

  await Promise.all(p);
  console.log("in the final block");
  res.json({ response: "done" });
};
