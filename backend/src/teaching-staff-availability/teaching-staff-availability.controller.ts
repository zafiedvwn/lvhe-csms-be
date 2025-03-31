import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TeachingStaffAvailabilityService } from './teaching-staff-availability.service';
import { CreateTeachingStaffAvailabilityDto } from './dto/create-teaching-staff-availability.dto';
import { UpdateTeachingStaffAvailabilityDto } from './dto/update-teaching-staff-availability.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';


@Controller('teaching-staff-availability')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Availability')
@ApiBearerAuth()
export class TeachingStaffAvailabilityController {
  constructor(private readonly teachingStaffAvailabilityService: TeachingStaffAvailabilityService) {}

  @Post()
  @Roles('Teaching Staff')
  @ApiOperation({ summary: 'Add availability slot (Teaching Staff only)' })
  create(@Body() dto: CreateTeachingStaffAvailabilityDto, @Req() req) {
    return this.teachingStaffAvailabilityService.createTeachingStaffAvailability(req.user.id, dto);
  }

  @Get('me')
  @Roles('Teaching Staff')
  @ApiOperation({ summary: 'Get my availability slots' })
  findMyAvailability(@Req() req) {
    return this.teachingStaffAvailabilityService.getTeachingStaffAvailability(req.user.id);
  }

  @Get('teaching_staff/:teachingStaffId')
  @Roles('Program Head', 'College Secretary')
  @ApiOperation({ summary: 'View teacher availability (Admin/Program Head only)' })
  findByTeacher(@Param('teachingStaffId') teachingStaffId: string) {
    return this.teachingStaffAvailabilityService.getTeachingStaffAvailability(+teachingStaffId);
  }

  @Delete(':id')
  @Roles('Teaching Staff')
  @ApiOperation({ summary: 'Remove availability slot' })
  remove(@Param('id') id: string, @Req() req) {
    return this.teachingStaffAvailabilityService.deleteTeachingStaffAvailability(+id, req.user.id);
  }
}
