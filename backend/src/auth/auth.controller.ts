import { Controller, Get, Req, Res, UseGuards, Post, UseFilters, Body, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { LoginResponseDto } from './dto/login-response.dto';
import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Initiates the Google OAuth flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    if (!req.user) {
      return res.redirect(`${this.configService.get('FRONTEND_URL')}/login?error=auth_failed`);
    }

    try {
    // Validate or create user in your database
    const user = await this.authService.validateUser(
      req.user.email,
      req.user.firstName,
      req.user.lastName,
      req.user.picture,
      req.user.role
    );

    // Generate JWT token
    const { access_token } = await this.authService.login(user);

    // Redirect to frontend with token in POST body
    return res.redirect(
      `${this.configService.get('FRONTEND_URL')}/auth/success?token=${access_token}`
    );
  } catch (error) {
    return res.redirect(`${this.configService.get('FRONTEND_URL')}/login?error=${error.message}`);
  }
}

@Post('token')
@UseFilters(HttpExceptionFilter)
async verifyToken(@Body('token') token: string) {
    const payload = this.authService.verifyToken(token);
    return { 
      valid: true, 
      user: {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        role: payload.roles
      }
    };
  }


  @Get('status')
  @UseGuards(AuthGuard('jwt'))
  status(@Req() req) {
    return req.user;
  }
}

  // @Post('login')
  // async login(@Body() body: { email: string; password: string }) {
  //   // Temporary hardcoded user for testing
  //   const testUser = {
  //     id: 1,
  //     email: 'admin@laverdad.edu.ph',
  //     role: { name: 'College Secretary' },
  //     password: 'admin123'
  //   };

  //   if (body.email !== testUser.email || body.password !== testUser.password) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }

  //   return this.authService.login(testUser);
  // }
