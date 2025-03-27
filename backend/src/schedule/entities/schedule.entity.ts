import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Course } from '../../course/entities/course.entity';
import { Program } from '../../program/entities/program.entity';
import { Room } from '../../room/entities/room.entity';
import { Request } from '../../request/entities/request.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @Column()
  day: Date;

  @ManyToOne(() => User, (user) => user.schedules)
  user: User;

  @ManyToOne(() => Course, (course) => course.schedules)
  course: Course;

  @ManyToOne(() => Program, (program) => program.schedules)
  program: Program;

  @ManyToOne(() => Room, (room) => room.schedules)
  room: Room;

  @OneToMany(() => Request, (request) => request.schedule)
  requests: Request[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}