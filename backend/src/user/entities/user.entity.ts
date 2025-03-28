import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Program } from '../../program/entities/program.entity';
import { Role } from '../../role/entities/role.entity';
import { InstructorAvailability } from '../../instructor-availability/entities/instructor-availability.entity';
import { Schedule } from '../../schedule/entities/schedule.entity';
import { Request } from '../../request/entities/request.entity';
import { Course } from '../../course/entities/course.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ nullable: true })
  refreshToken: string;

  @ManyToOne(() => Program, (program) => program.users)
  program: Program;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => InstructorAvailability, (availability) => availability.user)
  availabilities: InstructorAvailability[];

  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedules: Schedule[];

  @OneToMany(() => Request, (request) => request.user)
  requests: Request[];

  @OneToMany(() => Course, (course) => course.teacher)
  courses: Course[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}