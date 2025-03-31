export class LoginResponseDto {
    access_token: string;
    user: {
      email: string;
      sub: number;
      roles: string;
      firstName: string;
      lastName: string;
      picture: string;
    };
  }