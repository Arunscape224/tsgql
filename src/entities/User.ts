import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  BaseEntity,
} from "typeorm";
import { v4 as uuid_v4 } from "uuid";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryColumn("uuid") id: string;

  @Column("varchar", { length: 255 }) email: string;

  @Column("text") password: string;

  @BeforeInsert()
  addId() {
    this.id = uuid_v4();
  }
}
