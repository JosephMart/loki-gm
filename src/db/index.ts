import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { Member } from "./entity/Member";

/**
 * GetDB connection. Setups up connection to database and registers entities.
 */
export default (): Promise<Connection> =>
  createConnection({
    type: "mongodb",
    database: "loki",
    entities: [Member],
    url: process.env.MONGODB_URL,
  });
