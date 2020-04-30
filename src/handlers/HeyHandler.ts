import { singleton, inject } from "tsyringe";
import { Either } from "fp-ts/lib/Either";
import Handler from "./Handler";
import HandlerConfig from "./HandlerConfig";
import MessagingService from "../services/MessagingService";
import { GroupMeInfo } from "../groupMe";

@singleton()
export default class HeyHandler extends Handler<GroupMeInfo> {
  readonly config: HandlerConfig = {
    regexp: new RegExp("hey loki", "i"),
  };

  constructor(@inject("MessagingService") private readonly messagingService: MessagingService) {
    super();
  }

  /**
   * Returns a boolean saying whether or not the handler should handle the information is is given.
   * @param groupMeInfo
   */
  shouldHandle = (groupMeInfo: GroupMeInfo): boolean => {
    return this.config.regexp.test(groupMeInfo.text);
  };

  /**
   * Performs its own handler functions as well as calls those it is the root of.
   * @param groupMeInfo
   */
  handle(groupMeInfo: GroupMeInfo): Promise<Either<Error, unknown>>[] {
    const result = this.messagingService.sendMessage(`Howdy ${groupMeInfo.name}!`);
    return [result, ...super.handle(groupMeInfo)];
  }
}
