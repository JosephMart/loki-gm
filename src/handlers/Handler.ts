import HandlerConfig from "./HandlerConfig";

/**
 * Handler has one required type parameter (P), which represents the type of data it should handler. It also has one
 * optional type parameter (R) that indicates whether it is a RootConfig object. By default it is false. Pass true in
 * the case you are creating a RootHandler.
 */
export default abstract class Handler<P, V, R = false> {
  /**
   * Handlers that a given Handler manages.
   */
  protected subHandlers: Readonly<Handler<P, V>>[] = [];

  /**
   * In the case that the subclass is the RootHandler, then, it should never supply a config.
   */
  readonly config: R extends false ? HandlerConfig : never;

  /**
   * Adds handler to the array of subHandlers.
   * @param handler
   */
  protected register(handler: Readonly<Handler<P, V>>): void {
    this.subHandlers.push(handler);
  }

  /**
   * Whether the handler should handle the information is is given.
   * @param info
   */
  shouldHandle: R extends false ? (info: Readonly<P>) => boolean : never;

  /**
   * Entry point for handling a message. A subclass should call the parent implementation within its implementation.
   * @param info
   */
  async handle(info: Readonly<P>): Promise<V[]> {
    const matchedHandlers = this.subHandlers.filter(handler => handler.shouldHandle(info));
    return Promise.all<V>(matchedHandlers.map(handler => handler.handle(info)).flat<V>(Infinity));
  }
}
