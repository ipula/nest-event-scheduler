import { Bookings } from 'src/bookings/entities/bookings.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { BreakingTypes } from './breaking-types.entity';
import { EventsTypes } from './events-types.entity';

@Entity()
export class Events {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'time' })
  event_start: string;

  @Column({ type: 'time' })
  event_end: string;

  @Column({ type: 'date' })
  event_date: string;

  @Column()
  event_status: number; // approved = 0, cancled = 1, 2 = done

  @ManyToMany(
    (_type) => BreakingTypes,
    (breakingTypes) => breakingTypes.events,
    {},
  )
  breakingTypes: BreakingTypes[];

  @ManyToOne((_type) => EventsTypes, (eventsType) => eventsType.id, {
    eager: false,
  })
  @JoinColumn({ name: 'event_type_id' })
  event_types: EventsTypes;

  @Exclude({ toPlainOnly: true })
  @OneToMany((_type) => Bookings, (bookings) => bookings.booking_event, {})
  bookings: Bookings[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
