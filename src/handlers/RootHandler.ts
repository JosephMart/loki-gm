import { singleton, inject } from "tsyringe";
import { Either } from "fp-ts/lib/Either";
import Handler from "./Handler";
import HeyHandler from "./HeyHandler";
import { GroupMeInfo } from "../groupMe";

@singleton()
export default class RootHandler extends Handler<GroupMeInfo, true> {
  constructor(@inject(HeyHandler) heyHandler: HeyHandler) {
    super();

    this.register(heyHandler);
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
  handle(groupMeInfo: GroupMeInfo): Promise<Either<Error, unknown>>[] {
    groupMeInfo = this.sanitize(groupMeInfo);
    return super.handle(groupMeInfo);
  }
}
