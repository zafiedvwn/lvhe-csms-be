import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProgramModule } from './program/program.module';
import { CourseModule } from './course/course.module';
import { ScheduleModule } from './schedule/schedule.module';
import { RoomModule } from './room/room.module';
import { RoleModule } from './role/role.module';
import { RequestModule } from './request/request.module';
import { TeachingStaffAvailabilityModule } from './teaching-staff-availability/teaching-staff-availability.module';
import { AuthModule } from './auth/auth.module';
import { PermissionModule } from './permission/permission.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration global
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        synchronize: false, // Disable synchronize in production
        // migrations: ['src/migrations/*.ts'], // Path to migrations
        // migrationsRun: true, // Automatically run migrations on startup
        logging: true, // Enable logging for debugging
        autoLoadEntities: true,
      }),
    }),

    UserModule,

    ProgramModule,

    CourseModule,

    ScheduleModule,

    RoomModule,

    RoleModule,

    RequestModule,

    TeachingStaffAvailabilityModule,

    AuthModule,

    PermissionModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
