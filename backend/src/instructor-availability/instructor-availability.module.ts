import { Module } from '@nestjs/common';
import { InstructorAvailabilityService } from './instructor-availability.service';
import { InstructorAvailabilityController } from './instructor-availability.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstructorAvailability } from './entities/instructor-availability.entity';


@Module({
  imports: [TypeOrmModule.forFeature([InstructorAvailability])],
  controllers: [InstructorAvailabilityController],
  providers: [InstructorAvailabilityService],
})
export class InstructorAvailabilityModule {}
