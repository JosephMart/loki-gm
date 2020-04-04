import { singleton } from "tsyringe";
import got from "got";

@singleton()
export class GroupMeService {
  async sendMessage(text: string): Promise<number> {
    console.log(`Sending text (${text})`);
    const json = {
      text,
      bot_id: process.env.BOT_ID, // eslint-disable-line @typescript-eslint/camelcase
    };

    try {
      await got.post("https://api.groupme.com/v3/bots/post", {
        json,
      });
    } catch (_e) {
      const e: Error = _e;
      console.error(`Error in sendMessage(${text}) - ${e.stack}`);
    }
    console.log("response done");
    return 0;
  }
}

export type GroupMeInfo = {
  attachments: string[];
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