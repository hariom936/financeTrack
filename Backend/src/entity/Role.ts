import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50, unique: true })
  name!: string;

  @OneToMany(() => Users, (user) => user.role)
  users!: Users[];
}