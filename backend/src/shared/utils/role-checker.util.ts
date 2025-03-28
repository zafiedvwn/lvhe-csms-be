// src/shared/utils/role-checker.util.ts
import { Injectable } from '@nestjs/common';
import { RoleService } from '../../role/role.service';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class RoleChecker {
  constructor(private readonly roleService: RoleService) {}

  async hasRole(user: User, roleName: string): Promise<boolean> {
    const role = await this.roleService.findRoleByName(roleName);
    return user.role?.id === role?.id;
  }
}