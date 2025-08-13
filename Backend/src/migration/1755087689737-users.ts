import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Users1755087689737 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'first_name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'last_name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: true,
                        isUnique: true,
                    },
                    {
                        name: 'phone',
                        type: 'bigint', // Changed to bigint for phone numbers
                        isNullable: true,
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'roleId', // Add this foreign key column
                        type: 'int',
                        isNullable: false, // Assuming a user must have a role
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

        // Add the foreign key constraint separately
        await queryRunner.createForeignKey(
            'users',
            new TableForeignKey({
                columnNames: ['roleId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'role',
                onDelete: 'CASCADE', // Or 'SET NULL' if you want to keep users when roles are deleted
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // You'll also need to add a down function to revert the changes
        const table = await queryRunner.getTable('users');
        const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf('roleId') !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey('users', foreignKey);
        }
        await queryRunner.dropTable('users');
    }
}