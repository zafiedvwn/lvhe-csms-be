import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('teaching_staff_availability')
export class TeachingStaffAvailability {
  @PrimaryGeneratedColumn()
  id: number;

  // Should reference a User with Teacher role
  @ManyToOne(() => User, (user) => user.availabilities)
  @JoinColumn({ name: 'teaching_staff_id' })
  teaching_staff: User;
  
  @Column({ 
    type: 'enum', 
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  })
  day: string;

  @Column({ type: 'time' })  // Changed from Date to time
  start_time: string; // Format: "HH:MM:SS" (e.g., "09:00:00")

  @Column({ type: 'time' })
  end_time: string;

  @Column({ default: true })
  is_recurring: boolean; // For weekly availability

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}