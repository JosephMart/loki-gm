import { singleton, inject } from "tsyringe";
import got from "got";
import { Either, right, left, isLeft } from "fp-ts/lib/Either";

import EnvConfigService from "./EnvConfigService";
import MessagingService from "./MessagingService";
import { GroupMeAttachment, GroupMePayload, GroupMeUser, GroupMeGroupInfo } from "../groupMe";

const GroupMeAPI = "https://api.groupme.com/v3";

/**
 * GroupMeService is a MessagingService implementation for GroupMe.
 */
@singleton()
export default class GroupMeService implements MessagingService {
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
      await got.post(`${GroupMeAPI}/bots/post`, {
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
      const result = await this.getGroupInfo();
      if (isLeft(result)) {
        return result;
      }

      return right(result.right.members);
    } catch (e) {
      return left(e as Error);
    }
  }

  /**
   * Get group info
   */
  async getGroupInfo(): Promise<Either<Error, GroupMeGroupInfo>> {
    try {
      const { response } = await got
        .get(`${GroupMeAPI}/groups/${this.envConfigService.GroupID}?token=${this.envConfigService.GroupMeAPIKey}`)
        .json();

      return right(response as GroupMeGroupInfo);
    } catch (e) {
      return left(e as Error);
    }
  }
}
