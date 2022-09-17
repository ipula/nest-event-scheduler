import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule.forRoot()],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mysql',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      entities: [User],
    //   entities: [__dirname + '/../entities/*.entity.{js,ts}'],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      //   cli: {
      //     migrationsDir: __dirname + '/../database/migrations',
      //   },
      migrationsTableName: 'migrations',
      //   extra: {
      //     charset: 'utf8mb4_unicode_ci',
      //   },
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    };
  },
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
  entities: [__dirname + '/../entities/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  //   cli: {
  //     migrationsDir: __dirname + '/../database/migrations',
  //   },
  migrationsTableName: 'migrations',
  //   extra: {
  //     charset: 'utf8mb4_unicode_ci',
  //   },
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
};
