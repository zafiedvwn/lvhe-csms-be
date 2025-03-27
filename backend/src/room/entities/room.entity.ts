import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Schedule } from '../../schedule/entities/schedule.entity';
import { Request } from '../../request/entities/request.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  room_name: string;

  @Column()
  room_type: string;

  @Column()
  floor: string;

  @Column()
  capacity: string;

  @OneToMany(() => Schedule, (schedule) => schedule.room)
  schedules: Schedule[];

  @OneToMany(() => Request, (request) => request.room)
  requests: Request[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}