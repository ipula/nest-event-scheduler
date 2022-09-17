import { IsNotEmpty } from '@nestjs/class-validator';
import { EventsTypes } from '../entities/events-types.entity';
export class CreateEventsDto {
  @IsNotEmpty()
  event_types: EventsTypes;

  @IsNotEmpty()
  event_start: string;

  @IsNotEmpty()
  event_end: string;

  @IsNotEmpty()
  event_date: string;

  @IsNotEmpty()
  event_status: number;

  @IsNotEmpty()
  breakingTypes: number[];
}
