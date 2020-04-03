import BaseHandler from "./BaseHandler";

class HeyHandler extends BaseHandler {
  constructor(payload: any) {
    super(payload);
  }

  shouldHandle() {
    return this.groupMeInfo.text.toLowerCase() === "hey loki";
  }

  async handle() {
    if (this.shouldHandle()) {
      await this.sendMessage(`Howdy ${this.groupMeInfo.name}`);
    }
    return 0;
  }
}

export default HeyHandler;
