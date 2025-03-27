import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          // Check cookies first
          if (req.cookies?.access_token) {
            return req.cookies.access_token;
          }
          
          // Then check authorization header
          if (req.headers.authorization?.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
          }
          
          // Then check request body (for POST requests)
          if (req.body?.token) {
            return req.body.token;
          }
          
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: any) {
    return { 
      userId: payload.sub, 
      email: payload.email,
      name: payload.name,
      picture: payload.picture
    };
  }
}
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: configService.get<string>('JWT_SECRET')!,
//     });
//   }

//   async validate(payload: any) {
//     return { userId: payload.sub, email: payload.email };
//   }
// }
