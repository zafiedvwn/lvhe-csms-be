import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Course } from '../../course/entities/course.entity';
import { Schedule } from '../../schedule/entities/schedule.entity';

@Entity()
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  program_name: string;

  @Column({ unique: true })
  program_code: string;

  @OneToMany(() => User, (user) => user.program)
  users: User[];

  @OneToMany(() => Course, (course) => course.program)
  courses: Course[];

  @OneToMany(() => Schedule, (schedule) => schedule.program)
  schedules: Schedule[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}