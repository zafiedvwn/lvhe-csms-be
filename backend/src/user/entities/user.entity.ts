import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Program } from '../../program/entities/program.entity';
import { Role } from '../../role/entities/role.entity';
import { TeachingStaffAvailability } from '../../teaching-staff-availability/entities/teaching-staff-availability.entity';
import { Schedule } from '../../schedule/entities/schedule.entity';
import { Request } from '../../request/entities/request.entity';
import { Course } from '../../course/entities/course.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'school_id'})
  schoolId: string; // Format: "00-0000XXX"

  @Column({ unique: true })
  email: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string;

  @ManyToOne(() => Program, (program) => program.users)
  @JoinColumn({ name: 'program_id' })
  program: Program | null;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => TeachingStaffAvailability, (availability) => availability.teaching_staff)
  availabilities: TeachingStaffAvailability[];

  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedules: Schedule[];

  @OneToMany(() => Request, (request) => request.user)
  requests: Request[];

  @OneToMany(() => Course, (course) => course.teaching_staff)
  courses: Course[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

