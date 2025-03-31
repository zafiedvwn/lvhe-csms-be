import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { User } from '../user/entities/user.entity';
import { Program } from '../program/entities/program.entity';
import { RoleService } from '../role/role.service';
import { TeachingStaffAvailability } from '../teaching-staff-availability/entities/teaching-staff-availability.entity';
import { RoleModule } from 'src/role/role.module';
import { Role } from 'src/role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Course, 
    User, 
    Program, 
    RoleService, 
    TeachingStaffAvailability,
    Role
  ]),
  RoleModule
],
  controllers: [CourseController],
  providers: [CourseService, RoleService],
})
export class CourseModule {}
