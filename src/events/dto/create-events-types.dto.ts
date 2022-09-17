import { IsNotEmpty } from 'class-validator';
export class CreateEventsTypeDto {
  @IsNotEmpty()
  event_type_name: string;

  @IsNotEmpty()
  event_type_max_duration_per_slot: number;

  @IsNotEmpty()
  event_type_cleaning_duration_between_slot: number;

  @IsNotEmpty()
  event_type_max_slots: number;
}
