import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ProgramService } from './program.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('program')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Program')
@ApiBearerAuth()
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post()
  @Roles('College Secretary')
  @ApiOperation({ summary: 'Create new program (College Secretary only)' })
  create(@Body() dto: CreateProgramDto) {
    return this.programService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all programs' })
  findAll() {
    return this.programService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get program details with courses' })
  findOne(@Param('id') id: string) {
    return this.programService.findOne(+id);
  }

}
