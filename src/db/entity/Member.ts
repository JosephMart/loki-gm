import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity()
export class Member {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ name: "user_id" })
  userID: string;

  @Column()
  nickname: string;

  @Column({ name: "image_url" })
  imageUrl: string;

  @Column()
  id: string;

  @Column()
  muted: boolean;

  @Column()
  autokicked: boolean;

  @Column()
  roles: string[];

  @Column()
  name: string;
}
