import { Test, TestingModule } from '@nestjs/testing';
import { TeachingStaffAvailabilityController } from './teaching-staff-availability.controller';
import { TeachingStaffAvailabilityService } from './teaching-staff-availability.service';
import { describe, beforeEach, it, expect } from '@jest/globals';


describe('TeachingStaffAvailabilityController', () => {
  let controller: TeachingStaffAvailabilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeachingStaffAvailabilityController],
      providers: [TeachingStaffAvailabilityService],
    }).compile();

    controller = module.get<TeachingStaffAvailabilityController>(TeachingStaffAvailabilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
