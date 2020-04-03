import got from "got";

export type GroupMeInfo = {
  attachments: Array<any>;
  avatar_url: string;
  created_at: number;
  group_id: string;
  id: string;
  name: string;
  sender_id: string;
  sender_type: string;
  source_guid: string;
  system: boolean;
  text: string;
  user_id: string;
};

abstract class BaseHandler {
  groupMeInfo: GroupMeInfo;

  constructor(payload: GroupMeInfo) {
    this.groupMeInfo = payload;
    this.sanitizeText();
  }

  abstract shouldHandle(): boolean;
  abstract handle(): Promise<number>;

  sanitizeText() {
    this.groupMeInfo.text = this.groupMeInfo.text.trim();
  }

  async sendMessage(text: string) {
    console.log(`Sending text (${text})`);
    const json = {
      text,
      bot_id: process.env.BOT_ID
    };

    try {
      await got.post("https://api.groupme.com/v3/bots/post", {
        json
      });
    } catch (e) {
      console.error(`Error in sendMessage(${text}) - ${e.stack()}`);
    }
    console.log("response done");
  }
}

export default BaseHandler;
