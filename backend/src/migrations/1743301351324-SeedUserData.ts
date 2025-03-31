import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedUserData1743301351324 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Get role IDs first
        const roles = await queryRunner.query(`SELECT id, name FROM roles`);
        const roleMap = new Map(roles.map(r => [r.name, r.id]));

        // Insert users with explicit role IDs
        await queryRunner.query(`
            INSERT INTO users 
                (school_id, email, first_name, last_name, role_id, created_at)
            VALUES
                ('21-1100JDC', 'juandelacruz@laverdad.edu.ph', 'Juan', 'Dela Cruz', 
                ${roleMap.get('Teaching Staff')}, NOW()),
                ('22-2200MSS', 'maria.santos@laverdad.edu.ph', 'Maria', 'Santos',
                ${roleMap.get('Program Head')}, NOW())
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM users`);
    }

}
