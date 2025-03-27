import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Permission } from '../../permission/entities/permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @OneToMany(() => Permission, (permission) => permission.role)
  permissions: Permission[];
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}