import { singleton, inject } from "tsyringe";
import got from "got";
import { Either, right, left } from "fp-ts/lib/Either";

import EnvConfigService from "./EnvConfigService";
import MessagingService from "./MessagingService";

const GroupMeAPI = "https://api.groupme.com/v3";

/**
 * GroupMeService is a MessagingService implementation for GroupMe.
 */
@singleton()
export class GroupMeService implements MessagingService {
  private readonly envConfigService: EnvConfigService;

  constructor(@inject(EnvConfigService) envConfigService: EnvConfigService) {
    this.envConfigService = envConfigService;
  }
  /**
   * Sends a message to GroupMe.
   * @param text
   */
  async sendMessage(text: string, attachments: GroupMeAttachment[] = []): Promise<Either<Error, number>> {
    console.log(`Sending text (${text})`);
    const json: GroupMePayload = {
      text,
      bot_id: this.envConfigService.BotID, // eslint-disable-line @typescript-eslint/camelcase
      attachments,
    };

    try {
      await got.post(`${GroupMeAPI}/users`, {
        json,
      });
    } catch (e) {
      return left(e as Error);
    }

    console.log("response done");
    return right(0);
  }

  /**
   * Get list of users the bot is registered to according to the env
   */
  async getUsers(): Promise<Either<Error, GroupMeUser[]>> {
    try {
      const { members } = await this.getGroupInfo();
      return right(members);
    } catch (e) {
      return left(e as Error);
    }
  }

  /**
   * Get group info
   */
  async getGroupInfo(): Promise</*Either<Error, */ GroupMeGroupInfo> /*> */ {
    // try {
    const { response } = await got
      .get(`${GroupMeAPI}/groups/${this.envConfigService.GroupID}?token=${this.envConfigService.GroupMeAPIKey}`)
      .json();
    return response as GroupMeGroupInfo;
    // return right(response as GroupMeGroupInfo);
    // } catch (e) {
    //   return left(e as Error);
    // }
  }
}

export type GroupMeUser = {
  user_id: string;
  nickname: string;
  image_url: string;
  id: string;
  muted: boolean;
  autokicked: boolean;
  roles: string[];
  name: string;
};

export type GroupMeGroupInfo = {
  id: string;
  group_id: string;
  name: string;
  phone_number: string;
  type: string;
  description: string;
  image_url: null;
  creator_user_id: string;
  created_at: number;
  updated_at: number;
  muted_until: null; // not sure about this
  office_mode: boolean;
  share_url: string;
  share_qr_code_url: string;
  members: GroupMeUser[];
  messages: {
    count: number;
    last_message_id: string;
    last_message_created_at: number;
    preview: {
      nickname: string;
      text: string;
      image_url: string;
      attachments: GroupMeAttachment[];
    };
  };
  max_members: number;
};

export type GroupMeMention = { loci: Array<[number, number]>; type: "mentions"; user_ids: string[] };
export type GroupMeImage = { type: string; url: string };
export type GroupMeLocation = {
  type: string;
  lng: string;
  lat: string;
  name: string;
};

export type GroupMeAttachment = GroupMeMention | GroupMeImage | GroupMeLocation;

type GroupMePayload = {
  text: string;
  bot_id: string;
  attachments?: GroupMeAttachment[];
};

/**
 * The information GroupMe attaches to requests.
 */
export type GroupMeInfo = {
  attachments: string[];
  avatar_url: string;
  created_at: number;
  group_id: string;
  id: string;
  name: string;
  sender_id: string;
  sender_type: string;
  source_guid: string;
  system: boolean;
  text: string;
  user_id: string;
};
