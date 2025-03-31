import { MigrationInterface, QueryRunner } from "typeorm";

export class TeachingStaffTableChangesAndCourseManagement1743142603457 implements MigrationInterface {
    name = 'TeachingStaffTableChangesAndCourseManagement1743142603457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_36d7b8e1a331102ec9161e879ce"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."teaching_staff_availability_day_enum" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')`);
        await queryRunner.query(`CREATE TABLE "teaching_staff_availability" ("id" SERIAL NOT NULL, "day" "public"."teaching_staff_availability_day_enum" NOT NULL, "start_time" TIME NOT NULL, "end_time" TIME NOT NULL, "is_recurring" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "teaching_staff_id" integer, CONSTRAINT "PK_93709196c08037ef1557c6e5445" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "deleted_at" TIMESTAMP`);
        // await queryRunner.query(`ALTER TABLE "users" ADD "school_id" character varying NOT NULL`);
        // await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_25e1cf8f41bae2f3d11f3c2a028" UNIQUE ("school_id")`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "UQ_1c1e0637ecf1f6401beb9a68abe" UNIQUE ("action")`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_36d7b8e1a331102ec9161e879ce" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teaching_staff_availability" ADD CONSTRAINT "FK_7a0219d002ea4cf3a91e5d5bf11" FOREIGN KEY ("teaching_staff_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`ALTER TABLE "teaching_staff_availability" DROP CONSTRAINT "FK_7a0219d002ea4cf3a91e5d5bf11"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_36d7b8e1a331102ec9161e879ce"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "UQ_1c1e0637ecf1f6401beb9a68abe"`);
        // await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_25e1cf8f41bae2f3d11f3c2a028"`);
        // await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "school_id"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "created_at"`);
        await queryRunner.query(`DROP TABLE "teaching_staff_availability"`);
        await queryRunner.query(`DROP TYPE "public"."teaching_staff_availability_day_enum"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_36d7b8e1a331102ec9161e879ce" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
