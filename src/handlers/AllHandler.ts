import { Either, isLeft } from "fp-ts/lib/Either";

import { GroupMeInfo } from "../groupMe";
import { singleton, inject } from "tsyringe";
import HandlerConfig from "./HandlerConfig";
import GroupMeService from "../services/GroupMeService";
import GroupMeHandler from "./GroupMeHandler";

@singleton()
export default class AllHandler extends GroupMeHandler {
  readonly config: HandlerConfig = {
    regexp: /(^|\s+)@all($|\s+)/i,
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
    return this.config.regexp.test(groupMeInfo.text);
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

    const messageText = groupMeInfo.text
      .split(/(^|\s+)@all($|\s+)/i)
      .reduce((prev, curr) => (prev.length === 0 ? curr.trim() : `${prev} ${curr.trim()}`), "");
    const memberIds = membersResult.right.map(m => m.user_id);
    const mentionString = membersResult.right.map(m => `@${m.nickname}`).join(" ");
    const loci: Array<[number, number]> = [];
    let start = 0;
    membersResult.right.forEach(m => {
      // +1 for @
      const length = m.nickname.length + 1;
      loci.push([start, length + 1]);
      // +1 for space separator
      start += length + 1;
    });

    const result = await this.groupMeService.sendMessage(
      `${mentionString}${messageText.length === 0 ? messageText : `: ${messageText}`}`,
      [
        {
          loci,
          type: "mentions",
          // eslint-disable-next-line @typescript-eslint/camelcase
          user_ids: memberIds,
        },
      ],
    );

    return [result, ...(await super.handle(groupMeInfo))];
  }
}
