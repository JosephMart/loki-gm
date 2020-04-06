import HandlerConfig from "./HandlerConfig";
import { GroupMeInfo } from "../services/GroupMeService";
import { Either } from "fp-ts/lib/Either";

/**
 * Handler has one optional type parameter that indicates whether it is a RootConfig object. By default it is false,
 * Pass true in the case you are creating a RootHandler.
 */
export default abstract class Handler<R = false> {
  /**
   * Handlers that a given Handler manages.
   */
  protected subHandlers: Handler[] = [];

  /**
   * In the case that the subclass is the RootHandler, then, it should never supply a config.
   */
  readonly config: R extends false ? HandlerConfig : never;

  /**
   * Adds handler to the array of subHandlers
   * @param handler
   */
  protected register(handler: Handler): void {
    this.subHandlers.push(handler);
  }

  /**
   * Whether the handler should handle the information is is given.
   * @param handler
   * @param groupMeInfo
   */
  shouldHandle(handler: Handler, groupMeInfo: GroupMeInfo): boolean {
    const passed = handler.config.regexp.test(groupMeInfo.text);
    return passed;
  }

  /**
   * Entry point for handling a message. A subclass should call the parent implementation within its implementation.
   * @param groupMeInfo
   */
  handle(groupMeInfo: GroupMeInfo): Promise<Either<Error, unknown>>[] {
    const matchedHandlers = this.subHandlers.filter(handler => this.shouldHandle(handler, groupMeInfo));
    return matchedHandlers.map(handler => handler.handle(groupMeInfo)).reduce((prev, curr) => prev.concat(curr), []);
  }
}
