import BaseHandler, { GroupMeInfo } from "./handlers/BaseHandler";
import { singleton } from "tsyringe";

@singleton()
export default class HandlerRegistry {
  private handlers: BaseHandler[] = [];

  sanitizeText(groupMeInfo: GroupMeInfo): GroupMeInfo {
    groupMeInfo.text = groupMeInfo.text.trim();
    return groupMeInfo;
  }

  shouldHandle(handler: BaseHandler, groupMeInfo: GroupMeInfo): boolean {
    const passed = handler.config.regexps.some(regexp => regexp.test(groupMeInfo.text));

    return passed;
  }

  delegate(groupMeInfo: GroupMeInfo): Promise<number>[] {
    groupMeInfo = this.sanitizeText(groupMeInfo);

    const matchedHandlers = this.handlers.filter(handler => this.shouldHandle(handler, groupMeInfo));

    return matchedHandlers.map(handler => handler.handle(groupMeInfo));
  }

  register(handler: BaseHandler): void {
    this.handlers.push(handler);
  }
}
