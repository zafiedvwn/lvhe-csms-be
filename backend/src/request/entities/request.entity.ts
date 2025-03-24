import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Course } from '../../course/entities/course.entity';
import { Room } from '../../room/entities/room.entity';
import { Schedule } from '../../schedule/entities/schedule.entity';

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  request_type: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  approved_at: Date;

  @Column({ nullable: true })
  rejected_at: Date;

  @ManyToOne(() => User, (user) => user.requests)
  user: User;

  @ManyToOne(() => Course, (course) => course.requests)
  course: Course;

  @ManyToOne(() => Room, (room) => room.requests)
  room: Room;

  @ManyToOne(() => Schedule, (schedule) => schedule.requests)
  schedule: Schedule;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}