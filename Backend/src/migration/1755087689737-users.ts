import { MigrationInterface, QueryRunner, Table } from "typeorm";

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
                        isUnique: true, // Add unique constraint
                    },
                    {
                        name: 'phone',
                        type: 'varchar', // Changed to varchar to accommodate phone number formats
                        isNullable: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar', // Changed to varchar to accommodate hashed passwords
                        isNullable: false,
                    },
                    // Add the new role column here
                    {
                        name: 'role',
                        type: 'varchar',
                        default: "'user'", // Set a default value
                        isNullable: false,
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }
}