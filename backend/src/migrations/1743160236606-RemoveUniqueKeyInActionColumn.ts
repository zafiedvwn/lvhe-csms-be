import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUniqueKeyInActionColumn1743160236606 implements MigrationInterface {
    name = 'RemoveUniqueKeyInActionColumn1743160236606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "UQ_1c1e0637ecf1f6401beb9a68abe"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "UQ_1c1e0637ecf1f6401beb9a68abe" UNIQUE ("action")`);
    }

}
