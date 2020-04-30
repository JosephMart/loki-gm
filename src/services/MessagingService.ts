import { Either } from "fp-ts/lib/Either";

/**
 * Abstraction for messaging services.
 */
export default interface MessagingService {
  /**
   * Send a message across the service.
   * @param text
   * @param args
   */
  sendMessage(text: string, ...args: unknown[]): Promise<Either<Error, unknown>>;
}
