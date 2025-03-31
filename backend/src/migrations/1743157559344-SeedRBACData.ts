import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedRBACData1743157559344 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO roles (name) VALUES 
              ('Teaching Staff'),
              ('Program Head'),
              ('College Secretary');
          `);

        // Insert Permissions
        await queryRunner.query(`
            -- Teaching Staff Permissions
            INSERT INTO permissions (resource, action, role_id)
            VALUES ('availability', 'manage', (SELECT id FROM roles WHERE name = 'Teaching Staff'));
        
            -- Program Head Permissions
            INSERT INTO permissions (resource, action, role_id) VALUES
                ('program', 'read', (SELECT id FROM roles WHERE name = 'Program Head')),
                ('course', 'create', (SELECT id FROM roles WHERE name = 'Program Head')),
                ('teaching_staff', 'assign', (SELECT id FROM roles WHERE name = 'Program Head')),
                ('teaching_staff', 'read', (SELECT id FROM roles WHERE name = 'Program Head')),
                ('teaching_staff', 'update', (SELECT id FROM roles WHERE name = 'Program Head'));
            
            -- College Secretary Permissions
            INSERT INTO permissions (resource, action, role_id) VALUES
                ('program', 'create', (SELECT id FROM roles WHERE name = 'College Secretary')),
                ('course', 'create', (SELECT id FROM roles WHERE name = 'College Secretary')),
                ('teaching_staff', 'assign', (SELECT id FROM roles WHERE name = 'College Secretary')),
                ('teaching_staff', 'read', (SELECT id FROM roles WHERE name = 'College Secretary')),
                ('teaching_staff', 'update', (SELECT id FROM roles WHERE name = 'College Secretary'));
        `);

        // Sample Users
        await queryRunner.query(`
            INSERT INTO users (school_id, email, firstName, lastName, role_id) VALUES
            ('21-1100JDC', 'juandelacruz@laverdad.edu.ph', 'Juan', 'Dela Cruz', 
            (SELECT id FROM roles WHERE name = 'Teaching Staff')),
              
            ('22-2200MSS', 'maria.santos@laverdad.edu.ph', 'Maria', 'Santos',
            (SELECT id FROM roles WHERE name = 'Program Head'));


      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM permissions`);
        await queryRunner.query(`DELETE FROM roles`);
    }

}
