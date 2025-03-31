import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSchoolIdAndDropInstructorAvailabilityAndRoleTables1743143282341 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "role"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "instructor_availability"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "school_id" character varying`);
        await queryRunner.query(`UPDATE "users" SET school_id = 'default-school-id' WHERE school_id IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "school_id" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "school_id"`);
    }

}
