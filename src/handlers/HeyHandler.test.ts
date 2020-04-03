import HeyHandler from "./HeyHandler";
import { GroupMeInfo } from "./BaseHandler";

const DefaultGroupMeInfo = {
  attachments: [],
  avatar_url: "https://i.groupme.com/123456789", //eslint-disable-line @typescript-eslint/camelcase
  created_at: 1302623328, //eslint-disable-line @typescript-eslint/camelcase
  group_id: "1234567890", //eslint-disable-line @typescript-eslint/camelcase
  id: "1234567890",
  name: "John",
  sender_id: "12345", //eslint-disable-line @typescript-eslint/camelcase
  sender_type: "user", //eslint-disable-line @typescript-eslint/camelcase
  source_guid: "GUID", //eslint-disable-line @typescript-eslint/camelcase
  system: false,
  text: "Hello world ☃☃",
  user_id: "1234567890", //eslint-disable-line @typescript-eslint/camelcase
};

describe("HeyHandler", () => {
  describe(".handle()", () => {
    it("should return 0", async () => {
      expect(await new HeyHandler(DefaultGroupMeInfo).handle()).toEqual(0);
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
