import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from 'src/events/events.module';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { Bookings } from './entities/bookings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookings]), EventsModule],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
