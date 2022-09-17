import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Holidays {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  holiday_name: string;

  @Column()
  holiday_reason: string;

  @Column({ type: 'date' })
  holiday_date: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
