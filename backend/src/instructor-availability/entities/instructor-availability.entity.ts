import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class InstructorAvailability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: string;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @ManyToOne(() => User, (user) => user.availabilities)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}