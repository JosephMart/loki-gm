import { Either } from "fp-ts/lib/Either";

export default interface GroupService<I, U> {
  /**
   * Get list of all users within the group.
   */
  getMembers(): Promise<Either<Error, U[]>>;

  /**
   * Get information about the group.
   */
  getInfo(): Promise<Either<Error, I>>;
}
