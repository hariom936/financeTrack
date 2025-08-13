import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Transactions } from "./Transactions ";

@Entity()
export class Categories {
    @PrimaryGeneratedColumn({ type: 'int' })
    id!: number;

    @Column({ length: 50, unique: true })
    name!: string;

    @Column({ length: 255, nullable: true })
    description!: string | null;

    @OneToMany(() => Transactions, transaction => transaction.category)
    transactions!: Transactions[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;
}