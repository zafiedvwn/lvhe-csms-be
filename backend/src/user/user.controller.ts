import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('admin')
  @UseGuards(RolesGuard)
  @Roles('Admin')
  adminOnly() {
    return 'Admin access granted';
  }

  @Get('college-secretary')
  @UseGuards(RolesGuard)
  @Roles('College Secretary')
  collegeSecretaryOnly() {
    return 'College Secretary access granted';
  }

  @Get('program-head')
  @UseGuards(RolesGuard)
  @Roles('Program Head')
  programHeadOnly() {
    return 'Program Head access granted';
  }

  @Get('college-chancellor')
  @UseGuards(RolesGuard)
  @Roles('College Chancellor')
  collegeChancellorOnly() {
    return 'College Chancellor access granted';
  }

  @Get('teacher')
  @UseGuards(RolesGuard)
  @Roles('Teacher')
  teacherOnly() {
    return 'Teacher access granted';
  }

  @Get('student')
  @UseGuards(RolesGuard)
  @Roles('Student')
  studentOnly() {
    return 'Student access granted';
  }

  @Get('non-teaching')
  @UseGuards(RolesGuard)
  @Roles('Non-Teaching')
  nonTeachingOnly() {
    return 'Non-Teaching access granted';
  }

}
