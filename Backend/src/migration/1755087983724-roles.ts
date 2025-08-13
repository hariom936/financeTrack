import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { Role } from "../entity/Role";
export class Roles1755087983724 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create the roles table
        await queryRunner.createTable(
            new Table({
                name: 'role',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '50',
                        isUnique: true,
                        isNullable: false,
                    },
                ],
            }),
            true // The `true` parameter checks if the table already exists
        );

        // Insert the default roles
        await queryRunner.manager.save(Role, [
            { name: 'admin' },
            { name: 'user' },
            { name: 'read-only' },
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the roles table
        await queryRunner.dropTable('role');
    }

}
