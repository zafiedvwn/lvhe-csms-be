// src/permission/entities/permission.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role } from '../../role/entities/role.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  resource: string;

  @Column()
  action: string;

  @ManyToOne(() => Role, (role) => role.permissions)
  role: Role;
}