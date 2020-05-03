import { injectable } from "tsyringe";

@injectable()
export default class EnvConfigService {
  public get GroupID(): string {
    return String(process.env.GROUP_ID);
  }

  public get BotID(): string {
    return String(process.env.BOT_ID);
  }

  public get GroupMeAPIKey(): string {
    return String(process.env.GROUPME_API_KEY);
  }
}
