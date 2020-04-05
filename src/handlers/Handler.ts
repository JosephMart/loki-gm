import HandlerConfig from "./HandlerConfig";
import { GroupMeInfo } from "../services/GroupMeService";

export default interface Handler {
  readonly config: HandlerConfig;
  handle(groupMeInfo: GroupMeInfo): Promise<number>;
}
