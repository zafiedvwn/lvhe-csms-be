import { Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleOAuthStrategy } from './strategies/google-oauth.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
@Module({
  imports: [
    UserModule,
    // PassportModule for authentication
    // PassportModule.register({ defaultStrategy: 'jwt' }),

    // JwtModule for JWT token generation and validation
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),

    // TypeOrmModule to access the User entity
    // TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleOAuthStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}