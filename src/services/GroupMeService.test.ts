/* eslint-disable @typescript-eslint/camelcase */

import "reflect-metadata";
import { container } from "tsyringe";

import GroupMeService from "./GroupMeService";
import { GroupMeUser, GroupMeMention } from "../groupMe";

const members: GroupMeUser[] = [
  {
    user_id: "123456",
    nickname: "Superman",
    image_url: "https://example.com/images/superman.png",
    id: "789",
    muted: false,
    autokicked: false,
    roles: [],
    name: "Clark Kent",
  },
  {
    user_id: "789",
    nickname: "Batman",
    image_url: "https://example.com/images/batman.png",
    id: "123456",
    muted: false,
    autokicked: false,
    roles: [],
    name: "Bruce Wayne",
  },
];

describe("GroupMeService", () => {
  const groupMeService = container.resolve(GroupMeService);

  describe(".createMentions()", () => {
    it("return a correct mention string and a valid mention object for the string", () => {
      const [mentionsString, mention] = groupMeService.createMentions(members);
      expect(mentionsString).toMatch("@Superman @Batman");
      expect(mention).toMatchObject({
        loci: [
          [0, 9],
          [10, 7],
        ],
        type: "mentions",
        user_ids: ["123456", "789"],
      } as GroupMeMention);
    });
  });
});
