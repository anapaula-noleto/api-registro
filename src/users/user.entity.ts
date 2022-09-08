import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  photo: string;

  @Column({ name: "added_by" })
  addedBy: string;

  @Column({ name: "active_user" })
  activeUser: boolean;

  @Column()
  course: string;

  @Column({ name: "user_type" })
  userType: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
