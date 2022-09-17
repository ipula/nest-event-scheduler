import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventsService } from 'src/events/events.service';
import { Repository } from 'typeorm';
import { CreateBookingsDto } from './dto/create-booking.dto';
import { Bookings } from './entities/bookings.entity';
import { Helper } from 'src/core/helper';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Bookings)
    private bookingsRepository: Repository<Bookings>,
    private eventService: EventsService,
  ) {}

  /**
   * create booking and save in DB
   * @param createBookingsDto CreateBookingsDto
   * @returns Bookings
   */
  async createBookings(
    createBookingsDto: CreateBookingsDto,
  ): Promise<Bookings> {
    const {
      booking_event_id,
      booking_type_start,
      booking_user_email,
      booking_status,
      booking_type_end,
      booking_user_mobile,
      booking_user_name,
    } = createBookingsDto;

    // get & count bookings for specific event id
    const bookings = await this.bookingsRepository.findAndCount({
      where: {
        booking_event: {
          id: booking_event_id,
        },
      },
    });

    let dataObj: any;

    // get event by event id and check booking param validations
    await this.eventService.eventsById(booking_event_id).then(
      async (data) => {
        dataObj = data;
        // validate breaking times
        if (
          !Helper.breakingTypeValidate(data.breakingTypes, createBookingsDto)
        ) {
          throw new NotFoundException(`No bookings available this time period`);
        }

        // validate with event start time
        if (!Helper.eventStartTimeValidate(data, createBookingsDto)) {
          throw new NotFoundException(`No bookings available this time period`);
        }

        // validate correct time slot
        if (
          !Helper.getTimeStops(
            data.event_start,
            data.event_end,
            data.event_types.event_type_max_duration_per_slot +
              data.event_types.event_type_cleaning_duration_between_slot,
          ).includes(booking_type_start.toString())
        ) {
          throw new NotFoundException(`invalid time slot`);
        }

        // check maximum slots for time slot
        if (
          !Helper.checkBookingSlots(
            data.event_types.event_type_max_slots,
            bookings[1],
          )
        ) {
          throw new NotFoundException(`No bookings available`);
        }
      },
      (err) => {
        throw new NotFoundException(err); //throw error
      },
    );

    // create booking in db
    const booking = await this.bookingsRepository.create({
      booking_event: dataObj,
      booking_status,
      booking_type_end,
      booking_type_start,
      booking_user_email,
      booking_user_mobile,
      booking_user_name,
    });
    // return save booking
    return await this.bookingsRepository.save(booking);
  }
}
