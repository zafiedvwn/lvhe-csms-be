import { Controller, Get, UseGuards, Query} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('teaching-staff')
  @Roles('Program Head', 'College Secretary')
  @ApiOperation({ summary: 'List teaching staff' })
  @ApiQuery({ name: 'program_id', required: false, type: Number })
  findTeachingStaff(@Query('program_id') program_id?: number) {
    return this.userService.findTeachingStaff(program_id);
  }

}
