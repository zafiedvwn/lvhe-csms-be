import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPermissionTableAndUpdateUserRoleEntity1742798768792 implements MigrationInterface {
    name = 'AddPermissionTableAndUpdateUserRoleEntity1742798768792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "resource" character varying NOT NULL, "action" character varying NOT NULL, "roleId" integer, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_36d7b8e1a331102ec9161e879ce" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_36d7b8e1a331102ec9161e879ce"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
    }

}
