import { Controller, Post, Body, UseGuards, Put, Param, Req, Get, Delete, Patch, Query, ParseIntPipe } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AssignTeachingStaffDto } from './dto/assign-teaching-staff.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Controller('course')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Roles('College Secretary', 'Program Head')
  @ApiOperation({ summary: 'Create new course' })
  create(@Body() dto: CreateCourseDto, @Req() req) {
    return this.courseService.create(dto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'List all courses' })
  findAll(@Query() pagination: PaginationDto) {
    return this.courseService.findAll(pagination);
  }

  @Patch(':id')
  @Roles('College Secretary', 'Program Head')
  @ApiOperation({ summary: 'Update course' })
  update(@Param('id') id: number, @Body() dto: UpdateCourseDto, @Req() req) {
    return this.courseService.update(id, dto, req.user);
  }

  @Delete(':id')
  @Roles('College Secretary')
  @ApiOperation({ summary: 'Delete course' })
  remove(@Param('id') id: number, @Req() req) {
    return this.courseService.remove(id, req.user);
  }

  @Put(':id/assign-teaching-staff')
  @Roles('College Secretary', 'Program Head')
  @ApiOperation({ summary: 'Assign Teaching Staff to course' })
  @ApiResponse({ status: 200, description: 'Assignment successful' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Course or Teacher not found' })
  async assignTeachingStaff(
    @Param('id',ParseIntPipe) courseId: number,
    @Body() dto: AssignTeachingStaffDto,
    @Req() req
  ) {
    return this.courseService.assignTeachingStaff(courseId, dto.teachingStaffId, req.user);
  }

}