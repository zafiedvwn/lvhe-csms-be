import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameProgramIdColumn1743315665728 implements MigrationInterface {
    name = 'RenameProgramIdColumn1743315665728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_ce95fbbdce48fed7737b87f44bd"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_edaf44538bef67012ac990c5ac4"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "programId" TO "program_id"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "programId"`);
        await queryRunner.query(`ALTER TABLE "course" ADD "program_id" integer`);
        await queryRunner.query(`CREATE INDEX "IDX_fae9ba244fba317939b1905609" ON "course" ("teaching_staff_id") `);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_b119153e3c1b0cc68ae086f265d" FOREIGN KEY ("program_id") REFERENCES "program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_dacca84e4a184d4887a60d0f1d9" FOREIGN KEY ("program_id") REFERENCES "program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_dacca84e4a184d4887a60d0f1d9"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_b119153e3c1b0cc68ae086f265d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fae9ba244fba317939b1905609"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "program_id"`);
        await queryRunner.query(`ALTER TABLE "course" ADD "programId" integer`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "program_id" TO "programId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_edaf44538bef67012ac990c5ac4" FOREIGN KEY ("programId") REFERENCES "program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_ce95fbbdce48fed7737b87f44bd" FOREIGN KEY ("programId") REFERENCES "program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
