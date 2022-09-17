import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HolidaysModule } from 'src/holidays/holidays.module';
import { BreakingTypes } from './entities/breaking-types.entity';
import { EventsTypes } from './entities/events-types.entity';
import { Events } from './entities/events.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Events, BreakingTypes, EventsTypes]),
    HolidaysModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
