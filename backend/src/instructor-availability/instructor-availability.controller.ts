import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstructorAvailabilityService } from './instructor-availability.service';
import { CreateInstructorAvailabilityDto } from './dto/create-instructor-availability.dto';
import { UpdateInstructorAvailabilityDto } from './dto/update-instructor-availability.dto';

@Controller('instructor-availability')
export class InstructorAvailabilityController {
  constructor(private readonly instructorAvailabilityService: InstructorAvailabilityService) {}

  @Post()
  create(@Body() createInstructorAvailabilityDto: CreateInstructorAvailabilityDto) {
    return this.instructorAvailabilityService.create(createInstructorAvailabilityDto);
  }

  @Get()
  findAll() {
    return this.instructorAvailabilityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instructorAvailabilityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstructorAvailabilityDto: UpdateInstructorAvailabilityDto) {
    return this.instructorAvailabilityService.update(+id, updateInstructorAvailabilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instructorAvailabilityService.remove(+id);
  }
}
