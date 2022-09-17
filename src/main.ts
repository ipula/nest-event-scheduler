import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  /**
   * application main configurations
   */
  const config = await app.get(ConfigService);
  const globalPrefix = 'api';
  const port = config.get('PORT') || 3100;

  // app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(port, () => {
    Logger.log('Listening at https://locahost:' + port + '/' + globalPrefix);
    Logger.log(`Running in ${config.get('NODE_ENV')} mode`);
    Logger.log(`WELCOME TO Hackathon :))`);
  });
}
bootstrap();
