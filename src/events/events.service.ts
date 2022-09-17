import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HolidaysService } from 'src/holidays/holidays.service';
import { In, Repository } from 'typeorm';
import { CreateBreakingTypesDto } from './dto/create-breaking-types.dto';
import { CreateEventsTypeDto } from './dto/create-events-types.dto';
import { CreateEventsDto } from './dto/create-events.dto';
import { UpdateBreakingTypesDto } from './dto/update-breaking-types.dto';
import { UpdateEventsTypeDto } from './dto/update-events-types.dto';
import { BreakingTypes } from './entities/breaking-types.entity';
import { EventsTypes } from './entities/events-types.entity';
import { Events } from './entities/events.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events) private eventsRepository: Repository<Events>, // inject events repository
    @InjectRepository(BreakingTypes)
    private breakingTypeRepository: Repository<BreakingTypes>, // inject breaking types repository
    @InjectRepository(EventsTypes)
    private eventsTypeRepository: Repository<EventsTypes>, // inject events types repository
    private holidayService: HolidaysService, //inject holiday service
  ) {}

  /**
   * create events
   * @param createEventsDto CreateEventsDto
   * @returns Events
   */
  async createEvents(createEventsDto: CreateEventsDto): Promise<Events> {
    try {
      const {
        breakingTypes,
        event_end,
        event_start,
        event_status,
        event_types,
        event_date,
      } = createEventsDto;

      //check event date has a holiday or not
      const holiday = await this.holidayService.getHolidayByDate(event_date);
      if (holiday) {
        throw new NotFoundException(`Cannot creat events on a holiday`);
      }

      // create event
      let event = await this.eventsRepository.create({
        event_end,
        event_start,
        event_status,
        event_types,
      });

      // save event into db
      event = await this.eventsRepository.save(event);
      // find breaking types for many to many relationship data save
      const breakingTypesObj = await this.breakingTypeRepository.find({
        where: {
          id: In(breakingTypes),
        },
        relations: ['events'],
      });

      // adding events data in events array
      for (const breakingTypesObjs of breakingTypesObj) {
        console.log(breakingTypesObjs.events);
        breakingTypesObjs.events.push(event);
      }

      // save data into table created with many to many relationship
      await this.breakingTypeRepository.save(breakingTypesObj);
      return event;
    } catch (error) {
      throw new Error(error); // throw error
    }
  }

  /**
   * get all events
   * @returns Events[]
   */
  async events(): Promise<Events[]> {
    return await this.eventsRepository.find({
      relations: {
        event_types: true,
        breakingTypes: true,
      },
    });
  }

  /**
   * get events by id
   * @param id number
   * @returns Events
   */
  async eventsById(id: number): Promise<Events> {
    const found = await this.eventsRepository.findOne({
      where: { id },
      relations: {
        bookings: true,
        event_types: true,
        breakingTypes: true,
      },
    });
    if (!found) {
      throw new NotFoundException(`Event with id ${id} not found`); // throw error if there is no data found
    }
    // return events object
    return found;
  }

  /**
   * get events types by id
   * @param id number
   * @returns EventsTypes
   */
  async getEventsTypeById(id: number): Promise<EventsTypes> {
    const found = await this.eventsTypeRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Event Type with id ${id} not found`); // throw error if there is no data found
    }
    // return events types object
    return found;
  }

  /**
   * get breaking types by id
   * @param id number
   * @returns BreakingTypes
   */
  async getBreakingTypeById(id: number): Promise<BreakingTypes> {
    const found = await this.breakingTypeRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Breaking Type with id ${id} not found`); // throw error if there is no data found
    }
    // return breaking types object
    return found;
  }

  /**
   * create event types
   * @param createEventsTypeDto CreateEventsTypeDto
   * @returns EventsTypes
   */
  async createEventsType(
    createEventsTypeDto: CreateEventsTypeDto,
  ): Promise<EventsTypes> {
    try {
      //creat events type
      const eventsType = await this.eventsTypeRepository.create(
        createEventsTypeDto,
      );
      // save & return events type
      return await this.eventsTypeRepository.save(eventsType);
    } catch (error) {
      throw new Error(error); // throw error if anything wrong
    }
  }

  async getEventsTypes(): Promise<EventsTypes[]> {
    try {
      return await this.eventsTypeRepository.find();
    } catch (error) {
      throw new Error(error); // throw error if anything wrong
    }
  }

  /**
   * update events types
   * @param id number
   * @param updateEventsTypeDto UpdateEventsTypeDto
   * @returns EventsTypes
   */
  async updateEventsType(
    id: number,
    updateEventsTypeDto: UpdateEventsTypeDto,
  ): Promise<EventsTypes> {
    try {
      // load events type by id
      const eventType = await this.getEventsTypeById(id);
      Object.keys(updateEventsTypeDto).forEach((element) => {
        eventType[element] = updateEventsTypeDto[element]; // add new values to the event type object
      });

      // save and return with new values
      return await this.eventsTypeRepository.save(eventType);
    } catch (error) {
      throw new Error(error); // throw error if anything wrong
    }
  }

  /**
   * create breaking types
   * @param createBreakingTypesDto CreateBreakingTypesDto
   * @returns BreakingTypes
   */
  async createBreakingType(
    createBreakingTypesDto: CreateBreakingTypesDto,
  ): Promise<BreakingTypes> {
    try {
      // creat breaking types
      const types = await this.breakingTypeRepository.create(
        createBreakingTypesDto,
      );

      // save & return breakling types
      return await this.breakingTypeRepository.save(types);
    } catch (error) {
      throw new Error(error); // throw error if anything wrong
    }
  }

  /**
   * get all breaking types
   * @returns BreakingTypes
   */
  async getBreakingTypes(): Promise<BreakingTypes[]> {
    try {
      return await this.breakingTypeRepository.find();
    } catch (error) {
      throw new Error(error); // throw error if anything wrong
    }
  }

  /**
   * update breaking types
   * @param id number
   * @param updateBreakingTypesDto UpdateBreakingTypesDto
   * @returns BreakingTypes
   */
  async updateBreakingTypesDto(
    id: number,
    updateBreakingTypesDto: UpdateBreakingTypesDto,
  ): Promise<BreakingTypes> {
    try {
      // get breaking  types by id
      const type = await this.getBreakingTypeById(id);
      Object.keys(updateBreakingTypesDto).forEach((element) => {
        type[element] = updateBreakingTypesDto[element]; // add new values to the breaking type object
      });
      // save with updated values
      return await this.breakingTypeRepository.save(type);
    } catch (error) {
      throw new Error(error); // throw error if anything wrong
    }
  }
}
