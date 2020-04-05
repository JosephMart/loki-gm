import HandlerConfig from "./HandlerConfig";
import { GroupMeInfo } from "../services/GroupMeService";
import { Either } from "fp-ts/lib/Either";

export default abstract class Handler<R = false> {
  protected subHandlers: Handler[] = [];

  readonly config: R extends false ? HandlerConfig : never;

  protected register(handler: Handler): void {
    this.subHandlers.push(handler);
  }

  shouldHandle(handler: Handler, groupMeInfo: GroupMeInfo): boolean {
    const passed = handler.config.regexp.test(groupMeInfo.text);
    return passed;
  }

  handle(groupMeInfo: GroupMeInfo): Promise<Either<Error, unknown>>[] {
    const matchedHandlers = this.subHandlers.filter(handler => this.shouldHandle(handler, groupMeInfo));
    return matchedHandlers.map(handler => handler.handle(groupMeInfo)).reduce((prev, curr) => prev.concat(curr), []);
  }
}
