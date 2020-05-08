import { singleton, inject } from "tsyringe";
import got from "got";
import { Either, right, left, isLeft } from "fp-ts/lib/Either";

import EnvConfigService from "./EnvConfigService";
import MessagingService from "./MessagingService";
import {
  GroupMeAttachment,
  GroupMePayload,
  GroupMeUser,
  GroupMeGroupInfo,
  GroupMeResponse,
  GroupMeMention,
} from "../groupMe";
import GroupService from "./GroupService";

const GroupMeAPI = "https://api.groupme.com/v3";

/**
 * GroupMeService is a MessagingService and GroupService implementation for GroupMe.
 */
@singleton()
export default class GroupMeService implements MessagingService, GroupService<GroupMeGroupInfo, GroupMeUser> {
  private readonly envConfigService: EnvConfigService;

  constructor(@inject(EnvConfigService) envConfigService: EnvConfigService) {
    this.envConfigService = envConfigService;
  }

  /**
   * Creates a mention string a mention attachment.
   * @param users Users to mention
   */
  createMentions(users: GroupMeUser[]): [string, GroupMeMention] {
    const pointEmoji = "👆";
    const mentionString = users.map(u => `@${u.nickname}`).join(" ");
    const loci: Array<[number, number]> = [];

    // Length of the emoji (2) plus the space (1)
    let start = pointEmoji.length + 1;
    users.forEach(u => {
      // +1 for @
      const length = u.nickname.length + 1;
      loci.push([start, length]);
      // +1 for space separator
      start += length + 1;
    });

    // eslint-disable-next-line @typescript-eslint/camelcase
    return [`${pointEmoji} ${mentionString}`, { loci, type: "mentions", user_ids: users.map(u => u.user_id) }];
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
   * Get list of users the bot is registered to according to the env.
   */
  async getMembers(): Promise<Either<Error, GroupMeUser[]>> {
    try {
      const result = await this.getInfo();
      if (isLeft(result)) {
        return result;
      }
      console.log(`mem: ${result.right.members}`);

      return right(result.right.members);
    } catch (e) {
      return left(e as Error);
    }
  }

  /**
   * Get group info.
   */
  async getInfo(): Promise<Either<Error, GroupMeGroupInfo>> {
    try {
      const { response } = await got
        .get(`${GroupMeAPI}/groups/${this.envConfigService.GroupID}?token=${this.envConfigService.GroupMeAPIKey}`)
        .json<GroupMeResponse<GroupMeGroupInfo>>();

      return right(response);
    } catch (e) {
      console.error(e);
      return left(e as Error);
    }
  }
}
