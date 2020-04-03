import BaseHandler, { GroupMeInfo } from "./BaseHandler";

class HeyHandler extends BaseHandler {
  constructor(payload: GroupMeInfo) {
    super(payload);
  }

  shouldHandle(): boolean {
    return this.groupMeInfo.text.toLowerCase() === "hey loki";
  }

  async handle(): Promise<number> {
    if (this.shouldHandle()) {
      await this.sendMessage(`Howdy ${this.groupMeInfo.name}`);
    }
    return 0;
  }
}

export default HeyHandler;
