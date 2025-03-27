import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  // create(createPermissionDto: CreatePermissionDto) {
  //   return 'This action adds a new permission';
  // }

  // findAll() {
  //   return `This action returns all permission`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} permission`;
  // }

  // update(id: number, updatePermissionDto: UpdatePermissionDto) {
  //   return `This action updates a #${id} permission`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} permission`;
  // }

  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async createPermission(name: string): Promise<Permission> {
    const permission = this.permissionRepository.create({ resource: name });
    return this.permissionRepository.save(permission);
  }

  async findPermissionByName(name: string): Promise<Permission | null> {
    return this.permissionRepository.findOne({ where: { resource: name } });
  }
}
