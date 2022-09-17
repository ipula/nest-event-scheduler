import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { Holidays } from './entities/holidays.entity';

@Injectable()
export class HolidaysService {
  constructor(
    @InjectRepository(Holidays) private holidayRepository: Repository<Holidays>, // inject holidat repository
  ) {}

  /**
   * creat holiday
   * @param createHolidayDto CreateHolidayDto
   * @returns Holidays
   */
  async createHoliday(createHolidayDto: CreateHolidayDto): Promise<Holidays> {
    try {
      // create holiday
      const holiday = await this.holidayRepository.create(createHolidayDto);
      // save and retun holiday
      return await this.holidayRepository.save(holiday);
    } catch (error) {
      throw new Error(error); // throw error if anything wrong
    }
  }

  /**
   * find holiday by date
   * @param date string
   * @returns Holidays
   */
  async getHolidayByDate(date: string): Promise<Holidays> {
    // find holiday by date
    const holiday = await this.holidayRepository.findOne({
      where: {
        holiday_date: date,
      },
    });
    return holiday; // retrun holiday
  }
}
