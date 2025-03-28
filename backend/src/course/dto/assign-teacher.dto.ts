import { IsNumber, IsNotEmpty } from 'class-validator';

export class AssignTeacherDto {
    @IsNumber()
    @IsNotEmpty()
    teacher_id: number;
  }
