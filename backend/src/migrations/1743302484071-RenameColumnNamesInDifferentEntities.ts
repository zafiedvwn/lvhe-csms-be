import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameColumnNamesInDifferentEntities1743302484071 implements MigrationInterface {
    name = 'RenameColumnNamesInDifferentEntities1743302484071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_3e002f760e8099dd5796e5dc93b"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`ALTER TABLE "course" RENAME COLUMN "teacherId" TO "teaching_staff_id"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "roleId" TO "role_id"`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_fae9ba244fba317939b1905609d" FOREIGN KEY ("teaching_staff_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_fae9ba244fba317939b1905609d"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "role_id" TO "roleId"`);
        await queryRunner.query(`ALTER TABLE "course" RENAME COLUMN "teaching_staff_id" TO "teacherId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_3e002f760e8099dd5796e5dc93b" FOREIGN KEY ("teacherId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
