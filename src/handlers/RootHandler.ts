import Handler from "./Handler";
import { singleton, inject } from "tsyringe";
import { Either } from "fp-ts/lib/Either";

import { GroupMeInfo } from "../services/GroupMeService";
import "./HeyHandler";
import HeyHandler from "./HeyHandler";

@singleton()
export default class RootHandler extends Handler<true> {
  constructor(@inject(HeyHandler) heyHandler: HeyHandler) {
    super();

    this.register(heyHandler);
  }

  sanitizeText(groupMeInfo: GroupMeInfo): GroupMeInfo {
    groupMeInfo.text = groupMeInfo.text.trim();
    return groupMeInfo;
  }

  handle(groupMeInfo: GroupMeInfo): Promise<Either<Error, unknown>>[] {
    groupMeInfo = this.sanitizeText(groupMeInfo);
    const matchedHandlers = this.subHandlers.filter(handler => this.shouldHandle(handler, groupMeInfo));

    return matchedHandlers.map(handler => handler.handle(groupMeInfo)).reduce((prev, curr) => prev.concat(curr), []);
  }
}
