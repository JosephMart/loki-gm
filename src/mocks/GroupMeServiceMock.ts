/* eslint-disable @typescript-eslint/camelcase */

import { container } from "tsyringe";
import { right, Either } from "fp-ts/lib/Either";
import GroupMeService from "../services/GroupMeService";
import { GroupMeUser, GroupMeGroupInfo } from "../groupMe";

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

const groupMeServiceMock = jest.genMockFromModule<GroupMeService>("../services/GroupMeService");
groupMeServiceMock.sendMessage = async (): Promise<Either<Error, number>> => right(0);
groupMeServiceMock.getMembers = async (): Promise<Either<Error, GroupMeUser[]>> => right<Error, GroupMeUser[]>(members);
groupMeServiceMock.getInfo = async (): Promise<Either<Error, GroupMeGroupInfo>> =>
  right<Error, GroupMeGroupInfo>({
    id: "123",
    group_id: "456",
    name: "Freaks",
    phone_number: "555-5555",
    type: "group",
    description: "A group of freaky freaks",
    creator_user_id: "789",
    image_url: null,
    created_at: Date.now(),
    updated_at: Date.now(),
    office_mode: false,
    share_url: "https://app.groupme.com/share/#12345",
    share_qr_code_url: "https://qr.code/#12345",
    members,
    messages: {
      count: 3,
      last_message_id: "3",
      last_message_created_at: Date.now(),
      preview: {
        nickname: "Superman",
        text: "Hey Batman!",
        image_url: "https://example.com/images/batman.png",
        attachments: [],
      },
    },
    max_members: 25,
  });

container.register(GroupMeService, { useValue: groupMeServiceMock });
