import { User } from "../../users/entities/user.entity";
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity({ name: "registrations" })
export class Registration {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.registrations, { onDelete: "SET NULL" })
  user: User;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
