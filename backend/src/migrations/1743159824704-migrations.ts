import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1743159824704 implements MigrationInterface {
    name = 'Migrations1743159824704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_36d7b8e1a331102ec9161e879ce"`);
        await queryRunner.query(`ALTER TABLE "permissions" RENAME COLUMN "roleId" TO "role_id"`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_f10931e7bb05a3b434642ed2797" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_f10931e7bb05a3b434642ed2797"`);
        await queryRunner.query(`ALTER TABLE "permissions" RENAME COLUMN "role_id" TO "roleId"`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_36d7b8e1a331102ec9161e879ce" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
