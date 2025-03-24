import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Initiates the Google OAuth flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const user = req.user;

    // Validate or register the user with firstName and lastName
    const validatedUser = await this.authService.validateUser(
      user.email,
      user.firstName,
      user.lastName,
    );

    if (!validatedUser) {
      // If the user cannot be validated or registered, redirect to the failure page
      return res.redirect('/auth/failure');
    }

    // Generate a JWT token for the user
    const token = await this.authService.login(validatedUser);

    // Redirect to the success page with the JWT token
    return res.redirect(`/auth/success?token=${token.access_token}`);
  }

  @Get('success')
  async success(@Req() req, @Res() res: Response) {
    const token = req.query.token;
    res.send(`Login successful! Token: ${token}`);
  }

  @Get('failure')
  async failure(@Req() req, @Res() res: Response) {
    res.send('Login failed. Only institutional emails are allowed.');
  }
}