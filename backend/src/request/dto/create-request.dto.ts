export class CreateRequestDto {
  request_type: string; // Type of request (e.g., "Room Change")
  status: string; // Status of the request (e.g., "Pending")
  approved_at: Date; // Timestamp when the request was approved
  rejected_at: Date; // Timestamp when the request was rejected
  user_id: number; // ID of the user making the request
  course_id: number; // ID of the course
  room_id: number; // ID of the room
  schedule_id: number; // ID of the schedule
}