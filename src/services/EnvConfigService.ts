import { singleton, injectable } from "tsyringe";

import { GroupMeInfo } from "./GroupMeService";

@singleton()
@injectable()
export class EnvConfigService {
  opts: EnvConfigServiceOpts;

  public constructor(opts: EnvConfigServiceOpts) {
    this.opts = opts;
    console.log(`EnvConfigServiceOpts: ${JSON.stringify(this.opts)}`);
  }

  /**
   * BotID returns Dev BOT_ID by default
   * If PROD GroupMe ID is passed to CTOR, Prod BOT_ID is returned
   */
  public get BotID(): string {
    return this.opts.groupID !== this.ProdGroupID ? this.ProdBotID : this.DevBotID;
  }

  private get ProdGroupID(): string {
    return String(process.env.PROD_GROUP_ID);
  }

  private get DevGroupID(): string {
    return String(process.env.DEV_GROUP_ID);
  }

  private get ProdBotID(): string {
    return String(process.env.PROD_BOT_ID);
  }

  private get DevBotID(): string {
    return String(process.env.DEV_BOT_ID);
  }
}

export type EnvConfigServiceOpts = {
  groupID?: GroupMeInfo["group_id"];
};
