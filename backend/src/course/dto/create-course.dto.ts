import { IsString, IsNotEmpty, IsNumber, Matches, IsIn } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  course_name: string;

  @IsString()
  @IsNotEmpty()
  course_code: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}:\d{2}$/)
  duration: string; // Format: "HH:MM:SS"
  
  @IsIn(['First', 'Second'])
  semester: string; // 'First' or 'Second'

  @IsNumber()
  year: number; // e.g. 1 (year)

  @IsNumber()
  @IsNotEmpty()
  program_id: number;

}