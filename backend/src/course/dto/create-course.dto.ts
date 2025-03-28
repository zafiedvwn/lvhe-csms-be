import { IsString, IsNotEmpty, IsTimeZone, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  course_name: string;

  @IsString()
  @IsNotEmpty()
  course_code: string;

  @IsString()
  @IsNotEmpty()
  duration: string; // Format: "HH:MM:SS"
  
  @IsNumber()
  @IsNotEmpty()
  program_id: number;
  
  @IsNumber()
  teacher_id: number;

  @IsString()
  semester: string; // 'First' or 'Second'

  @IsNumber()
  year: number; // e.g. 2025
}