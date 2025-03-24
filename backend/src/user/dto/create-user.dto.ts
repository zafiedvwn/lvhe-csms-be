export class CreateUserDto {
  email: string; // Email of the user
  firstName: string; // First name of the user
  lastName: string; // Last name of the user
  profile_picture: string; // Profile picture URL (optional)
  program_id: number; // ID of the program
  role_id: number; // ID of the role
}
