import { singleton, inject } from "tsyringe";

import Handler from "./Handler";
import HandlerConfig from "./HandlerConfig";
import { GroupMeInfo } from "../services/GroupMeService";
import { Either } from "fp-ts/lib/Either";
import MessagingService from "../services/MessagingService";

@singleton()
export default class HeyHandler implements Handler {
  private static readonly regexps = [new RegExp("hey loki", "i")];
  readonly config: HandlerConfig = {
    regexps: HeyHandler.regexps,
  };

  constructor(@inject("MessagingService") private readonly messagingService: MessagingService) {}

  async handle(groupMeInfo: GroupMeInfo): Promise<Either<Error, number>> {
    return this.messagingService.sendMessage(`Howdy ${groupMeInfo.name}!`) as Promise<Either<Error, number>>;
  }
}
