import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { Program } from '../program/entities/program.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { User } from '../user/entities/user.entity';
import { PaginationDto } from '../shared/dto/pagination.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    // Verify program exists
    const program = await this.programRepository.findOne({
      where: { id: createCourseDto.program_id }
    });

    if (!program) {
      throw new NotFoundException('Program not found');
    }

    // Check if course code already exists
    const existingCourse = await this.courseRepository.findOne({
      where: { course_code: createCourseDto.course_code }
    });

    if (existingCourse) {
      throw new ConflictException('Course code already exists');
    }

    const course = this.courseRepository.create({
      ...createCourseDto,
      program
    });

    return this.courseRepository.save(course);
    }
  
  async assignTeacher(courseId: number, teacherId: number) {
    // Find course
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['program']
    });
    if (!course) throw new NotFoundException('Course not found');
  
    // Find and validate teacher
    const teacher = await this.userRepository.findOne({
      where: { id: teacherId },
      relations: ['role']
    });
    
    if (!teacher) throw new NotFoundException('Teacher not found');
    
    const isTeacher = teacher.role.role === 'Teacher';
    if (!isTeacher) throw new ForbiddenException('User is not a teacher');
  
    // Assign teacher
    course.teacher = teacher;
    return this.courseRepository.save(course);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const [courses, total] = await this.courseRepository.findAndCount({
      relations: ['program', 'teacher'],
      skip: (page - 1) * limit,
      take: limit,
    });
  
    return {
      data: courses,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / limit),
      }
    };
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');
  
    // Prevent duplicate course codes
    if (updateCourseDto.course_code && updateCourseDto.course_code !== course.course_code) {
      const exists = await this.courseRepository.findOne({ 
        where: { course_code: updateCourseDto.course_code } 
      });
      if (exists) throw new ConflictException('Course code already exists');
    }
  
    return this.courseRepository.save({
      ...course,
      ...updateCourseDto
    });
  }
}