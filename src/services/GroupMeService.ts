import { singleton } from "tsyringe";
import got from "got";
import { Either, right, left } from "fp-ts/lib/Either";

import MessagingService from "./MessagingService";

/**
 * GroupMeService is a MessagingService implementation for GroupMe.
 */
@singleton()
export class GroupMeService implements MessagingService {
  /**
   * Sends a message to GroupMe.
   * @param text
   */
  async sendMessage(text: string): Promise<Either<Error, number>> {
    console.log(`Sending text (${text})`);
    const json = {
      text,
      bot_id: process.env.BOT_ID, // eslint-disable-line @typescript-eslint/camelcase
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
