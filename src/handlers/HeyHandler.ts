import { singleton, inject } from "tsyringe";
import { Either } from "fp-ts/lib/Either";
import HandlerConfig from "./HandlerConfig";
import { GroupMeInfo } from "../groupMe";
import GroupMeHandler from "./GroupMeHandler";
import GroupMeService from "../services/GroupMeService";

/**
 * Responds hey to the user who summoned the bot.
 */
@singleton()
export default class HeyHandler extends GroupMeHandler {
  readonly config: HandlerConfig = {
    regexp: /hey loki/i,
  };

  constructor(@inject(GroupMeService) private readonly groupMeService: GroupMeService) {
    super();
  }

  /**
   * Returns a boolean saying whether or not the handler should handle the information it is given.
   * @param groupMeInfo
   */
  shouldHandle = (groupMeInfo: Readonly<GroupMeInfo>): boolean => {
    return this.config.regexp.test(groupMeInfo.text);
  };

  /**
   * Performs its own handler functions as well as calls those it is the root of.
   * @param groupMeInfo
   */
  async handle(groupMeInfo: Readonly<GroupMeInfo>): Promise<Either<Error, number>[]> {
    const result = await this.groupMeService.sendMessage(`Howdy ${groupMeInfo.name}!`);
    return [result, ...(await super.handle(groupMeInfo))];
  }
}
