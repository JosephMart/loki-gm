import { Either, isLeft } from "fp-ts/lib/Either";
import { singleton, inject } from "tsyringe";

import { GroupMeInfo } from "../groupMe";
import HandlerConfig from "./HandlerConfig";
import GroupMeService from "../services/GroupMeService";
import GroupMeHandler from "./GroupMeHandler";

@singleton()
export default class AllHandler extends GroupMeHandler {
  readonly config: HandlerConfig = {
    regexp: /(?=@all(?:\s|$))@all((?<=\s@all)|(?<=^@all))/i,
    ignoreBots: true,
  };

  constructor(@inject(GroupMeService) private readonly groupMeService: GroupMeService) {
    super();
  }

  /**
   * Returns a boolean saying whether or not the handler should handle the information
   * it is given.
   * @param groupMeInfo
   */
  shouldHandle = (groupMeInfo: GroupMeInfo): boolean => {
    return (
      (this.config.ignoreBots ? groupMeInfo.sender_type != "bot" : true) && this.config.regexp.test(groupMeInfo.text)
    );
  };

  /**
   * Performs its own handler functions as well as calls those it is the parent of.
   * @param groupMeInfo
   */
  async handle(groupMeInfo: GroupMeInfo): Promise<Either<Error, number>[]> {
    const membersResult = await this.groupMeService.getMembers();
    if (isLeft(membersResult)) {
      return [membersResult];
    }

    const membersToMention = membersResult.right.filter(m => m.user_id != groupMeInfo.user_id);

    const memberIds = membersToMention.map(m => m.user_id);
    const mentionString = membersToMention.map(m => `@${m.nickname}`).join(" ");
    const loci: Array<[number, number]> = [];
    let start = 0;
    membersToMention.forEach(m => {
      // +1 for @
      const length = m.nickname.length + 1;
      loci.push([start, length + 1]);
      // +1 for space separator
      start += length + 1;
    });

    const result = await this.groupMeService.sendMessage(mentionString, [
      {
        loci,
        type: "mentions",
        // eslint-disable-next-line @typescript-eslint/camelcase
        user_ids: memberIds,
      },
    ]);

    return [result, ...(await super.handle(groupMeInfo))];
  }
}
