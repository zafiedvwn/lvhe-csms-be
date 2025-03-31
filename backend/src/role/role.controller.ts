import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('role')
@UseGuards(JwtAuthGuard)
@ApiTags('Roles')
@ApiBearerAuth()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get(':name')
  @ApiOperation({ summary: 'Get role details' })
  findByName(@Param('name') name: string) {
    return this.roleService.findRoleByName(name);
  }
}
