import { Either } from "fp-ts/lib/Either";

/**
 * Abstraction for messaging services.
 */
export default interface MessagingService {
  /**
   * Send a message across the service.
   * @param args
   */
  sendMessage(...args: unknown[]): Promise<Either<Error, unknown>>;
}
