import { singleton } from "tsyringe";

import { GroupMeInfo } from "./GroupMeService";

@singleton()
export default class EnvConfigService {
  public get GroupID(): string {
    return String(process.env.GROUP_ID);
  }

  public get BotID(): string {
    return String(process.env.BOT_ID);
  }
}
