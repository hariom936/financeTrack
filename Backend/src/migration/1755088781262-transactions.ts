import { MigrationInterface, QueryRunner,Table, TableForeignKey } from "typeorm";

export class Transactions1755088781262 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'transactions',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'amount',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                        isNullable: false,
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'date',
                        type: 'date',
                        isNullable: false,
                    },
                    {
                        name: 'userId',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'categoryId',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );

        // Add foreign key constraint to link with the 'users' table
        await queryRunner.createForeignKey(
            'transactions',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE', // If a user is deleted, their transactions are also deleted
            }),
        );

        // Add foreign key constraint to link with the 'categories' table
        await queryRunner.createForeignKey(
            'transactions',
            new TableForeignKey({
                columnNames: ['categoryId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'categories',
                onDelete: 'SET NULL', // If a category is deleted, the transaction's category is set to NULL
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
