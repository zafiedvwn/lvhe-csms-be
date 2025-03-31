import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedNewRoles1743393483676 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO roles (name) VALUES 
              ('Student'),
              ('Staff');
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM roles WHERE name IN ('Student', 'Staff');
        `);
    }

}
