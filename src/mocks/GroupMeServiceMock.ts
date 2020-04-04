import { GroupMeService } from "../services/GroupMeService";
import { container } from "tsyringe";

const groupMeServiceMock = jest.genMockFromModule<GroupMeService>("../services/GroupMeService");
groupMeServiceMock.sendMessage = (): Promise<number> => Promise.resolve(0);
container.register(GroupMeService, { useValue: groupMeServiceMock });
