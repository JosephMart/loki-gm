import { NowRequest, NowResponse } from "@now/node";

import { Member } from "../src/db/entity/Member";
import GetDB from "../src/db";

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  const connection = await GetDB();
  const members = await connection.manager.find(Member);

  await connection.close();
  res.json({ members });
};
