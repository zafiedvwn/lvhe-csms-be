import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUniqueKeyInCourseCode1743316298622 implements MigrationInterface {
    name = 'RemoveUniqueKeyInCourseCode1743316298622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop the unique constraint
        await queryRunner.query(`ALTER TABLE course DROP CONSTRAINT IF EXISTS UQ_e3a6d871e7e62c5cf609e892e7c`);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {  
        // Re-add the unique constraint
        await queryRunner.query(`ALTER TABLE course ADD CONSTRAINT UQ_e3a6d871e7e62c5cf609e892e7c UNIQUE (course_code)`);
    }

}
