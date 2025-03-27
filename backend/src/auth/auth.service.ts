import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, firstName?: string, lastName?: string): Promise<User | null> {
    // Check if the user already exists in the database
    const user = await this.userService.findOneByEmail(email);
    
    if (user) {
      // If the user exists, return the user
      return user;
    }

    // If the user doesn't exist, create a new user with firstName and lastName
    return this.userService.createUser({ email, firstName, lastName });
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id,
      name: `${user.firstName} ${user.lastName}`,
      picture: user.picture
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: payload
    };
  }

  // async generateTokens(user: User) {
  //   // Include roles in the JWT payload
  //   const payload = { email: user.email, sub: user.id, roles: user.role.role };
  //   const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
  //   const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

  //   await this.userService.updateUserRefreshToken(user.id, refreshToken);
  //   return { accessToken, refreshToken };
  // }

  // async refreshTokens(refreshToken: string) {
  //   const user = await this.userService.findOneByRefreshToken(refreshToken);
  //   if (!user) throw new UnauthorizedException('Invalid refresh token');

  //   const tokens = await this.generateTokens(user);
  //   await this.userService.updateUserRefreshToken(user.id, tokens.refreshToken);
  //   return tokens;
  // }

  // async logout(userId: number) {
  //   await this.userService.updateUserRefreshToken(userId, null);
  // }
}