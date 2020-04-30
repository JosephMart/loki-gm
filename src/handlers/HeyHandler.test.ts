import "reflect-metadata";
import { container } from "tsyringe";
import { isLeft } from "fp-ts/lib/Either";

import HeyHandler from "./HeyHandler";
import RootHandler from "./RootHandler";
import "../mocks/GroupMeServiceMock";
import { GroupMeInfo } from "../groupMe";

/* eslint-disable @typescript-eslint/camelcase */
const DefaultGroupMeInfo: GroupMeInfo = {
  attachments: [],
  avatar_url: "https://i.groupme.com/123456789",
  created_at: 1302623328,
  group_id: "1234567890",
  id: "1234567890",
  name: "John",
  sender_id: "12345",
  sender_type: "user",
  source_guid: "GUID",
  system: false,
  text: "Hello world ☃☃",
  user_id: "1234567890",
};
/* eslint-enable @typescript-eslint/camelcase */

describe("HeyHandler", () => {
  let rootHandler: RootHandler;
  let heyHandler: HeyHandler;

  beforeAll(() => {
    rootHandler = container.resolve(RootHandler);
    heyHandler = container.resolve(HeyHandler);
  });

  describe(".handle()", () => {
    it("should return 0", async () => {
      const actions = await rootHandler.handle(DefaultGroupMeInfo);
      const results = (await Promise.all(actions)).map(result => (isLeft(result) ? -1 : (result.right as number)));

      expect(results).toEqual(expect.not.arrayContaining([-1]));
    });
  });

  describe(".shouldHandle()", () => {
    // Should handle these
    ["hey loki", "HEY LOKI", " hEy LOki ", "Hey Loki"].map(text => {
      it(`return true for ${text}`, () => {
        const payload: GroupMeInfo = { ...DefaultGroupMeInfo, text };
        expect(heyHandler.shouldHandle(payload)).toEqual(true);
      });
    });

    // Should NOT handle these
    ["lol", "lddd", "  ", "boo"].map(text => {
      it(`return false for ${text}`, () => {
        const payload: GroupMeInfo = { ...DefaultGroupMeInfo, text };
        expect(heyHandler.shouldHandle(payload)).toEqual(false);
      });
    });
  });
});
