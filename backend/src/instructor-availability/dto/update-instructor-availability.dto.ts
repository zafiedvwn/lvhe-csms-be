import { PartialType } from '@nestjs/mapped-types';
import { CreateInstructorAvailabilityDto } from './create-instructor-availability.dto';

export class UpdateInstructorAvailabilityDto extends PartialType(CreateInstructorAvailabilityDto) {}
