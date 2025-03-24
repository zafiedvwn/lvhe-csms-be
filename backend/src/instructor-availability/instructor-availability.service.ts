import { Injectable } from '@nestjs/common';
import { CreateInstructorAvailabilityDto } from './dto/create-instructor-availability.dto';
import { UpdateInstructorAvailabilityDto } from './dto/update-instructor-availability.dto';

@Injectable()
export class InstructorAvailabilityService {
  create(createInstructorAvailabilityDto: CreateInstructorAvailabilityDto) {
    return 'This action adds a new instructorAvailability';
  }

  findAll() {
    return `This action returns all instructorAvailability`;
  }

  findOne(id: number) {
    return `This action returns a #${id} instructorAvailability`;
  }

  update(id: number, updateInstructorAvailabilityDto: UpdateInstructorAvailabilityDto) {
    return `This action updates a #${id} instructorAvailability`;
  }

  remove(id: number) {
    return `This action removes a #${id} instructorAvailability`;
  }
}
