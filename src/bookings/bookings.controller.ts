import { Body, Controller, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingsDto } from './dto/create-booking.dto';
import { Bookings } from './entities/bookings.entity';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  /**
   * create bookings for events
   * @param createBookingsDto CreateBookingsDto
   * @returns Bookings
   */
  @Post('/create')
  async createBookings(
    @Body() createBookingsDto: CreateBookingsDto,
  ): Promise<Bookings> {
    return this.bookingsService.createBookings(createBookingsDto);
  }
}
