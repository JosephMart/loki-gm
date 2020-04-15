import HandlerConfig from "./HandlerConfig";
import { Either } from "fp-ts/lib/Either";

/**
 * Handler has one required type parameter (T), which represents the type of data it should handler. It also has one
 * optional type parameter (R) that indicates whether it is a RootConfig object. By default it is false. Pass true in
 * the case you are creating a RootHandler.
 */
export default abstract class Handler<T, R = false> {
  /**
   * Handlers that a given Handler manages.
   */
  protected subHandlers: Handler<T>[] = [];

  /**
   * In the case that the subclass is the RootHandler, then, it should never supply a config.
   */
  readonly config: R extends false ? HandlerConfig : never;

  /**
   * Adds handler to the array of subHandlers.
   * @param handler
   */
  protected register(handler: Handler<T>): void {
    this.subHandlers.push(handler);
  }

  /**
   * Whether the handler should handle the information is is given.
   * @param info
   */
  shouldHandle: R extends false ? (info: T) => boolean : never;

  /**
   * Entry point for handling a message. A subclass should call the parent implementation within its implementation.
   * @param info
   */
  handle(info: T): Promise<Either<Error, unknown>>[] {
    const matchedHandlers = this.subHandlers.filter(handler => handler.shouldHandle(info));
    return matchedHandlers.map(handler => handler.handle(info)).flat(Infinity);
  }
}
