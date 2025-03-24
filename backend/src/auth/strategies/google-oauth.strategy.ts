import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_REDIRECT_URI'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };

    // Get allowed domains from environment variables
    const allowedDomains = (this.configService
      .get<string>('ALLOWED_DOMAINS') || '')
      .split(',')
      .map(domain => domain.trim())
      .filter(domain => domain.length > 0);

    // Check if the email ends with any of the allowed domains
    const isInstitutionalEmail = allowedDomains.some((domain) =>
      user.email.endsWith(domain),
    );

    if (!isInstitutionalEmail) {
      return done(new Error('Only institutional emails are allowed.'), null);
    }

    // Pass the user to the callback
    done(null, user);
  }
}