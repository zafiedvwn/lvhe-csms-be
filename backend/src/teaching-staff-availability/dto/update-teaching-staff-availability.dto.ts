import { PartialType } from '@nestjs/mapped-types';
import { CreateTeachingStaffAvailabilityDto } from './create-teaching-staff-availability.dto';

export class UpdateTeachingStaffAvailabilityDto extends PartialType(CreateTeachingStaffAvailabilityDto) {}
