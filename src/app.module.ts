import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configurationchema } from './configs/configuration.schema';
import { configuration } from './configs/configuration';
import { typeOrmAsyncConfig } from './configs/typeorm.config';
import { UserModule } from './user/user.module';
import { EventsModule } from './events/events.module';
import { HolidaysModule } from './holidays/holidays.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
      validationSchema: configurationchema,
    }),
    UserModule,
    EventsModule,
    HolidaysModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
