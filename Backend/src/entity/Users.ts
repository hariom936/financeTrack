import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Role } from "./Role";
import { Transactions } from "./Transactions ";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  first_name!: string;

  @Column({ length: 50, nullable: true })
  last_name!: string | null;

  @Column({ length: 255, unique: true })
  email!: string;

  @Column({ unique: true, nullable: true })
  phone!: number;

  @Column({ length: 255 })
  password!: string; // Hashed password

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roleId' }) // Add this line to specify the foreign key column name
  role!: Role;

  @OneToMany(() => Transactions, transaction => transaction.user)
  transactions!: Transactions[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}
