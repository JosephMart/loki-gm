import { singleton } from "tsyringe";

import { GroupMeInfo } from "./GroupMeService";

@singleton()
export class EnvService {
  opts: EnvServiceOpts;

  public constructor(opts: EnvServiceOpts) {
    this.opts = opts;
  }

  /**
   * BotID returns Dev BOT_ID by default
   * If PROD GroupMe ID is passed to CTOR, Prod BOT_ID is returned
   */
  public get BotID(): string {
    return this.opts.groupID === this.getProdGroupID ? this.getProdBotID : this.getDevBotID;
  }

  private get getProdGroupID(): string {
    return String(process.env.PROD_GROUP_ID);
  }

  private get getDevGroupID(): string {
    return String(process.env.DEV_GROUP_ID);
  }

  private get getProdBotID(): string {
    return String(process.env.PROD_BOT_ID);
  }

  private get getDevBotID(): string {
    return String(process.env.DEV_BOT_ID);
  }
}

export type EnvServiceOpts = {
  groupID?: GroupMeInfo["group_id"];
};
