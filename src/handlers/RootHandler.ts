import { singleton, inject } from "tsyringe";
import { Either } from "fp-ts/lib/Either";
import HeyHandler from "./HeyHandler";
import { GroupMeInfo } from "../groupMe";
import GroupMeHandler from "./GroupMeHandler";
import AllHandler from "./AllHandler";

@singleton()
export default class RootHandler extends GroupMeHandler<true> {
  constructor(@inject(HeyHandler) heyHandler: HeyHandler, @inject(AllHandler) allHandler: AllHandler) {
    super();

    this.register(heyHandler);
    this.register(allHandler);
  }

  /**
   * Sanitizes text using various operations like whitespace trimming.
   * @param groupMeInfo
   */
  sanitize(groupMeInfo: GroupMeInfo): GroupMeInfo {
    groupMeInfo.text = groupMeInfo.text.trim();
    return groupMeInfo;
  }

  /**
   * Entry point for handling a message. Passes the information onto its subhandlers.
   * @param groupMeInfo
   */
  handle(groupMeInfo: GroupMeInfo): Promise<Either<Error, number>[]> {
    groupMeInfo = this.sanitize(groupMeInfo);
    return super.handle(groupMeInfo);
  }
}
