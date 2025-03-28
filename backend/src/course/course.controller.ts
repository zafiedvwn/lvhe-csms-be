import { Controller, Post, Body, UseGuards, Put, Param, Get, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
// import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AssignTeacherDto } from '../course/dto/assign-teacher.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Admin')
  async create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Put(':id/teacher')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Admin')
  async assignTeacher(
    @Param('id') courseId: number,
    @Body() assignTeacherDto: AssignTeacherDto
  ) {
    return this.courseService.assignTeacher(courseId, assignTeacherDto.teacher_id);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('Admin')
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.courseService.findAll(paginationDto);
  }
}