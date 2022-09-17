import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Events } from './events.entity';

@Entity()
export class EventsTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event_type_name: string;

  @Column()
  event_type_max_slots: number;

  @Column()
  event_type_max_duration_per_slot: number; // example: 10 minutes for each cutomser

  @Column()
  event_type_cleaning_duration_between_slot: number; // example: 5 minutes for each

  @OneToMany((_type) => Events, (events) => events.event_types, {})
  events: Events[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
