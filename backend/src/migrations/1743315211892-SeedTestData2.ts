import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedTestData21743315211892 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Insert program
    await queryRunner.query(`
        INSERT INTO program (program_name, program_code) VALUES
          ('Bachelor of Science in Information Systems', 'BSIS'),
          ('Bachelor of Arts in Broadcasting', 'BAB'),
          ('Bachelor of Science in Accountancy', 'BSA'),
          ('Bachelor of Science in Accounting Information Systems', 'BSAIS'),
          ('Bachelor of Science in Social Work', 'BSSW'),
          ('Associate in Computer Technology', 'ACT'),
          ('International Cookery - Cookery NC II', 'Cookery'),
          ('Health Care Services NC II', 'HCS');
      `);
  
      // Insert Users
      await queryRunner.query(`
        INSERT INTO users 
          (school_id, email, first_name, last_name, role_id, program_id)
        VALUES
          -- Teaching Staff
          ('21-1100JFC', 'julianfernandocasablancas@laverdad.edu.ph', 'Julian Fernando', 'Casablancas', 
           (SELECT id FROM roles WHERE name = 'Teaching Staff'),
           (SELECT id FROM program WHERE program_code = 'BSIS')),
          
          ('21-1100CDS', 'carlossainz@laverdad.edu.ph', 'Carlos', 'Sainz',
           (SELECT id FROM roles WHERE name = 'Teaching Staff'),
           (SELECT id FROM program WHERE program_code = 'BSSW')),
          
          -- Program Heads
          ('22-2200ABC', 'johndoe@laverdad.edu.ph', 'John', 'Doe',
           (SELECT id FROM roles WHERE name = 'Program Head'),
           (SELECT id FROM program WHERE program_code = 'BSIS')),
          
          -- College Secretary (no program)
          ('23-3300XYZ', 'admin@laverdad.edu.ph', 'Admin', 'User',
           (SELECT id FROM roles WHERE name = 'College Secretary'), NULL);
      `);
  
      // Insert Courses
      await queryRunner.query(`
        -- Insert Courses for BSIS
        INSERT INTO course
          (course_name, course_code, duration, semester, year, program_id)
        VALUES
          ('Computer Programming 1', 'CP101', '03:00:00', 'First', 1,
           (SELECT id FROM program WHERE program_code = 'BSIS')),
          ('Broadcasting Fundamentals', 'BF101', '03:00:00', 'First', 1,
           (SELECT id FROM program WHERE program_code = 'BAB')),
          ('Cost Accounting', 'CA101', '03:00:00', 'First', 1,
           (SELECT id FROM program WHERE program_code = 'BSA')),
          ('Financial Accounting 1', 'FA101', '03:00:00', 'First', 1,
           (SELECT id FROM program WHERE program_code = 'BSAIS')),
          ('Social Work 2', 'SW201', '03:00:00', 'Second', 2,
           (SELECT id FROM program WHERE program_code = 'BSSW')),
          ('Programming Essentials', 'PE101', '03:00:00', 'First', 1,
           (SELECT id FROM program WHERE program_code = 'ACT')),
          ('Food Preparation', 'FP101', '03:00:00', 'First', 1,
           (SELECT id FROM program WHERE program_code = 'Cookery')),
          ('First Aid and CPR', 'FAC101', '03:00:00', 'First', 1,
           (SELECT id FROM program WHERE program_code = 'HCS'));
      `);
  
      // Insert Teaching Staff Availability
      await queryRunner.query(`
        INSERT INTO teaching_staff_availability 
          (day, start_time, end_time, teaching_staff_id)
        VALUES
          -- Julian Fernando (BSIS) Availability
          ('Monday', '09:00:00', '11:00:00', 
           (SELECT id FROM users WHERE school_id = '21-1100JFC')),
          ('Monday', '13:00:00', '17:00:00', 
           (SELECT id FROM users WHERE school_id = '21-1100JFC')),
          
          -- Carlos Sainz (BSSW) Availability
          ('Wednesday', '08:00:00', '12:00:00', 
           (SELECT id FROM users WHERE school_id = '21-1100CDS'));
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM teaching_staff_availability`);
        await queryRunner.query(`DELETE FROM course`);
        await queryRunner.query(`DELETE FROM users`);
        await queryRunner.query(`DELETE FROM roles`);
        await queryRunner.query(`DELETE FROM program`);
    }

}
