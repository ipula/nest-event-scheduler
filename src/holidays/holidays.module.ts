import { Module } from '@nestjs/common';
import { HolidaysService } from './holidays.service';
import { HolidaysController } from './holidays.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Holidays } from './entities/holidays.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Holidays])],
  providers: [HolidaysService],
  controllers: [HolidaysController],
  exports: [HolidaysService],
})
export class HolidaysModule {}
