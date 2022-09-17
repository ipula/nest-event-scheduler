import { IsOptional, IsNumber, IsString } from 'class-validator';
export class UpdateEventsTypeDto {
  @IsOptional()
  @IsString()
  event_name: string;

  @IsOptional()
  @IsNumber()
  event_max_duration_per_slot: number;

  @IsOptional()
  @IsNumber()
  event_max_slots: number;
}
