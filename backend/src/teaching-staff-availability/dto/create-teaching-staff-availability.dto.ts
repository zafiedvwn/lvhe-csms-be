export class CreateTeachingStaffAvailabilityDto {
  day: string; // Day of the week
  start_time: Date; // Start time of availability
  end_time: Date; // End time of availability
  user_id: number; // ID of the instructor
}