import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('/cluster');
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.use(morgan('tiny'));
  app.enableCors();
  const micro = app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'kube-cluster',
        brokers: [configService.get('KAFKA_URL')],
      },
      consumer: {
        groupId: 'kube-cluster',
      },
      producer: { },
    },
  });
  micro.useGlobalPipes(new ValidationPipe());

  // micro.listen(() => console.log('Connected to kafka.'));
  await app.listen(configService.get('APP_PORT'));
  await micro.listenAsync();
  console.log('INIT DONE!');
}
bootstrap();
