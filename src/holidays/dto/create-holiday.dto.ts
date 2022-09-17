import { IsNotEmpty } from 'class-validator';
export class CreateHolidayDto {
  @IsNotEmpty()
  holiday_name: string;

  @IsNotEmpty()
  holiday_reason: string;

  @IsNotEmpty()
  holiday_date: string;
}
