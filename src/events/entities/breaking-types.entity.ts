import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Events } from './events.entity';

@Entity()
export class BreakingTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  breaking_type_name: string;

  @ManyToMany(() => Events, (events) => events.breakingTypes)
  @JoinTable()
  // @Exclude({ toPlainOnly: true })
  events: Events[];

  @Column({ type: 'time' })
  breaking_type_start: string;

  @Column({ type: 'time' })
  breaking_type_end: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
