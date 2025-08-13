import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Role } from "./Role";
import { Transactions } from "./Transactions ";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  firstName!: string;

  @Column({ length: 50, nullable: true })
  lastName!: string | null;

  @Column({ length: 255, unique: true })
  email!: string;

  @Column({ length: 15, unique: true, nullable: true })
  phone!: string | null;

  @Column({ length: 255 })
  password!: string; // Hashed password

  @ManyToOne(() => Role, (role) => role.users)
  role!: Role;

  @OneToMany(() => Transactions, transaction => transaction.user)
  transactions!: Transactions[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}
