import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateBreakingTypesDto } from './dto/create-breaking-types.dto';
import { CreateEventsTypeDto } from './dto/create-events-types.dto';
import { CreateEventsDto } from './dto/create-events.dto';
import { UpdateBreakingTypesDto } from './dto/update-breaking-types.dto';
import { UpdateEventsTypeDto } from './dto/update-events-types.dto';
import { BreakingTypes } from './entities/breaking-types.entity';
import { EventsTypes } from './entities/events-types.entity';
import { Events } from './entities/events.entity';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  /**
   * create event
   * @param createEventsDto CreateEventsDto
   * @returns Events
   */
  @Post('/create')
  async createEvents(
    @Body() createEventsDto: CreateEventsDto,
  ): Promise<Events> {
    return this.eventsService.createEvents(createEventsDto);
  }

  /**
   * create event types
   * @param createEventsTypeDto CreateEventsTypeDto
   * @returns EventsTypes
   */
  @Post('/type/create')
  async createEventsType(
    @Body() createEventsTypeDto: CreateEventsTypeDto,
  ): Promise<EventsTypes> {
    return this.eventsService.createEventsType(createEventsTypeDto);
  }

  /**
   * get all events types
   * @returns EventsTypes[]
   */
  @Get('/type')
  async getEventsTypes(): Promise<EventsTypes[]> {
    return this.eventsService.getEventsTypes();
  }

  /**
   * update events type
   * @param id number
   * @param updateEventsTypeDto UpdateEventsTypeDto
   * @returns EventsTypes
   */
  @Patch('/type/:id')
  async updateEventsType(
    @Param('id') id: number,
    @Body() updateEventsTypeDto: UpdateEventsTypeDto,
  ): Promise<EventsTypes> {
    return this.eventsService.updateEventsType(id, updateEventsTypeDto);
  }

  /**
   * craetebreaking types
   * @param createBreakingTypesDto CreateBreakingTypesDto
   * @returns BreakingTypes
   */
  @Post('/breaking-type/create')
  async createBreakingType(
    @Body() createBreakingTypesDto: CreateBreakingTypesDto,
  ): Promise<BreakingTypes> {
    return this.eventsService.createBreakingType(createBreakingTypesDto);
  }

  /**
   * get all breaking types
   * @returns BreakingTypes[]
   */
  @Get('/breaking-type')
  async getBreakingTypes(): Promise<BreakingTypes[]> {
    return this.eventsService.getBreakingTypes();
  }

  /**
   * update breaking types
   * @param id number
   * @param updateBreakingTypesDto UpdateBreakingTypesDto
   * @returns BreakingTypes
   */
  @Patch('/breaking-type/:id')
  async updateBreakingTypesDto(
    @Param('id') id: number,
    @Body() updateBreakingTypesDto: UpdateBreakingTypesDto,
  ): Promise<BreakingTypes> {
    return this.eventsService.updateBreakingTypesDto(
      id,
      updateBreakingTypesDto,
    );
  }

  /**
   * get all events
   * @returns Events[]
   */
  @Get('/')
  async events(): Promise<Events[]> {
    return await this.eventsService.events();
  }
}
