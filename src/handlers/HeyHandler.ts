import { singleton, inject } from "tsyringe";

import Handler from "./Handler";
import HandlerConfig from "./HandlerConfig";
import { GroupMeService, GroupMeInfo } from "../services/GroupMeService";

@singleton()
export default class HeyHandler implements Handler {
  private static readonly regexps = [new RegExp("hey loki", "i")];
  readonly config: HandlerConfig = {
    regexps: HeyHandler.regexps,
  };

  constructor(@inject(GroupMeService) private readonly groupMeService: GroupMeService) {}

  async handle(groupMeInfo: GroupMeInfo): Promise<number> {
    return this.groupMeService.sendMessage(`Howdy ${groupMeInfo.name}!`, groupMeInfo);
  }
}
