import { Controller, Get, Req, Res, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

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

    // Validate or create user in your database
    const user = await this.authService.validateUser(req.user.email);
    
    if (!user) {
      return res.redirect(`${this.configService.get('FRONTEND_URL')}/login?error=user_not_found`);
    }

    // Generate JWT token
    const { access_token } = await this.authService.login({
      ...req.user,
      id: user.id
    });

    const csrfToken = crypto.randomBytes(16).toString('hex');
    res.cookie('csrf_token', csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });

    // Render a page that posts the token back to frontend
    res.send(`
      <html>
        <body>
          <form id="form" action="${this.configService.get('FRONTEND_URL')}/api/auth/callback" method="POST">
            <input type="hidden" name="token" value="${access_token}" />
          </form>
          <script>document.getElementById('form').submit();</script>
        </body>
      </html>
    `);
    }

    @Post('status')
    @UseGuards(AuthGuard('jwt'))
    async verifyToken(@Req() req) {
      return req.user;
    }

    // Redirect to frontend with token
//     res.redirect(`${this.configService.get('FRONTEND_URL')}/auth/success?token=${access_token}`);
//   }

//   @Get('status')
//   @UseGuards(AuthGuard('jwt'))
//   status(@Req() req) {
//     return req.user;
//   }
// }
    
//     const user = req.user;

//     // Validate or register the user with firstName and lastName
//     const validatedUser = await this.authService.validateUser(
//       user.email,
//       user.firstName,
//       user.lastName,
//     );

//     if (!validatedUser) {
//       // If the user cannot be validated or registered, redirect to the failure page
//       return res.redirect('/auth/failure');
//     }

//     // Generate a JWT token for the user
//     const token = await this.authService.login(validatedUser);

//     // Redirect to the success page with the JWT token
//     return res.redirect(`/auth/success?token=${token.access_token}`);
//   }

//   @Get('success')
//   async success(@Req() req, @Res() res: Response) {
//     const token = req.query.token;
//     res.send(`Login successful! Token: ${token}`);
//   }

//   @Get('failure')
//   async failure(@Req() req, @Res() res: Response) {
//     res.send('Login failed. Only institutional emails are allowed.');
//   }
}