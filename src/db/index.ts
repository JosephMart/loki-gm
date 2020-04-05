import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { Member } from "./entity/Member";

export default (): Promise<Connection> =>
  createConnection({
    type: "mongodb",
    database: "loki",
    entities: [Member],
    url: process.env.MONGODB_URL,
  });
