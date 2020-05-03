import Handler from "./Handler";
import { GroupMeInfo } from "../groupMe";
import { Either } from "fp-ts/lib/Either";

/**
 * A specific type of handler, where the type parameter R determines if we are a root handler.
 */
export default abstract class GroupMeHandler<R = false> extends Handler<GroupMeInfo, Either<Error, number>, R> {}
