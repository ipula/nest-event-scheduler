import { IsNotEmpty } from 'class-validator';
export class CreateBookingsDto {
  @IsNotEmpty()
  booking_user_name: string;

  @IsNotEmpty()
  booking_user_email: string;

  @IsNotEmpty()
  booking_user_mobile: string;

  @IsNotEmpty()
  booking_event_id: number;

  @IsNotEmpty()
  booking_type_start: string;

  @IsNotEmpty()
  booking_type_end: string;

  @IsNotEmpty()
  booking_status: number;
}
