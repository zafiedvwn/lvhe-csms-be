import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService, 
    private roleService: RoleService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_REDIRECT_URI'),
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const email = emails[0].value;

    // Get allowed domains from environment variables
    const allowedDomains = this.configService
      .get<string>('ALLOWED_DOMAINS', '')
      .split(',')
      .map(domain => domain.trim())
      .filter(domain => domain.length > 0);

    if (allowedDomains.length > 0) {
      const isAllowed = allowedDomains.some(domain => 
        email.endsWith(domain)
      );
      if (!isAllowed) {
        return done(new Error('Only institutional emails are allowed'), null);
      }
    }

    // Determine role based on email domain
    const studentDomain = this.configService.get<string>('STUDENT_EMAIL_DOMAIN', '@student.laverdad.edu.ph');
    const isStudent = email.endsWith(studentDomain);
    const roleName = isStudent ? 'Student' : 'Staff';

    // Get or create the role
    let role: Role;
    try {
      role = await this.roleService.findRoleByName(roleName);
    } catch (e) {
      role = await this.roleService.createRole(roleName);
    }

    const user = {
      email,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value || this.configService.get<string>('DEFAULT_PROFILE_PICTURE'),
      accessToken,
      role,
    };

    // Pass the user to the callback
    done(null, user);
  }
}
