import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { User } from '../user/entities/user.entity';
import { Program } from '../program/entities/program.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, User, Program])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
