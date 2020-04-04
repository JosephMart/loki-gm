import "reflect-metadata";
import { container } from "tsyringe";

import HeyHandler from "./HeyHandler";
import HandlerRegistry from "../HandlerRegistry";
import { GroupMeInfo } from "../services/GroupMeService";
import "../mocks/GroupMeServiceMock";

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
  let handlerRegistry: HandlerRegistry;
  let heyHandler: HeyHandler;

  beforeAll(() => {
    handlerRegistry = container.resolve(HandlerRegistry);
    heyHandler = container.resolve(HeyHandler);
  });

  describe(".handle()", () => {
    it("should return 0", async () => {
      expect(await heyHandler.handle(DefaultGroupMeInfo)).toEqual(0);
    });
  });

  describe(".shouldHandle()", () => {
    // Should handle these
    ["hey loki", "HEY LOKI", " hEy LOki ", "Hey Loki"].map(text => {
      it(`return true for ${text}`, () => {
        const payload: GroupMeInfo = { ...DefaultGroupMeInfo, text };
        expect(handlerRegistry.shouldHandle(heyHandler, payload)).toEqual(true);
      });
    });

    // Should NOT handle these
    ["lol", "lddd", "  ", "boo"].map(text => {
      it(`return false for ${text}`, () => {
        const payload: GroupMeInfo = { ...DefaultGroupMeInfo, text };
        expect(handlerRegistry.shouldHandle(heyHandler, payload)).toEqual(false);
      });
    });
  });
});
