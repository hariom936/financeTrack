import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { Role } from "../entity/Role";
export class Roles1755087983724 implements MigrationInterface {

     public async up(queryRunner: QueryRunner): Promise<void> {
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
                        isUnique: true,
                        isNullable: false,
                    },
                ],
            }),
        );

        // Insert the default roles
        await queryRunner.manager.createQueryBuilder()
            .insert()
            .into('role')
            .values([
                { name: 'admin' },
                { name: 'user' },
                { name: 'read-only' },
            ])
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('role');
    }

}
