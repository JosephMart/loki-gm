import { Either } from "fp-ts/lib/Either";

export default interface MessagingService {
  sendMessage(...args: unknown[]): Promise<Either<Error, unknown>>;
}
