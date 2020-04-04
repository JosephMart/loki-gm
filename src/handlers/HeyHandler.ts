import BaseHandler, { GroupMeInfo } from "./BaseHandler";
import HandlerConfig from "./HandlerConfig";
import { singleton, inject } from "tsyringe";
import HandlerRegistry from "../HandlerRegistry";

@singleton()
class HeyHandler extends BaseHandler {
  private static readonly regexps = [new RegExp("hey loki", "i")];
  readonly config: HandlerConfig = {
    regexps: HeyHandler.regexps,
  };

  public constructor(@inject(HandlerRegistry) handlerRegistry: HandlerRegistry) {
    super();

    handlerRegistry.register(this);
  }

  async handle(groupMeInfo: GroupMeInfo): Promise<number> {
    return this.sendMessage(`Howdy ${groupMeInfo.name}!`);
  }
}

export default HeyHandler;
