import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Program } from '../../program/entities/program.entity';
import { Schedule } from '../../schedule/entities/schedule.entity';
import { Request } from '../../request/entities/request.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  course_name: string;

  @Column({ unique: true })
  course_code: string;

  @Column()
  duration: string;

  @Column()
  semester: string;

  @Column()
  year: number;

  @ManyToOne(() => Program, (program) => program.courses)
  program: Program;

  @ManyToOne(() => User, (user) => user.courses)
  teacher: User;

  @OneToMany(() => Schedule, (schedule) => schedule.course)
  schedules: Schedule[];

  @OneToMany(() => Request, (request) => request.course)
  requests: Request[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}