import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { Holidays } from './entities/holidays.entity';
import { HolidaysService } from './holidays.service';

@Controller('holidays')
export class HolidaysController {
  constructor(private holidaysService: HolidaysService) {}

  /**
   * create holiday
   * @param createHolidayDto CreateHolidayDto
   * @returns Holidays
   */
  @Post('/create')
  async createHoliday(
    @Body() createHolidayDto: CreateHolidayDto,
  ): Promise<Holidays> {
    return this.holidaysService.createHoliday(createHolidayDto);
  }

  /**
   * get holiday by date
   * @param date string
   * @returns Holidays
   */
  @Get('')
  async getHolidayByDate(@Query('date') date: string): Promise<Holidays> {
    return this.holidaysService.getHolidayByDate(date);
  }
}
