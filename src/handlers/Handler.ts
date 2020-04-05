import HandlerConfig from "./HandlerConfig";
import { GroupMeInfo } from "../services/GroupMeService";
import { Either } from "fp-ts/lib/Either";

export default interface Handler {
  readonly config: HandlerConfig;
  handle(groupMeInfo: GroupMeInfo): Promise<Either<Error, unknown>>;
}
