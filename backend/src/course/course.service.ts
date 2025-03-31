import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { Program } from '../program/entities/program.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { User } from '../user/entities/user.entity';
import { RoleService } from '../role/role.service';
import { TeachingStaffAvailability } from '../teaching-staff-availability/entities/teaching-staff-availability.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
    constructor(
      @InjectRepository(Course)
      private courseRepo: Repository<Course>,
      @InjectRepository(Program)
      private programRepo: Repository<Program>,
      @InjectRepository(User)
      private userRepo: Repository<User>,
      private roleService: RoleService,
      @InjectRepository(TeachingStaffAvailability)
      private teachingStaffAvailabilityRepo: Repository<TeachingStaffAvailability>
    ) {}
  
    async create(dto: CreateCourseDto, actor: User) {
      // Verify program exists
      const program = await this.programRepo.findOne({ 
        where: { id: dto.program_id }
      });
      if (!program) throw new NotFoundException('Program not found');
  
      // College Secretary can create any course
      // Program Head can only create courses in their program
      if (actor.role.name === 'Program Head' && actor.program?.id !== dto.program_id) {
        throw new ForbiddenException('Can only create courses in your program');
      }
  
      return this.courseRepo.save({ ...dto, program });
    }
  
    async assignTeachingStaff(courseId: number, teachingStaffId: number, actor: User) {
      const [course, teachingStaff] = await Promise.all([
        this.courseRepo.findOne({ // 1. Verify course exists and load its program
          where: { id: courseId },
          relations: ['program']
        }),
        this.userRepo.findOne({  // 2. Verify target user is a Teaching Staff
          where: { 
            id: teachingStaffId,
            role: { name: 'Teaching Staff' }
          },
          relations: ['program']
        })
      ]);
  
      if (!course) throw new NotFoundException('Course not found');
      if (!teachingStaff) throw new BadRequestException('Invalid: User is not a Teaching Staff');

      // 3. Permission checks
      // Program Head can only assign within their program
      if (actor.role.name === 'Program Head' && actor.program?.id !== course.program.id) {
        throw new ForbiddenException('Can only assign staff in your program');
      }

      if (teachingStaff.program?.id !== course.program.id) {
        throw new BadRequestException('Teacher is not in this program');
      }

      if (teachingStaffId === actor.id) {
        throw new BadRequestException('Cannot assign yourself');
      }

      const hasAvailability = await this.teachingStaffAvailabilityRepo.exist({
        where: { teaching_staff: { id: teachingStaffId } }
      });
      
      if (!hasAvailability) {
        throw new BadRequestException('Teacher has no availability set');
      }
  
      course.teaching_staff = teachingStaff;
      return this.courseRepo.save(course);
    }

    async getProgramCourses(programId: number, actor: User) {
      // Program Head can only access their program's courses
      if (actor.role.name === 'Program Head' && actor.program?.id !== programId) {
        throw new ForbiddenException('Can only view courses in your program');
      }

      return this.courseRepo.find({
        where: { program: { id: programId } },
        relations: ['teaching_staff', 'program']
      });
    }

    // READ
    async findAll(pagination: PaginationDto): Promise<PaginatedResponse<Course>> {
      const page = Number(pagination.page) || 1;
      const limit = Number(pagination.limit) || 10;

      if (page < 1) {
        throw new BadRequestException('Page must be greater than 0');
      }
      if (limit < 1) {
        throw new BadRequestException('Limit must be greater than 0');
      }

      const [data, total] = await this.courseRepo.findAndCount({
        relations: ['program', 'teaching_staff'],
        skip: (page - 1) * limit,
        take: limit
      });

      return { data, 
        meta: { 
          total,
          page,
          limit,
          last_page: Math.ceil(total / limit)
        } 
      };
    }

    // UPDATE
    async update(id: number, dto: UpdateCourseDto, actor: User): Promise<Course> {
      const course = await this.courseRepo.findOne({ 
        where: { id },
        relations: ['program'] 
      });
      if (!course) throw new NotFoundException('Course not found');

      if (actor.role.name === 'Program Head' && actor.program?.id !== course.program.id) {
        throw new ForbiddenException('Can only update courses in your program');
      }

      return this.courseRepo.save({ ...course, ...dto });
    }

    // DELETE
    async remove(id: number, actor: User): Promise<void> {
      const course = await this.courseRepo.findOne({ 
        where: { id },
        relations: ['program'] 
      });
      if (!course) throw new NotFoundException('Course not found');

      if (actor.role.name !== 'College Secretary') {
        throw new ForbiddenException('Only College Secretary can delete courses');
      }

      await this.courseRepo.remove(course);
    }
}