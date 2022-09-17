import * as moment from 'moment';

/**
 * helper class for common helper functions
 */
export class Helper {

  /**
   * generate time slot for event
   * @param start time
   * @param end time
   * @param period number
   * @returns array
   */
  static getTimeStops = (start, end, period): any[] => {
    const startTime = moment(start, 'HH:mm');
    const endTime = moment(end, 'HH:mm');

    if (endTime.isBefore(startTime)) {
      endTime.add(1, 'day');
    }

    const timeStops = [];

    while (startTime <= endTime) {
      timeStops.push(moment(startTime).format('HH:mm'));
      startTime.add(period, 'minutes');
    }
    return timeStops;
  };

  /**
   * check beaking types time
   * @param breakingTypes any[]
   * @param createBookingsDto CreateBookingsDto
   * @returns boolean
   */
  static breakingTypeValidate = (
    breakingTypes: any[],
    createBookingsDto,
  ): boolean => {
    breakingTypes.forEach((element) => {
      if (
        moment(element.breaking_type_start, 'HH:mm') <
          moment(createBookingsDto.booking_type_start, 'HH:mm') &&
        moment(element.breaking_type_end, 'HH:mm') >
          moment(createBookingsDto.booking_type_start, 'HH:mm')
      ) {
        return false;
      }
    });
    return true;
  };

  /**
   * check avaliable booking slots
   * @param slots number
   * @param count number
   * @returns boolean
   */
  static checkBookingSlots = (slots: number, count: number): boolean => {
    if (slots < count) {
      return false;
    }
    return true;
  };

  /**
   * validate booking start time with event start time
   * @param data any
   * @param createBookingsDto CreateBookingsDto
   * @returns boolean
   */
  static eventStartTimeValidate = (data: any, createBookingsDto): boolean => {
    if (
      moment(data.event_start, 'HH:mm') >
      moment(createBookingsDto.booking_type_start, 'HH:mm')
    ) {
      return false;
    }
    return true;
  };
}
