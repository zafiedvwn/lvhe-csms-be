import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsPublishedInScheduleTable1743042370815 implements MigrationInterface {
    name = 'AddIsPublishedInScheduleTable1743042370815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" ADD "is_published" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "is_published"`);
    }

}
