import "reflect-metadata";
import { container } from "tsyringe";
import { isLeft } from "fp-ts/lib/Either";

import RootHandler from "./RootHandler";
import "../mocks/GroupMeServiceMock";
import { GroupMeInfo } from "../groupMe";
import AllHandler from "./AllHandler";

/* eslint-disable @typescript-eslint/camelcase */
const DefaultGroupMeInfo: Readonly<GroupMeInfo> = {
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

describe("AllHandler", () => {
  let rootHandler: RootHandler;
  let allHandler: AllHandler;

  beforeAll(() => {
    rootHandler = container.resolve(RootHandler);
    allHandler = container.resolve(AllHandler);
  });

  describe(".handle()", () => {
    it("should all return 0", async () => {
      const actions = await rootHandler.handle(DefaultGroupMeInfo);
      const results = actions.map(result => (isLeft(result) ? -1 : (result.right as number)));

      expect(results).toEqual(expect.not.arrayContaining([-1]));
    });
  });

  describe(".shouldHandle()", () => {
    // Should handle these
    ["@all", "  @all  ", "This is my message @aLl", "@ALL this is my other message"].map(text => {
      it(`return true for ${text}`, () => {
        const payload: GroupMeInfo = { ...DefaultGroupMeInfo, text };
        expect(allHandler.shouldHandle(payload)).toEqual(true);
      });
    });

    // Should handle these
    ["all", "This is my message to all", "all this is my other message", "@allsup", "sup@all"].map(text => {
      it(`return false for ${text}`, () => {
        const payload: GroupMeInfo = { ...DefaultGroupMeInfo, text };
        expect(allHandler.shouldHandle(payload)).toEqual(false);
      });
    });

    it("return false for messages sent by bots", () => {
      // eslint-disable-next-line @typescript-eslint/camelcase
      const payload: GroupMeInfo = { ...DefaultGroupMeInfo, sender_type: "bot", text: "@all" };
      expect(allHandler.shouldHandle(payload)).toBe(false);
    });
  });
});
