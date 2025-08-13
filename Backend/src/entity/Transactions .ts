import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Users } from "./Users";
import { Categories } from "./Categories";

@Entity()
export class Transactions {
    @PrimaryGeneratedColumn({ type: 'int' })
    id!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount!: number;

    @Column({ type: 'varchar' })
    type!: 'income' | 'expense';

    @Column({ length: 255 })
    description!: string;

    @Column({ type: 'date' })
    date!: Date;

    @ManyToOne(() => Users, user => user.transactions)
    @JoinColumn({ name: 'userId' })
    user!: Users;

    @Column()
    userId!: number;

    @ManyToOne(() => Categories, category => category.transactions)
    @JoinColumn({ name: 'categoryId' })
    category!: Categories;

    @Column()
    categoryId!: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;
}