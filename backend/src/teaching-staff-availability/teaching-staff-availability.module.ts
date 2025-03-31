import { Module } from '@nestjs/common';
import { TeachingStaffAvailabilityService } from './teaching-staff-availability.service';
import { TeachingStaffAvailabilityController } from './teaching-staff-availability.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachingStaffAvailability } from './entities/teaching-staff-availability.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeachingStaffAvailability, User])],
  controllers: [TeachingStaffAvailabilityController],
  providers: [TeachingStaffAvailabilityService],
})
export class TeachingStaffAvailabilityModule {}
