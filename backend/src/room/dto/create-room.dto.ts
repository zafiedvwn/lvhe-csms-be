export class CreateRoomDto {
  room_name: string; // Name of the room
  room_type: string; // Type of the room (e.g., "Lecture Hall", "Lab")
  floor: string; // Floor where the room is located
  capacity: string; // Capacity of the room
}