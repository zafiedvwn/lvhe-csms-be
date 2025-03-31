import { IsNumber, IsNotEmpty } from 'class-validator';

export class AssignTeachingStaffDto {
  @IsNumber()
  @IsNotEmpty()
  teachingStaffId: number; // ID of the Teaching Staff user
}