import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

/**
 * Member is of the form of a how GroupMe stores member data
 * of a GroupMe group.
 */
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
