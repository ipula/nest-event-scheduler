import { Events } from 'src/events/entities/events.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Bookings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  booking_user_name: string;

  @Column()
  booking_user_email: string;

  @Column()
  booking_user_mobile: string;

  @ManyToOne((_type) => Events, (event) => event.id, { eager: false })
  @JoinColumn({ name: 'booking_event_id' })
  booking_event: Events;

  @Column() // booking confirm = 1 booking cancled = 0
  booking_status: number;

  @Column({ type: 'time' })
  booking_type_start: string;

  @Column({ type: 'time' })
  booking_type_end: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
