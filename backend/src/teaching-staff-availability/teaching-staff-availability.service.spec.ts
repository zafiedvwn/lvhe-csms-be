import { Test, TestingModule } from '@nestjs/testing';
import { TeachingStaffAvailabilityService } from './teaching-staff-availability.service';
import { describe, beforeEach, it, expect } from '@jest/globals';

describe('TeachingStaffAvailabilityService', () => {
  let service: TeachingStaffAvailabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeachingStaffAvailabilityService],
    }).compile();

    service = module.get<TeachingStaffAvailabilityService>(TeachingStaffAvailabilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
