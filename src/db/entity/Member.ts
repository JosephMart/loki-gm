import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity()
export class Member {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  user_id: string;

  @Column()
  nickname: string;

  @Column()
  image_url: string;

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
