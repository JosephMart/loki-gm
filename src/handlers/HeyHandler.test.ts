import HeyHandler from "./HeyHandler";
import { GroupMeInfo } from "./BaseHandler";

const DefaultGroupMeInfo = {
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
  user_id: "1234567890"
};

describe("HeyHandler", () => {
  describe(".handle()", () => {
    it("should return 0", () => {
      expect(new HeyHandler(DefaultGroupMeInfo).handle()).toEqual(0);
    });
  });

  describe(".shouldHandle()", () => {
    // Should handle these
    ["hey loki", "HEY LOKI", " hEy LOki ", "Hey Loki"].map(text => {
      it(`return true for ${text}`, () => {
        const payload: GroupMeInfo = { ...DefaultGroupMeInfo, text };
        expect(new HeyHandler(payload).shouldHandle()).toEqual(true);
      });
    });

    // Should NOT handle these
    ["lol", "lddd", "  ", "boo"].map(text => {
      it(`return false for ${text}`, () => {
        const payload: GroupMeInfo = { ...DefaultGroupMeInfo, text };
        expect(new HeyHandler(payload).shouldHandle()).toEqual(false);
      });
    });
  });
});
