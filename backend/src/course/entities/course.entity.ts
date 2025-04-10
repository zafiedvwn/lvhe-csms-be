import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Index, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
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

  @Column()
  course_code: string;

  @Column()
  duration: string;

  @Column()
  semester: string;

  @Column()
  year: number;

  @Index(['teaching_staff_id'])
  @ManyToOne(() => User, (user) => user.courses)
  teaching_staff: User;

  @ManyToOne(() => Program, (program) => program.courses)
  @JoinColumn({ name: 'program_id' })
  program: Program;

  @OneToMany(() => Schedule, (schedule) => schedule.course)
  schedules: Schedule[];

  @OneToMany(() => Request, (request) => request.course)
  requests: Request[];

  @ManyToMany(() => Course, course => course.id)
  @JoinTable({
    name: 'course_prerequisites',
    joinColumn: { name: 'course_id' },
    inverseJoinColumn: { name: 'prerequisite_id' }
  })
  prerequisites: Course[];

  @Column({ type: 'jsonb', default: [] })
  year_level_semesters: { 
    year_level: number; 
    semesters: number[] 
  }[];

  @Column({ default: false })
  is_core: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}


