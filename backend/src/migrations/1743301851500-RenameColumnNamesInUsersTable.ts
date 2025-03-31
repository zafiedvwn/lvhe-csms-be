import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameColumnNamesInUsersTable1743301851500 implements MigrationInterface {
    name = 'RenameColumnNamesInUsersTable1743301851500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "first_name" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_name" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastName" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "firstName" character varying`);
    }
}
