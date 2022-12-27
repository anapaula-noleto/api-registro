import { Role } from "../../enums/role.enum";
import { Registration } from "../../registrations/entities/registration.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  photo?: string;

  @Column({ name: "added_by", nullable: true, default: null })
  addedBy: number;

  @Column({ name: "active_user", default: false })
  activeUser: boolean;

  @Column()
  course: string;

  @Column({ default: "user" })
  role: Role;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @OneToMany(() => Registration, (registration) => registration.user)
  registrations: Registration[];
}
