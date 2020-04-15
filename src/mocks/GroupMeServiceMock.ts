import { container } from "tsyringe";
import { right, Either } from "fp-ts/lib/Either";
import { GroupMeService } from "../services/GroupMeService";

const groupMeServiceMock = jest.genMockFromModule<GroupMeService>("../services/GroupMeService");
groupMeServiceMock.sendMessage = (): Promise<Either<Error, number>> => Promise.resolve(right(0));
container.register("MessagingService", { useValue: groupMeServiceMock });
