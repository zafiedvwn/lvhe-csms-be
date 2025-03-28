// src/modules/course/course.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Program } from '../program/entities/program.entity';
import { describe, beforeEach, it, expect, jest } from '@jest/globals';


describe('CourseService', () => {
  let service: CourseService;
  let courseRepository: jest.Mocked<Repository<Course>>;
  let programRepository: jest.Mocked<Repository<Program>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: getRepositoryToken(Course),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            findAndCount: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Program),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    courseRepository = module.get(getRepositoryToken(Course));
    programRepository = module.get(getRepositoryToken(Program));
  });

  describe('create', () => {
    it('should successfully create a course', async () => {
      const createCourseDto: CreateCourseDto = {
        teacher_id: 1,
        course_name: 'Math 101',
        course_code: 'MATH101',
        program_id: 1,
        duration: '01:00:00',
        semester: 'First',
        year: 2025,
      };

      const mockProgram = {
        id: 1,
        program_name: 'Computer Science',
        program_code: 'CS',
        // Add other required fields from Program entity
      } as Program;

      const mockCourse = {
        id: 1,
        ...createCourseDto,
        program: mockProgram,
        teacher: null, // Add teacher field since it's defined in Course entity
      } as unknown as Course;

      programRepository.findOne.mockResolvedValue(mockProgram);
      courseRepository.create.mockReturnValue(mockCourse);
      courseRepository.save.mockResolvedValue(mockCourse);
      courseRepository.findOne.mockResolvedValue(null); // For duplicate check

      const result = await service.create(createCourseDto);
      expect(result).toEqual(mockCourse);
      expect(courseRepository.save).toHaveBeenCalledWith(mockCourse);
    });
  });

  describe('findAll', () => {
    it('should return paginated courses', async () => {
      const mockCourses = [
        { id: 1, course_name: 'Math 101', program: { id: 1 } },
        { id: 2, course_name: 'Physics 101', program: { id: 1 } },
      ] as Course[];

      courseRepository.findAndCount.mockResolvedValue([mockCourses, 2]);

      const result = await service.findAll({ page: 1, limit: 10 });
      expect(result.data.length).toBe(2);
      expect(result.meta.total).toBe(2);
    });
  });
});