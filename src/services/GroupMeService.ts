import { singleton, inject } from "tsyringe";
import got from "got";
import { Either, right, left } from "fp-ts/lib/Either";

import EnvConfigService from "./EnvConfigService";
import MessagingService from "./MessagingService";

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
      await got.post("https://api.groupme.com/v3/bots/post", {
        json,
      });
    } catch (e) {
      return left(e as Error);
    }

    console.log("response done");
    return right(0);
  }
}

export type GroupMeMention = { loci: [number, number]; type: "mentions"; user_ids: string[] };
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
