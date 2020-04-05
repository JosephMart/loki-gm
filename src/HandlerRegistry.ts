import Handler from "./handlers/Handler";
import { singleton, inject } from "tsyringe";
import { GroupMeInfo } from "./services/GroupMeService";
import "./handlers/HeyHandler";
import HeyHandler from "./handlers/HeyHandler";
import { Either } from "fp-ts/lib/Either";

@singleton()
export default class HandlerRegistry {
  private handlers: Handler[] = [];

  constructor(@inject(HeyHandler) heyHandler: HeyHandler) {
    this.register(heyHandler);
  }

  sanitizeText(groupMeInfo: GroupMeInfo): GroupMeInfo {
    groupMeInfo.text = groupMeInfo.text.trim();
    return groupMeInfo;
  }

  shouldHandle(handler: Handler, groupMeInfo: GroupMeInfo): boolean {
    const passed = handler.config.regexps.some(regexp => regexp.test(groupMeInfo.text));
    return passed;
  }

  delegate(groupMeInfo: GroupMeInfo): Promise<Either<Error, unknown>>[] {
    groupMeInfo = this.sanitizeText(groupMeInfo);
    const matchedHandlers = this.handlers.filter(handler => this.shouldHandle(handler, groupMeInfo));

    return matchedHandlers.map(handler => handler.handle(groupMeInfo));
  }

  register(handler: Handler): void {
    this.handlers.push(handler);
  }
}
