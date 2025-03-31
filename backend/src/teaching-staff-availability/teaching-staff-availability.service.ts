import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateTeachingStaffAvailabilityDto } from './dto/create-teaching-staff-availability.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TeachingStaffAvailability } from './entities/teaching-staff-availability.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TeachingStaffAvailabilityService {
  constructor(
    @InjectRepository(TeachingStaffAvailability)
    private teachingStaffAvailabilityRepo: Repository<TeachingStaffAvailability>,
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async createTeachingStaffAvailability(userId: number, dto: CreateTeachingStaffAvailabilityDto) {
    const user = await this.userRepo.findOne({
      where: { 
        id: userId,
        role: { name: 'Teaching Staff' }
      }
    });
    if (!user) throw new ForbiddenException('Only Teaching Staff can set availability');

    // Validate time constraints (7AM - 8PM)
    const start = new Date(`1970-01-01T${dto.start_time}`);
    const end = new Date(`1970-01-01T${dto.end_time}`);
    const minTime = new Date('1970-01-01T07:00:00');
    const maxTime = new Date('1970-01-01T20:00:00');

    if (start < minTime || end > maxTime) {
      throw new BadRequestException('Availability must be between 7AM and 8PM');
    }

    const availability = this.teachingStaffAvailabilityRepo.create({
      day: dto.day,
      start_time: dto.start_time.toTimeString().slice(0, 8),  // Convert to "HH:MM:SS"
      end_time: dto.end_time.toTimeString().slice(0, 8),      // Convert to "HH:MM:SS"
      teaching_staff: user
    });
    return this.teachingStaffAvailabilityRepo.save(availability);
  }

  async getTeachingStaffAvailability(teachingStaffId: number) {
    return this.teachingStaffAvailabilityRepo.find({
      where: { teaching_staff: { id: teachingStaffId } },
      order: { day: 'ASC', start_time: 'ASC' }
    });
  }

  async deleteTeachingStaffAvailability(id: number, userId: number) {
    const availability = await this.teachingStaffAvailabilityRepo.findOne({ where: { id } });
    if (!availability) throw new NotFoundException('Availability not found');
    if (availability.teaching_staff.id !== userId) throw new ForbiddenException('You are not authorized to delete this availability');
    return this.teachingStaffAvailabilityRepo.remove(availability);
  }
}