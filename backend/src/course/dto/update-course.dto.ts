import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCourseDto {
    @IsString()
    @IsOptional()
    course_name?: string;
  
    @IsString()
    @IsOptional()
    course_code?: string;

    @IsString()
    @IsOptional()
    duration?: string;
  
    @IsNumber()
    @IsOptional()
    program_id?: number;
  
    @IsNumber()
    @IsOptional()
    teacher_id?: number;
    
    @IsString()
    @IsOptional()
    semester?: string;

    @IsNumber()
    @IsOptional()
    year?: number;

  }