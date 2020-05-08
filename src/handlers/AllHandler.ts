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
    const [mentionString, mention] = this.groupMeService.createMentions(membersToMention, "👆 ");
    const result = await this.groupMeService.sendMessage(mentionString, [mention]);

    return [result, ...(await super.handle(groupMeInfo))];
  }
}
