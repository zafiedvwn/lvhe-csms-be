export class CreateScheduleDto {
  start_time: Date; // Start time of the schedule
  end_time: Date; // End time of the schedule
  day: Date; // Day of the schedule
  user_id: number; // ID of the user (instructor)
  course_id: number; // ID of the course
  program_id: number; // ID of the program
  room_id: number; // ID of the room
}