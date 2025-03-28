import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Course } from '../course/entities/course.entity';
import { Room } from '../room/entities/room.entity';
import { Schedule } from './entities/schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstructorAvailabilityService } from '../instructor-availability/instructor-availability.service';

@Injectable()
export class ScheduleService {
  // constructor(
  //   @InjectRepository(Schedule)
  //   private readonly scheduleRepository: Repository<Schedule>,
  //   @InjectRepository(Course)
  //   private readonly courseRepository: Repository<Course>,
  //   @InjectRepository(Room)
  //   private readonly roomRepository: Repository<Room>,
  //   private readonly instructorAvailabilityService: InstructorAvailabilityService,
  // ) {}

  // async generateSchedule(programId: number) {
  //   // 1. Get all courses for the program
  //   const courses = await this.courseRepository.find({ 
  //     where: { program_id: programId } 
  //   });
  
  //   // 2. Get available rooms
  //   const rooms = await this.roomRepository.find();
  
  //   // 3. Generate possible time slots
  //   const schedules: Schedule[] = [];
    
  //   for (const course of courses) {
  //     const instructor = course.instructor;
  //     const instructorAvailability = await this.getInstructorAvailability(instructor.id);
  
  //     // Find suitable room and time
  //     const { availableRoom, availableTime } = this.findAvailableSlot(
  //       rooms,
  //       instructorAvailability,
  //       course.duration
  //     );
  
  //     // Create schedule
  //     const schedule = this.scheduleRepository.create({
  //       course,
  //       instructor,
  //       room: availableRoom,
  //       start_time: availableTime.start,
  //       end_time: availableTime.end,
  //       day: availableTime.day,
  //     });
  
  //     schedules.push(await this.scheduleRepository.save(schedule));
  //   }
  
  //   return schedules;
  // }

  // async checkConflicts(schedule: Partial<Schedule>) {
  //   const roomConflicts = await this.scheduleRepository
  //     .createQueryBuilder('schedule')
  //     .where('schedule.room_id = :roomId', { roomId: schedule.room.id })
  //     .andWhere('schedule.day = :day', { day: schedule.day })
  //     .andWhere(
  //       `(schedule.start_time BETWEEN :start AND :end 
  //        OR schedule.end_time BETWEEN :start AND :end)`,
  //       { start: schedule.start_time, end: schedule.end_time }
  //     )
  //     .getCount();

  //   const instructorConflicts = await this.scheduleRepository
  //     .createQueryBuilder('schedule')
  //     .where('schedule.instructor_id = :instructorId', { 
  //       instructorId: schedule.instructor.id 
  //     })
  //     .andWhere('schedule.day = :day', { day: schedule.day })
  //     .andWhere(
  //       `(schedule.start_time BETWEEN :start AND :end 
  //        OR schedule.end_time BETWEEN :start AND :end)`,
  //       { start: schedule.start_time, end: schedule.end_time }
  //     )
  //     .getCount();

  //   return {
  //     hasConflicts: roomConflicts > 0 || instructorConflicts > 0,
  //     roomConflicts,
  //     instructorConflicts,
  //   };
  // }

  // private async getInstructorAvailability(instructorId: number) {
  //   return this.instructorAvailabilityService.getInstructorAvailability(instructorId);
  // }

  // private findAvailableSlot(
  //   rooms: Room[],
  //   instructorAvailability: any,
  //   duration: string
  // ) {
  //   // Implement your slot finding logic here
  //   // This is a placeholder - you'll need to implement the actual logic
  //   return {
  //     availableRoom: rooms[0], // Replace with actual logic
  //     availableTime: {
  //       start: new Date(),
  //       end: new Date(),
  //       day: new Date(),
  //     },
  //   };
  // }
}
  // create(createScheduleDto: CreateScheduleDto) {
  //   return 'This action adds a new schedule';
  // }

  // findAll() {
  //   return `This action returns all schedule`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} schedule`;
  // }

  // update(id: number, updateScheduleDto: UpdateScheduleDto) {
  //   return `This action updates a #${id} schedule`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} schedule`;
  // }

